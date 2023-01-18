<svelte:options tag={"my-app"} />

<script>
  // @ts-nocheck
  import MicWrapper from "./MIC-Wrapper.svelte";
  import "./app.css";
  import MicHeaderInformation from "./lib/Components/MIC-HeaderInformation.svelte";
  import MicBalanceSummary from "./lib/Components/MIC-BalanceSummary.svelte";
  import MicBillSelectorAndDownload from "./lib/Components/MIC-BillSelectorAndDownload.svelte";
  import MicBulkDownload from "./lib/Components/MIC-BulkDownload.svelte";
  // import { getToken ,apiToken } from "./js/store";

  // import MicPagination from "./lib/Components/mic-pagination.svelte";
  // let apiToken;
  // let token1;

  // const [token, loading, error, get] = getToken(
  //   "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/Token.json",
  //   "Ammar"
  // );

  // $: if ($apiToken && $apiToken.token) {
  //   $apiToken.token = $token.token;
  // }

  // let items = [
  //   // {id: 1, name: MicHeaderInformation},
  //   { id: 1, name: MicAccountBalanceDs },
  //   { id: 2, name: MicImportantMessage },
  //   { id: 3, name: MicInsights },
  //   { id: 4, name: MicBillingSummary },
  //   { id: 5, name: MicBillSelectorAndDownload },
  // ];
  // function onDrop(newItems) {
  //   items = newItems;
  // }
</script>

<div class="app-container">
  <!-- <mic-wrapper></mic-wrapper> -->
  <MicWrapper />
  <!-- {#if $loading}
  Loading: {$loading}
{:else if $error}
  Error: {$error}
  {:else if $apiToken.token}
  <MicBalanceDetails token={$apiToken.token}/>
  {:else}
  <h1>failed to load</h1>
  {/if} -->
</div>

<style>
  .app-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
