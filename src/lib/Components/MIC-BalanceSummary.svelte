<svelte:options tag="mic-balancesummary" />

<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { useLazyImage as lazyImage } from "svelte-lazy-image";
  import {
    fetchstore,
    apiDomain,
    apiToken,
    fetchAndRedirect,
    eventsDomain,
    persona,
    SAPToken,
  } from "../../js/store";

  var newElement;
  let color;
  let tries = 3;
  let btnStatus;
  let totalAmmountFontSize = "64px";
  let subTotalAmmountFontSize = "32px";
  let absTotalAmmount;

  //mocking data
  const [data, loading, error, get] = fetchstore();
  // trigger token existence
  onMount(() => {
    if (
      $apiDomain &&
      $SAPToken &&
      $apiToken &&
      !$data.html_masseges &&
      tries > 0
    ) {
      get(
        $apiToken,
        // "../../../data/AccountBalanceData.json",
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/BalanceSummary`,
        $SAPToken
      );
      tries--;
    }
  });

  $: if ($persona && $persona == "Agent") {
    btnStatus = "disable";
  } else {
    btnStatus = "enable";
  }
  $: newElement = document.getElementById("info-container"); // trigger "info-container" mounting
  $: if (newElement && $data && $data.html_masseges) {
    // create elements fro html_masseges
    for (let i = 0; i < $data.html_masseges.length; i++) {
      let subEle = document.createElement("div");
      if (i > 0)
        // add border
        subEle.setAttribute(
          "style",
          "border-top: solid 2px #015faa; padding-top:20px;  margin-top:20px;"
        );
      //trigger the font family and change it to "Interstate":
      let start = $data.html_masseges[i].message.indexOf("family:");
      let end = $data.html_masseges[i].message.indexOf("serif", start);
      if (start > 0 && end > 0) {
        let result = $data.html_masseges[i].message.substring(start, end + 5);
        let formattedHtml = $data.html_masseges[i].message.replace(
          result,
          "family:Interstate"
        );
        subEle.innerHTML = formattedHtml;
      } else {
        subEle.innerHTML = $data.html_masseges[i].message;
      }
      newElement.appendChild(subEle);
    }
    // dynamic totalAmmount colors
    if ($data.totalAmmount.includes("-")) {
      color = "#24A148";
      
      absTotalAmmount = parseFloat(
        $data.totalAmmount?.split(",").join("")
      ).toFixed(2);
      absTotalAmmount = Math.abs(absTotalAmmount);
    } else {
      absTotalAmmount = $data.totalAmmount;
      color = "#005FAA";
    }
    // dynamic font size
    if ($data.totalAmmount[0] && $data.totalAmmount.split(".")[0].length >= 7) {
      totalAmmountFontSize = "36px";
      subTotalAmmountFontSize = "20px";
    }
  }
</script>

{#if $loading}
  <mic-loading />
{:else if $error}
  <!--error regarding to fetch-->
  <mic-render-error />
  <!-- {:else if $generalErr == true}
    <div /> -->
{:else if $data.html_masseges}
  <div
    class="tecoGenericShadow roundedRadius20 tecoWhiteBG tecoCard paddingReset"
  >
    <div
      class="tecoBalanceSum roundedRadius20"
      style="background-image:url({`https://tecocdn.azureedge.net/ibill/iBill-assets/mask-bs.svg`});"
      use:lazyImage
    >
      <div class="tecoBalanceSection">
        <span>Total Amount Due</span>
        <div class="amount">
          {#if color == "#24A148"}
            <span style="color: {color}; font-size:{subTotalAmmountFontSize}"
              >-$</span
            >
          {:else if color == "#005FAA"}
            <span style="color: {color}; font-size:{subTotalAmmountFontSize}"
              >$</span
            >
          {/if}
          {#if absTotalAmmount}
            <span style="color: {color}; font-size:{totalAmmountFontSize}"
              >{absTotalAmmount.toLocaleString().split(".")[0]}</span
            >
          {/if}
          {#if absTotalAmmount && absTotalAmmount
              .toString()
              .split(".")[1] && absTotalAmmount
              .toString()
              .split(".")[1].length >= 2}
            <span style="color: {color}; font-size:{subTotalAmmountFontSize}">
              {absTotalAmmount.toString().split(".")[1]}</span
            >
          {:else if absTotalAmmount && absTotalAmmount
              .toString()
              .split(".")[1] && absTotalAmmount
              .toString()
              .split(".")[1].length < 2}
            <span style="color: {color}; font-size:{subTotalAmmountFontSize}">
              {absTotalAmmount.toString().split(".")[1]}0</span
            >
          {:else}
            <span style="color: {color}; font-size:{subTotalAmmountFontSize}"
              >00</span
            >
          {/if}
        </div>
        <div>
          <span class="dueLabel">Due Date: </span>
          <span>{$data.dueDate}</span>
        </div>
        <div>
          <button
            type="button"
            class="payBtn btn {btnStatus} teco-btn-fill"
            on:click={() => {
              if (btnStatus == "enable") {
                fetchAndRedirect(
                  $apiToken,
                  `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
                  $data.pay_now_link,
                  {
                    EventCode: "Payment",
                    Outcome: "",
                    Feedback: "",
                    Persona: $persona,
                  }
                );
              } else {
                return;
              }
            }}>PAY NOW</button
          >
        </div>
      </div>
      <div
        id="info-container"
        bind:this={newElement}
        class="tecoMessagesSection"
      />
    </div>
  </div>
  <!-- {:else if $generalErr == true}
    <div /> -->
{:else}
  <h1 />
{/if}

<style lang="scss">
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
  // .btn {
  //     cursor: pointer;
  // }
  .tecoCard {
    margin: 0 !important;
    margin-top: 15px;
    width: 100%;
    @media (min-width: 767px) {
      height: 380px;
    }
  }
  .tecoBalanceSum {
    background-position: 98%;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-around;
    flex-direction: row-reverse;
    align-items: center;
    min-height: 100%;
    padding: 30px 15px;
    .tecoBalanceSection {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      color: #005faa;
      border-left: 2px solid #005faa;
      .amount {
        display: flex;
        & :nth-child(1),
        & :nth-child(3) {
          font-size: 32px;
        }
        & :nth-child(2) {
          font-size: 64px;
        }
      }
      .enable {
        color: $teco-white;
        background-color: #005faa;
        width: 145px;
        border: none;
        padding: 8px 18px;
        border-radius: 6px;
        cursor: pointer;
        &:hover {
          background-color: #145093;
        }

        &:active {
          background-color: #004083;
        }
      }
      .disable {
        color: #adb3c0;
        background-color: #fff;
        width: 145px;
        border: 2px solid #adb3c0;
        padding: 8px 18px;
        border-radius: 6px;
      }
    }
    .tecoMessagesSection {
      width: 50%;
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      max-height: 320px;
      overflow-y: auto;
      .messageBox {
        padding: 15px 0;
        // quantity query to apply the style in case of 2 or more messages present
        &:nth-last-child(n + 2),
        &:nth-last-child(n + 2) ~ .messageBox {
          border-top: 2px solid #005faa;
        }
        &:nth-last-child(n + 2),
        &:nth-last-child(n + 2) ~ .messageBox:first-child {
          border-top: none;
        }
        // end of quantity query
        .messageLabel {
          color: #005faa;
          font-weight: 400;
        }
      }
    }
    // a {
    //     text-decoration: none;
    //     color: $teco-white;
    // }
    // small
    @media (max-width: 600px) {
      flex-direction: column;
      .tecoBalanceSection {
        width: 100%;
        border-bottom: 2px solid #005faa;
        border-left: none;
        padding-bottom: 20px;
        .amount {
          & :nth-child(2) {
            line-height: 1;
          }
        }
      }
      .tecoMessagesSection {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: unset;
      }
    }
  }
</style>
