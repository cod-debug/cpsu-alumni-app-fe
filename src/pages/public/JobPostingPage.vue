<template>
    <div class="q-my-lg">
        <div class="custom-container">
            <div class="text-right q-mb-md" v-if="logged_in_user">
                <q-btn type="button" :to="{ name: 'job-posting-add-page' }" icon="add" label="Post a job"
                    color="blue-4" />
            </div>
            <q-form class="shadow-2 q-pa-md q-pt-lg row bg-white" @submit.prevent="submitSearch" ref="search_form">
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
                    <q-select :options="natures_of_work_options" option-label="nature_of_work"
                        label-color="teal" v-model="nature_of_work_id" label="Nature of work" outlined />
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
                    <q-input color="grey-3" label-color="teal" outlined v-model="search_keyword" label="Search Job">
                        <template v-slot:append>
                            <q-btn flat type="submit" @click="submitSearch">
                                <q-icon name="search" color="teal" class="cursor-pointer" />
                            </q-btn>
                        </template>
                    </q-input>
                </div>
            </q-form>
        </div>
        <div class="custom-container">
            <q-card class="q-my-lg">
                <q-inner-loading :showing="is_loading_table" label="Please wait..." label-class="text-teal"
                    label-style="font-size: 1.1em" />
                <q-card-section>
                    <div class="text-h5">
                        Jobs Posted by Alumni
                    </div>
                </q-card-section>
                <q-separator />
                <q-card-section v-if="job_table.rows.length > 0">
                    <div v-for="(job, job_key) in job_table.rows" :key="job_key" class="q-mb-sm">
                        <q-expansion-item>
                            <template v-slot:header>
                                <q-item-section>
                                    <div class="text-teal text-h6">{{ job.title }}</div>
                                </q-item-section>

                                <q-item-section side>
                                    <div>
                                        <q-icon name="location_city" />
                                        <span class="q-ml-sm">{{ job.company_name }}</span>
                                    </div>
                                </q-item-section>
                            </template>
                            <q-separator />
                            <q-card>
                                <q-card-section>
                                    <div v-if="isOwned(job.added_by)" class="text-right relative">
                                        <q-btn icon="edit" dense class="absolute q-px-sm" @click="editJob(job.id)"
                                            style="top: 10px; right: 10px;" color="grey-9">
                                            <q-tooltip>Edit job details</q-tooltip>
                                        </q-btn>
                                    </div>
                                    <div v-if="job.description" class="q-pb-md text-grey-9 q-pr-xl">
                                        <span v-html="job.description.replaceAll('\n', '<br />')"></span>
                                    </div>
                                    <div v-if="job.location" class="text-grey-8">
                                        <q-icon name="place"></q-icon>
                                        <span class="q-px-xs">{{ job.location }}</span>
                                    </div>
                                    <div v-if="job.salary" class="text-grey-8">
                                        <q-icon name="payments"></q-icon>
                                        <span class="q-px-xs">{{ job.salary }} ({{ job.salary_type }})</span>
                                    </div>
                                </q-card-section>
                            </q-card>
                        </q-expansion-item>
                        <q-separator />
                    </div>
                    


                    <div class="text-right q-mt-md row justify-between items-center"
                        v-if="job_table.max_page > 0">
                        <div class="text-caption text-grey-9">
                            Showing {{ job_table.from }} to {{ job_table.to }} of {{ job_table.total }}
                        </div>
                        <q-pagination v-model="job_table.current_page" @update:model-value="getList()"
                            :max="job_table.max_page" direction-links flat color="grey"
                            :max-pages="5"
                            active-color="primary" />
                    </div>
                </q-card-section>
                <q-card-section v-else>
                    <div>No jobs found.</div>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            logged_in_user: JSON.parse(localStorage.getItem('user_data') || false),
            search_keyword: "",
            nature_of_work_id: null,
            natures_of_work_options: [],

            is_loading_table: false,
            job_table: {
                limit: 5,
                current_page: 1,
                max_page: 0,
                from: 0,
                to: 0,
                total: 0,
                columns: [
                    { name: 'course_name', align: 'left', label: 'Course Name' },
                    { name: 'action', align: 'right', label: 'Action' },
                ],
                rows: []
            },
            selected_status: 'active',
        }
    },
    mounted() {
        this.getAllNatureOfWork();
        this.getList();
    },
    methods: {
        async validate(evt) {
            return await this.$refs.search_form.validate();
        },
        async submitSearch() {
            if (await this.validate()) {
                this.getList();
            }
        },

        async getList() {
            this.is_loading_table = true;
            const payload = {
                page: this.job_table.current_page,
                limit: this.job_table.limit,
                search: this.search_keyword,
                nature_of_work: this.nature_of_work_id ? this.nature_of_work_id.id : null,
                status: this.selected_status.toLowerCase()
            }

            let { data, status } = await this.$store.dispatch('job_posting/getPaginated', payload);

            if ([200, 201].includes(status)) {
                this.job_table.rows = data.data.data;
                this.job_table.max_page = data.data.last_page;
                this.job_table.from = data.data.from;
                this.job_table.to = data.data.to;
                this.job_table.total = data.data.total;
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
            this.is_loading_table = false;
        },

        async editJob(id) {
            this.$router.push({ name: 'job-posting-update-page', params: { id: btoa(id) } });
        },

        async getAllNatureOfWork() {
            let { data, status } = await this.$store.dispatch('nature_of_work/getAll');
            if ([200, 201].includes(status)) {
                this.natures_of_work_options = [{ id: null, nature_of_work: 'All' }, ...data.data];
            }
        },
        isOwned(user_id) {
            return this.logged_in_user ? (this.logged_in_user.user_id === user_id) : false;
        }
    },
}
</script>
