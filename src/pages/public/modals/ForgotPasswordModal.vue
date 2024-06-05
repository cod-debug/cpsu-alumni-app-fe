<template>
    <div>
        <q-dialog
            v-model="forgot_password_modal"
            >
                <q-card style="width: 400px; max-width: 90%;">
                    <q-form @submit.prevent="submitForgotPassword" greedy>
                        <q-card-section class="bg-primary text-white">
                            <div class="text-h6">Forgot Password</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <q-card square class="q-my-sm">
                                <q-card-section>
                                    <div class="text-bold text-orange-4"><q-icon name="warning" /> Note:</div>
                                    <div class="text-grey-7">
                                        <ol>
                                            <li>Forget password using email</li>
                                            <li>A new password will be given via email</li>
                                            <li>On the next login you will be required to change your password</li>
                                        </ol>
                                    </div>
                                </q-card-section>
                            </q-card>
                            <q-input v-model="email" outlined :disable="is_loading" label="Email Address" dense class="q-my-md" :rules="[val => val && val.length > 0 || 'This field is required.']" />
                        </q-card-section>
                        <q-separator />
                        <q-card-actions align="right" class="bg-white text-teal">
                            <q-btn flat label="Cancel" v-close-popup />
                            <q-btn label="Confirm" @click="submitForgotPassword" :disable="is_loading" color="teal" type="submit"/>
                        </q-card-actions>
                    </q-form>
                </q-card>
        </q-dialog>
    </div>
</template>

<script>
    import { Notify } from 'quasar';
    export default {
        data: () => {
            return {
                forgot_password_modal: false,
                email: "",
                is_loading: false,
            }
        },
        methods: {
            openForgotPasswordModal(){
                this.forgot_password_modal = true;
            },
            async submitForgotPassword(){
                let payload = {
                    email: this.email
                }

                this.is_loading = true;
                let {data, status} = await this.$store.dispatch('alumni_public/forgotPassword', payload);

                if([200, 201].includes(status)){
                    Notify.create({
                        message: data.message,
                        position: 'top-right',
                        type: 'positive',
                        timeout: 3000,
                    });
                }
                this.is_loading = false;
            },
        },
    }
</script>