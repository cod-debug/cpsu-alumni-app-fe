<template>
    <div class="flex justify-center items-center" style="min-height: 100vh;">
        <q-card style="width: 500px; max-width: 90%;" class="">
            <q-card-section>
                <q-form greed @submit.prevent="submit">
                    <div class="text-center q-mt-lg">
                        <img alt="Quasar logo" src="~assets/logo.png" style="width: 60px;">
                        <div class="text-h5 text-bold text-green-9">CPSU GRADUATE SCHOOL ALUMNI</div>
                        <div class="text-caption text-grey-8">Create new password for security</div>
                    </div>
                    <q-input label="New Password" outlined class="q-my-sm" v-model="new_password"
                        :rules="[
                            val => val && val.length > 0 || 'Password is required',
                            val => val && is_8_char_length(val) || 'Password must be at least 8 characters',
                            val => val && has_uppercase(val) || 'Password must be at least 1 uppercase letter',
                            val => val && has_lowercase(val) || 'Password must be at least 1 lowercase letter',
                            val => val && has_number(val) || 'Password must be at least 1 number',
                            val => val && has_special_char(val) || 'Password must be at least 1 special character',
                        ]"
                        :type="show_password ? 'text-pass' : 'password'"
                    >
                        <template v-slot:append>
                            <q-icon
                                :name="show_password ? 'visibility' : 'visibility_off'"
                                class="cursor-pointer"
                                @click="show_hide_password('password')"
                            />
                        </template>
                    </q-input>

                    <q-input label="Confirm New Password" outlined class="q-mt-sm" v-model="confirm_password"
                        :rules="[
                            val => val && val.length > 0 || 'Password is required',
                            val => val === new_password || 'Password not match',
                        ]"
                        type="password" 
                    />

                        <ul class="password-requirements q-mb-md q-mt-sm">
                        <li
                        :class="`${is_8_char_length(new_password || '') ? 'pass' : 'failed'}`"
                        >
                        Password must be at least 8 characters in length
                        </li>
                        <li
                        :class="`${has_uppercase(new_password || '') ? 'pass' : 'failed'}`"
                        >
                        Password must contain a minimum of 1 upper case letter [A-Z]
                        </li>
                        <li
                        :class="`${has_lowercase(new_password || '') ? 'pass' : 'failed'}`"
                        >
                        Password must contain a minimum of 1 lower case letter [a-z]
                        </li>
                        <li
                        :class="`${has_number(new_password || '') ? 'pass' : 'failed'}`"
                        >
                        Password must contain a minimum of 1 numeric character [0-9]
                        </li>
                        <li
                        :class="`${has_special_char(new_password || '') ? 'pass' : 'failed'}`"
                        >
                        Password must contain a minimum of 1 special character
                        </li>
                    </ul>

                    <q-btn label="submit" type="submit" rounded style="width: 100%;" class="custom-sign-in-btn" />
                </q-form>
            </q-card-section>
        </q-card>
    </div>
</template>
<script>
import { Notify } from 'quasar';
export default {
    data: () => {
        return {
            new_password: "",
            confirm_password: "",
            show_password: false,
            show_confirm_password: false,
            user_data: JSON.parse(localStorage.getItem('user_data')),
            is_loading: false,
        }
    },
    methods: {
        async submit(){
            console.log(this.user_data.user_id);
            let payload = {
                user_id: this.user_data.user_id,
                password: this.new_password
            }

            this.is_loading = true;
            let { data, status } = await this.$store.dispatch('alumni_public/changePasswordRequired', payload);

            if ([200, 201].includes(status)) {
                Notify.create({
                    message: data.message,
                    position: 'top-right',
                    type: 'positive',
                    timeout: 3000,
                });
                window.location.href="/";
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
        },
        is_8_char_length(val) {
            return val && val.length >= 8;
        },

        has_special_char(val) {
            return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val)
        },

        has_number(val) {
            return /[0-9]/.test(val)
        },

        has_uppercase(val) {
            return /[A-Z]/.test(val)
        },

        has_lowercase(val) {
            return /[a-z]/.test(val)
        },

        match_password() {
            let password = this.new_password || "";
            let confirm_password = this.confirm_password || "";

            if (password.length <= 0 || confirm_password.length <= 0) return;

            if (password === confirm_password) {
                this.$emit('update:allow_action', true);
            }
            else {
                this.$emit('update:allow_action', false);
            }
        },

        show_hide_password(type) {
            if (type === 'password') {
                this.show_password = !this.show_password;
            }
            else if (type === 'confirm_password') {
                this.show_confirm_password = !this.show_confirm_password;
            } else if (type === 'old_password') {
                this.show_old_password = !this.show_old_password;
            }
        },
    }
}
</script>