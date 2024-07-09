<template>
    <div>
        <q-dialog
            v-model="confirm_delete_post"
            >
                <q-card style="width: 400px; max-width: 90%;">
                    <q-card-section class="bg-red-12 text-white">
                        <div class="text-h6">Confirmation</div>
                    </q-card-section>

                    <q-card-section class="q-pt-md">
                        <div class="text-bold text-red-4"><q-icon name="warning" /> Are you sure you want to delete this job posting?</div>
                    </q-card-section>
                    <q-separator />
                    <q-card-actions align="right" class="bg-white text-teal">
                        <q-btn flat label="Cancel" v-close-popup />
                        <q-btn label="Confirm" @click="confirmDelete" :disable="is_loading" color="red-12" type="submit"/>
                    </q-card-actions>
                </q-card>
        </q-dialog>
    </div>
</template>

<script>
    import { Notify } from 'quasar';
    export default {
        props: {
            job_posting_id: Number,
        },
        data: () => {
            return {
                confirm_delete_post: false,
                is_loading: false,
            }
        },
        methods: {
            openDeleteJobModal(){
                this.confirm_delete_post = true;
            },
            async confirmDelete(){
                let payload = {
                    id: this.job_posting_id
                }

                this.is_loading = true;

                let {data, status} = await this.$store.dispatch('job_posting/remove', payload);
                if([200, 201].includes(status)){
                    Notify.create({
                        message: data.message,
                        position: 'top-right',
                        type: 'positive',
                        timeout: 3000,
                    });
                    this.$router.push({ name: 'job-posting-page' });
                } else {
                    Notify.create({
                        message: data.message,
                        position: 'top-right',
                        type: 'negative',
                        timeout: 3000,
                    });
                }
                this.is_loading = false;
            }
        },
    }
</script>