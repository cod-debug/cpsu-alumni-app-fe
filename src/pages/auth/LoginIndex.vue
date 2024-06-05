<template>
    <q-page>
        <div class="row text-white" style="height: 100vh;">
            <div class="col-md-6 col-sm-12 row justify-center items-center q-pa-md bg-white mobile-hide">
                <div style="width: 90%;">
                    <img alt="Quasar logo" src="~assets/images/login-image.png" style="width: 100%;">
                </div>
            </div>
            <div class="col-md-6 col-sm-12 col-12 bg-primary q-pa-md row justify-center items-center" style="max-width: 100%;">
                <div style="width: 400px; max-width: 100%; box-sizing: border-box;">
                    <div class="text-center">
                        <img alt="Quasar logo" src="~assets/logo.png" style="width: 120px;">
                        <div class="text-h5"><strong>CPSU Graduate School</strong></div>
                    </div>
                    <div class="q-py-lg">
                    
                    <q-inner-loading
                            :showing="is_loading"
                            label="Please wait..."
                            label-class="text-teal"
                            label-style="font-size: 1.1em"
                        />
                        <q-form @submit.prevent="submitLogin">
                            <div class="q-py-md">
                                <q-input outlined v-model="email" label="Email" bg-color="white" />
                                <div v-if="errors && errors.email">
                                    <label class="text-red-2 text-caption" v-for="(error, key) in errors.email"
                                        :key="key">{{ error }}</label>
                                </div>
                            </div>
                            <div class="q-py-md">
                                <q-input outlined v-model="password" label="Password" bg-color="white"
                                    type="password" />
                            </div>
                            <div class="q-py-sm row justify-between items-center">
                                <div class="row items-center">
                                    <input type="checkbox" id="keeplogin">
                                    <label for="keeplogin" class="q-ml-sm">Keep me logged in</label>
                                </div>
                                <div>
                                    <a href="#" class="text-white">Forgot Password?</a>
                                </div>
                            </div>
                            <div class="q-py-md">
                                <q-btn type="submit" :disabled="is_loading" label="Login" color="secondary" style="width: 100%;" />
                            </div>
                            <div class="row justify-between q-py-md">
                                <span>Don't have an account yet?</span>
                                <a href="#" class="text-white">Sign Up</a>
                            </div>
                        </q-form>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import { Notify } from 'quasar';

export default {
    data: () => {
        return {
            is_loading: false,
            email: "",
            password: "",
            errors: null,
        }
    },
    methods: {
        async submitLogin() {
            let payload = {
                email: this.email,
                password: this.password
            }

            this.is_loading = true;
            let { data, status } = await this.$store.dispatch('auth/login', payload);

            if ([200, 201].includes(status)) {
                Notify.create({
                    message: data.message,
                    position: 'top-right',
                    type: 'positive',
                    timeout: 3000,
                });
                localStorage.setItem('user_data', JSON.stringify(data.data));
                localStorage.setItem('token', data.token);
                this.$router.push({ name: "dashboard" })
                this.errors = null;
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
    }
}
</script>