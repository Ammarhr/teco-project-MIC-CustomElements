<svelte:options tag="mic-wrapper" />

<script>
  // @ts-nocheck
  import { setDomain, setToken, generalErr  } from "./js/store";
  import MicHeaderInformation from "./lib/Components/MIC-HeaderInformation.svelte";
  import MicBalanceSummary from "./lib/Components/MIC-BalanceSummary.svelte";
  import MicBillSelectorAndDownload from "./lib/Components/MIC-BillSelectorAndDownload.svelte";
  import MicBulkDownload from "./lib/Components/MIC-BulkDownload.svelte";
  import MicInsights from "./lib/Components/MIC-Insights.svelte";
    import MicGeneralError from "./lib/Components/MIC-GeneralError.svelte";
  export let token;
  export let domain;

  $: if (token || domain) {
    // console.log('this is the token: ', token, "and this is the api domain: ", domain);
    setToken(token);
    setDomain(domain);
  }

</script>

{#if token && domain && !$generalErr}
  <div class="wrapper">
    <!-- <MicBalanceSummary />
    <MicBillSelectorAndDownload />
    <MicBulkDownload />
    <MicInsights /> -->
  <mic-balancesummary></mic-balancesummary>
  <mic-billselector></mic-billselector>
  <mic-bulkdownload></mic-bulkdownload>
  </div>
{:else}
  <!-- <MicGeneralError /> -->
  <mic-generalerror />
{/if}

<style lang="scss">
  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>
