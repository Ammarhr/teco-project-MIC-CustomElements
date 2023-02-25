<svelte:options tag="mic-wrapper" />

<script>
  // @ts-nocheck
  import {
    setDomain,
    setToken,
    generalErr,
    setEventDomain,
    newToken,
  } from "./js/store";
  import MicHeaderInformation from "./lib/Components/MIC-HeaderInformation.svelte";
  import MicBalanceSummary from "./lib/Components/MIC-BalanceSummary.svelte";
  import MicBillSelectorAndDownload from "./lib/Components/MIC-BillSelectorAndDownload.svelte";
  import MicBulkDownload from "./lib/Components/MIC-BulkDownload.svelte";
  import MicInsights from "./lib/Components/MIC-Insights.svelte";
  import MicRenderError from "./lib/Components/MIC-RenderError.svelte";
  import MicGeneralError from "./lib/Components/MIC-GeneralError.svelte";
  import MicSunSelect from "./lib/Components/MIC-SunSelect.svelte";
  import MicImportantMessage from "./lib/Components/MIC-ImportantMessage.svelte";
  import MicYearlyEnergy from "./lib/Components/MIC-YearlyEnergy.svelte";
  import { onMount } from "svelte";
  export let token;
  export let domain;
  export let eventdomain;
  const refresh = () => {
    newToken.set("");
  };
  $: if (token && domain && eventdomain) {
    setToken(token);
    setDomain(domain);
    setEventDomain(eventdomain);
  }
  onMount(() => {
    generalErr.set(false);
    newToken.set("");
  });
  refresh();
</script>

{#key token}
  {#if token && domain && eventdomain && $generalErr !== true}
    <div class="wrapper">
      <mic-headerinformation />
      <!-- <MicHeaderInformation /> -->
      <div class="important-balance">
        <mic-balancesummary />
        <mic-importentmessage />
        <!-- <MicBalanceSummary /> -->
        <!-- <MicImportantMessage /> -->
      </div>
      <mic-billselector />
      <!-- <MicBillSelectorAndDownload /> -->
      <div class="refreshable">
        <div class="charge-detailes" />
        <div class="insights">
          <mic-insights />
          <mic-sunselect />
          <mic-yearlyenergy />
          <!-- <MicInsights /> -->
          <!-- <MicSunSelect /> -->
          <!-- <MicYearlyEnergy /> -->
          <!-- <MicBulkDownload /> -->
        </div>
      </div>
      <div class="blk-container">
        <mic-bulkdownload />
      </div>
    </div>
  {:else if $generalErr === true}
    <mic-generalerror {token} />
  {/if}
{/key}

<style lang="scss">
  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .important-balance {
    // display: flex;
    // flex-direction: row;
    // align-items: flex-start;
    gap: 30px;
    width: 100%;
    @media screen and (max-width: 833px) {
      flex-direction: column;
      align-items: flex-end;
    }
  }
  .refreshable {
    display: flex;
    flex-direction: row;
    gap: 30px;
    @media screen and (max-width: 767px) {
      flex-direction: column;
      align-items: flex-end;
    }
  }
  .charge-detailes {
    width: -webkit-fill-available;
    @media screen and (max-width: 767px) {
      width: 100%;
    }
  }
  .insights {
    display: flex;
    flex-direction: column;
    max-width: 40%;
    align-items: end;
    @media screen and (max-width: 767px) {
      max-width: unset;
      display: grid;
      grid-template-columns: 1fr;
    }
  }
</style>
