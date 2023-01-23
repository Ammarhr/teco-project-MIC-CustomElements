<svelte:options tag="mic-billselector" />

<script>
  // @ts-nocheck

  // svg imports
  import { billNumber } from "../../js/store";
  import downloadIcon from "../../assets/DownloadIcon.svg";
  import { fetchstore, changeBillNumber } from "../../js/store";

  // state
  export let token;
  export let url;
  let selectedBill;
  let selectedDate;
  //mocking data
  const [data, loading, error, get] = fetchstore();

  //../../../data/BillSelector.json
  $: if (token && url && !$data.bills) {
    get(token, url);
  }
  const handleChange = (e) => {
    selectedBill = e.target.value;
    changeBillNumber(e.target.value);
  };
  $: if ($data.bills) {
    if (!selectedBill) {
      selectedDate = $data.bills.filter(
        (bill) => bill.value == $data.selectedBill
      )[0];
      changeBillNumber($data.selectedBill);
    }
  }
</script>

{#if $loading}
  <mic-loading />
{:else if $error}
  <!--error regarding to fetch-->
  <mic-render-error err={"failed to load regarding server issues"} />
{:else if $data && $data.bills}
  <div class="tecoGenericShadow roundedRadius20 tecoWhiteBG tecoCard">
    <div class="tecoBillSelector-v2">
      <div class="tecoInfoLabel">
        <h4>VIEW PRIOR STATEMENTS</h4>
      </div>
      <div class="tecobillSelectorDetailRow">
        <div
          class="tecoBillSelect spacing-outer-bottom-none form-group no-columns"
        >
          {#if $data && $data.bills}
            <select
              class="form-control"
              id="68.Teco.BuildingBlocksShowcase.referenceSelector1_pkj_53"
              aria-label=""
              on:change={(e) => handleChange(e)}
              bind:value={$billNumber}
            >
              <option name="bill-selector" selected value={$data.selectedBill}
                >{selectedDate.lable}</option
              >
              {#each $data.bills as billDate}
                <option name="bill-selector" value={billDate.value}
                  >{billDate.lable}</option
                >
              {/each}
            </select>
          {/if}
        </div>
        <div class="tecoBillSelectorDownloadContainer">
          <div class="tecoInfoLabel">
            <h4>DOWNLOAD MY BILL</h4>
          </div>
          <button type="button" class="btn tecoBillSelectorDownloadButton">
            <img src={downloadIcon} alt="DI" />
            <a id="btn-download" href={`${$data.download_link}${$billNumber}`}>
              DOWNLOAD BILL
            </a>
          </button>
        </div>
        <div class="tecoBillSelectorSmallText">
          <span>View Latest Bill</span>
        </div>
      </div>
    </div>
  </div>
{:else}
  <h1 />
  <!-- <mic-render-error err={"failed in bill selector no Token provided"} /> -->
{/if}

<style lang="scss">
  // Typography
  $teco-font-family: "Interstate";

  // Colors
  $teco-white: #ffffff;
  $teco-midnight-blue: #00294a;
  $teco-ocean-blue: #5eb0f4;
  $teco-yellow: #ffdc00;
  $teco-green: #24a148;
  $teco-red: #da1e28;
  $teco-dark-grey: #6c6c6c;

  $screen-md-min: 991px;
  $screen-custom-md-min: 1024px;
  $screen-lg-min: 1200px;

  * {
    margin: 0;
    box-sizing: border-box;
  }

  .tecoLayout {
    font-family: $teco-font-family;
    background-color: whitesmoke;

    ::-webkit-scrollbar {
      width: 7px;
      height: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: rgb(187, 187, 187);
      border-radius: 3px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #888;
    }
  }

  .tecoPrimaryBG {
    background-color: #005faa;
  }

  .tecoYellowBG {
    background-color: $teco-yellow;
  }

  .tecoWhiteBG {
    background-color: $teco-white;
  }

  .tecoPrimaryColor {
    color: #005faa;
  }

  .tecoOceanBlue {
    color: $teco-ocean-blue;
  }

  .tecoMidnightBlue {
    color: $teco-midnight-blue;
  }

  .tecoGreenColor {
    color: $teco-green;
  }

  .tecoRedColor {
    color: $teco-red;
  }

  .tecoGrayColor {
    color: grey;
  }

  .tecoGrayedLabel {
    color: grey;
  }

  .pointer {
    cursor: pointer;
  }

  .tecoBolder {
    font-weight: 600 !important;
  }

  .marginReset {
    margin: 0 !important;
  }

  .paddingReset {
    padding: 0 !important;
  }

  .roundedTop {
    border-radius: 7px 7px 0 0;
  }

  .roundedBottom {
    border-radius: 0 0 7px 7px;
  }

  .tecoGenericShadow {
    box-shadow: 0px 0px 10px rgba(34, 34, 34, 0.24);
  }

  .roundedRadius20 {
    border-radius: 20px;
  }

  .reverseOrder {
    direction: rtl;
  }

  .m_1 {
    margin-top: 10px;
  }

  .btn {
    cursor: pointer;
  }
  // teco cards
  .tecoCard {
    margin: 0 !important;
    padding: 15px;

    container-type: inline-size;
    width: 100%;
  }

  // web component "tecoBillSelector" style
  .tecoBillSelector-v2 {
    font-weight: 400;
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 10px;

    .tecoInfoLabel h4 {
      font-weight: 400;
      color: #005faa;
      width: max-content;
      display: block;
    }

    .tecobillSelectorDetailRow {
      display: flex;
      gap: 15px;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .tecoBillSelect {
      max-width: 250px;
      width: 100%;
      flex: revert;
      select {
        font-size: 15px;
        border: 2px solid #005faa;
        width: 100%;
        padding: 6px 10px;
        border-radius: 6px;
      }
    }

    .tecoBillSelectorSmallText {
      border-bottom: 2px solid #005faa;
    }

    .tecoBillSelectorDownloadContainer {
      display: flex;
      gap: 10px;
      justify-content: center;
      align-items: center;

      > .tecoInfoLabel {
        > h4 {
          display: none;
        }
      }
    }

    .tecoBillSelectorDownloadButton {
      & > span {
        color: #005faa;
      }
      padding: 6px 10px;
      border-radius: 6px;
      color: #005faa;
      border-color: #005faa;
      display: flex;
      gap: 4px;
      justify-content: center;
      align-items: center;
      background: white;
      min-width: max-content;
    }

    // small container
    @media screen and (max-width: 590px) {
      text-align: center !important;
      gap: 10px;
      align-items: center;
      .tecoInfoLabel h4 {
        color: $teco-dark-grey;
        text-align: center;
        width: 100%;
        display: block !important;
        margin: 0;
      }

      .tecobillSelectorDetailRow {
        gap: 20px !important;
        margin-top: 20px;
        flex-direction: column;
      }

      .tecoBillSelectorSmallText {
        width: fit-content;
        margin: auto;
      }

      .tecoBillSelectorDownloadContainer {
        flex-direction: column;
      }

      .tecoBillSelectorDownloadButton {
        width: 100%;
        & > span {
          display: none;
        }
      }
    }

    // too large
    @media screen and (min-width: 1024px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .tecoBillSelect {
        width: 250px;
      }

      .tecoInfoLabel {
        margin-right: 4%;

        h4 {
          color: $teco-dark-grey;
          display: block !important;
          margin: 0;
        }
      }

      .tecobillSelectorDetailRow {
        flex-grow: 2;
      }
    }
    a {
      text-decoration: none;
      color: $teco-dark-grey;
    }
  }
</style>
