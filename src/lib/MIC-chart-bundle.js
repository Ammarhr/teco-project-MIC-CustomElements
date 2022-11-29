export const renderBarChart = (dataArr, labels, colorsArr) => {

    let options = {
        series: [
            {
                name: "Inflation",
                data: dataArr,
            },
        ],
        fill: {
            colors: ['#005FAA', 'B1DBFD'],
            opacity: 100,
        },
        chart: {
            height: 250,
            type: "bar",
            width: "350px",
            toolbar: {
                show: false,
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: "bottom",
                        offsetX: -10,
                        offsetY: 0,
                    },
                },
            },
        ],
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: "top", // top, center, bottom
                },
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
                enabled: true,
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
                show: false,
                formatter: function (val) {
                    return val + "kWh";
                },
            },
        },
    }
    return options;
}

export const renderRadialBar = (seriesArr, labels, colorsArr) => {
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

        stroke: {
            lineCap: "round",
        },
        labels: labels,
    };
    return options;
}