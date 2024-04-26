<template>
    <div class="q-my-md">
        <q-card>
            <q-card-section>
                <div class="row justify-between">
                    <div class="text-h6">{{ isUpdate ? 'Update' : 'Add New' }} User Form</div>
                </div>
            </q-card-section>
            <q-card-section class="q-px-xl">
                <q-form @submit.prevent="submitForm">
                    <div>
                        <strong>Personal Information</strong>
                    </div>
                    <div class="flex justify-between" style="gap: 1rem;">
                        <div style="flex-grow: 1;">
                            <div class="q-py-sm">
                                <q-input outlined v-model="user_data.last_name" label="Last Name" bg-color="grey-2"
                                    rounded dense />
                                <app-validation-output property="last_name" :errors="errors" />
                            </div>
                            <div class="q-py-sm">
                                <q-input outlined v-model="user_data.first_name" label="First Name"
                                    bg-color="grey-2" rounded dense />
                                <app-validation-output property="first_name" :errors="errors" />
                            </div>
                            <div class="q-py-sm">
                                <q-input outlined v-model="user_data.middle_name" label="Middle Name"
                                    bg-color="grey-2" rounded dense />
                                <app-validation-output property="middle_name" :errors="errors" />
                            </div>
                            <div class="q-py-sm">
                                <q-input outlined v-model="user_data.email" :disable="is_update" label="Email" bg-color="grey-2" rounded
                                    dense />
                                <app-validation-output property="email" :errors="errors" />
                            </div>
                        </div>
                        <div style="flex-grow: 1;">
                            <div class="q-py-sm">
                                <q-select outlined v-model="user_data.gender" label="Gender" bg-color="grey-2"
                                    :options="['Male', 'Female']" rounded dense />
                                <app-validation-output property="gender" :errors="errors" />
                            </div>
                            <div class="q-py-sm">
                                <q-input outlined v-model="user_data.birthdate" label="Birthdate" stack-label
                                    type="date" bg-color="grey-2" rounded dense />
                                <app-validation-output property="birthdate" :errors="errors" />
                            </div>
                            <div class="q-py-sm">
                                <q-input outlined v-model="user_data.contact_number" label="Contact Number"
                                    bg-color="grey-2" rounded dense />
                                <app-validation-output property="contact_number" :errors="errors" />
                            </div>
                        </div>
                    </div>

                    <div class="q-pt-lg" v-if="!is_update">
                        <strong>Credentials</strong>
                    </div>
                    <div class="flex justify-between" style="gap: 1rem;" v-if="!is_update">
                        <div style="flex-grow: 1;">
                            <div class="q-py-sm">
                                <q-input outlined v-model="user_data.username" label="Username" bg-color="grey-2"
                                    rounded dense />
                                <app-validation-output property="username" :errors="errors" />
                            </div>
                            <div class="q-py-sm">
                                <q-input outlined v-model="user_data.password" label="Password" bg-color="grey-2"
                                    rounded dense type="password" />
                                <app-validation-output property="password" :errors="errors" />
                            </div>
                        </div>
                        <div style="flex-grow: 1;">
                            <div class="q-py-sm">
                                <div class="flex justify-center items-center" v-if="!isUpdate">
                                    <div class="form-avatar-holder">
                                        <img src="~assets/images/avatar-placeholder.png" id="previewImg" />
                                    </div>
                                    <div class="q-px-md">
                                        <div class="select-photo-button text-center">
                                            <label for="avatarLogo">
                                                <span class="text-grey-6">Select Photo</span>
                                                <br />
                                                <div type="button" rounded dense color="primary"
                                                    class="upload-photo-btn">
                                                    Upload Photo
                                                </div>
                                            </label>
                                            <input type="file" accept="image/*" style="display: none;"
                                                id="avatarLogo" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row items-center">
                        <div class="col-md-6 col-sm-12 q-pr-sm">
                        </div>
                        <div class="col-md-6 col-sm-12 q-pr-sm">
                            <div class="q-py-sm text-right">
                                <q-btn color="dark" label="Cancel" rounded class="q-px-lg q-py-sm q-mr-sm"
                                    type="button" @click="cancel" />
                                <q-btn color="secondary" label="Save" rounded class="q-px-lg q-py-sm"
                                    type="submit" />
                            </div>
                        </div>
                    </div>
                    <q-inner-loading :showing="is_submitting || is_loading" label="Please wait..."
                        label-class="text-teal" label-style="font-size: 1.1em" />
                </q-form>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import { Notify } from 'quasar';
import CustomValidationOutput from 'components/validation/CustomValidationOutput.vue'

export default {
    props: {
        selected_user: Object,
        is_update: Boolean,
    },
    data: () => {
        return {
            is_loading_courses: false,
            user_data: {
                "last_name": "",
            },
            is_submitting: false,
            is_loading: false,
            errors: {},
            user_id: null,
            course_list_payload: {
                limit: 10000,
                current_page: 1,
                status: 'active'
            },
            course_list: [],
        }
    },
    computed: {
        isUpdate() {
            return this.is_update;
        }
    },
    methods: {
        async submitForm() {
            try {
                this.user_data.employment_status = this.user_data.work ? "employed" : "unemployed";
                let formData = this.$helper.jsonToFormData(this.user_data);
                this.is_submitting = true;
                let endpoint = 'admin/registerAdmin';

                if (this.isUpdate) {
                    endpoint = 'admin/updateAdmin';
                    formData = this.user_data;
                }

                let { data, status } = await this.$store.dispatch(endpoint, formData);

                if ([200, 201].includes(status)) {
                    Notify.create({
                        message: data.message,
                        position: 'top-right',
                        type: 'positive',
                        timeout: 3000,
                    });
                    this.user_data = {};
                    this.errors = {};
                    this.$emit('saved');
                    this.is_submitting = false;
                } else {
                    this.errors = data.errors;
                    Notify.create({
                        message: data.message,
                        position: 'top-right',
                        color: 'red-8',
                        closeBtn: "X",
                        timeout: 3000,
                    })
                    this.is_submitting = false;
                }
            } catch (e) {
                console.log(e);
            }

        },

        async getCourseList() {
            this.is_loading_courses = true;
            const payload = {
                page: this.course_list_payload.current_page,
                limit: this.course_list_payload.limit,
                search: "",
                status: this.course_list_payload.status.toLowerCase()
            }

            let { data, status } = await this.$store.dispatch('course/getPaginated', payload);

            if ([200, 201].includes(status)) {
                this.course_list = data.data.data;
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

            this.is_loading_courses = false;
        },

        initApp() {
            this.getCourseList();
            if (this.isUpdate) {
                this.getOneAlumni();
            }
        },
        cancel(){
            this.user_data = {};
            this.$emit('cancelled');

        },
    },

    mounted() {
        let vm = this;

        // gn butang ko lang para di kapoy mag type while ga test haha
        // vm.user_data = {
        //     "first_name": "Roy",
        //     "middle_name": "Gualdrapa",
        //     "last_name": "Duenas",
        //     "gender": "Male",
        //     "birthdate": "1999-6-13",
        //     "contact_number": "+639633205624"
        //     "email": "quensed@gmail.com",
        //     "course": "BSIT",
        //     "year_graduated": "2019",
        //     "employment_status": "employed",
        //     "work": "Web Developer",
        //     "work_location": "Ingenuiti",
        //     "avatar": "",
        //     "status": "active"
        // }

        vm.initApp();
    },
    updated(){
        if (this.isUpdate) {
            this.user_data = this.selected_user;
        }
    },
    components: {
        AppValidationOutput: CustomValidationOutput,
    }
}
</script>