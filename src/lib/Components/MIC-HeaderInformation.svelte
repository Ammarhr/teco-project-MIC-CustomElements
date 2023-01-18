<svelte:options tag="mic-headerinformation" />

<script>
  // @ts-nocheck

  import star from "../../assets/Vector.svg";
  import fire from "../../assets/Fire.svg";
  import { fetchstore, apiToken } from "../../js/store";
  export let token;
  // export let url;
  // export let item = { name: "Item" };
  let account;
  let statusClass = "Inactive";

  // "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/accountData.json",
  const [data, loading, error, get] = fetchstore(
    // url
    "https://miportaldev.tecoenergy.com/api/ibill/webcomponents/v1/Post/AccountDetails"
  , token);

  $: if (token &&  !$data.account) {
    get(token);
  }
  $: if ($data) {
    account = $data.account;
  }

  $: if (account) {
    account = account;
    if (account.status == "Active") {
      statusClass = "Active";
    } else {
      statusClass = "Inactive";
    }
  }
</script>

<div>
  {#if $loading}
    Loading: {$loading}
  {:else if $error}
    Error: {$error}
  {:else if account}
    <div class="tecoInfoBar tecoGenericShadow">
      <div class="row">
        <div class="col-lg col-md col tecoInfoBarCol tecoPrimaryBG roundedTop">
          <div class="tecoInfoLabel">
            <span>Account Details</span>
          </div>
          <div class="oneLined">
            <button type="button" class="change-btn btn">
              Change Account</button
            ><img class="spacing-outer-left-medium" src={star} />
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-lg col-md col tecoInfoBarCol roundedBottom tecoWhiteBG tecoInfoBarDetails"
        >
          <div class="oneLined">
            <img class="spacing-outer-right-medium" src={fire} /><label
              class="spacing-outer-top-none spacing-outer-bottom-none spacing-outer-left-none spacing-outer-right-none"
              >Account:
            </label><span> #{account.accountNumber}</span>
          </div>
          <div>
            <label
              id="68.Teco.BuildingBlocksShowcase.label2_pkj_42"
              class="spacing-outer-top-none spacing-outer-bottom-none spacing-outer-left-none spacing-outer-right-none"
              >Address:
            </label><span>{account.adress}</span>
          </div>
          <div>
            <label
              id="68.Teco.BuildingBlocksShowcase.label3_pkj_43"
              class="spacing-outer-top-none spacing-outer-bottom-none spacing-outer-left-none spacing-outer-right-none"
              >Status:
            </label><span class="tecoBolder {statusClass}"> {statusClass}</span>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div>
      <p>Failed to load header</p>
    </div>
  {/if}
</div>

<style lang="scss">
  $teco-font-family: "";

  // Colors
  $teco-white: #ffffff;
  $teco-background-color: #f4f5f7;

  $teco-light-blue: #e6eff7;
  $teco-baby-blue: #b1dbfd;

  $teco-midnigh-blue: #00294a;
  $teco-sky-blue: #00b6f0;
  $teco-ocean-blue: #5eb0f4;

  $teco-yellow: #ffdc00;
  $teco-green: #24a148;
  $teco-red: #da1e28;

  $teco-yellow-shade: rgba(255, 210, 0, 0.15);

  // Typography
  $teco-font-family: "Interstate";
  $teco-header1: 32px;

  $teco-font-size-xxs: 12px;
  $teco-font-size-xs: 14px;
  $teco-font-size-smaller: 16px;
  $teco-font-size-small: 18px;
  $teco-font-size-regular: 20px;
  $teco-font-size-large: 24px;
  $teco-font-size-larger: 36px;
  $teco-font-size-xl: 52px;
  $teco-font-size-xxl: 82px;

  // Colors
  $teco-white: #ffffff;
  $teco-background-color: #f4f5f7;
  $teco-light-gray: #eaecee;
  $teco-light-blue: #e6eff7;
  $teco-baby-blue: #b1dbfd;

  $teco-midnight-blue: #00294a;
  $teco-sky-blue: #00b6f0;
  $teco-ocean-blue: #5eb0f4;

  $teco-yellow: #ffdc00;
  $teco-orange: #ff832b;
  $teco-green: #24a148;
  $teco-red: #da1e28;
  $teco-dark-grey: #6c6c6c;

  $teco-yellow-shade: rgba(255, 210, 0, 0.15);
  $teco-red-shade: rgba(218, 30, 40, 0.03);

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
  .tecoCard {
    margin: 0 !important;
    padding: 15px;
    container-type: inline-size;
    width: 100%;
  }

  //component style
  .Active {
    color: $teco-green;
  }
  .Inactive {
    color: $teco-red;
  }
  .tecoInfoBar {
    border-radius: 7px;
    container-type: inline-size;
    container-name: infoBar;

    .tecoInfoBarCol {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 10px 32px;

      @media (max-width: 600px) {
        padding: 10px;
      }
    }

    .tecoInfoLabel {
      font-weight: 700;
      color: white;

      @media (max-width: 600px) {
        padding: 10px;
      }
    }

    .tecoInfoBarDetails {
      @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .oneLined {
      justify-content: end;
      align-items: center;
      display: flex;
      gap: 10px;

      .change-btn {
        padding: 6px 15px;
        background: white;
        border: none;
        border-radius: 6px;
      }

      @media (min-width: 601px) {
        min-width: 175px;
      }

      > img {
        @media (max-width: 600px) {
          display: none;
        }
      }
    }
  }
</style>
