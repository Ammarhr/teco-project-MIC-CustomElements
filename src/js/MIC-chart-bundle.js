// import { Label } from "@amcharts/amcharts5";
// import cloudIcon from "../assets/usage-cloud.svg"
// import tempLegend from "../assets/temp-legend.svg"
export const renderBarChart = (data, labels, colorsArr, width, height, unit, max) => {
    console.log(-1 * (height / 5), "height");
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

                return (
                    val.toLocaleString()
                )
            },
            offsetY: -25,
            style: {
                fontSize: '14px',
                fontWeight: 400,
                fontFamily: 'Interstate',
                colors: '#bbbb',
                display: "flex"
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
            title: {
                text: unit,
                rotate: 0,
                offsetX: 30,
                offsetY: -1 * (height / 2.2),
                style: {
                    color: "#005FAA",
                    fontSize: '12px',
                    fontFamily: 'Interstate',
                    fontWeight: 300,
                    cssClass: 'insights-apexcharts-yaxis-title',
                },
            },
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
                style: {
                    colors: [],
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label',
                },
                formatter: function ( /** @type {Number} */ val) {
                    return (
                        Math.floor(val)
                    )
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


export const renderMixChart = (data, color, width, height, service, unit, chartUnit, temp, monthly, onOffPeakDemand, customLegend) => {
    // console.log(color, 'color');
    let filterData;
    let toolTipUsage = chartUnit == "cost" ? "Cost:" : service == "Gas" ? "Gas Used: " : onOffPeakDemand ? onOffPeakDemand : "Energy Used: "
    let chartLegend = customLegend ? customLegend.toUpperCase() : service.toUpperCase();
    if (data && chartUnit == "cost") {
        unit = "$"
        filterData = data.map((results) => {
            if (results.Cost !== '') {
                return results.Cost?.split(",").join('')
            } else {
                return null
            }
        })
    } else if (data && chartUnit == "usage") {
        filterData = data.map((results) => {
            if (results.Usage !== "") {
                return parseFloat(results.Usage?.split(",").join(''))
            } else {
                return null
            }
        })
    } else {
        if (data)
            filterData = data.map((results) => {
                if (results.Usage !== "") {
                    return parseFloat(results.Usage?.split(",").join(''))
                } else {
                    return null
                }
            })
    }
    if (filterData && filterData.length < 5 && filterData.length !== 0) {
        filterData = [...filterData, 0, 0, 0, 0, 0]
    }
    let colWidth;
    let serviceData;
    let tempData;
    let catArray = [];
    let daysArray = []
    let cloudArray = [];
    if (data && data.length > 0) {
        if (chartUnit !== "cost") {
            unit = data[0].UOM;
        }
        serviceData = data.filter((results) => {
            if (results.Usage !== "") {
                if (results.CloudIcon == "X") {
                    cloudArray.push({
                        x: results.Perioddate,
                        y: parseFloat(results.Usage?.split(",").join('')) + parseFloat(results.Usage?.split(",").join('')) * 0.1,
                        yAxisIndex: 0,
                        seriesIndex: 0,
                        image: {
                            path: 'https://tecocdn.azureedge.net/ibill/iBill-assets/usage-cloud.svg',
                            width: 30,
                            height: 30,
                            offsetX: 0,
                            offsetY: 0,
                        }
                    })
                }
                return parseFloat(results.Usage?.split(",").join(''))
            }
        })
        tempData = data.map((results) => {
            return results.Temperature;
        })
        catArray = data.map((results) => {
            return results.Perioddate.toUpperCase();
        })
        daysArray = data.map((results) => {
            return results.Days;
        })
    }

    //* configure column width depend on the data 
    if (data && data.length < 5) {
        colWidth = "20%"
    } else {
        colWidth = "90px"
    }
    let options
    if ((!serviceData || serviceData.length == 0) && (!tempData || tempData.length == 0)) {
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
            ],
        }
    } else {

        options = {
            series: [
                {
                    type: "column",
                    name: chartLegend,
                    color: `${color}`,
                    data: filterData
                },
                temp == true && data.map((results) => {
                    return results.Temperature
                }).length > 0 ? {
                    type: "line",
                    name: "TEMPERATURE",
                    color: "#FF832B",
                    data: data.map((results) => {
                        if (results.Temperature !== '') {
                            return results.Temperature
                        } else {
                            return null
                        }
                    }),
                } : {
                    type: "line",
                    name: " ",
                    color: "#ffffff00",
                    data: []
                }
            ],
            fill: {
                opacity: 100,
                colors: [`${color}`],
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
            },
            plotOptions: {
                bar: {
                    position: 'left',
                    borderRadiusWhenStacked: 'last',
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                    endingShape: 'rounded',
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
                        return ``
                },
            },
            legend: {
                show: true,
                horizontalAlign: 'right',
                onItemClick: {
                    toggleDataSeries: false
                },
                onItemHover: {
                    highlightDataSeries: false
                },
                labels: {
                    colors: undefined,
                    useSeriesColors: false
                },
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    fillColors: undefined,
                    radius: 12,
                    onClick: undefined,
                    offsetX: 0,
                    offsetY: 0
                },
            },
            annotations: {
                points: cloudArray,
            },
            tooltip: {
                enabled: true,
                followCursor: true,
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    let arr;
                    arr = data.map((results) => {
                        return results.FullDate
                    })
                    if (arr[dataPointIndex] && (series[0] && series[0][dataPointIndex] || series[1] && series[1][dataPointIndex])) {

                        return (
                            '<div class=" apexcharts-theme-light apexcharts-active" style="padding:12px; min-width:150px">' +
                            '<div style="padding-bottom:8px; border-bottom:1px solid #EAECEE; margin-bottom: 8px;">' +
                            "<span style='font-weight:700; color:#005FAA; '>" +
                            arr[dataPointIndex] +
                            "</div>"
                            +
                            `<div  style="padding:6px">`
                            +
                            (series[0] && series[0][dataPointIndex] ? `<div class="apexcharts-tooltip-text">` +
                                '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">' +
                                "<span style='font-weight:700; color:#000000; margin-right:6px; margin-bottom:6px'>" +
                                toolTipUsage +
                                "</span>" +
                                "<span style='font-weight:300;color:#000000;'>" + " "
                                +
                                (chartUnit == "cost" ? unit + " " + series[0][dataPointIndex].toLocaleString()
                                    : series[0][dataPointIndex].toLocaleString() + " " + unit) : "")
                            +
                            (series[1] && series[1][dataPointIndex] ? "</div>"
                                + '<div class="arrow_box" style="display:flex;  flex-direction:row; justify-content: space-between;  margin-bottom: 6px;">'
                                + `<span style='font-weight:700; '>` +
                                "Avg. Temp: " +
                                "</span>"
                                +
                                "<span style='font-weight:300;'>"
                                + series[1][dataPointIndex] + "°" : "")
                            +
                            (monthly === true && daysArray[dataPointIndex] ? "</div>"
                                + '<div class="arrow_box" style="display:flex;  flex-direction:row; justify-content: space-between;">'
                                + `<span style='font-weight:700; '>` +
                                "Billing Days: " +
                                "</span>"
                                +
                                "<span style='font-weight:300;'>"
                                + daysArray[dataPointIndex] : "")
                        );
                    } else {
                        return ''
                    }
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
                // min: 13,
                // range: 13,
                type: "category",
                labels: {
                    rotate: -45
                },
                axisBorder: {
                    show: true,
                    color: '#000000',
                    height: 1,
                    width: '100%',
                    offsetX: 0,
                    offsetY: -0.5
                },
                categories: catArray.length > 3 ? catArray : [...catArray, '', '', '', '', ''],
                tickPlacement: 'between',
                tooltip: {
                    enabled: false
                },

            },
            yaxis: [
                {
                    title: {
                        show: false,
                        text: ""
                    },
                    labels: {
                        show: true,
                        formatter: function (val) {
                            return val;
                        },
                    },
                },
                {
                    opposite: true,
                    title: {
                        show: false,
                        text: ""
                    },
                    labels: {
                        show: false,
                        formatter: function (val) {
                            return val;
                        },
                    },
                }
            ],

        }
    }

    return options;
}


