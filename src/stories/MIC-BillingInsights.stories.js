import MicBillInsightsCombo from "../lib/Components/MIC-BillInsights-combo.svelte";
// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
export default {
    title: 'Web-Components/MIC-BillInsightsCombo',
    component: MicBillInsightsCombo,
    tags: ['autodocs'],
    argTypes: {

    },
};

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary = {
    args: {
        insightservices: [
            {
                "serviceName": "Electric",
                "BillContractNo": "5200217835",
                "ZInstallBillClass": "Residential",
                "monthly": {
                    "VisibilityTab": true,
                    "unit": "kWh",
                    "valueConsumption": 1333,
                    "percentageConsumption": 25,
                    "valueTemp": 64,
                    "percentageTemp": -2,
                    "y": {
                        "data": [
                            1066,
                            1333
                        ]
                    },
                    "x": [
                        "JAN 2020",
                        "FEB 2020"
                    ],
                    "CurrentFactorValue": 34.95,
                    "CurrentFactorDate": "FEB 2020",
                    "PreviousFactorValue": 24.49,
                    "PreviousFactorDate": "JAN 2020",
                    "LoadFactorArrowComparison": 0,
                    "CurrentDemandValue": 5,
                    "DemandUnit": "kW"
                },
                "yearly": {
                    "VisibilityTab": true,
                    "unit": "kWh",
                    "valueConsumption": 155,
                    "percentageConsumption": 30,
                    "valueTemp": 50,
                    "percentageTemp": -5,
                    "y": {
                        "data": [
                            1777,
                            1150
                        ]
                    },
                    "x": [
                        "JAN 2020",
                        "FEB 2020"
                    ],
                    "CurrentFactorValue": 44.95,
                    "CurrentFactorDate": "FEB 2020",
                    "PreviousFactorValue": 15.49,
                    "PreviousFactorDate": "JAN 2020",
                    "LoadFactorArrowComparison": 0,
                    "CurrentDemandValue": 5,
                    "DemandUnit": "kW"
                }
            }
        ],
        sunselectdata: [],
        emptytabs: [],
        arrayofbody: [{
            TempPreviousValue: 20,
            TempLastyearValue: 40,
            BillingClass: "class",
            Division: "DVR",
            MonthlyUsageConsumption: -20,
            YearlyUsageConsumption: 10,
        }],
    },
};
export const MonthlyOnly = {
    args: {
        insightservices: [
            {
                "serviceName": "Electric",
                "BillContractNo": "5200217835",
                "ZInstallBillClass": "Residential",
                "monthly": {
                    "VisibilityTab": true,
                    "unit": "kWh",
                    "valueConsumption": 1333,
                    "percentageConsumption": 25,
                    "valueTemp": 64,
                    "percentageTemp": -2,
                    "y": {
                        "data": [
                            1066,
                            1333
                        ]
                    },
                    "x": [
                        "JAN 2020",
                        "FEB 2020"
                    ],
                    "CurrentFactorValue": 34.95,
                    "CurrentFactorDate": "FEB 2020",
                    "PreviousFactorValue": 24.49,
                    "PreviousFactorDate": "JAN 2020",
                    "LoadFactorArrowComparison": 0,
                    "CurrentDemandValue": 5,
                    "DemandUnit": "kW"
                },
                "yearly": {
                    "VisibilityTab": false,
                }
            }
        ],
        sunselectdata: [],
        emptytabs: [],
        arrayofbody: [{
            TempPreviousValue: 20,
            TempLastyearValue: 40,
            BillingClass: "class",
            Division: "DVR",
            MonthlyUsageConsumption: -20,
            YearlyUsageConsumption: 10,
        }],
    },
};
export const YearlyOnly = {
    args: {
        insightservices: [
            {
                "serviceName": "Electric",
                "BillContractNo": "5200217835",
                "ZInstallBillClass": "Residential",
                "monthly": {
                    "VisibilityTab": false,
                },
                "yearly": {
                    "VisibilityTab": true,
                    "unit": "kWh",
                    "valueConsumption": 155,
                    "percentageConsumption": 30,
                    "valueTemp": 50,
                    "percentageTemp": -5,
                    "y": {
                        "data": [
                            1777,
                            1150
                        ]
                    },
                    "x": [
                        "JAN 2020",
                        "FEB 2020"
                    ],
                    "CurrentFactorValue": 44.95,
                    "CurrentFactorDate": "FEB 2020",
                    "PreviousFactorValue": 15.49,
                    "PreviousFactorDate": "JAN 2020",
                    "LoadFactorArrowComparison": 0,
                    "CurrentDemandValue": 5,
                    "DemandUnit": "kW"
                }
            }
        ],
        sunselectdata: [],
        emptytabs: [],
        arrayofbody: [{
            TempPreviousValue: 20,
            TempLastyearValue: 40,
            BillingClass: "class",
            Division: "DVR",
            MonthlyUsageConsumption: -20,
            YearlyUsageConsumption: 10,
        }],
    },
};
export const NoRecommendation = {
    args: {
        insightservices: [
            {
                "serviceName": "Electric",
                "BillContractNo": "5200217835",
                "ZInstallBillClass": "Residential",
                "monthly": {
                    "VisibilityTab": true,
                    "unit": "kWh",
                    "valueConsumption": 1333,
                    "percentageConsumption": 25,
                    "valueTemp": 64,
                    "percentageTemp": -2,
                    "y": {
                        "data": [
                            1066,
                            1333
                        ]
                    },
                    "x": [
                        "JAN 2020",
                        "FEB 2020"
                    ],
                    "CurrentFactorValue": 34.95,
                    "CurrentFactorDate": "FEB 2020",
                    "PreviousFactorValue": 24.49,
                    "PreviousFactorDate": "JAN 2020",
                    "LoadFactorArrowComparison": 0,
                    "CurrentDemandValue": 5,
                    "DemandUnit": "kW"
                },
                "yearly": {
                    "VisibilityTab": true,
                    "unit": "kWh",
                    "valueConsumption": 155,
                    "percentageConsumption": 30,
                    "valueTemp": 50,
                    "percentageTemp": -5,
                    "y": {
                        "data": [
                            1777,
                            1150
                        ]
                    },
                    "x": [
                        "JAN 2020",
                        "FEB 2020"
                    ],
                    "CurrentFactorValue": 44.95,
                    "CurrentFactorDate": "FEB 2020",
                    "PreviousFactorValue": 15.49,
                    "PreviousFactorDate": "JAN 2020",
                    "LoadFactorArrowComparison": 0,
                    "CurrentDemandValue": 5,
                    "DemandUnit": "kW"
                }
            }
        ],
        sunselectdata: [],
        emptytabs: [],
        arrayofbody: "",
    },
};

