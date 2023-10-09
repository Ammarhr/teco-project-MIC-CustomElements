import MicWrapper from '../MIC-Wrapper.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
export default {
  title: 'Web-Components/MIC-Wrapper',
  component: MicWrapper,
  tags: ['autodocs'],
  argTypes: {
  },
};

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Agent = {
  args: {
    token: "generated_token",
    domain: "portal_domain",
    personainput: "Agent",
    issummaryaccount: "False",
    saptoken:"sap_token"
  },
};
export const Customer = {
  args: {
    token: "generated_token",
    domain: "portal_domain",
    personainput: "",
    issummaryaccount: "False",
    saptoken:"sap_token"
  },
};
export const SummaryAccount = {
  args: {
    token: "generated_token",
    domain: "portal_domain",
    personainput: "",
    issummaryaccount: "True",
    saptoken:"sap_token"
  },
};
