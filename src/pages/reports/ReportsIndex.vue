<template>
    <q-page class="q-pt-xl q-px-md">
        <div class="text-h5">Reports</div>
        <div class="q-px-sm q-py-xs q-pt-md">
            <q-btn color="teal" dense class="q-px-md">Tabular Reports</q-btn>
        </div>
        <div class="row">
            <div class="col-12 col-md-8 q-px-sm q-py-xs">
                <q-card class="q-mt-md bg-white q-pa-lg">
                    <q-inner-loading :showing="is_loading_gender_count" label="Please wait..." label-class="text-teal"
                        label-style="font-size: 1.1em" />
                    <div class="flex">
                        <div>
                            <span v-for="(gender, key) in count_by_gender" :key="key"
                                style="display: inline-block; box-shadow: 2px 2px 2px lightgray;"
                                class="q-py-lg q-mx-sm">
                                <div class="q-px-lg text-center" style="width: fit-content;">
                                    <div class="text-h3"
                                        style="border: 1px solid lightgray; border-radius: .3rem; rotate: 45deg;">
                                        <q-icon :name="gender.gender.toLowerCase()"
                                            :color="gender.gender.toLowerCase() === 'male' ? 'blue-4' : 'pink-4'"
                                            style="rotate: -45deg;" />
                                    </div>
                                    <div class="text-grey-8 q-mt-sm">
                                        <span class="text-h4">{{ $helper.formatNumber(gender.count) }}</span>
                                        <div class="text-caption">{{ gender.gender }}</div>
                                    </div>
                                </div>
                            </span>
                        </div>
                        <div>
                            <span style="display: inline-block; box-shadow: 2px 2px 2px lightgray;"
                                class="q-py-lg q-mx-sm" v-if="count_by_employment_status">
                                <div class="q-px-lg text-center" style="width: fit-content;">
                                    <div class="text-h3" style="border: 1px solid lightgray; border-radius: .3rem;">
                                        <q-icon name="work" color="green-4" />
                                    </div>
                                    <div class="text-grey-8 q-mt-sm">
                                        <span class="text-h4">{{
                        $helper.formatNumber(count_by_employment_status.users_with_work)
                    }}</span>
                                        <div class="text-caption">Employed</div>
                                    </div>
                                </div>
                            </span>
                            <span style="display: inline-block; box-shadow: 2px 2px 2px lightgray;"
                                class="q-py-lg q-mx-sm" v-if="count_by_employment_status">
                                <div class="q-px-lg text-center" style="width: fit-content;">
                                    <div class="text-h3" style="border: 1px solid lightgray; border-radius: .3rem;">
                                        <q-icon name="work_off" color="grey-6" />
                                    </div>
                                    <div class="text-grey-8 q-mt-sm">
                                        <span class="text-h4">{{
                        $helper.formatNumber(count_by_employment_status.users_without_work)
                    }}</span>
                                        <div class="text-caption">Unemployed</div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </q-card>
            </div>
            <div class="col-12 col-md-4 q-px-sm q-py-xs">
                <div class="q-mt-md">
                    <app-total-count-div title="Total User" icon="group" :count="total_graduates"
                        :is_loading="is_loading_gender_count" />
                </div>
            </div>
        </div>

        <div class="row q-my-sm">
            <div class="col-lg-8 col-8 q-px-sm q-py-xs">
                <q-card>
                    <q-inner-loading :showing="is_loading_count" label="Please wait..." label-class="text-teal"
                        label-style="font-size: 1.1em" />
                    <q-card-section>
                        <div id="chart"></div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-lg-4 q-px-sm q-py-xs">
                <q-card>
                    <q-inner-loading :showing="is_loading_count" label="Please wait..." label-class="text-teal"
                        label-style="font-size: 1.1em" />
                    <q-card-section>
                        <div id="barChart"></div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script>
import ApexCharts from 'apexcharts';
import TotalCountDiv from "components/general/TotalCount.vue"
export default {
    data: () => {
        return {
            is_loading_count: false,
            is_loading_gender_count: false,
            barChartOptions: {
                chart: {
                    height: 350,
                    type: 'bar'
                },
                plotOptions: {
                    bar: {
                        horizontal: false
                    }
                },
                series: [{
                    data: []
                }]
            },
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
                        name: "Graduates",
                        data: []
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
                    categories: []
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
                            text: "Graduates by year",
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
                    size: 6
                }
            },

            count_by_gender: [],
            count_by_employment_status: null,
        }
    },
    methods: {
        async getCountPerYear() {
            try {
                this.is_loading_count = true;
                let { data, status } = await this.$store.dispatch('alumni/getCountPerYear');
                if ([200, 201].includes(status)) {
                    this.chartOptions.series[0].data = data.data.map((i) => {
                        return i.count;
                    });
                    this.chartOptions.xaxis.categories = data.data.map((i) => {
                        return i.year_graduated;
                    });

                    this.barChartOptions.series[0].data = data.data.map((i) => {
                        return { x: i.year_graduated, y: i.count }
                    });
                    this.renderChart();
                }
                this.is_loading_count = false;
            } catch (e) {
                console.log(e);
            }
        },

        async getCountByGender() {
            try {
                this.is_loading_gender_count = true;

                let { data, status } = await this.$store.dispatch('alumni/getCountByGender');

                if ([200, 201].includes(status)) {
                    this.count_by_gender = data;
                }

                this.is_loading_gender_count = false;
            } catch (e) {
                console.log(e);
            }
        },

        async getCountByEmploymentStatus() {
            try {
                this.is_loading_gender_count = true;

                let { data, status } = await this.$store.dispatch('alumni/getCountByEmploymentStatus');

                if ([200, 201].includes(status)) {
                    this.count_by_employment_status = data;
                }

                this.is_loading_gender_count = false;
            } catch (e) {
                console.log(e);
            }

        },

        renderChart() {
            document.querySelector("#chart").innerHTML = "";
            let chart = new ApexCharts(document.querySelector("#chart"), this.chartOptions);

            document.querySelector("#barChart").innerHTML = "";
            let barChart = new ApexCharts(document.querySelector("#barChart"), this.barChartOptions);

            chart.render();
            barChart.render();
        },
        initApp() {
            this.getCountPerYear();
            this.getCountByGender();
            this.getCountByEmploymentStatus();
            this.renderChart();
        }
    },
    mounted() {
        this.initApp();
    },
    components: {
        appTotalCountDiv: TotalCountDiv,
    },
    computed: {
        total_graduates() {
            return (this.count_by_employment_status?.users_with_work || 0) + (this.count_by_employment_status?.users_without_work || 0);
        }
    }
}


</script>