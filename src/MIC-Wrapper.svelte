<svelte:options tag="mic-wrapper" />

<script>
  // @ts-nocheck
  import MicHeaderInformation from "./lib/Components/MIC-HeaderInformation.svelte";
  import BillSelector from "./lib/Components/MIC-BillSelectorAndDownload.svelte";
  import MicBalanceSummary from "./lib/Components/MIC-BalanceSummary.svelte";
  import MicBulkDownload from "./lib/Components/MIC-BulkDownload.svelte";
  // import Insights from "./lib/Components/MIC-Insights.svelte";
  // import ImportantMessage from "./lib/Components/MIC-ImportantMessage.svelte";
  // import BillingSummary from "./lib/Components/MIC-BillingSummary.svelte";
  // import MeterTable from "./lib/Components/MIC-MeterTable.svelte";
  import { getToken, apiToken } from "./js/store";

  let token1;
  //mocking data
  const [token, loading, error, get] = getToken(
    "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/Token.json",
    "Ammar"
  );

  $: if ($apiToken && $apiToken.token) {
    console.log("hapipi", $apiToken.token);
    token1 = $apiToken.token;
    
  }
  $: token1 = token1; // trigger token existence
</script>

{#if $loading && token1 }
  Loading: {$loading}
{:else if $error}
  Error: {$error}
{:else if token1}
  <div class="container" style="width: 100%;">
    <div class="Header">
      <!-- <mic-headerinformation url="https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/accountData.json" token={token1} ></mic-headerinformation> -->
      <MicHeaderInformation token={token1} />
    </div>
    <div class="Billing-message">
      <MicBalanceSummary token={token1} />
      <!-- <mic-balancesummary url="https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@style-adjustment/data/AccountBalanceData.json" token={token1}></mic-balancesummary> -->
      <!-- <mic-importentmessage token={token1} /> -->
    </div>
    <div id="bill-selector">
      <BillSelector token={token1} />
      <!-- <mic-billselector url="https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/BillSelector.json" token={token1} ></mic-billselector> -->
      <!-- <mic-billselector token={token1} /> -->
    </div>
    <div class="Billing">
      <!-- <mic-billingsummary token={token1} /> -->
      <!-- <Insights token={token1} /> -->
      <!-- <mic-insights token={token1} /> -->
      <MicBulkDownload token={token1} />
      </div>
    <div class="meter">
      <!-- <mic-metertable token={token1} /> -->
    </div>
  </div>
{:else}
  <h1>no load</h1>
{/if}

<style>
  .Header {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 30px;
    width: 100%;
    height: 2887.43px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  .Billing {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 2rem;
    width: 100%;
    height: fit-content;
    flex: none;
    order: 1;
    flex-grow: 0;
  }
  .meter {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px;
    gap: 2rem;
    width: 100%;
    height: fit-content;
    flex: none;
    order: 1;
    flex-grow: 0;
  }

  .Billing-message {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px;
    width: 100%;
    gap: 20px;
    height: fit-content;
  }
  #bill-selector {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 2rem;
    width: 100%;
    height: fit-content;
  }

  /**small screen**/
  @media only screen and (max-width: 1000px) {
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0px;
      gap: 70px;
      width: 100%;
      height: 2887.43px;
      flex: none;
      order: 0;
      flex-grow: 0;
    }
    .Billing {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0px;
      gap: 2rem;
      width: 100%;
      height: fit-content;
    }
    .meter {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0px;
      gap: 2rem;
      width: 100%;
      height: fit-content;
    }

    .Billing-message {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0px;
      width: 100%;
      height: fit-content;
      gap: 50px;
    }
    #bill-selector {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0px;
      gap: 2rem;
      width: 100%;
      height: fit-content;
      flex: none;
    }
  }
</style>
