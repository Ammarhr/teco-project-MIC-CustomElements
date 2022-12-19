export const renderBarChart = (dataArr, labels, colorsArr) => {

    let options = {
        series: [
            {
                data: dataArr,
            },
        ],
        fill: {
            opacity: 100,
            colors: ['#005FAA', '#B1DBFD'],
        },
        chart: {
            height: 250,
            type: "bar",
            width: "350px",
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: "top", // top, center, bottom
                },
                distributed: true,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + " kWh";
            },
            offsetY: -20,
            style: {
                fontSize: "12px",
                colors: ["#304758"],
            },

        },
        legend: {
            show: false
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

export const renderRadialBar = (seriesArr, labels, color) => {
    let options = {
        series: seriesArr,
        chart: {
            height: 250,
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