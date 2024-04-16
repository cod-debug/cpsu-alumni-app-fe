<template>
    <q-page class="q-pt-xl q-px-md">
        <div class="text-h5">ALUMNI</div>
        <div class="q-my-md" >
            <q-card>    
                <q-card-section>
                    <div class="row justify-between">
                        <div class="text-h6">List</div>
                        <div>
                            <q-btn label="Add Alumni" icon="add" :to="{ name: 'alumni-create'}" rounded color="black" dense class="q-px-lg q-mx-sm" />
                            <q-btn label="Alumni ID" rounded color="secondary" dense class="q-px-lg" />
                        </div>
                    </div>
                </q-card-section>
                <q-card-section>
                    <div style="width: 400px;">
                        <q-form @submit.prevent="submitSearch">
                            <q-input dense rounded outlined v-model="search" label="Search" bg-color="white" >
                                <template v-slot:prepend>
                                <q-icon name="search" />
                                </template>
                            </q-input>
                        </q-form>
                    </div>

                    <div class="q-my-md" >
                        <q-table
                            flat
                            bordered
                            :rows="alumni_table.rows"
                            :columns="alumni_table.columns"
                            :rows-per-page-options="[alumni_table.limit]"
                            hide-bottom
                        >
                            <template #body="props">
                                <q-tr
                                :props="props"
                                >
                                    <q-td
                                        key="number"
                                        :props="props"
                                    >
                                        #{{ props.row.id }}
                                    </q-td>
                                    <q-td 
                                        key="avatar"
                                        :props="props">
                                        <div class="table-avatar-holder" :class="!props.row.avatar ? 'bg-primary text-white' : ''" >
                                            <img :src="`${props.row.avatar_url}`" v-if="props.row.avatar" />
                                            <div v-else class="text-h5" >{{ props.row.first_name[0] }}{{ props.row.last_name[0] }}</div>
                                        </div>
                                    </q-td>
                                    <q-td
                                        key="last_name"
                                        :props="props"
                                    >
                                        {{ props.row.last_name || '' }}
                                    </q-td>
                                    <q-td
                                        key="first_name"
                                        :props="props"
                                    >
                                        {{ props.row.first_name || '' }}
                                    </q-td>
                                    <q-td
                                        key="middle_name"
                                        :props="props"
                                    >
                                        {{ props.row.middle_name || '' }}
                                    </q-td>
                                    <q-td
                                        key="course"
                                        :props="props"
                                    >
                                        {{ props.row.course || '' }}
                                    </q-td>
                                    <q-td
                                        key="year_graduated"
                                        :props="props"
                                    >
                                        {{ props.row.year_graduated || '' }}
                                    </q-td>
                                    <q-td
                                        key="contact_number"
                                        :props="props"
                                    >
                                        {{ props.row.contact_number || '' }}
                                    </q-td>
                                    <q-td
                                        key="action"
                                        :props="props"
                                    >
                                        <q-btn label="View" color="accent" rounded size="sm" dense class="q-mx-sm q-px-lg" />
                                        <q-btn label="Edit" :to="{ name: 'alumni-update', params: {id: props.row.id}}" color="primary" rounded size="sm" dense class="q-px-lg" />
                                    </q-td>
                                </q-tr>
                            </template>
                        </q-table>
                        
  
                        <div class="text-right q-mt-md row justify-between items-center" v-if="alumni_table.max_page > 0">
                            <div class="text-caption text-grey-9">
                                Showing {{ alumni_table.from }} to {{ alumni_table.to }} of {{ alumni_table.total }} 
                            </div>
                            <q-pagination v-model="alumni_table.current_page"
                                            @update:model-value="getList()"
                                            :max="alumni_table.max_page"
                                            direction-links
                                            flat
                                            color="grey"
                                            active-color="primary" />
                        </div>
                    </div>
                    <q-inner-loading
                        :showing="is_loading_table"
                        label="Please wait..."
                        label-class="text-teal"
                        label-style="font-size: 1.1em"
                    />
                </q-card-section>
            </q-card>
            <div class="flex q-my-md no-wrap" style="gap: 1rem;">
                <div style="width: 140%;">
                    <q-card style="min-height: 200px;">
                        <q-card-section>
                            <div class="text-h6">Year</div>
                            <div class="row">
                               <div class="col-md-4 col-lg-4 col-xl-4 col-sm-6" v-for="(item, key) in count_per_year" :key="key" >
                                    <div class="q-px-sm">
                                        <app-count-per-year :data="{year: item.year_graduated, count: item.count}" />
                                    </div>
                               </div>
                            </div>
                        </q-card-section>
                            <q-inner-loading
                                :showing="is_loading_count"
                                label="Please wait..."
                                label-class="text-teal"
                                label-style="font-size: 1.1em"
                            />
                    </q-card>
                </div>
                <div style="width: 60%;">
                    <q-card class="bg-secondary text-white">
                        <q-card-section>
                            <div class="flex justify-between items-center">
                                <div class="text-h5">Total Alumni</div>
                                <div style="font-size: 6em;">
                                    <q-icon name="group" />
                                </div>
                            </div>
                            <div class="q-py-sm text-center">
                                <div class="text-h3">{{ $helper.formatNumber(alumni_table.total) }}</div>
                            </div>
                        </q-card-section>
                        <q-inner-loading
                            :showing="is_loading_table"
                            label="Please wait..."
                            label-class="text-teal"
                            label-style="font-size: 1.1em"
                        />
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import CountPerYear from "components/alumni/CountPerYear.vue"

export default {
    data: () => {
        return {
            search: "",
            is_loading_table: false,
            is_loading_count: false,
            count_per_year: null,
            alumni_table: {
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
                    { name: 'course', align: 'left', label: 'Course' },
                    { name: 'year_graduated', align: 'center', label: 'Year Graduated' },
                    { name: 'contact_number', align: 'left', label: 'Phone Number' },,
                    { name: 'action', align: 'right', label: 'Action' },
                ],
                rows: []
            }
        }
    },

    methods: {
        async getList(){
            this.is_loading_table = true;
            const payload = {
                page: this.alumni_table.current_page,
                limit: this.alumni_table.limit,
                search: this.search 
            }

            let { data, status } = await this.$store.dispatch('alumni/getAlumniList', payload);

            if ([200, 201].includes(status)) {
                this.alumni_table.rows = data.data.data;
                this.alumni_table.max_page = data.data.last_page;
                this.alumni_table.from = data.data.from;
                this.alumni_table.to = data.data.to;
                this.alumni_table.total = data.data.total;
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

        async getCountPerYear(){
            try {
                this.is_loading_count = true;
                let {data, status} = await this.$store.dispatch('alumni/getCountPerYear');
                if([200,201].includes(status)){
                    this.count_per_year = data.data;
                }
                this.is_loading_count = false;
            } catch(e) {
                console.log(e);
            }
        },

        async submitSearch(){
            this.alumni_table.current_page = 1;
            this.getList();
        },

        initApp(){
            this.getList();
            this.getCountPerYear();
        }
    },

    mounted(){
        this.initApp();
    },
    components: {
        appCountPerYear: CountPerYear,
    },
}
</script>