<svelte:options tag={"my-app"} />

<script>
  // @ts-nocheck
  import MicWrapper from "./MIC-Wrapper.svelte";
  import MicHeaderInformation from "./lib/Components/MIC-HeaderInformation.svelte";
  import MicBalanceSummary from "./lib/Components/MIC-BalanceSummary.svelte";
  import MicBillSelectorAndDownload from "./lib/Components/MIC-BillSelectorAndDownload.svelte";
  import MicBulkDownload from "./lib/Components/MIC-BulkDownload.svelte";
  import MicRenderError from "./lib/Components/MIC-RenderError.svelte";
  import MicLoading from "./lib/Components/MIC-Loading.svelte";
  import "./app.css";
</script>

<div class="app-container">
  <MicWrapper
    token="smth"
    domain="jsdelivr.="
    personainput=""
    issummaryaccount="false"
  />
</div>

<style lang="scss">
  .app-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>
