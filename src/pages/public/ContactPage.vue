<template>
    <div class="q-my-xl">
        <div class="row" style="min-height: calc(100vh - 196px);">
            <div class="col-md-6" style="height: inherit; display: flex;">
                <div class="flex items-center q-px-lg" style="height: inherit;">
                    <div>
                        <div class="text-h3 text-public-primary text-bold">CPSU GRAD SCHOOL</div>
                        <div class="text-h4 text-dark text-bold">CONTACT US</div>
                        <div class="text-caption-1 q-my-lg">
                            <q-form>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="q-pa-sm">
                                            <q-input standout="bg-teal text-white" v-model="contact_payload.name" label="Name" :rules="[val => val && val.length > 0 || 'This field is required.']" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6 col-12">
                                        <div class="q-pa-sm">
                                            <q-input standout="bg-teal text-white" v-model="contact_payload.email" label="Email" :rules="[val => val && val.length > 0 || 'This field is required.']" />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6 col-12">
                                        <div class="q-pa-sm">
                                            <q-input standout="bg-teal text-white" v-model="contact_payload.phone_number" label="Phone Number" :rules="[val => val && val.length > 0 || 'This field is required.']"  />
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="q-pa-sm">
                                            <q-input standout="bg-teal text-white" type="textarea" v-model="contact_payload.message" label="Message" :rules="[val => val && val.length > 0 || 'This field is required.']" />
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="q-pa-sm">
                                            <q-btn color="teal" label="Submit" type="submit" />
                                        </div>
                                    </div>
                                </div>
                            </q-form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="flex justify-center q-px-lg">
                    <img src="~assets/home/person.png" width="100%" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                contact_payload: {
                    name: "",
                    email: "",
                    phone_number: "",
                    message: "",
                }
            }
        }
    }
</script>