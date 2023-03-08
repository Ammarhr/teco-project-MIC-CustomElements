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


export const renderMixChart = (data, labels, colorsArr, width, height, unit) => {

    let options = {
        series: data,
        fill: {
            opacity: 100,
            colors: colorsArr,
        },
        chart: {
            height: height,
            width: width,
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
                borderRadius: 10,
                dataLabels: {
                    position: "top", // top, center, bottom,
                },
                distributed: false,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                if (unit) {
                    return val + unit;
                } else {
                    return
                }
            },
            offsetY: -20,
        },
        legend: {
            show: true,
            horizontalAlign: 'right',

        },

        xaxis: {
            categories: labels,
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
    }
    return options;
}