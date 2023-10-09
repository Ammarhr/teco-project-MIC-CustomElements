import MicBalanceSummary from "../lib/Components/MIC-BalanceSummary.svelte";

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
export default {
    title: 'Web-Components/MIC-BalanceSummary',
    component: MicBalanceSummary,
    tags: ['autodocs'],
    argTypes: {
        color: { control: 'color' },
    },
};

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Agent = {
    args: {
        tries: 3,
        totalAmmountFontSize: "64px",
        subTotalAmmountFontSize: "32px",
    },
};