export const WithRecommendation = {
    args: {
        insightservices: [
            {
                "serviceName": "Electric",
                "BillContractNo": "5200217835",
                "ZInstallBillClass": "Residential",
                "monthly": {
                    "VisibilityTab": true,
                    "unit": "kWh",
                    "valueConsumption": 1333,
                    "percentageConsumption": 25,
                    "valueTemp": 64,
                    "percentageTemp": -2,
                    "y": {
                        "data": [
                            1066,
                            1333
                        ]
                    },
                    "x": [
                        "JAN 2020",
                        "FEB 2020"
                    ],
                    "CurrentFactorValue": 34.95,
                    "CurrentFactorDate": "FEB 2020",
                    "PreviousFactorValue": 24.49,
                    "PreviousFactorDate": "JAN 2020",
                    "LoadFactorArrowComparison": 0,
                    "CurrentDemandValue": 5,
                    "DemandUnit": "kW"
                },
                "yearly": {
                    "VisibilityTab": true,
                    "unit": "kWh",
                    "valueConsumption": 155,
                    "percentageConsumption": 30,
                    "valueTemp": 50,
                    "percentageTemp": -5,
                    "y": {
                        "data": [
                            1777,
                            1150
                        ]
                    },
                    "x": [
                        "JAN 2020",
                        "FEB 2020"
                    ],
                    "CurrentFactorValue": 44.95,
                    "CurrentFactorDate": "FEB 2020",
                    "PreviousFactorValue": 15.49,
                    "PreviousFactorDate": "JAN 2020",
                    "LoadFactorArrowComparison": 0,
                    "CurrentDemandValue": 5,
                    "DemandUnit": "kW"
                }
            }
        ],
        sunselectdata: [],
        emptytabs: [],
        arrayofbody: [{
            TempPreviousValue: 20,
            TempLastyearValue: 40,
            BillingClass: "class",
            Division: "DVR",
            MonthlyUsageConsumption: -20,
            YearlyUsageConsumption: 10,
        }],
    },
};