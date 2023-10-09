import MicImportantMessagesDetails__SvelteComponent_ from "../lib/Components/MIC-ImportantMessagesDetails.svelte";

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
export default {
    title: 'Web-Components/Sub-Components/MIC-ImportantMessagesDetails',
    component: MicImportantMessagesDetails__SvelteComponent_,
    tags: ['autodocs'],
    argTypes: {
    },
};

export const Normal = {
    messages: [
        {
            "Title": "Removing Your Envelope.",
            "Code": "MESG_REM_ENVELOPE",
            "message": "<p>We&rsquo;ve noticed that you have been paying your bill electronically lately. To help cut down on clutter and waste, we are no longer including a remittance envelope with your bill. Should you want to mail in your payment, you can request a payment envelope by calling 813-223-0800 or simply use a regular envelope and address it to TECO P.O. Box 31318, Tampa, Florida 33631-3318.</p>\n"
        }
    ],
}
