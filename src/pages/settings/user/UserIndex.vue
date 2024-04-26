<template>
    <div>
        <div class="row">
            <div class="col-8 q-pr-sm">
                <q-card>
                    <q-card-section>
                        <div style="width: 400px;">
                            <q-form @submit.prevent="submitSearch">
                                <q-input dense rounded outlined v-model="search" label="Search" bg-color="white">
                                    <template v-slot:prepend>
                                        <q-icon name="search" />
                                    </template>
                                </q-input>
                            </q-form>
                        </div>
                        <div class="q-my-md">
                            <q-table flat bordered 
                                :rows="admin_table.rows" 
                                :columns="admin_table.columns"
                                class="sticky-last-column"
                                :rows-per-page-options="[admin_table.limit]" 
                                hide-bottom>
                                <template #body="props">
                                    <q-tr :props="props">
                                        <q-td key="number" :props="props">
                                            #{{ props.row.id }}
                                        </q-td>
                                        <q-td key="avatar" :props="props">
                                            <div class="table-avatar-holder"
                                                :class="!props.row.avatar ? 'bg-primary text-white' : ''">
                                                <img :src="`${props.row.avatar_url}`" v-if="props.row.avatar" />
                                                <div v-else class="text-h5">{{ props.row.first_name[0] }}{{
                                props.row.last_name[0] }}</div>
                                            </div>
                                        </q-td>
                                        <q-td key="last_name" :props="props">
                                            {{ props.row.last_name || '' }}
                                        </q-td>
                                        <q-td key="first_name" :props="props">
                                            {{ props.row.first_name || '' }}
                                        </q-td>
                                        <q-td key="middle_name" :props="props">
                                            {{ props.row.middle_name || '' }}
                                        </q-td>
                                        <q-td key="contact_number" :props="props">
                                            {{ props.row.contact_number || '' }}
                                        </q-td>
                                        <q-td key="username" :props="props">
                                            {{ props.row.username || '' }}
                                        </q-td>
                                        <q-td key="email" :props="props">
                                            {{ props.row.email || '' }}
                                        </q-td>
                                        <q-td key="action" :props="props">
                                            <q-btn label="View" color="accent" rounded size="sm" dense
                                                class="q-mx-sm q-px-lg" />
                                            <q-btn label="Edit" @click="updateUser(props.row)" color="primary" rounded size="sm" dense class="q-px-lg" />
                                        </q-td>
                                    </q-tr>
                                </template>
                            </q-table>


                            <div class="text-right q-mt-md row justify-between items-center"
                                v-if="admin_table.max_page > 0">
                                <div class="text-caption text-grey-9">
                                    Showing {{ admin_table.from }} to {{ admin_table.to }} of {{ admin_table.total }}
                                </div>
                                <q-pagination v-model="admin_table.current_page" @update:model-value="getList()"
                                    :max="admin_table.max_page" direction-links flat color="grey"
                                    active-color="primary" />
                            </div>
                        </div>
                        <q-inner-loading :showing="is_loading_table" label="Please wait..." label-class="text-teal"
                            label-style="font-size: 1.1em" />
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-4 q-pl-sm">
                <app-total-count-div title="Total User" 
                    icon="group" 
                    :count="admin_table.total" 
                    :is_loading="is_loading_table"/>
            </div>
        </div>
        <div>
            <app-create-admin @saved="saved()" 
            @cancelled="cancelled()"
            :selected_user="selected_user" 
            :is_update="is_update" />
        </div>
    </div>
</template>

<script>

import CreateAdmin from "components/settings/CreateAdmin.vue";
import TotalCountDiv from "components/general/TotalCount.vue"
export default {
    data: () => {
        return {
            search: "",
            is_loading_table: false,
            is_update: false,
            selected_user: null,
            admin_table: {
                limit: 5,
                current_page: 1,
                max_page: 0,
                from: 0,
                to: 0,
                total: 0,
                columns: [
                    {
                        name: 'number',
                        required: true,
                        label: 'No.',
                        align: 'left',
                    },
                    { name: 'avatar', align: 'center', label: 'Photo' },
                    { name: 'last_name', align: 'left', label: 'Last Name' },
                    { name: 'first_name', align: 'left', label: 'First Name' },
                    { name: 'middle_name', align: 'left', label: 'Middle Name' },
                    { name: 'contact_number', align: 'left', label: 'Phone Number' },
                    { name: 'username', align: 'left', label: 'Username' },
                    { name: 'email', align: 'left', label: 'Email' },
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
                page: this.admin_table.current_page,
                limit: this.admin_table.limit,
                search: this.search
            }

            let { data, status } = await this.$store.dispatch('admin/getAdminList', payload);

            if ([200, 201].includes(status)) {
                this.admin_table.rows = data.data.data;
                this.admin_table.max_page = data.data.last_page;
                this.admin_table.from = data.data.from;
                this.admin_table.to = data.data.to;
                this.admin_table.total = data.data.total;
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
            this.admin_table.current_page = 1;
            this.getList();
        },

        saved(){
            this.getList();
            this.selected_user = {};
            this.is_update = false;
        },
        cancelled(){
            this.selected_user = {};
            this.is_update = false;
        },
        initApp() {
            this.getList();
        },

        updateUser(user){
            this.selected_user = user;
            this.is_update = true;
        }
    },

    mounted() {
        this.initApp();
    },
    components: {
        appCreateAdmin: CreateAdmin,
        appTotalCountDiv: TotalCountDiv,
    }
}
</script>