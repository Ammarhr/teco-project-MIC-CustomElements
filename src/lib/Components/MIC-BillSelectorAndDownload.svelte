<svelte:options tag="mic-billselector" />

<script>
  // @ts-nocheck

  import {
    fetchstore,
    changeBillNumber,
    fetchAndRedirect,
    billNumber,
    reGenerateToken,
    apiDomain,
    apiToken,
    latestBill,
    newToken,
    persona,
    SAPToken,
    isSummaryAccountFlag,
    generatedFromTable
  } from "../../js/store";
  import { useLazyImage as lazyImage } from "svelte-lazy-image";
  // state
  let selectedBill;
  let selectedLabelBill;
  let mainClass = "";
  //mocking data
  const [data, loading, error, get] = fetchstore();
  const [dataToken, loadingToken, errorToken, getToken] = reGenerateToken();

  $: if ($apiDomain && $apiToken && $SAPToken && !$data.bills) {
    if ($isSummaryAccountFlag.toLowerCase() == "true") {
      mainClass = "col-account";
    }
    get(
      $apiToken,
      // "../../data/BillSelector.json",
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/BillSelector`,
      $SAPToken
    );
  }

  const handleChange = (e, latest1) => {
    if (latest1 && $billNumber !== $latestBill) {
      selectedBill = latest1;
      newToken.set("");
      getToken(
        $apiToken,
        // "../../data/Token.json"
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/GenerateNewToken?SelectedBill=${selectedBill}`,
        $SAPToken
      ).then(() => {
        changeBillNumber(selectedBill);
        fetchAndRedirect(
          $apiToken,
          `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
          null,
          {
            EventCode: "Select_Latest_Bill",
            Outcome: $billNumber,
            Persona: $persona,
          }
        );
      });
    } else if (!latest1) {
      selectedBill = e.target.value;
      newToken.set("");
      getToken(
        $apiToken,
        // "../../data/Token.json"
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/GenerateNewToken?SelectedBill=${selectedBill}`,
        $SAPToken
      ).then(() => {
        changeBillNumber(selectedBill);
        fetchAndRedirect(
          $apiToken,
          `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
          null,
          {
            EventCode: "Select_New_Bill",
            Outcome: $billNumber,
            Persona: $persona,
          }
        );
      });
    }
    generatedFromTable.set(false);
  };

  $: if ($data.bills) {
    if ($data.bills[0]) {
      let latest = $data.bills[0].value;
      latestBill.set(latest);
    }
    if (!selectedBill) {
      if ($data.bills.filter((bill) => bill.value == $data.selectedBill)[0]) {
        selectedLabelBill = $data.bills.filter(
          (bill) => bill.value == $data.selectedBill
        )[0];
        changeBillNumber($data.selectedBill);
      } else {
        changeBillNumber($data.bills[0].value);
      }
    }
  }
  let btnStatus;
  $: if ($persona && $persona == "Agent") {
    btnStatus = "disable";
  } else {
    btnStatus = "enable";
  }
</script>

{#if $loading}
  <mic-loading />
{:else if $error}
  <mic-render-error />
{:else if $data && $data.bills}
  <div
    class="tecoGenericShadow roundedRadius20 tecoWhiteBG tecoCard {mainClass}"
  >
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
              on:change={(e) => {
                handleChange(e);
              }}
              bind:value={$billNumber}
            >
              {#each $data.bills as billDate}
                {#if selectedLabelBill == billDate.value}
                  <option
                    name="bill-selector"
                    selected
                    value={$data.selectedBill}>{selectedLabelBill.lable}</option
                  >
                {:else}
                  <option name="bill-selector" value={billDate.value}
                    >{billDate.lable}</option
                  >
                {/if}
              {/each}
            </select>
          {/if}
        </div>
        <div class="tecoBillSelectorDownloadContainer">
          <div class="tecoInfoLabel">
            <h4>DOWNLOAD MY BILL</h4>
          </div>
          <button
            type="button"
            class="btn tecoBillSelectorDownloadButton {btnStatus}"
            id="btn-download"
            on:click={() => {
              if (btnStatus == "enable") {
                fetchAndRedirect(
                  $apiToken,
                  `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
                  `${$data.download_link}${$billNumber}`,
                  {
                    EventCode: "Bill_Download",
                    Outcome: $billNumber,
                  }
                );
              } else {
                return;
              }
            }}
          >
            <img
              src={`https://tecocdn.azureedge.net/ibill/iBill-assets/DownloadIcon.svg`}
              alt="DI"
              use:lazyImage
            />DOWNLOAD BILL
          </button>
        </div>
        <div class="tecoBillSelectorSmallText">
          <span>
            <!-- svelte-ignore a11y-missing-attribute -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <a
              on:click={(e) => {
                if ($data.bills[0]) {
                  handleChange(e, $data.bills[0].value);
                }
              }}>View Latest Bill</a
            >
          </span>
        </div>
      </div>
    </div>
  </div>
{:else}
  <h1 />
{/if}

<style lang="scss">
  // Typography
  $teco-font-family: "Interstate";
  // Colors
  $teco-white: #ffffff;
  $teco-midnight-blue: #00294a;
  $teco-blue: #005faa;
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
    background-color: $teco-blue;
  }
  .tecoYellowBG {
    background-color: $teco-yellow;
  }
  .tecoWhiteBG {
    background-color: $teco-white;
  }
  .tecoPrimaryColor {
    color: $teco-blue;
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

  // teco cards
  .tecoCard {
    margin: 0 !important;
    padding: 15px;
    container-type: inline-size;
    width: calc(66% - 30px);
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }
  // web component "tecoBillSelector" style
  @media screen and (min-width: 992px) {
    .col-account {
      width: 100% !important;
      .tecoBillSelector-v2 {
        font-weight: 400;
        display: flex;
        gap: 10px;
        align-items: center;
        flex-direction: row;
        .tecoInfoLabel h4 {
          color: $teco-dark-grey;
        }
        .tecobillSelectorDetailRow {
          width: unset;
          flex-grow: 1;
        }
        .tecoBillSelectorDownloadContainer {
          &::before {
            content: "DOWNLOAD MY BILL";
            color: $teco-dark-grey;
            font-weight: 400;
          }
        }
      }
    }
  }
  .tecoBillSelector-v2 {
    font-weight: 400;
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 10px;
    flex-wrap: wrap;
    .tecoInfoLabel h4 {
      font-weight: 400;
      color: $teco-blue;
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
        border: 2px solid $teco-blue;
        width: 100%;
        padding: 6px 10px;
        border-radius: 6px;
      }
    }
    .tecoBillSelectorSmallText {
      a {
        text-decoration: none;
        text-transform: uppercase;
      }
      cursor: pointer;
      border-bottom: 2px solid $teco-blue;
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
      #btn-download {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: $teco-blue;
      }
      & > span {
        color: $teco-blue;
      }
      padding: 6px 10px;
      border-radius: 6px;
      color: $teco-blue;
      border-color: $teco-blue;
      display: flex;
      gap: 4px;
      justify-content: center;
      align-items: center;
      background: white;
      min-width: max-content;
      cursor: pointer;
      &:hover {
        color: #145093;
        border-color: #145093;
      }
      &:active {
        background: #e5eff6;
      }
    }
    .disable {
      color: #6c6c6c;
      border-color: #6c6c6c;
      cursor: default;
      &:hover {
        color: #6c6c6c;
        border-color: #6c6c6c;
        background: none !important;
      }
      &:active {
        color: #6c6c6c;
        border-color: #6c6c6c;
        background: none !important;
      }
      img {
        filter: grayscale(100%);
      }
    }
    // small container
    @media screen and (max-width: 767px) {
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
      .tecoBillSelectorDownloadButton {
        img {
          display: none;
        }
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
    // @media screen and (min-width: 1024px) {
    //   flex-direction: row;
    //   justify-content: space-between;
    //   align-items: center;
    //   .tecoBillSelect {
    //     width: 250px;
    //   }
    //   .tecoInfoLabel {
    //     margin-right: 4%;
    //     h4 {
    //       color: $teco-dark-grey;
    //       display: block !important;
    //       margin: 0;
    //     }
    //   }
    //   .tecobillSelectorDetailRow {
    //     flex-grow: 2;
    //     width: unset;
    //   }
    // }
    a {
      text-decoration: none;
      color: $teco-dark-grey;
    }
  }
</style>
