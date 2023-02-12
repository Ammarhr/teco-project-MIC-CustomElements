export const renderBarChart = (data, labels, colorsArr, width, height, unit) => {

    let options = {
        series: data,
        fill: {
            opacity: 100,
        },
        colors: colorsArr,
        chart: {
            type: "bar",
            height: height,
            width: width,
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
        plotOptions: {
            bar: {
                // columnWidth: '120px',
                borderRadius: 10,
                dataLabels: {
                    position: "top", // top, center, bottom,
                },
                distributed: true,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + unit;

            },
            offsetY: -20,
            style: {
                fontSize: '14px',
                fontFamily: 'Interstate',
                colors: '#bbbb'
            },
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
            // height: "auto",
            type: "radialBar",
            offsetY: -10,
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
                        offsetY: 40,
                        fontFamily: "Interstate",
                    },
                    value: {
                        offsetY: 0,
                        fontSize: "22px",
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
            markers: {
                width: 12,
                height: 2,
                strokeWidth: 0,
                strokeColor: '#fff',
                radius: 0,
            },
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
            },
        },
    }
    return options;
}