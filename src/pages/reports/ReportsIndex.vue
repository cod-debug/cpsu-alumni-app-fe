<template>
    <q-page class="q-pt-xl q-px-md">
        <div class="text-h5">Reports</div>
        <div class="q-px-sm q-py-xs q-pt-md">
            <q-btn color="teal" dense class="q-px-md">Tabular Reports</q-btn>
        </div>
        <div class="row">
            
            <div class="col-12 col-md-8 q-px-sm q-py-xs">
                <q-card class="q-mt-md bg-white">
                    <q-inner-loading :showing="is_loading_employment_status_count" label="Please wait..." label-class="text-teal"
                        label-style="font-size: 1.1em" />
                    <q-card-section>
                        <div class="text-h5">
                            Employment Status
                        </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <div id="pieChartEmployment"></div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section v-if="!is_loading_employment_status_count">
                        <div class="flex justify-between">
                            <div class="">
                                <div class="text-grey-7">Employed:</div> 
                                <div class="text-h4 text-blue">{{ $helper.formatNumber(count_by_employment_status?.users_with_work || 0) }}</div>
                            </div>
                            <div class="">
                                <div class="text-grey-7">Unemployed:</div> 
                                <div class="text-h4 text-green-3 text-right">{{ $helper.formatNumber(count_by_employment_status?.users_without_work || 0) }}</div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-md-4 q-px-sm q-py-xs">
                <q-card class="q-mt-md bg-white">
                    <q-inner-loading :showing="is_loading_employment_status_count" label="Please wait..." label-class="text-teal"
                        label-style="font-size: 1.1em" />
                    <q-card-section>
                        <div class="text-h5">
                            Gender
                        </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                        <div id="donutChartGender"></div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section v-if="!is_loading_employment_status_count">
                        <div class="flex justify-between">
                            <div class="">
                                <div class="text-grey-7">Male:</div> 
                                <div class="text-h4 text-blue">{{ $helper.formatNumber(count_by_gender[1]?.count || 0) }}</div>
                            </div>
                            <div class="">
                                <div class="text-grey-7">Female:</div> 
                                <div class="text-h4 text-green-3 text-right">{{ $helper.formatNumber(count_by_gender[0]?.count || 0) }}</div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
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
export default {
    data: () => {
        return {
            is_loading_count: false,
            is_loading_gender_count: false,
            is_loading_employment_status_count: false,
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

            pieChartOptionsEmployment: {
                chart: {
                    type: 'pie',
                    height: 350,
                },
                series: [],
                labels: ['Employed', 'Unemployed'],
                plotOptions: {
                    pie: {
                        expandOnClick: true
                    }
                }
            },
            donutChartOptionsGender: {
                chart: {
                    type: 'donut',
                    height: 360,
                },
                series: [],
                labels: ['Male', 'Female'],
                plotOptions: {
                    pie: {
                        expandOnClick: true
                    }
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
                    this.donutChartOptionsGender.series[1] = data[0].count;
                    this.donutChartOptionsGender.series[0] = data[1].count;
                    this.renderChart();
                }

                this.is_loading_gender_count = false;
            } catch (e) {
                console.log(e);
            }
        },

        async getCountByEmploymentStatus() {
            try {
                this.is_loading_employment_status_count = true;

                let { data, status } = await this.$store.dispatch('alumni/getCountByEmploymentStatus');

                if ([200, 201].includes(status)) {
                    this.count_by_employment_status = data;
                    this.pieChartOptionsEmployment.series[0] = data.users_with_work;
                    this.pieChartOptionsEmployment.series[1] = data.users_without_work;
                    this.renderChart();
                }

                this.is_loading_employment_status_count = false;
            } catch (e) {
                console.log(e);
            }

        },

        renderChart() {
            document.querySelector("#chart").innerHTML = "";
            let chart = new ApexCharts(document.querySelector("#chart"), this.chartOptions);

            document.querySelector("#barChart").innerHTML = "";
            let barChart = new ApexCharts(document.querySelector("#barChart"), this.barChartOptions);
            
            document.querySelector("#pieChartEmployment").innerHTML = "";
            let pieChartEmployment = new ApexCharts(document.querySelector("#pieChartEmployment"), this.pieChartOptionsEmployment);
            
            document.querySelector("#donutChartGender").innerHTML = "";
            let donutChartGender = new ApexCharts(document.querySelector("#donutChartGender"), this.donutChartOptionsGender);
            
            donutChartGender.render();
            pieChartEmployment.render();
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
    computed: {
        total_graduates() {
            return (this.count_by_employment_status?.users_with_work || 0) + (this.count_by_employment_status?.users_without_work || 0);
        }
    }
}


</script>