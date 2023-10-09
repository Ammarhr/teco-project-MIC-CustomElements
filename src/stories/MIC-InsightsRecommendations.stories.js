import MicInsightsRecomendation from "../lib/Components/MIC-InsightsRecomendation.svelte";

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
export default {
    title: 'Web-Components/Sub-Components/MIC-InsightsRecomendation',
    component: MicInsightsRecomendation,
    tags: ['autodocs'],
    argTypes: {
    },
};

export const Normal = {
    token: "Jwt",
    body: [{
        TempPreviousValue: 20,
        TempLastyearValu: 40,
        BillingClass: "class",
        Division: "DVR",
        MonthlyUsageConsumption: -20,
        YearlyUsageConsumption: 10,
    }],
    billcontractnumber: "564646851",
}
