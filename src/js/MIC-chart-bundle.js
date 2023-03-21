export const renderBarChart = (data, labels, colorsArr, width, height, unit, max) => {
    let options = {
        series: data,
        fill: {
            opacity: 100,
        },
        colors: colorsArr,
        chart: {
            type: 'bar',
            height: height,
            width: "100%",
            toolbar: {
                show: false,
            },
        },
        legend: {
            show: false
        },
        stroke: {
            show: true,
            width: 2,
        },
        tooltip: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                barHeight: 100,
                dataLabels: {
                    position: "top", // top, center, bottom,
                },
                distributed: true,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (/** @type {Number} */ val) {
                return val + unit;
            },
            offsetY: -30,
            style: {
                fontSize: '16px',
                fontFamily: 'Interstate',
                colors: '#bbbb'
            },
        },
        xaxis: {
            categories: labels,
            type: 'category',
            position: "bottom",
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {},
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            min: 0,
            max: max,
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: true,
                formatter: function ( /** @type {Number} */ val) {
                    return Math.floor(val);
                },
            },
        },
    }
    return options;
}

export const renderRadialBar = (seriesArr, labels, width, color) => {
    let options = {
        series: seriesArr,
        chart: {
            width: width + 5,
            type: "radialBar",
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 15,
                    size: "60%",
                },
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        fontSize: "16px",
                        color: "#6C6C6C",
                        offsetY: 15,
                        fontFamily: "Interstate",
                    },
                    value: {
                        offsetY: -25,
                        fontSize: "18px",
                        color: "#005FAA",
                        fontFamily: "Interstate",
                        formatter: function (val) {
                            return val + "%";
                        },
                    },
                },
            },
        },
        fill: {
            colors: color,
        },
        stroke: {
            lineCap: "round",
        },
        labels: labels,
    };
    return options;
}


export const renderMixChart = (data, color, width, height) => {
    let colWidth;
    if (data.length == 1) {
        colWidth = "5%"
    } else {
        colWidth = undefined

    }

    let options
    if (data.length == 0) {
        options = {
            annotations: {
                position: 'front',
                yaxis: [
                    {
                        y: undefined,
                    },
                ],
            },
            chart: {
                height: height,
                width: "100%",
                type: "bar"
            },
            noData: {
                text: "No Data to display",
                align: "center",
                verticalAlign: "middle",
            },
            series: [
                {
                    name: "Series 1",
                    data: []
                }
            ]
        }
    } else {
        options = {
            series: [
                {
                    type: "column",
                    name: "gas",
                    color: "#005FAA",
                    data: data.map((results) => {
                        return results.Usage
                    })
                },
                {
                    type: "line",
                    name: "tempereature",
                    color: "#FF832B",
                    data: data.map((results) => {
                        return results.Temperature
                    }),

                }

            ],
            fill: {
                opacity: 100,
                colors: color,
            },
            chart: {
                height: height,
                marginLeft: 0,
                width: "100%",
                zoom: {
                    enabled: false // Disable chart zooming
                },
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                width: [0, 4],
                curve: 'smooth',
            },
            markers: {
                size: 5,
                colors: "#fff",
                strokeDashArray: 50,
                strokeWidth: 3,
                strokeColors: "#FF832B",
                customHTML: function () {
                    return '<span style="width:14px; height: 5px; border: 2px solid #FF832B;"></span>'
                }
            },
            plotOptions: {
                bar: {
                    position: 'left',
                    borderRadiusWhenStacked: 'last',
                    borderRadius: 10,
                    columnWidth: colWidth || "70%",
                    dataLabels: {
                        position: "top", // top, center, bottom,
                    },

                    distributed: false,
                },
            },
            dataLabels: {
                enabled: false,
                // formatter: function (val, { seriesIndex, w }) {
                //     if (val && w.config.series[seriesIndex].name == "tempereature") {
                //         return val + "°";
                //     } else if (val && w.config.series[seriesIndex].name == "gas") {
                //         return val + "Kwl"
                //     } else {
                //         return
                //     }
                // },
                // offsetY: -20,
            },
            legend: {
                show: true,
                horizontalAlign: 'right',
            },
            tooltip: {
                enabled: true,
                onDatasetHover: {
                    highlightDataSeries: true,
                    y: {
                        show: true,
                    },
                },
            },
            xaxis: {
                type:"category",
                categories: data.map((results) => {
                    return results.Perioddate
                })
            },
            yaxis: [
                {
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: true,
                        formatter: function (val) {
                            return val;
                        },
                    }
                },
                {
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false,
                        formatter: function (val) {
                            return val;
                        },
                    }
                }
            ],

        }
    }

    return options;
}
