import MicHeaderInformation from "../lib/Components/MIC-HeaderInformation.svelte";

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
export default {
    title: 'Web-Components/MIC-MicHeaderInformation',
    component: MicHeaderInformation,
    tags: ['autodocs'],
    argTypes: {
    },
};

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Agent = {
    args: {
        account: "",
        statusClass: "Inactive"
    },
};
