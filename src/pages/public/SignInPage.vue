<template>
    <div class="flex justify-center items-center q-pa-lg" style="min-height: calc(100vh - 196px);">
        <div style="width: 480px;">
            <div class="q-py-md">
                <div class="text-h4 text-teal">Welcome Back!</div>
                <div class="text-caption text-teal">Please sign in.</div>
            </div>
            <q-form @submit.prevent="login" greedy>
                <div class="q-py-xs" v-if="active_type == 'email'">
                    <q-input filled color="teal" v-model="login_payload.email" label="Email" :rules="[val => val && val.length > 0 || 'This field is required.']">
                        <template v-slot:prepend>
                            <q-icon name="email" />
                        </template>
                    </q-input>
                </div>
                <div class="q-py-xs" v-else>
                    <q-input filled color="teal" v-model="login_payload.phone" label="Phone" :rules="[val => val && val.length > 0 || 'This field is required.']">
                        <template v-slot:prepend>
                            <q-icon name="phone" />
                        </template>
                    </q-input>
                </div>
                <div class="q-py-xs">
                    <q-input filled :type="hide_password ? 'password' : ''" color="teal" v-model="login_payload.password" label="Password" :rules="[val => val && val.length > 0 || 'This field is required.']">
                        <template v-slot:prepend>
                            <q-icon name="lock" />
                        </template>
                        <template v-slot:append>
                            <q-btn flat class="q-pa-sm" @click="hide_password = !hide_password">
                                <q-icon :name="hide_password ? 'visibility_off' : 'visibility'" />
                            </q-btn>
                        </template>
                    </q-input>
                </div>
                <div class="q-py-sm row justify-between items-center">
                    <div class="row items-center">
                        <input type="checkbox" id="keeplogin">
                        <label for="keeplogin" class="q-ml-sm">Keep me logged in</label>
                    </div>
                    <div>
                        <a href="#" class="text-dark">Forgot Password?</a>
                    </div>
                </div>
                <div class="q-py-xs">
                    <q-btn class="custom-sign-in-btn q-py-sm" type="submit" label="Sign In" />
                </div>
                <div class="q-py-md">
                    <div class="flex justify-between" style="gap: 1rem;">
                        <div style="flex-grow: 1;" class="flex items-center justify-center">
                            <hr style="width: 100%;border: .1px solid #DEDEDE" />
                        </div>
                        <div class="text-teal">
                            or continue with
                        </div>
                        <div style="flex-grow: 1;" class="flex items-center justify-center">
                            <hr style="width: 100%;border: .1px solid #DEDEDE" />
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex justify-between" style="gap: .5rem;">
                        <q-btn type="button" @click="active_type='email'" class="custom-phone-btn q-py-sm" style="flex-grow: 1;" label="Phone Number" icon="locale_phone_outlined" />
                        <q-btn type="button" @click="active_type='phone'" class="custom-email-btn q-py-sm" style="flex-grow: 1;" label="Email Address" icon="email"/>
                    </div>
                </div>
                <div class="text-center q-py-md">
                    <span class="text-green-10">Don't have an account yet?</span>
                    &nbsp;
                    <a href="#" class="text-teal">Sign Up</a>
                </div>
            </q-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                login_payload: {
                    email: "",
                    password: "",

                },
                active_type: "email",
                hide_password: true,
            }
        }, 
        methods: {
            async login() {

            }
        }
    }
</script>