export const onPeakOffPeakChart = (data, unit, monthly, days, temp, onPeak, offPeak, color, chartUnit) => {

    let costArray = [];
    let costArrayOff = [];
    let daysArray = []
    if (data && chartUnit == "cost" && onPeak == "x" && offPeak == "x") {
        costArray = data.filter((result, i) => onPeak == "x" && offPeak !== "x" ? true : onPeak == "x" && offPeak == "x" && monthly == true ? result.Operand == "HIST_PKKWH" : result.Dtype == "dtoun").map(value => parseFloat(value.Cost?.split(",").join('')).toFixed(2))
        costArrayOff = data.filter((result, i) => onPeak == "x" && offPeak !== "x" ? true : onPeak == "x" && offPeak == "x" && monthly == true ? result.Operand == "HIST_OFKWH" : result.Dtype == "dtouf").map(value => parseFloat(value.Cost?.split(",").join('')))
    } else if (chartUnit == "cost") {
        if (onPeak == "x") {
            costArray = data.map(res => res.Cost)

        } else if (offPeak == "x") {
            costArrayOff = data.map(res => res.Cost)
        }
    }
    if (data) {
        daysArray = chartUnit == "usage" ? data.filter((result, i) => onPeak == "x" && offPeak !== "x" || onPeak !== "x" && offPeak == "x" ? true : onPeak == "x" && offPeak == "x" && monthly == true ? result.Operand == "HIST_PKKWH" : result.Dtype == "dtoun").map(value => value.Days) : data.map(value => value.Days)
    }

    let serisData = chartUnit == "usage" ? [onPeak == "x" ? {
        name: 'OnPeak',
        type: 'column',
        color: "#00B6F0",
        data: data.filter((result, i) => onPeak == "x" && offPeak !== "x" ? true : onPeak == "x" && offPeak == "x" && monthly == true ? result.Operand == "HIST_PKKWH" : result.Dtype == "dtoun")
            .map(value => value.Usage !== "" ? parseFloat(value.Usage?.split(",").join('')) : null)
    } : {
        name: '',
        type: 'column',
        color: "#ffffff",
        data: []
    }, offPeak == "x" ? {
        name: 'OffPeak',
        type: 'column',
        color: "#00294A",
        data: data.filter((result, i) => onPeak !== "x" && offPeak == "x" ? true : onPeak == "x" && offPeak == "x" && monthly == true ? result.Operand == "HIST_OFKWH" : result.Dtype == "dtouf")
            .map(value => value.Usage !== "" ? parseFloat(value.Usage?.split(",").join('')) : null)
    } : {
        name: '',
        type: 'column',
        color: "#ffffff",
        data: []
    }, {
        name: 'TEMPERATURE',
        type: 'line',
        data: temp == true && onPeak == "x" && offPeak == "x" ? data.filter((result, i) => monthly == true ? result.Operand == "HIST_PKKWH" : result.Dtype == "dtoun")
            .map(value => value.Temperature !== "" ? value.Temperature : null) : temp == true ? data.map(value => value.Temperature !== "" ? value.Temperature : null) : []
    }] : [onPeak == "x" ? {
        name: 'OnPeak',
        type: 'column',
        color: "#00B6F0",
        data: data.filter((result, i) => onPeak == "x" && offPeak !== "x" ? true : onPeak == "x" && offPeak == "x" && monthly == true ? result.Operand == "HIST_PKKWH" : result.Dtype == "dtoun")
            .map(value => value.Cost !== "" ? parseFloat(value.Cost?.split(",").join('')) : null)
    } : {
        name: '',
        type: 'column',
        color: "#ffffff",
        data: []
    }, offPeak == "x" ? {
        name: 'OffPeak',
        type: 'column',
        color: onPeak !== "x" && offPeak == "x" ? `${color}` : "#00294A",
        data: data.filter((result, i) => onPeak !== "x" && offPeak == "x" ? true : onPeak == "x" && offPeak == "x" && monthly == true ? result.Operand == "HIST_OFKWH" : result.Dtype == "dtouf")
            .map(value => value.Cost !== "" ? parseFloat(value.Cost?.split(",").join('')) : null)
    } : {
        name: '',
        type: 'column',
        color: "#ffffff",
        data: []
    }, {
        name: 'TEMPERATURE',
        type: 'line',
        data: temp == true && onPeak == "x" && offPeak == "x" ? data.filter((result, i) => monthly == true ? result.Operand == "HIST_PKKWH" : result.Dtype == "dtoun")
            .map(value => value.Temperature !== "" ? value.Temperature : null) : temp == true ? data.map(value => value.Temperature !== "" ? value.Temperature : null) : []
    }]

    let colWidth;
    if (data && data.length < 5) {
        colWidth = "20%"
    } else {
        colWidth = "90px"
    }

    let options;
    if (!data.length) {
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
            ],
        }
    } else {
        options = {
            series: serisData,
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
                categories: data.filter((result, i) => onPeak !== "x" && offPeak == "x" || onPeak == "x" && offPeak !== "x" ? true : onPeak == "x" && offPeak == "x" && monthly == true ? result.Operand == "HIST_PKKWH" : result.Dtype == "dtoun")
                    .map(value => value.Perioddate),
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: true,
                    color: '#000000',
                    height: 1,
                    width: '100%',
                    offsetX: 0,
                    offsetY: -0.5
                },
                tooltip: {
                    enabled: false
                },
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
            plotOptions: {
                bar: {
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                    columnWidth: colWidth,
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
                    arr = data.filter((result, i) => onPeak !== "x" && offPeak == "x" || onPeak == "x" && offPeak !== "x" ? true : onPeak == "x" && offPeak == "x" && monthly == true ? result.Operand == "HIST_PKKWH" : result.Dtype == "dtoun")
                        .map(value => value.FullDate)
                    if (arr[dataPointIndex] && (series[0] && series[0][dataPointIndex] || series[1] && series[1][dataPointIndex]) || series[2] && series[2][dataPointIndex]) {

                        return (
                            '<div class="apexcharts-theme-light apexcharts-active" style="padding:12px; min-width:150px">' +
                            '<div class="apexcharts-theme-light apexcharts-active" style="min-width:150px">' +
                            '<div style="padding-bottom:8px width:100%; color:#005FAA; border-bottom:1px solid #EAECEE;">' +
                            "<span style='font-weight:700;'>" +
                            arr[dataPointIndex] +
                            "</div>"
                            + (chartUnit == "usage" ? (`<div class="apexcharts-tooltip-text" style="margin-top: 8px;">` +
                                (series[0] && series[0][dataPointIndex] ? "</div>" +
                                    '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">' +
                                    "<span style='font-weight:700; color:#000000; margin-bottom:6px'>" +
                                    "On Peak: " +
                                    "</span>" +
                                    "<span style='font-weight:300;color:#000000;'>" + " "
                                    +
                                    series[0][dataPointIndex].toLocaleString() + " " + unit : "")
                                +
                                (series[1] && series[1][dataPointIndex] ? "</div>"
                                    +
                                    '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">'
                                    + `<span style='font-weight:700; margin-bottom:6px'>` +
                                    "Off Peak: " +
                                    "</span>"
                                    +
                                    "<span style='font-weight:300;'>"
                                    + series[1][dataPointIndex].toLocaleString() + " " + unit : "")) :

                                (costArrayOff[dataPointIndex] && costArrayOff[dataPointIndex] !== "0.00") || (costArray[dataPointIndex] && costArray[dataPointIndex] !== "0.00") ?
                                    '<div style="padding-top:14px"> ' +
                                    (costArray[dataPointIndex] && costArray[dataPointIndex] !== "0.00" ?
                                        ("</div>"
                                            +
                                            '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">'
                                            + `<span style='font-weight:700; margin-bottom:6px'>` +
                                            "OnPeak: " +
                                            "</span>"
                                            +
                                            "<span style='font-weight:300;'>"
                                            +
                                            "$ " + costArray[dataPointIndex].toLocaleString()) : "")
                                    +
                                    (costArrayOff[dataPointIndex] && costArrayOff[dataPointIndex] !== "0.00" ? ("</div>"
                                        +
                                        '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">'
                                        + `<span style='font-weight:700; margin-bottom:6px'>` +
                                        "OffPeak: " +
                                        "</span>"
                                        +
                                        "<span style='font-weight:300;'>"
                                        + "$ " + costArrayOff[dataPointIndex].toLocaleString()) : "") : ""

                            )
                            +
                            (series[2] && series[2][dataPointIndex] ? "</div>"
                                + '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">'
                                + `<span style='font-weight:700; margin-bottom:6px'>` +
                                "Avg. Temp: " +
                                "</span>"
                                +
                                "<span style='font-weight:300;'>"
                                + series[2][dataPointIndex] + "°" : "") +
                            (daysArray && monthly == true ? "</div>"
                                + '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">'
                                + `<span style='font-weight:700; margin-bottom:6px'>` +
                                "Billing Days: " +
                                "</span>"
                                +
                                "<span style='font-weight:300;'>"
                                + daysArray[dataPointIndex] : '')
                        );
                    } else {
                        return ''
                    }
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
                offsetX: 40,
                onItemClick: {
                    toggleDataSeries: false
                },
                onItemHover: {
                    highlightDataSeries: false
                },
            }
        }
    }
    return options;
}