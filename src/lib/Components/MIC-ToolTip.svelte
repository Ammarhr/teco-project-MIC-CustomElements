<svelte:options tag="mic-tooltip" />

<script>
  import {
    tooltipShow,
    resetToolTip,
    apiDomain,
    apiToken,
    persona,
    fetchAndRedirect,
  } from "../../js/store";
  export let tooltipurl = "";
  export let tooltipdis;
  export let chargeline;
  let show = false;
  let toolTipSvg;
  let style;

  $: if ($tooltipShow == true) {
    show = false;
  }
  function toolTipToggle() {
    if (show == false) {
      resetToolTip(true);
      show = !show;
      if (show) {
        style = "opacity: 1;transition:200ms;";
      } else {
        style =
          "opacity: 0;max-height: 0;margin: 0; transition:200ms; display:none";
      }
      setTimeout(() => {
        resetToolTip(false);
        show = !show;
      }, 100);
      fetchAndRedirect(
        $apiToken,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "CD_ChargeTooltipClick",
          Outcome: `Helper ${chargeline} Is Active`,
          Persona: $persona,
        }
      );
    } else {
      setTimeout(() => {
        resetToolTip(false);
        show = !show;
      }, 100);
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<img
  src={`https://tecocdn.azureedge.net/ibill/iBill-assets/tool-tip-icon.svg`}
  alt=""
  class="tooltip-svg"
  bind:this={toolTipSvg}
  on:click={(e) => {
    toolTipToggle();
  }}
/>
{#if show && $tooltipShow == false}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="overlay"
    on:click={(e) => {
      resetToolTip(true);
      setTimeout(() => {
        resetToolTip(false);
      }, 100);
    }}
  />
  <div class="tooltip-description" style={""}>
    <!-- svelte-ignore a11y-missing-attribute -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="tooltip-con">
      <div>
        {tooltipdis}
        <br />
        {#if tooltipurl && tooltipurl != ""}
          <a
            on:click={() => {
              fetchAndRedirect(
                $apiToken,
                `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
                tooltipurl,
                {
                  EventCode: "CD_ChargeExplanationClick",
                  Outcome: "Charge explanation page loaded",
                  Persona: $persona,
                }
              );
            }}>UNDERSTANDING YOUR CHARGES</a
          >
        {/if}
      </div>
      <img
        src={`https://tecocdn.azureedge.net/ibill/iBill-assets/x-close.svg`}
        alt=""
        class="tooltip-svg"
        on:click={() => {
          resetToolTip(true);
          setTimeout(() => {
            resetToolTip(false);
          }, 100);
        }}
      />
    </div>
  </div>
{/if}

<style lang="scss">
  .overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #00ccff00;
    z-index: 1;
  }
  .tooltip-svg {
    z-index: 12;
    position: relative;
    cursor: pointer;
  }
  .toolTipToggle {
    position: relative;
    &::after {
      content: "";
      width: 5px;
      height: 5px;
      background-color: #005faa;
      top: 0;
      left: 50%;
      z-index: 2;
      transform: translate(-50%, 0);
    }
  }
  .tooltip-description {
    position: absolute;
    bottom: 100%;
    z-index: 14;
    max-width: 100vw;
    max-width: 440px;
    border-radius: 6px;
    padding: 6px;
    font-weight: 400;
    font-size: 16px;
    background: rgb(203 232 255 / 96%);
    color: #000000;
    box-shadow: 0 0 8px 1px #9e9e9e96;
    left: 0;
    .tooltip-con {
      z-index: 15;
      position: relative;
      padding: 8px;
      display: flex;
      align-items: baseline;
      gap: 12px;
      div {
        > a {
          text-decoration: none;
          color: #005faa;
          cursor: pointer;
        }
      }
    }
  }
  .bill-content {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    hr {
      height: 3px;
      background-color: #eaecee;
      border: none;
    }
    @media screen and (max-width: 480px) {
      row-gap: 16px;
    }
  }
</style>
