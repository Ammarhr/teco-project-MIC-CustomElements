<svelte:options tag="mic-importentmessage" />

<script>
  // @ts-nocheck

  //svg imports
  // import circyle from "../../assets/cr.svg";
  // import messageNotification from "../../assets/envelope-solid.svg";
  import MicImportantMessagesDetails from "./MIC-ImportantMessagesDetails.svelte";
  //unreaded messages counter
  import {
    fetchstore,
    apiToken,
    apiDomain,
    eventsDomain,
    assetsUrl,
    generalErr,
    SAPToken,
  } from "../../js/store";
  import { onMount } from "svelte";

  //state
  let state = {};
  let message;
  let isOpen = true;
  let svgId = "rotate-svg-" + isOpen;

  const [data, loading, error, get] = fetchstore();
  onMount(() => {
    if ($apiToken && $SAPToken && !$data.messages && $generalErr !== true) {
      get(
        $apiToken,
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/ImportantMessages`,
        // "../../data/messages.json",
        $SAPToken
      );
    }
  });

  $: if ($data && $data.messages) {
    state = $data;
  }
  //hello fro
  //slice long message
  $: if (
    state &&
    state.messages &&
    state.messages[0] &&
    state.messages[0].message &&
    state.messages[0].message.length &&
    state.messages[0].message.length > 1000000
  ) {
    message =
      state.messages[0].message.slice(0, 300 - state.messages[0].Title.length) +
      "...";
  } else if (
    state &&
    state.messages &&
    state.messages[0] &&
    state.messages[0].message &&
    state.messages[0].message !== ""
  ) {
    message = state.messages[0].message;
  } else {
    ("");
  }
  let cardStyle;
  let contentStyle;
  let footerStyle;
  let msgDataStyle;
  const toggle = () => {
    isOpen = !isOpen;
    svgId = "rotate-svg-" + isOpen;
    if (isOpen === true) {
      cardStyle = "max-height: 200vh;opacity: 1;transition:200ms;";
      contentStyle = " height: calc(100% - 120px);";
      footerStyle = "height:50px";
    } else {
      cardStyle = "height: unset;margin: 0; transition:200ms;";
      contentStyle = "height: 0;margin: 0; transition:200ms; ";
      footerStyle = "height:0";
    }
  };
</script>

{#if $loading}
  <mic-loading />
{:else if $error}
  Error: {$error}
{:else if $data && $data.messages && state && state.messages && state.messages[0] && $generalErr !== true}
  <div class="container" style={cardStyle}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div id="message-header" on:click={toggle}>
      <div class="message-counter">
        {#if message || (message && message !== "")}
          <img
            src={`https://tecocdn.azureedge.net/ibill/iBill-assets/envelope-solid.svg`}
            alt=""
          />
          <span id="unreaded-msgs">&nbsp;{state.messages.length}&nbsp;</span>
        {:else}
          <img
            src={`https://tecocdn.azureedge.net/ibill/iBill-assets/envelope-solid.svg`}
            alt=""
          />
          <span id="unreaded-msgs">&nbsp;{0}&nbsp;</span>
        {/if}
      </div>
      <h4 id="title">Important Message</h4>
      <img
        src={`https://tecocdn.azureedge.net/ibill/iBill-assets/toggle.svg`}
        alt=""
        id={svgId}
      />
    </div>
    {#if state.messages}
      {#if isOpen}
        <div class="message-body">
          {#if message && message !== ""}
            <div class="msg-data">
              {#if !state.messages[0].empty && state.messages[0] && (state.messages[0].Title !== "") !== ""}
                <span>
                  <p class="msg-title">
                    {state.messages[0].Title}
                  </p>
                  {#if state.messages[0].Title !== ""}
                    <br />
                  {/if}
                  {@html message}
                </span>
              {:else}
                <span>
                  {@html message}
                </span>
              {/if}
            </div>
          {:else}
            <p class="msg-data" style="height: 105px; text-align: center;">
              No Messages
            </p>
          {/if}
        </div>
        <div class="message-footer">
          {#if state.messages[0].empty}
            <span />
          {:else}
            <mic-messagesdetails messages={state.messages} />
            <!-- <MicImportantMessagesDetails messages={state.messages} /> -->
          {/if}
        </div>
      {/if}
    {/if}
  </div>
{/if}

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: calc(100% - 40px);
    padding: 20px;
    transition: 0.3s;
    border-radius: 16px;
    box-shadow: 0px 0px 10px rgba(34, 34, 34, 0.24);
    height: 340px;
    background-color: white;
    @media screen and (max-width: 830px) {
      width: 100%;
    }
  }
  #message-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px;
    width: 100%;
    height: 40px;
    cursor: pointer;

    h4 {
      font-weight: 300;
      font-size: 20px;
      line-height: 29px;
      display: flex;
      align-items: center;
      letter-spacing: -0.02em;
      text-transform: uppercase;
      color: #005faa;
      margin: 0;
      text-align: center;
      @media screen and (max-width: 480px) {
        font-size: 18px;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }

  .message-counter {
    position: relative;
  }
  #unreaded-msgs {
    position: absolute;
    right: -10px;
    top: -8px;
    color: #ffffff;
    background: #da1e28;
    border-radius: 50%;
    border: 2px solid white;
    width: 20px;
    height: 20px;
    /* text-align: center; */
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .message-body {
    width: 100%;
    margin: 14px 0;
    height: 222px;
  }
  .msg-data {
    font-weight: 300;
    font-size: 20px;
    color: rgb(0, 0, 0);
    height: 216px;
    @media screen and (max-width: 480px) {
      font-size: 18px !important;
    }
    > span {
      display: -webkit-box !important;
      -webkit-box-orient: vertical !important;
      -webkit-line-clamp: 6 !important;
      overflow: hidden !important;
      line-height: 1.4;
      p {
        display: contents !important;
      }
      @media screen and (max-width: 480px) {
        -webkit-line-clamp: 7 !important;
      }
    }
  }
  .msg-title {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.02em;
    color: #005faa;
    height: 1.5rem;
    &:empty {
      /* Remove the style of the empty div */
      display: none;
      border: none;
      padding: 0;
      height: 0;
    }
  }
  p {
    margin: 0;
  }
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding: 10px 24px;
    gap: 10px;
    width: 93px;
    height: 50px;
    background: #005faa;
    border-radius: 6px;
  }
  button span {
    width: 45px;
    height: 30px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #ffffff;
  }

  .message-footer {
    height: auto;
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    overflow: hidden;
  }

  /* acordion style */
  #btn-toggle {
    border: none;
    background: none;
    display: block;
    color: inherit;
    font-size: 36px;
    cursor: pointer;
    margin: 0;
    padding-bottom: 0.5em;
    padding-top: 0.5em;
    width: 4rem;
  }

  #rotate-svg-true {
    transition: transform 0.2s ease-in;
    transform: rotate(0turn);
  }

  #rotate-svg-false {
    transition: transform 0.2s ease-in;
    transform: rotate(0.5turn);
  }
</style>
