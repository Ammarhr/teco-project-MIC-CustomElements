import cloudIcon from "../assets/usage-cloud.svg"
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
                borderRadius: 8,
                borderRadiusApplication: 'end',
                endingShape: 'rounded',
                barHeight: 100,
                dataLabels: {
                    position: "top", // top, center, bottom,
                },
                distributed: true,
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
                // let dataLabel = document.querySelector(".apexcharts-datalabel");
                // let xaxisLabel = document.querySelector(".apexcharts-xaxis-label");
                // // let text  = document.querySelector("text");
                // console.log("this is s", dataLabel, xaxisLabel);
                // if (dataPointIndex == 1 && dataLabel && xaxisLabel) {
                //     dataLabel.setAttribute("style", "font-weight:600 !important; font-size:16px")
                //     xaxisLabel.setAttribute("style", "font-weight:600 !important; font-size:16px")
                //     return (
                //         val.toLocaleString() + unit
                //     )
                // } else {
                // }
                return val.toLocaleString() + unit;
            },
            offsetY: -30,
            style: {
                fontSize: '16px',
                fontWeight: 400,
                fontFamily: 'Interstate',
                colors: '#bbbb'
            },
        },
        xaxis: {
            categories: labels,
            type: 'category',
            position: "bottom",
            axisBorder: {
                show: true,
                color: '#000000',
                height: 1,
                width: '100%',
                offsetX: 0,
                offsetY: -0.5
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


export const renderMixChart = (data, color, width, height, service, unit, chartUnit, temp) => {
    let filtedData;
    let toolTipUsage = chartUnit == "usage" ? "Energy Used: " : "Cost"
    if (chartUnit == "cost") {
        unit = "$"
        filtedData = data.map((results) => {
            return results.Cost
        })
    } else if (chartUnit == "usage") {
        filtedData = data.map((results) => {
            return results.Usage
        })
    } else {
        filtedData = data.map((results) => {
            return results.Usage
        })
    }
    let colWidth;
    let serviceData;
    let catArray = [];
    if (data && data.length > 0) {
        serviceData = data.filter((results) => {
            if (results.Usage !== "")
                return results.Usage
        })
        catArray = data.map((results) => {
            return results.Perioddate
        })
    }
    // console.log("serviceData", serviceData);
    //* configure column width depend on the data 
    if (data && data.length < 5) {
        colWidth = "5%"
    } else {
        colWidth = "70px"
    }

    let options
    if (!serviceData || serviceData.length == 0) {
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
                height: 400,
                width: 2000,
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
            ],
        }
    } else {
        options = {
            series: [
                {
                    type: "column",
                    name: service,
                    color: "#005FAA",
                    data: filtedData
                },
                {
                    type: "line",
                    name: temp == true ? "tempereature" : undefined,
                    color: "#FF832B",
                    data: temp == true ? data.map((results) => {
                        return results.Temperature
                    }) : [],
                }

            ],
            fill: {
                opacity: 100,
                colors: color,
            },
            chart: {
                height: height,
                marginLeft: 0,
                width: data && data.length > 30 ? 2500 : "100%",
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
                offsetY: -20,
                formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
                    let arr;
                    arr = data.filter(res => res.CloudIcon)
                    if (data[dataPointIndex] && data[dataPointIndex].CloudIcon == "X")
                        return (""
                            // '<div>' 
                            // // +
                            // // `<img src=${cloudIcon} alt="cloud icon" />`
                        )
                },
            },
            legend: {
                show: true,
                horizontalAlign: 'right',
            },
            tooltip: {
                enabled: true,
                followCursor: true,
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    let arr;
                    arr = data.map((results) => {
                        return results.FullDate
                    })
                    return (
                        '<div class=" apexcharts-theme-light apexcharts-active" style="padding:12px; min-width:150px">' +
                        '<div style="padding-bottom:8px">' +
                        "<span style='font-weight:700; color:#005FAA; border-bottom:1px solid #EAECEE;'>" +
                        arr[dataPointIndex] +
                        "</div>"
                        +
                        (series[0][dataPointIndex] ? `<div class="apexcharts-tooltip-text">` +
                            '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">' +
                            "<span style='font-weight:700; color:#000000;'>" +
                            toolTipUsage +
                            "</span>" +
                            "<span style='font-weight:300;color:#000000;'>" + " "
                            +
                            series[0][dataPointIndex] + " " + unit : "")
                        +
                        (series[1][dataPointIndex] ? "</div>"
                            + '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">'
                            + `<span style='font-weight:700;'>` +
                            "Avg.Temp: " +
                            "</span>"
                            +
                            "<span style='font-weight:300;'>"
                            + series[1][dataPointIndex] + "°" : "")
                    );
                },
                onDatasetHover: {
                    highlightDataSeries: true,
                },
                y: {
                    show: true,
                    style: {
                        cssClass: 'apexcharts-yaxis-annotation-label',
                    },
                },
                x: {
                    show: false,
                }
            },
            xaxis: {
                type: "category",
                categories: catArray,
                tooltip: {
                    enabled: false
                }
            },
            yaxis: [
                {
                    dataLabels: {
                        show: true,
                    },
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
                    },
                    title: {
                        text: undefined,
                        rotate: 0,
                        offsetX: 12,
                        offsetY: -10,
                        style: {
                            fontFamily: 'Interstate',
                            fontStyle: "normal",
                            fontWeight: 300,
                            fontSize: 12,
                            lineHeight: "14px",
                            color: "#005FAA",
                            marginTop: 16
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
                        show: true,
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


export const onPeakOffPeakChart = (data, unit) => {

    let options = {
        series: [{
            name: 'OnPeak',
            type: 'column',
            color: "#00B6F0",
            data: data.filter(result => result.Dtype == "dtoun").map(value => value.Usage)
        }, {
            name: 'OffPeak',
            type: 'column',
            color: "#00294A",
            data: data.filter(result => result.Dtype == "dtouf").map(value => value.Usage)
        }, {
            name: 'Temperature',
            type: 'line',
            data: data.filter((result, i) => i % 2 == 0).map(value => value.Temperature)
        }],
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
            zoom: {
                enabled: false // Disable chart zooming
            },
            toolbar: {
                show: false,
            },
        },
        stroke: {
            width: 3,
            curve: 'smooth',
        },
        markers: {
            size: 5,
            colors: "#fff",
            strokeDashArray: 50,
            strokeWidth: 3,
            strokeColors: "#FF832B",
        },
        fill: {
            opacity: 100,
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: data.filter((result, i) => i % 2 == 0).map(value => value.Perioddate),
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            tooltip: {
                enabled: false
            }
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
                    show: false,
                    formatter: function (val) {
                        return val;
                    },
                },
                title: {
                    text: undefined,
                    rotate: 0,
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                        fontFamily: 'Interstate',
                        fontStyle: "normal",
                        fontWeight: 300,
                        fontSize: 12,
                        lineHeight: "14px",
                        color: "#005FAA",
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
                    show: true,
                    formatter: function (val) {
                        return val;
                    },
                }
            }
        ],
        plotOptions: {
            bar: {
                position: 'left',
                borderRadiusWhenStacked: 'last',
                borderRadius: 10,
                columnWidth: "70%",
                dataLabels: {
                    position: "top", // top, center, bottom,
                },

                distributed: false,
            }
        },

        tooltip: {
            enabled: true,
            followCursor: true,
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                let arr;
                arr = data.filter((result, i) => i % 2 == 0).map(value => value.FullDate)
                return (
                    '<div class="apexcharts-theme-light apexcharts-active" style="padding:12px; min-width:150px">' +
                    '<div style="padding-bottom:8px width:100%; color:#005FAA; border-bottom:1px solid #EAECEE;">' +
                    "<span style='font-weight:700;'>" +
                    arr[dataPointIndex] +
                    "</div>"
                    +
                    (series[0][dataPointIndex] ? `<div class="apexcharts-tooltip-text" style="margin-top: 8px;">` +
                        '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">' +
                        "<span style='font-weight:700; color:#000000;'>" +
                        "On Peak: " +
                        "</span>" +
                        "<span style='font-weight:300;color:#000000;'>" + " "
                        +
                        series[0][dataPointIndex] + " " + unit : "")
                    +
                    (series[1][dataPointIndex] ? "</div>"
                        + '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">'
                        + `<span style='font-weight:700;'>` +
                        "Off Peak:: " +
                        "</span>"
                        +
                        "<span style='font-weight:300;'>"
                        + series[1][dataPointIndex] + " " + unit : "")
                    +
                    (series[2][dataPointIndex] ? "</div>"
                        + '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">'
                        + `<span style='font-weight:700;'>` +
                        "Avg.Temp: " +
                        "</span>"
                        +
                        "<span style='font-weight:300;'>"
                        + series[2][dataPointIndex] + "°" : "")
                );
            },
            onDatasetHover: {
                highlightDataSeries: true,
            },
            y: {
                show: true,
                style: {
                    cssClass: 'apexcharts-yaxis-annotation-label',
                },
            },
            x: {
                show: false,
            }
        },
        legend: {
            horizontalAlign: 'right',
            offsetX: 40
        }
    }
    return options;
}