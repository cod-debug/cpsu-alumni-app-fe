<template>
    <q-page class="q-pt-sm">
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
                                    <q-input outlined v-model="user_data.email" label="Email" bg-color="grey-2" rounded
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

                        <div class="q-pt-lg">
                            <strong>Credentials</strong>
                        </div>
                        <div class="flex justify-between" style="gap: 1rem;">
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
    </q-page>
</template>

<script>
import { Notify } from 'quasar';
import CustomValidationOutput from 'components/validation/CustomValidationOutput.vue'

export default {
    data: () => {
        return {
            user_data: {},
            course_list: [
                'BSIT',
                'BSHM',
                'BSMT',
                'BEED',
                'BSED'
            ],
            is_submitting: false,
            is_loading: false,
            errors: {},
            user_id: null,
        }
    },
    computed: {
        isUpdate() {
            return this.$route.params.id ? true : false;
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
        async getOneAlumni() {
            try {
                let user_id = this.$route.params.id;
                this.is_loading = true;
                let { data, status } = await this.$store.dispatch('admin/getOne', user_id);

                if ([200, 201].includes(status)) {
                    this.user_data = data.data;
                } else {
                    Notify.create({
                        message: data.message,
                        position: 'top-right',
                        color: 'red-8',
                        timeout: 3000,
                    })
                    this.$router.push({ name: 'alumni' });
                }
                this.is_loading = false;
            } catch (e) {
                console.log(e);
            }

        },

        initApp() {
            if (this.isUpdate) {
                this.getOneAlumni();
            }
        }
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