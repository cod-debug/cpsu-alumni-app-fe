<template>
    <q-page class="q-pt-xl q-px-md">
        <div class="text-h5">Reports</div>
        <div class="row q-my-md">
            <q-card class="col-lg-8 col-8">
                    
                    <q-inner-loading
                            :showing="is_loading_count"
                            label="Please wait..."
                            label-class="text-teal"
                            label-style="font-size: 1.1em"
                        />
                <q-card-section>
                    <div id="chart"></div>
                </q-card-section>
            </q-card>
            <div class="col-lg-4 q-pl-md">
                <q-card class="col-4">
                    
                    <q-inner-loading
                            :showing="is_loading_count"
                            label="Please wait..."
                            label-class="text-teal"
                            label-style="font-size: 1.1em"
                        />
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
            }
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
                        return { x: i.year_graduated, y: i.count  }
                    });
                    this.renderChart();
                }
                this.is_loading_count = false;
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
            this.renderChart();
        }
    },
    mounted() {
        this.initApp();
    },
    components: {

    }
}


</script>