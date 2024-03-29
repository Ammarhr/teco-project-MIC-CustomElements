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
                min: 0,
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
                        fontSize: "14px",
                        color: "#6C6C6C",
                        offsetY: 15,
                        fontFamily: "Interstate",
                        fontWeight: 301,
                    },
                    value: {
                        offsetY: -24,
                        fontSize: "18px",
                        color: "#005FAA",
                        fontFamily: "Interstate",
                        fontWeight: 400,
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

const fillArray_helpper = (arr, len, fill) => {
    if (arr.length < len) {
        arr = arr.concat(Array(len - arr.length).fill(fill));
    }
    return arr;
}
export const renderMixChart = (data, color, width, height, service, unit, chartUnit, temp, monthly, onOffPeakDemand, customLegend) => {
    let filterData;
    let toolTipUsage = chartUnit == "cost" ? "Cost:" : service == "Gas" ? "Gas Used: " : onOffPeakDemand ? onOffPeakDemand : "Energy Used: "
    let chartLegend = customLegend ? customLegend.toUpperCase() : service.toUpperCase();
    let max = 0;
    if (data && chartUnit == "cost") {
        unit = "$"
        filterData = data.map((results) => {
            if (results.Cost !== '') {
                return parseFloat(results.Cost?.split(",").join('')).toFixed(2)
            } else {
                return null
            }
        })
    } else if (data && chartUnit == "usage") {
        filterData = data.map((results) => {
            if (results.Usage !== "") {
                if (max < parseFloat(results.Usage?.split(",").join(''))) {
                    max = parseFloat(results.Usage?.split(",").join(''))
                }
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
    if (filterData && filterData.length < 13 && filterData.length !== 0) {
        // filterData = [...filterData, 0, 0, 0, 0, 0]
        filterData = fillArray_helpper(filterData, 13, 0)
    }
    let serviceData;
    let tempData;
    let catArray = [];
    let daysArray = []
    let cloudArray = [];
    if (data && data.length > 0) {
        serviceData = data.map((results) => {
            if (results.Usage !== "") {
                if (results.CloudIcon == "X") {
                    cloudArray.push({
                        x: results.Perioddate.toUpperCase(),
                        y: parseFloat(results.Usage?.split(",").join('')) + (max * 0.05),
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
                return results
            } else {
                if (results.CloudIcon == "X") {
                    cloudArray.push({
                        x: results.Perioddate.toUpperCase(),
                        y: (max * 0.15),
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
                    return results
                } else {
                    return null
                }
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
                    borderRadius: 6,
                    borderRadiusApplication: 'end',
                    endingShape: 'rounded',
                    columnWidth: "70%",
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
                show: false,
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
                    if (arr[dataPointIndex] && (series[0] && series[0][dataPointIndex] || series[1] && series[1][dataPointIndex]) || serviceData[dataPointIndex] && serviceData[dataPointIndex].CloudIcon == "X") {

                        return (
                            '<div class=" apexcharts-theme-light apexcharts-active" style="padding:12px;min-width:150px; max-width:208px">' +
                            '<div style="padding-bottom:8px; border-bottom:1px solid #EAECEE; margin-bottom: 8px;">' +
                            "<span style='font-weight:700; color:#005FAA; '>" +
                            arr[dataPointIndex] +
                            "</div>"
                            +
                            `<div  style="padding:6px">`
                            +
                            (serviceData[dataPointIndex] && serviceData[dataPointIndex].CloudIcon == "X" ? `<div class="apexcharts-tooltip-text" >` +
                                '<div class="arrow_box" style="display:flex;flex-direction:column;align-items:center;white-space: unset !important;width: 100%;white-space: pre-wrap !important;">' +
                                "<span style='font-weight:300; font-size:14px;color:#000000; margin-right:6px; margin-bottom:6px; width:100%'>" +
                                (serviceData[dataPointIndex].ToolTipEstimated !== "" ? serviceData[dataPointIndex].ToolTipEstimated : "Meter is not responding; data will be updated when available") +
                                "</span>" :
                                (((chartUnit == "cost" && series[0] && series[0][dataPointIndex] != null && series[0][dataPointIndex] > 0 || chartUnit != "cost" && series[0] && series[0][dataPointIndex] != null && series[0][dataPointIndex] >= 0 ? `<div class="apexcharts-tooltip-text">` +
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
                                        + series[1][dataPointIndex] + "°" : ""))
                                    +
                                    (monthly === true && daysArray[dataPointIndex] ? "</div>"
                                        + '<div class="arrow_box" style="display:flex;  flex-direction:row; justify-content: space-between;">'
                                        + `<span style='font-weight:700; '>` +
                                        "Billing Days: " +
                                        "</span>"
                                        +
                                        "<span style='font-weight:300;'>"
                                        + daysArray[dataPointIndex] : "")))
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
                categories: fillArray_helpper(catArray, 13, ''),
                tickPlacement: 'between',
                tooltip: {
                    enabled: false
                },
            },
            yaxis: [
                {
                    min: 0,
                    tickAmount: 5,
                    labels: {
                        show: true,
                        formatter: function (val) {
                            return val && val != null && val == 0 ? 0 : val && val % 1 !== 0 && val < 1 ? val.toFixed(2) : val && val > 1 ? parseInt(val) : val;
                        },
                    },
                },
                {
                    min: 0,
                    tickAmount: 5,
                    opposite: true,
                    title: {
                        show: false,
                        text: ""
                    },
                    labels: {
                        show: false,
                        formatter: function (val) {
                            return val && val != null && val == 0 ? 0 : val && val % 1 !== 0 && val < 1 ? val.toFixed(2) : val && val > 1 ? parseInt(val) : val;
                        },
                    },
                }
            ],

        }
    }

    return options;
}


export const onPeakOffPeakChart = (data, unit, monthly, days, temp, onPeak, offPeak, color, chartUnit, height, maxScale, onPeakOprand, offPeakOprand) => {

    let costArray = [];
    let daysArray = []
    let offPeakArray
    let OnPeakArray
    let categoriesArray;
    let serviceData = [];
    let cloudArray = [];
    let multiblyNum = 1;
    let dTounVal = 0, dToufVal = 0;
    let notationY = 0;
    let itirate = 1;
    if (monthly == false) {
        if (data && data.length > 0) {
            serviceData = data.map((results) => {
                if (results.Usage !== "") {
                    if (onPeak == "x" && offPeak == "x") {
                        multiblyNum = 2

                        if (results.CloudIcon == "X" && results.Dtype == "dtouf" || results.CloudIcon == "X" && results.Dtype == "dtoun") {
                            if (results.Dtype == "dtouf") {
                                dToufVal = parseFloat(results.Usage?.split(",").join(''));
                            } else if (results.Dtype == "dtoun") {
                                dTounVal = parseFloat(results.Usage?.split(",").join(''));
                            }
                            if (itirate == 2) {
                                if (dTounVal > dToufVal) {
                                    notationY = dTounVal;
                                } else {
                                    notationY = dToufVal;
                                }
                                cloudArray.push({
                                    x: results.Perioddate.toUpperCase(),
                                    y: notationY + (maxScale * 0.15),
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
                                itirate = 0;
                                dTounVal = 0;
                                dToufVal = 0;
                            }
                            itirate++

                        }
                    } else {
                        if (results.CloudIcon == "X") {
                            cloudArray.push({
                                x: results.Perioddate.toUpperCase(),
                                y: parseFloat(results.Usage?.split(",").join('')) + (maxScale * 0.15),
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
                    }
                    return results
                } else {
                    if (results.CloudIcon == "X" && results.Dtype == "dtouf" || results.CloudIcon == "X" && results.Dtype == "dtoun") {
                        if (itirate == 2) {
                            cloudArray.push({
                                x: results.Perioddate.toUpperCase(),
                                y: (maxScale * 0.15),
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
                            itirate = 0;
                            dTounVal = 0;
                            dToufVal = 0;
                        }
                        itirate++
                        return results
                    } else {
                        return null
                    }
                }
            })
        }
    }


    OnPeakArray = data.filter((result, i) => onPeak == "x" && offPeak !== "x" ? true : onPeak == "x" && offPeak == "x" && monthly == true ? result.Operand == onPeakOprand : result.Dtype == "dtoun")
        .map(value => value.Usage !== "" ? parseFloat(value?.Usage?.split(",").join('')) : null)

    offPeakArray = data.filter((result, i) => onPeak !== "x" && offPeak == "x" ? true : onPeak == "x" && offPeak == "x" && monthly == true ? result.Operand == offPeakOprand : result.Dtype == "dtouf")
        .map(value => value.Usage !== "" ? parseFloat(value?.Usage?.split(",").join('')) : null)

    costArray = data.filter(value => value.Cost !== "0.00" && value.Cost !== "" ? parseFloat(value?.Cost?.split(",").join('')).toFixed(2) : null)
        .map(value => value.Cost)
    categoriesArray = chartUnit == "usage" ? data.filter((result, i) => onPeak !== "x" && offPeak == "x" || onPeak == "x" && offPeak !== "x" ? true : onPeak == "x" && offPeak == "x" && monthly == true ? result.Operand == onPeakOprand : result.Dtype == "dtoun")
        .map(value => value.Perioddate.toUpperCase())
        : data.filter(value => value.Cost !== "0.00" && value.Cost !== "" ? value.Perioddate?.split(",").join('') : null)
            .map(value => value.Perioddate.toUpperCase())

    if (data) {
        daysArray = data.filter((result, i) => onPeak == "x" && offPeak !== "x" ? true : onPeak == "x" && offPeak == "x" && monthly == true ? result.Operand == onPeakOprand : result.Dtype == "dtoun")
            .map(value => value.Days !== "" ? value.Days : null)
    }
    let serisData = chartUnit == "usage" ? ([(onPeak == "x" ? {
        name: 'ONPEAK',
        type: 'column',
        color: "#00B6F0",
        data: fillArray_helpper(OnPeakArray, 13, 0)
    } : {
        name: ' ',
        type: 'column',
        color: "#ffffff",
        data: []
    }), (offPeak == "x" ? {
        name: 'OFFPEAK',
        type: 'column',
        color: "#00294A",
        data: fillArray_helpper(offPeakArray, 13, 0)
    } : {
        name: ' ',
        type: 'column',
        color: "#ffffff",
        data: [],
    }), {
        name: 'TEMPERATURE',
        type: 'line',
        color: "#FF832B",
        data: temp == true && onPeak == "x" && offPeak == "x" ? data.filter((result, i) => monthly == true ? result.Operand == onPeakOprand : result.Dtype == "dtoun")
            .map(value => value.Temperature !== "" ? value.Temperature : null) : temp == true ? data.map(value => value.Temperature !== "" ? value.Temperature : null) : []
    }]) : ([{
        name: 'ELECTRIC',
        type: 'column',
        color: "#044F8D",
        data: fillArray_helpper(costArray, 13, 0)
    }, {
        name: 'TEMPERATURE',
        type: 'line',
        color: "#FF832B",
        data: temp == true && onPeak == "x" && offPeak == "x" ? data.filter((result, i) => monthly == true ? result.Operand == onPeakOprand : result.Dtype == "dtoun")
            .map(value => value.Temperature !== "" ? value.Temperature : null) : temp == true ? data.map(value => value.Temperature !== "" ? value.Temperature : null) : []
    }])

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
                categories: fillArray_helpper(categoriesArray, 13, ''),
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
                    min: 0,
                    max: chartUnit == "usage" ? parseInt(maxScale) + parseInt(maxScale) * 0.1 : undefined,
                    tickAmount: 5,
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: onPeak == "x" && offPeak == "x" || onPeak == "x" && offPeak !== "x" ? true : false,
                        formatter: function (val) {
                            return val && val == 0 ? 0 : val && val % 1 !== 0 && val < 1 ? val.toFixed(2) : val && val > 1 ? parseInt(val) : val;
                        },
                    }
                },
                {
                    min: 0,
                    max: chartUnit == "usage" ? parseInt(maxScale) + parseInt(maxScale) * 0.1 : undefined,
                    tickAmount: 5,
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: onPeak !== "x" && offPeak == "x" ? true : false,
                        formatter: function (val) {
                            return val && val == 0 ? 0 : val && val % 1 !== 0 && val < 1 ? val.toFixed(2) : val && val > 1 ? parseInt(val) : val;
                        },
                    }
                },
                {
                    min: 0,
                    tickAmount: 5,
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false,
                        formatter: function (val) {
                            return val && val == 0 ? 0 : val && val % 1 !== 0 && val < 1 ? val.toFixed(2) : val && val > 1 ? parseInt(val) : val;
                        },
                    }
                }
            ],
            plotOptions: {
                bar: {
                    borderRadius: data.length > 12 ? 1 : 8,
                    borderRadiusApplication: 'end',
                    columnWidth: "70%",
                    dataLabels: {
                        position: "top", // top, center, bottom,
                    },
                    distributed: false,
                }
            },
            annotations: {
                points: cloudArray,
            },
            tooltip: {
                enabled: true,
                followCursor: true,
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    let arr;
                    arr = data.filter((result, i) => onPeak !== "x" && offPeak == "x" || onPeak == "x" && offPeak !== "x" ? true : onPeak == "x" && offPeak == "x" && monthly == true ? result.Operand == onPeakOprand : result.Dtype == "dtoun")
                        .map(value => value.FullDate)
                    if (arr[dataPointIndex] && (series[0] && series[0][dataPointIndex] || series[1] && series[1][dataPointIndex]) || series[2] && series[2][dataPointIndex] || serviceData && serviceData.length > 0 && serviceData[dataPointIndex * multiblyNum] && serviceData[dataPointIndex * multiblyNum].CloudIcon == "X") {

                        return (
                            '<div class="apexcharts-theme-light apexcharts-active" style="padding:12px; min-width:150px">' +
                            '<div class="apexcharts-theme-light apexcharts-active" style="min-width:150px">' +
                            '<div style="padding-bottom:8px width:100%; color:#005FAA; border-bottom:1px solid #EAECEE;">' +
                            "<span style='font-weight:700;'>" +
                            arr[dataPointIndex] +
                            "</div>"
                            +
                            (serviceData && serviceData.length > 0 && serviceData[dataPointIndex * multiblyNum] && serviceData[dataPointIndex * multiblyNum].CloudIcon == "X"
                                ? `<div class="apexcharts-tooltip-text" >` +
                                '<div class="arrow_box" style="display:flex;flex-direction:column;align-items:center;white-space: unset !important;width: 100%;white-space: pre-wrap !important;">' +
                                "<span style='font-weight:300; font-size:14px;color:#000000; margin-right:6px; margin-bottom:6px; width:194px; margin-top:14px;'>"
                                +
                                (serviceData[dataPointIndex * multiblyNum].ToolTipEstimated !== "" ? serviceData[dataPointIndex * multiblyNum].ToolTipEstimated
                                    : "Meter is not responding; data will be updated when available") +
                                "</span>"
                                :
                                ((chartUnit == "usage" ?

                                    (`<div class="apexcharts-tooltip-text" style="margin-top: 8px;">` +
                                        (series[0] && series[0][dataPointIndex] != null && series[0][dataPointIndex] >= 0 ? "</div>" +
                                            '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">' +
                                            "<span style='font-weight:700; color:#000000; margin-bottom:6px'>" +
                                            "On Peak: " +
                                            "</span>" +
                                            "<span style='font-weight:300;color:#000000;'>" + " "
                                            +
                                            series[0][dataPointIndex].toLocaleString() + " " + unit : "")
                                        +
                                        (series[1] && series[1][dataPointIndex] != null && series[1][dataPointIndex] >= 0 ? "</div>"
                                            +
                                            '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">'
                                            + `<span style='font-weight:700; margin-bottom:6px'>` +
                                            "Off Peak: " +
                                            "</span>"
                                            +
                                            "<span style='font-weight:300;'>"
                                            + series[1][dataPointIndex].toLocaleString() + " " + unit : ""))
                                    : (costArray[dataPointIndex] && costArray[dataPointIndex] !== "0.00") ?
                                        '<div style="padding-top:14px"> ' +
                                        (costArray[dataPointIndex] && costArray[dataPointIndex] !== "0.00" ?
                                            ("</div>"
                                                +
                                                '<div class="arrow_box" style="display:flex; flex-direction:row; justify-content: space-between;">'
                                                + `<span style='font-weight:700; margin-bottom:6px'>` +
                                                "Cost: " +
                                                "</span>"
                                                +
                                                "<span style='font-weight:300;'>"
                                                +
                                                "$ " + costArray[dataPointIndex].toLocaleString()) : "")
                                        : ""
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
                                        + daysArray[dataPointIndex] : '')))
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
                show: false,
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