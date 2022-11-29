<script>
  // @ts-nocheck
  //svg imports
  import HeaderInformation from "./lib/Components/MIC-HeaderInformation.svelte";
  import ImportantMessage from "./lib/Components/MIC-ImportantMessage.svelte";
  import BillsHistory from "./lib/Components/MIC-AccountBalance-DS.svelte";
  import BillSelector from "./lib/Components/MIC-BillSelectorAndDownload.svelte";
  import BillingSummary from "./lib/Components/MIC-BillingSummary.svelte";
  import Insighta from "./lib/Components/MIC-Insights.svelte";

  //mocking data
  let apiKey = "55555";
  let state = {};

  fetch("./data/data.json")
    .then((response) => response.json())
    .then((data) => {
      if (!apiKey) state = { message: "Please provide an api key!" };
      else if (apiKey === "55555") state = { ...data };
      else state = { message: "invalid api key!" };
    })
    .catch((err) => console.log("it is an error ===> ", err));

  //trigger the change of the state
  $: if (state && state.account) {
    console.log(state.account.date, "this is account date");
    state.account.date = state.account.date;
  }
</script>

<main>
  <div class="Header"><HeaderInformation {state} /></div>
  <div class="container">
    <div class="Billing-message">
      <BillsHistory {state} />
      <ImportantMessage {state} />
    </div>
    {#if state.account}
      <div id="bill-selector">
        <BillSelector bind:date={state.account.date} />
      </div>
      <div class="Billing">
        <BillingSummary />
        <Insighta bind:date={state.account.date} />
      </div>
    {/if}
  </div>
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
