<svelte:options tag="mic-billselector" />

<script>
  // @ts-nocheck

  // svg imports
  import downloadIcon from "../../assets/Icon-left.svg";
  import line from "../../assets/Line1812.svg";
  import { billNumber } from "../../js/store";

  export let token;
  // export let item = { name: "Item" };

  import { fetchstore } from "../../js/store";

  //mocking data
  const [data, loading, error, get] = fetchstore(
    "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/BillSelector.json",
    token
  );

  $: if (token && !$data.bills) {
    get(token);
  }
  import "../../assets/scss/iBill/buildingBlocks/billSelector.scss";
</script>

{#if $loading && !token}
  Loading: {$loading}
{:else if $error}
  Error: {$error}
{:else if $data && $data.bills}
  <div
    class="tecoGenericShadow roundedRadius20 tecoWhiteBG tecoCard"
  >
    <div class="mx-name-container24 tecoBillSelector-v2">
      <div class="mx-name-container25 tecoInfoLabel">
        <h4 class="mx-text mx-name-text13">VIEW PRIOR STATEMENTS</h4>
      </div>
      <div class="mx-name-container26 tecobillSelectorDetailRow">
        <div
          class="mx-name-referenceSelector1 tecoBillSelect spacing-outer-bottom-none mx-referenceselector form-group no-columns"
        >
          <div class="mx-compound-control" data-focusindex="0">
            <select
              class="form-control"
              id="68.Teco.BuildingBlocksShowcase.referenceSelector1_pkj_53"
              aria-label=""><option value="">Select Bill</option></select
            >
          </div>
        </div>
        <div class="mx-name-container27 tecoBillSelectorDownloadContainer">
          <div class="mx-name-container28 tecoInfoLabel">
            <h4 class="mx-text mx-name-text5">DOWNLOAD MY BILL</h4>
          </div>
          <button
            type="button"
            class="btn mx-button mx-name-actionButton5 tecoBillSelectorDownloadButton btn-default"
            title=""
            data-button-id="68.Teco.BuildingBlocksShowcase.actionButton5"
            data-disabled="false"
            ><span
              class="glyphicon glyphicon-download-alt"
              aria-hidden="true"
            /> DOWNLOAD BILL</button
          >
        </div>
        <div class="mx-name-container29 tecoBillSelectorSmallText">
          <span class="mx-text mx-name-text16">View Latest Bill</span>
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="selector-card">
    <div id="selector-container">
      <div id="date-container">
        {#if $data && $data.bills}
          <label for="bill-selector">VIEW PRIOR STATEMENTS</label>
          <select name="bill-selector" bind:value={$billNumber}>
            {#each $data.bills as billDate}
              <option value={billDate.value}>{billDate.lable}</option>
            {/each}
          </select>
        {:else}
          <h1>failed to load</h1>
        {/if}
      </div>
      <div id="btn-container">
        <label>DOWNLOAD MY BILL</label>
        <a id="btn-download" href={$data.download_link}>
          <span>
            <img src={downloadIcon} alt="download icon" />
            Download Bill
          </span>
        </a>
      </div>
      <div>
        <button id="show-btn">
          <span> VIEW LATEST BILL </span>
          <img src={line} alt="line icon" />
        </button>
      </div>
    </div>
  </div> -->
{:else}
  <h3>failed in bill selector</h3>
{/if}

<!-- 
<style scoped>
  @font-face {
    font-family: "Interstate";
    src: url("../../assets/fonts/Interstate.ttf") format("truetype");
  }
  * {
    font-family: "Interstate";
  }
  #selector-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 51px;
    width: 100%;
    min-height: 6rem;
    flex: none;
    order: 1;
    flex-grow: 0;
    box-shadow: 0px 0px 10px rgba(34, 34, 34, 0.24);
    border-radius: 16px;
    background-color: #ffff;
  }
  #selector-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 32px;
    gap: 41px;
    width: 1240px;
  }
  #date-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 24px;
    width: 442px;
    height: 50px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  label {
    width: fit-content;
    height: 30px;
    font-family: "Interstate";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #6c6c6c;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  select {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 170px;
    height: 50px;
    font-size: 18px;
    flex: none;
    order: 1;
    flex-grow: 0;
  }
  #btn-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 24px;
    width: 420px;
    height: 48px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #btn-download {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 24px;
    gap: 10px;
    width: 200px;
    height: 48px;
    background: #ffffff;
    border: 1px solid #005faa;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 6px;
    flex: none;
    order: 0;
    flex-grow: 0;
    font-style: normal;
    text-decoration: none;
    color: #005faa;
  }
  #show-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    width: 136px;
    height: 38px;
    flex: none;
    order: 3;
    flex-grow: 0;
    background-color: #ffffff;
    border: none;
    gap: 10px;
    cursor: pointer;
  }
  @media screen and (max-width: 1000px) {
    #selector-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 90%;
      height: fit-content;
      padding: 1.4rem 1rem;
    }
    #selector-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0px 32px;
      width: 100%;
      padding: 1.4rem 1rem;
    }
    #date-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.4rem 1rem;
    }
    #btn-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.4rem 1rem;
    }
  }
</style> -->
