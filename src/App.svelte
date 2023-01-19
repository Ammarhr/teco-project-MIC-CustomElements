<svelte:options tag={"my-app"} />

<script>
  // @ts-nocheck
  import MicWrapper from "./MIC-Wrapper.svelte";
  import MicHeaderInformation from "./lib/Components/MIC-HeaderInformation.svelte";
  import MicBalanceSummary from "./lib/Components/MIC-BalanceSummary.svelte";
  import MicBillSelectorAndDownload from "./lib/Components/MIC-BillSelectorAndDownload.svelte";
  import MicBulkDownload from "./lib/Components/MIC-BulkDownload.svelte";
  import "./app.css";
</script>

<div class="app-container">
  <MicWrapper />
</div>

<style>
  .app-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
