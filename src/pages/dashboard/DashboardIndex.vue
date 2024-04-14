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
                    <div class="row justify-between items-center">
                        <div class="text-h6">Message</div>
                        <div class="text-h5 text-accent">
                            <q-icon name="more_horiz" />
                        </div>
                    </div>
                    <app-mini-message avatar="R" name="Roy Duenas" message="This is a sample message only..."
                        time_ago="5mins ago" />
                    <q-separator />
                    <app-mini-message avatar="J" name="Juliane Faith" message="This is a sample message only..."
                        time_ago="5mins ago" />
                    <q-separator />
                    <app-mini-message avatar="J" name="Juliane Faith" message="This is a sample message only..."
                        time_ago="5mins ago" />
                    <q-separator />
                    <app-mini-message avatar="J" name="Juliane Faith" message="This is a sample message only..."
                        time_ago="5mins ago" />
                    <q-separator />
                    <div class="q-pt-md text-center">
                        <q-btn flat class="text-accent text-bold" :to="{ name: 'message' }">Show All</q-btn>
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
    mounted() {
        var chart = new ApexCharts(document.querySelector("#chart"), this.chartOptions);

        chart.render();
    },
    components: {
        AppMiniMessage: MiniMessage,
    }
}


</script>