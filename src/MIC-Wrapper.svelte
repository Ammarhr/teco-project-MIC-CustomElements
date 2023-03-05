<svelte:options tag="mic-wrapper" />

<script>
  // @ts-nocheck
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
  import MicBillingSummary from "./lib/Components/MIC-BillingSummary.svelte";
  import MicToolTipDetails from "./lib/Components/MIC-ToolTipDetails.svelte";
  import { onMount } from "svelte";
  import {
    setDomain,
    setToken,
    generalErr,
    showToolTipDetails,
    setEventDomain,
    newToken,
  } from "./js/store";
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
  $: if ($showToolTipDetails) {
    console.log("wrapper", $showToolTipDetails);
  }
  onMount(() => {
    generalErr.set(false);
    newToken.set("");
    showToolTipDetails.set(false);
  });
  refresh();
</script>

{#key $showToolTipDetails}
  {#if token && domain && eventdomain && $generalErr !== true && $showToolTipDetails !== true}
    <div class="wrapper">
      <mic-headerinformation />
      <!-- <MicHeaderInformation /> -->
      <!-- <MicBillingSummary /> -->
      <div class="important-balance">
        <div class="balance">
          <mic-balancesummary />
        </div>
        <div class="messages">
          <mic-importentmessage />
        </div>
        <!-- <MicBalanceSummary /> -->
        <!-- <MicImportantMessage /> -->
      </div>
      <mic-billselector />
      <MicBillSelectorAndDownload />
      <div class="refreshable">
        <div class="charge-detailes" />
        <div class="insights">
          <mic-insights />
          <mic-sunselect />
          <mic-yearlyenergy />
          <MicInsights />
          <!-- <MicSunSelect />
          <MicYearlyEnergy /> -->
          <!-- <MicBulkDownload /> -->
        </div>
      </div>
      <div class="blk-container">
        <mic-bulkdownload style="max-width:460px" />
      </div>
    </div>
  {:else if $generalErr === true}
    <mic-generalerror {token} />
  {:else if $showToolTipDetails === true}
    <div class="wrapper">
      <MicToolTipDetails />
    </div>
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
    display: flex;
    flex-direction: row;
    gap: 30px;
    width: 100%;
    justify-content: space-between;
    background: rgba(245, 245, 245, 0.745);
    @media screen and (max-width: 833px) {
      flex-direction: column;
      align-items: flex-end;
    }
  }
  .balance {
    width: 100%;
    @media screen and (max-width: 833px) {
      width: 100%;
      flex-direction: column;
      align-items: flex-end;
    }
  }
  .messages {
    width: 35%;
    @media screen and (max-width: 833px) {
      width: 100%;
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

  .blk-container {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
  }
</style>
