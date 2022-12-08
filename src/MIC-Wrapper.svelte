<svelte:options tag="mic-wrapper" />

<script>
  // @ts-nocheck
  //svg imports
  import HeaderInformation from "./lib/Components/MIC-HeaderInformation.svelte";
  import ImportantMessage from "./lib/Components/MIC-ImportantMessage.svelte";
  import BillsHistory from "./lib/Components/MIC-AccountBalance-DS.svelte";
  import BillSelector from "./lib/Components/MIC-BillSelectorAndDownload.svelte";
  import BillingSummary from "./lib/Components/MIC-BillingSummary.svelte";
  import Insights from "./lib/Components/MIC-Insights.svelte";

  import { fetchstore } from "./js/store";

  //mocking data
  const [data, loading, error, get] = fetchstore(
    "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/data.json"
  );
</script>

<main>
  {#if $loading}
    Loading: {$loading}
  {:else if $error}
    Error: {$error}
  {:else}
    <div class="Header"><HeaderInformation /></div>
    <div class="container">
      <div class="Billing-message">
        <BillsHistory state={$data} />
        <ImportantMessage state={$data} />
      </div>
      <div id="bill-selector">
        <BillSelector />
      </div>
      <div class="Billing">
        <BillingSummary />
        <Insights />
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 32px;
    width: 100%;
    height: 2355.43px;
    flex: none;
    order: 2;
    flex-grow: 0;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 80px;
    width: 1264px;
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
    gap: 32px;
    width: 100%;
    height: 1338px;
    flex: none;
    order: 2;
    flex-grow: 0;
  }

  .Billing-message {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 32px;
    width: 1258px;
    height: 403px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #bill-selector {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 32px;
    width: 1264px;
    height: 80px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
  }
</style>
