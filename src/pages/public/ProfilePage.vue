<template>
    <div>
        <div style="background-color: transparent; width: 720px; max-width: 90%; margin: auto;">
            <q-card-section class="q-px-xl">
                <q-form @submit.prevent="submitForm">
                    <div>
                        <strong>Personal Information</strong>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-sm-12 q-pr-sm">
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
                        <div class="col-md-6 col-sm-12 q-pl-sm">
                            <div class="q-py-sm">
                                <q-input outlined v-model="user_data.street" label="Street" bg-color="grey-2"
                                    rounded dense />
                                <app-validation-output property="street" :errors="errors" />
                            </div>
                            <div class="q-py-sm">
                                <q-input outlined v-model="user_data.barangay" label="Barangay" bg-color="grey-2"
                                    rounded dense />
                                <app-validation-output property="barangay" :errors="errors" />
                            </div>
                            <div class="q-py-sm">
                                <q-input outlined v-model="user_data.municipality" label="Municipality / City"
                                    bg-color="grey-2" rounded dense />
                                <app-validation-output property="municipality" :errors="errors" />
                            </div>
                            <div class="q-py-sm">
                                <q-input outlined v-model="user_data.province" label="Province" bg-color="grey-2"
                                    rounded dense />
                                <app-validation-output property="province" :errors="errors" />
                            </div>
                            <div class="q-py-sm">
                                <q-input outlined v-model="user_data.zip_code" label="Zip Code" bg-color="grey-2"
                                    rounded dense />
                                <app-validation-output property="zip_code" :errors="errors" />
                            </div>
                            <div class="q-py-sm" v-if="!isUpdate">
                                <q-input outlined v-model="user_data.email" label="Email" bg-color="grey-2" rounded
                                    dense />
                                <app-validation-output property="email" :errors="errors" />
                            </div>
                        </div>
                    </div>

                    <div class="q-pt-lg">
                        <strong>Educational and Work</strong>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-sm-12 q-pr-sm">
                            <div class="q-py-sm">
                                <q-select outlined v-model="user_data.course_id"
                                    option-label="course_name"
                                    option-value="id" 
                                    label="Course" 
                                    bg-color="grey-2"
                                    :options="course_list" rounded dense />
                                <app-validation-output property="course" :errors="errors" />
                            </div>
                            <div class="q-py-sm">
                                <q-input outlined v-model="user_data.work" label="Work" bg-color="grey-2" rounded
                                    dense />
                                <app-validation-output property="work" :errors="errors" />
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12 q-pr-sm">
                            <div class="q-py-sm">
                                <q-select :options="years" @filter="filterFn" use-input outlined v-model="user_data.year_graduated" label="Year Graduated"
                                    bg-color="grey-2" rounded dense />
                                <app-validation-output property="year_graduated" :errors="errors" />
                            </div>
                            <div class="q-py-sm">
                                <q-input v-if="user_data.work" outlined v-model="user_data.work_location"
                                    label="Location" bg-color="grey-2" rounded dense />
                                <app-validation-output property="work_location" :errors="errors" />
                            </div>
                        </div>
                    </div>
                    <div class="row items-center">
                        <div class="col-md-6 col-sm-12 q-pr-sm">
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
                        <div class="col-md-6 col-sm-12 q-pr-sm">
                            <div class="q-py-sm text-right">
                                <q-btn color="secondary" label="Save" rounded class="q-px-lg q-py-sm"
                                    type="submit" />
                            </div>
                        </div>
                    </div>
                    <q-inner-loading :showing="is_submitting || is_loading" label="Please wait..."
                        label-class="text-teal" label-style="font-size: 1.1em" />
                </q-form>
            </q-card-section>
        </div>
    </div>
</template>

<script>
import { Notify } from 'quasar';
import CustomValidationOutput from 'components/validation/CustomValidationOutput.vue'

export default {
    data: () => {
        return {
            user_data: {},
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
            auth_user: JSON.parse(localStorage.getItem('user_data')),
            years: [],
            years_unfiltered: [],
        }
    },
    computed: {
        isUpdate() {
            return true;
        }
    },
    methods: {
        async submitForm() {
            try {
                this.user_data.employment_status = this.user_data.work ? "employed" : "unemployed";
                this.user_data.course_id = this.user_data.course_id.id;
                let formData = this.$helper.jsonToFormData(this.user_data);
                this.is_submitting = true;
                let endpoint = 'alumni/registerAlumni';

                if (this.isUpdate) {
                    endpoint = 'alumni/updateAlumni';
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
                    this.is_submitting = false;
                
                    this.user_data.course_id = this.course_list.filter((i) => {
                        return i.id == this.user_data.course_id;
                    })[0];
                } else {
                    console.log(data);
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
        async getOneAlumni() {
            try {
                let user_id = this.auth_user.user_id;
                this.is_loading = true;
                let { data, status } = await this.$store.dispatch('alumni/getOne', user_id);

                if ([200, 201].includes(status)) {
                    this.user_data = data.data;
                } else {
                    Notify.create({
                        message: data.message,
                        position: 'top-right',
                        color: 'red-8',
                        timeout: 3000,
                    })
                }
                this.is_loading = false;
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
                
                this.user_data.course_id = data.data.data.filter((i) => {
                    return i.id == this.user_data.course_id;
                })[0];
                
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

            let current_year = new Date().getFullYear();
            let limit = current_year - 100;
            for(var i = current_year; limit <= i; i--){
                this.years.push(i)
                this.years_unfiltered.push(i)
            }
        },
        filterFn (val, update) {
            let vm = this;
            if (val === '') {
                update(() => {
                    vm.years = vm.years_unfiltered
                })
                return
            }

            update(() => {
                const needle = val.toLowerCase()
                vm.years = vm.years_unfiltered.filter(v => v.toString().toLowerCase().indexOf(needle) > -1)
            })
        }
    },

    mounted() {
        let vm = this;

        vm.getCourseList();
        if (!this.isUpdate) {
            document.getElementById('avatarLogo').addEventListener('change', function (event) {
                const file = event.target.files[0];
                const reader = new FileReader();

                reader.onload = function (e) {
                    document.getElementById('previewImg').src = e.target.result;
                }
                reader.readAsDataURL(file);
                vm.user_data.avatar = file;
            });
        }
        vm.initApp();
    },

    components: {
        AppValidationOutput: CustomValidationOutput,
    }
}
</script>