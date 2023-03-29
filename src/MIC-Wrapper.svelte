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
  import MicImportantMessagesDetails from "./lib/Components/MIC-ImportantMessagesDetails.svelte";
  import MicYearlyEnergy from "./lib/Components/MIC-YearlyEnergy.svelte";
  import MicBillingSummary from "./lib/Components/MIC-BillingSummary.svelte";
  import MicToolTipDetails from "./lib/Components/MIC-ToolTipDetails.svelte";
  import MicPagination from "./lib/Components/mic-pagination.svelte";
  import MicMeterTable from "./lib/Components/MIC-MeterTable.svelte";
  import { onMount } from "svelte";
  import {
    setDomain,
    setToken,
    generalErr,
    showToolTipDetails,
    setEventDomain,
    newToken,
    persona,
    setAssetsUrl,
  } from "./js/store";
  export let token;
  export let domain;
  export let eventdomain;
  // export let assetspath;
  export let personainput;

  const refresh = () => {
    newToken.set("");
  };
  $: if (token && domain && eventdomain) {
    setToken(token);
    setDomain(domain);
    setEventDomain(eventdomain);
    // setAssetsUrl(assetspath);
    if (personainput == "Agent") {
      persona.set("Agent");
    } else {
      persona.set("customer");
    }
  }

  // $: if ($showToolTipDetails) {
  //   console.log("wrapper", $showToolTipDetails);
  // }
  onMount(() => {
    generalErr.set(false);
    newToken.set("");
    showToolTipDetails.set(false);
  });
  refresh();
</script>

<!-- {#key $showToolTipDetails} -->
{#if token && domain && eventdomain && $generalErr !== true}
  <div class="wrapper">
    <mic-headerinformation />
    <!-- <MicHeaderInformation /> -->
    <div class="important-balance">
      <div class="balance">
        <mic-balancesummary />
        <!-- <MicBalanceSummary /> -->
      </div>
      <div class="messages">
        <mic-importentmessage />
        <!-- <MicImportantMessage /> -->
      </div>
    </div>
    <mic-billselector />
    <!-- <MicBillSelectorAndDownload /> -->
    <div class="refreshable">
      <div class="charge-detailes">
        <mic-billingsummary />
        <!-- <MicBillingSummary /> -->
      </div>
      <div class="insights">
        <mic-insights class="mic-insights" />
        <mic-yearlyenergy class="mic-insights" />
        <!-- <MicInsights /> -->
        <!-- <MicYearlyEnergy /> -->
        <!-- <MicBulkDownload /> -->
        <mic-bulkdownload class="mic-insights" />
      </div>
    </div>
    <!-- <div class="blk-container"> -->
    <!-- <MicBulkDownload /> -->
    <!-- </div> -->
    <mic-metertable />
    <MicMeterTable />
  </div>
{:else if $generalErr === true}
  <mic-generalerror {token} />
  <!-- <MicGeneralError {token} /> -->
{/if}

<!-- {/key} -->
<style lang="scss">
  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    background-color: #f4f5f7;
  }
  .important-balance {
    display: grid;
    flex-direction: row;
    column-gap: 30px;
    grid-template-columns: calc(66.66% - 30px) 33.33%;
    width: 100%;
    @media screen and (max-width: 992px) {
      gap: 30px;
      grid-template-columns: 100%;
    }
  }
  .balance {
    width: 100%;
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }
  .messages {
    @media screen and (max-width: 992px) {
      width: 100%;
      flex-direction: column;
      align-items: flex-end;
    }
  }
  .refreshable {
    display: grid;
    flex-direction: row;
    column-gap: 30px;
    grid-template-columns: calc(66.66% - 30px) 33.33%;
    width: 100%;
    @media screen and (max-width: 992px) {
      grid-template-columns: 100%;
    }
  }
  .charge-detailes {
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }
  .mic-insights {
    width: 100%;
    // max-width: 410px;
    @media screen and (max-width: 767px) {
      max-width: unset;
    }
  }
  .insights {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: end;
    @media screen and (max-width: 992px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .blk-container {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
  }
</style>
