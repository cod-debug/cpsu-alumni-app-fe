<template>
    <q-page class="q-pt-xl q-px-md">
        <div class="text-h5">DASHBOARD</div>
        <div class="row q-my-md">
            <q-card class="col-md-8">
                <q-card-section>
                    <div id="chart"></div>
                </q-card-section>
            </q-card>
            <div class="col-md-4 q-pl-md">
            <q-card>
                <q-card-section>
                    
                    <q-inner-loading
                                :showing="is_loading_messages"
                                label="Please wait..."
                                label-class="text-teal"
                                label-style="font-size: 1.1em"
                            />
                    <div class="row justify-between items-center">
                        <div class="text-h6">Message</div>
                        <div class="text-h5 text-accent">
                            <q-icon name="more_horiz" />
                        </div>
                    </div>
                    <app-mini-message v-for="(item, key) in messages" :key="key" :avatar="item.avatar_url" :name="`${item.sender.first_name} ${item.sender.last_name}`" :message="`${item.message}`"
                        :time_ago="$helper.timeSince(item.created_at)" />
                    <q-separator />
                    
                    <div class="bg-red-2 text-red-6 q-pa-sm q-mt-md" v-if="!is_loading_messages && messages.length === 0">
                        <q-icon name="info" /> No messages received yet.
                    </div>
                    <div class="q-pt-md text-center" v-if="!is_loading_messages">
                        <q-btn flat class="text-accent text-bold" :to="{ name: 'message' }" :disable="messages.length === 0">Show All</q-btn>
                    </div>
                </q-card-section>
            </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
import ApexCharts from 'apexcharts';
import MiniMessage from 'src/components/message/MiniMessage.vue';
export default {
    data: () => {
        return {
            user_data: JSON.parse(localStorage.getItem('user_data')),
            is_loading_messages: false,
            messages: [],
            chartOptions: {
                chart: {
                    height: 350,
                    type: "line",
                    stacked: false
                },
                dataLabels: {
                    enabled: false
                },
                colors: ["#5669cc"],
                series: [
                    {
                        name: "Last Year",
                        data: [0, 20, 40, 80, 60, 20, 25, 90, 82]
                    }
                ],
                stroke: {
                    width: [4, 4]
                },
                plotOptions: {
                    bar: {
                        columnWidth: "20%"
                    }
                },
                xaxis: {
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
                },
                yaxis: [
                    {
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                            color: "#5669cc"
                        },
                        labels: {
                            style: {
                                colors: "#5669cc"
                            }
                        },
                        title: {
                            text: "Overall",
                            style: {
                                color: "#5669cc"
                            }
                        }
                    },
                ],
                tooltip: {
                    shared: false,
                    intersect: true,
                    x: {
                        show: false
                    }
                },
                legend: {
                    horizontalAlign: "right",
                    offsetX: 40,
                },
                markers: {
                    size: 5
                }
            }
        }
    },
    methods: {
        async getReceivedMessages(){
            let payload = {
                id: this.user_data.user_id
            }

            this.is_loading_messages = true;
            let { data, status } = await this.$store.dispatch('chats/getReceivedMessages', payload);

            if([200, 201].includes(status)){
                this.messages = data.data;
            }
            this.is_loading_messages = false;
        },
    },
    mounted() {
        this.getReceivedMessages();
        var chart = new ApexCharts(document.querySelector("#chart"), this.chartOptions);

        chart.render();
    },
    components: {
        AppMiniMessage: MiniMessage,
    }
}


</script>