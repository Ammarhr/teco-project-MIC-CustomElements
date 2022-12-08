<script>
  // @ts-nocheck

  import MicWrapper from "./MIC-Wrapper.svelte";
  import MicAccountBalanceDs from "./lib/Components/MIC-AccountBalance-DS.svelte";
  import MicBillSelectorAndDownload from "./lib/Components/MIC-BillSelectorAndDownload.svelte";
  import MicBillingSummary from "./lib/Components/MIC-BillingSummary.svelte";
  import MicDraggableContainer from "./lib/Components/MIC-DraggableContainer.svelte";
  import MicHeaderInformation from "./lib/Components/MIC-HeaderInformation.svelte";
  import MicImportantMessage from "./lib/Components/MIC-ImportantMessage.svelte";
  import MicInsights from "./lib/Components/MIC-Insights.svelte";
  import { getToken } from "./js/store";

  let apiToken;

  //mocking data
  const [token, loading, error, get] = getToken("data/Token.json", "Ammar");

  $: if ($token) {
    console.log("toekn form app", $token);
    apiToken = $token.token;
  }
  let items = [
    // {id: 1, name: MicHeaderInformation},
    { id: 2, name: MicBillSelectorAndDownload },
    { id: 3, name: MicBillingSummary },
    { id: 4, name: MicImportantMessage },
    { id: 5, name: MicAccountBalanceDs },
    { id: 6, name: MicInsights },
  ];
  function onDrop(newItems) {
    items = newItems;
  }
</script>

<div>
  {#if $loading}
    Loading: {$loading}
  {:else if $error}
    Error: {$error}
  {:else}
    <MicHeaderInformation token={apiToken} />
    <MicDraggableContainer itemData={items} {onDrop} />
  {/if}
  <!-- <MicWrapper /> -->
</div>
