<template>
    <div class="q-mt-lg q-mb-xl">
        <div class="custom-container">
            <q-form class="shadow-2 q-pa-md q-pt-lg" @submit.prevent="postJob" greedy ref="post_job_form">
                <q-inner-loading
                    :showing="is_loading"
                    label="Please wait..."
                    label-class="text-teal"
                    label-style="font-size: 1.1em"
                />
                <div class="flex justify-between items-center">
                    <div class="text-h5 text-grey-8">{{ isUpdate ? "Update" : "Post" }} a Job</div>
                    <q-btn v-if="isUpdate" type="button" icon="delete" color="red-12" class="q-px-md" @click="deleteJob" dense>
                        <q-tooltip>
                            Delete Job
                        </q-tooltip>
                    </q-btn>
                </div>
                <q-separator class="q-my-sm" />
                <div class="q-px-sm q-py-xs">
                    <q-input label-color="teal" outlined v-model="job_posting_payload.company_name" dense
                        label="Company Name" :rules="[val => val && val.length > 0 || 'This field is required.']" />
                </div>
                <div class="q-px-sm q-py-xs q-pb-lg">
                    <q-input label-color="teal" outlined v-model="job_posting_payload.location" dense
                        label="Location" />
                </div>
                <div class="q-px-sm q-py-xs">
                    <q-input label-color="teal" outlined v-model="job_posting_payload.title" dense label="Job title"
                        :rules="[val => val && val.length > 0 || 'This field is required.']" />
                </div>
                <div class="q-px-sm q-py-xs q-pb-lg">
                    <q-input type="textarea" label-color="teal" outlined v-model="job_posting_payload.description" dense
                        label="Description" />
                </div>
                <div class="q-px-sm q-py-xs q-pb-lg">
                    <q-select :options="natures_of_work_options" option-value="id" option-label="nature_of_work"
                        label-color="teal" v-model="job_posting_payload.nature_of_work_id" label="Nature of work"
                        outlined dense />
                </div>
                <div class="q-px-sm q-py-xs">
                    <q-input label-color="teal" outlined v-model="job_posting_payload.shift" dense
                        label="Shift Schedule" :rules="[val => val && val.length > 0 || 'This field is required.']" />
                </div>
                <div class="q-px-sm q-py-xs">
                    <q-input label-color="teal" outlined v-model="job_posting_payload.salary" dense label="Salary (Php)"
                        :rules="[val => val && val.length > 0 || 'This field is required.']" />
                </div>
                <div class="q-px-sm q-py-xs">
                    <q-select :options="pay_type_options" label-color="teal" outlined
                        v-model="job_posting_payload.salary_type" dense label="Pay type"
                        :rules="[val => val && val.length > 0 || 'This field is required.']" />
                </div>
                <div class="q-px-sm q-py-xs text-right">
                    <q-btn type="button" :to="{ name: 'job-posting-page' }" label="Cancel" class="q-mx-sm" />
                    <q-btn type="submit" :label="isUpdate ? 'Update' : 'Post'" icon="check" color="teal" />
                </div>
            </q-form>
            <app-confirm-delete-job-modal ref="confirm_delete_modal" :job_posting_id="selected_job_id" />
        </div>
    </div>
</template>

<script>
import { Notify } from 'quasar';
import ConfirmDeleteJobModal from './modals/ConfirmDeleteJobModal.vue';
export default {
    data() {
        return {
            logged_in_user: JSON.parse(localStorage.getItem('user_data') || false),
            job_posting_payload: {},

            natures_of_work_options: [],
            pay_type_options: [
                'Hourly',
                'Daily',
                'Weekly',
                'Bimonthly',
                'Monthly'
            ],

            is_loading: false,
            selected_job_id: null,
            erros: [],
        }
    },
    async mounted() {
        await this.getAllNatureOfWork();
        if (this.$route.params.id) {
            this.selected_job_id = atob(this.$route.params.id);
            this.getOne();
        }
    },
    methods: {
        async validate(evt) {
            return await this.$refs.post_job_form.validate();
        },
        async postJob() {
            if (await this.validate()) {
                let payload = this.job_posting_payload;
                payload.added_by = this.logged_in_user.user_id;
                payload.nature_of_work_id = this.job_posting_payload.nature_of_work_id.id;
                payload.status = 'active';

                this.is_loading = true;

                let endpoint = 'job_posting/create';
                if(this.isUpdate){
                    endpoint = 'job_posting/update'
                    payload.id = this.selected_job_id
                }

                let { data, status } = await this.$store.dispatch(endpoint, payload);
                if ([200, 201].includes(status)) {
                    Notify.create({
                        message: data.message,
                        position: 'top-right',
                        type: 'positive',
                        timeout: 3000,
                    });
                    this.$router.push({ name: 'job-posting-page' });
                } else {
                    this.errors = data.errors;
                    Notify.create({
                        message: data.message,
                        position: 'top-right',
                        color: 'red-8',
                        closeBtn: "X",
                        timeout: 3000,
                    })
                }

                this.is_loading = false;
            }
        },
        async getAllNatureOfWork() {
            let { data, status } = await this.$store.dispatch('nature_of_work/getAll');
            if ([200, 201].includes(status)) {
                this.natures_of_work_options = data.data;
            }
        },
        async getOne() {
            let vm = this;

            this.is_loading = true;
            let { data, status } = await this.$store.dispatch('job_posting/getOne', this.selected_job_id);

            if ([200, 201].includes(status)) {
                let res = data.data;
                this.job_posting_payload = {
                    company_name: res.company_name,
                    location: res.location,
                    title: res.title,
                    description: res.description,
                    nature_of_work_id: vm.natures_of_work_options.filter(nature => nature.id === res.nature_of_work_id)[0],
                    shift: res.shift,
                    salary: res.salary,
                    salary_type: res.salary_type,
                }

                if (this.logged_in_user.user_id != data.data.added_by) {
                    this.$router.push({ name: 'job-posting-page' });
                }
            }
            this.is_loading = false;
        },
        async deleteJob(){
            this.$refs.confirm_delete_modal.openDeleteJobModal();
        }
    },
    computed: {
        isUpdate() {
            return this.$route.params.id;
        }
    },
    components: {
        appConfirmDeleteJobModal: ConfirmDeleteJobModal,
    }
}
</script>
