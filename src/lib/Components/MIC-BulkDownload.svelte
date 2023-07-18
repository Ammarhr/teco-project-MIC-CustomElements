<svelte:options tag="mic-bulkdownload" />

<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  // import backgroundPattern from "../../assets/mask-bd.svg";
  import {
    fetchstore,
    apiDomain,
    apiToken,
    generalErr,
    SAPToken,
    persona,
  } from "../../js/store";
  import { useLazyImage as lazyImage } from "svelte-lazy-image";

  //mocking data
  const [data, loading, error, get] = fetchstore();
  onMount(() => {
    if ($apiDomain && $SAPToken && $apiToken && !$data.BlkDownload) {
      get(
        $apiToken,
        // "../../data/bulkDownload.json",
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/BulkDownload`,
        $SAPToken
      );
    }
  });

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
  <!--error regarding to fetch-->
  <mic-render-error />
  <!-- {:else if $generalErr == true}
    <div /> -->
{:else if $data.BlkDownload}
  <div
    class="tecoGenericShadow roundedRadius20 tecoCard tecoBillBanner"
    style="background-image:url({`https://tecocdn.azureedge.net/ibill/iBill-assets/mask-bd.svg`});"
    use:lazyImage
  >
    <div class="tecoBillBannerBody">
      <p>
        Looking to download bills? Click here to download one or more bills.
      </p>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        class="reverseOrder m_1"
        href={$data.BlkDownload}
        role="button"
        target="_blank"
        rel="noreferrer"
        style={btnStatus == "disable" ? "pointer-events: none;" : ""}
        ><span class={btnStatus} aria-hidden="true">
          {"< "} DOWNLOAD BILLS
        </span>
      </a>
    </div>
  </div>
{:else if $generalErr == true}
  <!--error regarding to fetch-->
{:else}
  <h1 />
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
  .tecoCard {
    margin: 0 !important;
    padding: 24px;
    // max-width: 412px;
    @media screen and (max-width: 992px) {
      max-width: unset;
    }
  }
  .tecoBillBanner {
    // image and color
    background-size: cover;
    background-color: #005faa;
    color: white;
    .tecoBillBannerBody {
      max-width: 463px;
      min-height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > a {
        font-size: 18px;
        font-weight: 400;
        text-decoration: none;
        text-align: left;
        color: white;
      }
      span {
        background: none;
        border: none;
        color: white;
        margin: 0;
        padding: 0;
      }
      p {
        font-size: 25px;
        font-weight: 400;
        @media screen and (max-width: 480px) {
          font-size: 20px;
        }
        @media screen and (max-width: 767px) {
          font-size: 20px;
        }
      }
    }
  }
  .disable {
    color: $teco-dark-grey !important;
    cursor: default;
    background: none;
    border: none;
  }
</style>
