<template>
    <div class="q-pb-lg">
        <div class="row">
            <div class="col-md-8 q-pr-sm">
                <q-card>
                    <q-card-section>
                        <div class="row">
                            <div class="col-md-6">
                                
                                <div class="q-pr-md">
                                    <q-form @submit.prevent="submitSearch">
                                        <q-input dense rounded outlined v-model="search" label="Search" bg-color="white">
                                            <template v-slot:prepend>
                                                <q-icon name="search" />
                                            </template>
                                        </q-input>
                                    </q-form>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="q-pl-md flex justify-end">
                                    <q-select :options="['All', 'Active', 'Inactive']"  dense rounded outlined v-model="selected_status" style="width: 200px;" />
                                </div>
                            </div>
                        </div>
                        <div class="q-my-md">
                            <q-table flat bordered 
                                :rows="nature_of_work_table.rows" 
                                :columns="nature_of_work_table.columns"
                                class="sticky-last-column"
                                no-data-label="No natures of work found."
                                no-results-label="The filter didn't uncover any results"
                                :rows-per-page-options="[nature_of_work_table.limit]">
                                <template #body="props">
                                    <q-tr :props="props">
                                        <q-td key="nature_of_work" :props="props">
                                            <div class="flex items-center" style="gap: .25rem;">
                                                <q-icon name="fiber_manual_record" :color="props.row.status === 'active' ? 'green-14' : 'red-14'">
                                                    <q-tooltip>{{ props.row.status.toUpperCase() }}</q-tooltip>
                                                </q-icon>
                                                <span>{{ props.row.nature_of_work }}</span>
                                            </div>
                                        </q-td>
                                        <q-td key="action" :props="props">
                                            <q-btn label="Edit" @click="updateNatureOfWork(props.row)" color="primary" rounded size="sm" dense class="q-px-lg" />
                                        </q-td>
                                    </q-tr>
                                </template>

                                <template v-slot:no-data="{ message }">
                                    <div class="full-width row flex-center text-grey-7 q-gutter-sm">
                                        <span>{{ message }}</span>
                                    </div>
                                </template>
                            </q-table>


                            <div class="text-right q-mt-md row justify-between items-center"
                                v-if="nature_of_work_table.max_page > 0">
                                <div class="text-caption text-grey-9">
                                    Showing {{ nature_of_work_table.from }} to {{ nature_of_work_table.to }} of {{ nature_of_work_table.total }}
                                </div>
                                <q-pagination v-model="nature_of_work_table.current_page" @update:model-value="getList()"
                                    :max="nature_of_work_table.max_page" direction-links flat color="grey" :max-pages="5"
                                    active-color="primary" />
                            </div>
                        </div>
                        <q-inner-loading :showing="is_loading_table" label="Please wait..." label-class="text-teal"
                            label-style="font-size: 1.1em" />
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-md-4 q-pl-sm">
                <q-card>
                    <q-card-section>
                        <div>{{ is_update ? 'Update' : 'Add' }} Nature of work</div>
                        <q-form @submit.prevent="create">
                            <div class="q-pt-md">
                                <q-input outlined v-model="nature_of_work_data.nature_of_work" label="Nature of work" bg-color="grey-2"
                                    rounded dense type="text" />
                                <app-validation-output property="nature_of_work" :errors="errors" />
                            </div>
                            <div class="q-pt-sm">
                                <q-toggle v-model="nature_of_work_data.status" true-value="active" false-value="inactive" v-if="is_update" />
                            </div>
                            <div class="q-pt-sm q-pb-md text-right">
                                <q-btn color="dark" label="Cancel" rounded class="q-px-lg q-py-sm q-mr-sm"
                                    type="button" @click="cancel" v-if="is_update" />
                                <q-btn color="secondary" label="Save" rounded class="q-px-lg q-py-sm"
                                    type="submit" />
                            </div>
                        </q-form>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script>

import { Notify } from 'quasar';
import CustomValidationOutput from 'components/validation/CustomValidationOutput.vue'

export default {
    data: () => {
        return {
            auth_user: JSON.parse(localStorage.getItem('user_data')),
            search: "",
            is_loading_table: false,
            is_submitting: false,
            is_update: false,
            selected_status: 'All',
            nature_of_work_data: {
                status: 'active'
            },
            errors: [],
            nature_of_work_table: {
                limit: 5,
                current_page: 1,
                max_page: 0,
                from: 0,
                to: 0,
                total: 0,
                columns: [
                    { name: 'nature_of_work', align: 'left', label: 'Nature of Work' },
                    { name: 'action', align: 'right', label: 'Action' },
                ],
                rows: []
            }

        }
    },

    methods: {
        async getList() {
            this.is_loading_table = true;
            const payload = {
                page: this.nature_of_work_table.current_page,
                limit: this.nature_of_work_table.limit,
                search: this.search,
                status: this.selected_status.toLowerCase()
            }

            let { data, status } = await this.$store.dispatch('nature_of_work/getPaginated', payload);

            if ([200, 201].includes(status)) {
                this.nature_of_work_table.rows = data.data.data;
                this.nature_of_work_table.max_page = data.data.last_page;
                this.nature_of_work_table.from = data.data.from;
                this.nature_of_work_table.to = data.data.to;
                this.nature_of_work_table.total = data.data.total;
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

        async submitSearch() {
            this.nature_of_work_table.current_page = 1;
            this.getList();
        },

        async create(){
            let payload = {...this.nature_of_work_data, added_by: this.auth_user.user_id};
            let endpoint = 'nature_of_work/create';

            
            if(this.is_update){
                endpoint = 'nature_of_work/update'
                payload.status = this.nature_of_work_data.status;
            }

            this.is_submitting = true;
            let {data, status} = await this.$store.dispatch(endpoint, payload);
            if([200, 201].includes(status)){
                Notify.create({
                    message: data.message,
                    position: 'top-right',
                    type: 'positive',
                    timeout: 3000,
                });

                if(this.is_update){
                    this.is_update = false;
                }

                this.getList();
                this.errors = {};
                this.nature_of_work_data.nature_of_work = "";
            } else {
                this.errors = data.errors;
                Notify.create({
                    message: data.message,
                    position: 'top-right',
                    color: 'red-8',
                    closeBtn: "X",
                    timeout: 3000,
                });
            }
            this.is_submitting = false;
        },
        async updateNatureOfWork(item){
            this.nature_of_work_data={
                id: item.id,
                nature_of_work: item.nature_of_work,
                status: item.status,
            }
            this.is_update = true;
        },
        cancel(){
            this.nature_of_work_data = {nature_of_work: ''};
            this.is_update = false;
        },
        saved(){
            this.getList();
            this.selected_user = {};
            this.is_update = false;
        },
        initApp() {
            this.getList();
        },
    },

    mounted() {
        this.initApp();
    },
    components: {
        AppValidationOutput: CustomValidationOutput,
    },
    watch:{
        selected_status(n){
            if(n){
                this.submitSearch();
            }
        }
    },
}
</script>