<svelte:options tag="mic-wrapper" />

<script>
  // @ts-nocheck
  import MicHeaderInformation from "./lib/Components/MIC-HeaderInformation.svelte";
  import MicBalanceSummary from "./lib/Components/MIC-BalanceSummary.svelte";
  import MicBillSelectorAndDownload from "./lib/Components/MIC-BillSelectorAndDownload.svelte";
  import MicBulkDownload from "./lib/Components/MIC-BulkDownload.svelte";
  import MicGeneralError from "./lib/Components/MIC-GeneralError.svelte";
  import MicSunSelect from "./lib/Components/MIC-SunSelect.svelte";
  import MicImportantMessage from "./lib/Components/MIC-ImportantMessage.svelte";
  import MicImportantMessagesDetails from "./lib/Components/MIC-ImportantMessagesDetails.svelte";
  import MicYearlyEnergy from "./lib/Components/MIC-YearlyEnergy.svelte";
  import MicMeterTable from "./lib/Components/MIC-MeterTable.svelte";
  import MicComboBill from "./lib/Components/MIC-ComboBill.svelte";
  import MicShadowLoading from "./lib/Components/MIC-ShadowLoading.svelte";
  import MicSummaryBilling from "./lib/Components/MIC-SummaryBilling.svelte";
  import MicInsightsRecomendation from "./lib/Components/MIC-InsightsRecomendation.svelte";
  import { onDestroy, onMount } from "svelte";
  import {
    setDomain,
    setToken,
    generalErr,
    showToolTipDetails,
    persona,
    setSummaryAccountFlag,
    isSummaryAccountFlag,
    setSAPTpken,
    pendingRequest,
    eraseCookie,
    fetchAndRedirect,
    apiToken,
    apiDomain,
    start,
  } from "./js/store";

  export let token;
  export let domain;
  export let personainput;
  export let saptoken = '""';
  export let issummaryaccount = "false";

  $: if (token && domain) {
    setToken(token);
    setDomain(domain);
    setSAPTpken(saptoken);
    // setAssetsUrl(assetspath);
    if (personainput == "Agent") {
      persona.set("Agent");
    } else {
      persona.set("customer");
    }
  }
  $: if (issummaryaccount) {
    setSummaryAccountFlag(issummaryaccount);
  }
  onMount(() => {
    start.set(new Date().getTime());
    generalErr.set(false);
    // newToken.set("");
    showToolTipDetails.set(false);

    fetchAndRedirect(
      $apiToken,
      `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
      null,
      {
        EventCode: "IBILL_START",
        Outcome: ``,
        Feedback: "",
        Persona: $persona,
      }
    );
  });
  // window.onload = function () {
  //   fetchAndRedirect(
  //     $apiToken,
  //     `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
  //     null,
  //     {
  //       EventCode: "IBILL_START",
  //       Outcome: ``,
  //       Feedback: "",
  //       Persona: $persona,
  //     }
  //   );
  // };
  window.addEventListener("beforeunload", () => {
    fetchAndRedirect(
      $apiToken,
      `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
      null,
      {
        EventCode: "IBILL_END",
        Outcome: ``,
        Feedback: "",
        Persona: $persona,
      }
    );
    eraseCookie("MIC-IBLL-MIJ");
  });
</script>

{#if token && domain && saptoken && $generalErr !== true}
  <div class="wrapper">
    {#if $pendingRequest && $pendingRequest.length > 0}
      <div class="loading-screen">
        <div class="bouncing-loader">
          <div />
          <div />
          <div />
        </div>
      </div>
    {/if}
    <!-- <mic-headerinformation /> -->
    <!-- <MicHeaderInformation /> -->
    <div class="important-balance">
      <div class="balance">
        <mic-balancesummary />
        <MicBalanceSummary />
      </div>
      <div class="messages">
        <mic-importentmessage />
        <!-- <MicImportantMessage /> -->
      </div>
    </div>
    <mic-billselector />
    <!-- <MicBillSelectorAndDownload /> -->
    {#if $isSummaryAccountFlag.toLowerCase() == "true"}
      <div class="summary-billing">
        <mic-summarybilling />
        <!-- <MicSummaryBilling /> -->
      </div>
    {/if}
    <mic-combo-bill />
    <!-- <MicComboBill /> -->
    <mic-metertable />
    <!-- <MicMeterTable /> -->
  </div>
{:else if $generalErr === true}
  <!-- <mic-generalerror {token} /> -->
  <MicGeneralError {token} />
{/if}

<style lang="scss">
  @keyframes bouncing-loader {
    to {
      opacity: 0.1;
      transform: translate3d(0, -16px, 0);
    }
  }

  .bouncing-loader {
    display: flex;
    justify-content: center;
  }

  .bouncing-loader > div {
    width: 16px;
    height: 16px;
    margin: 3rem 0.2rem;
    background: #8385aa;
    border-radius: 50%;
    animation: bouncing-loader 0.6s infinite alternate;
  }

  .bouncing-loader > div:nth-child(2) {
    animation-delay: 0.2s;
  }

  .bouncing-loader > div:nth-child(3) {
    animation-delay: 0.4s;
  }
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f57f;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .loading-text {
    font-size: 24px;
    color: #333;
    text-align: center;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    padding: 0px 16px 0 16px;
    width: calc(100% - 32px);
    gap: 30px;
    background-color: #ffffff00;
    font-family: "Interstate" !important;
    * {
      font-family: "Interstate" !important;
    }
  }
  .important-balance {
    display: grid;
    flex-direction: row;
    column-gap: 30px;
    row-gap: 30px;
    grid-template-columns: calc(66.66% - 30px) 33.33%;
    width: 100%;
    @media screen and (max-width: 992px) {
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
