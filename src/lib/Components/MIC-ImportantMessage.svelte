<svelte:options tag="mic-importentmessage" />

<script>
  // @ts-nocheck

  //svg imports
  import messageLogo from "../../assets/envelope-solid.svg";
  import circyle from "../../assets/cr.svg";
  import notification from "../../assets/notification.svg";
  import messageNotification from "../../assets/messages-notification.svg";

  //state
  let state = {};
  let message;
  //unreaded messages counter
  import {
    fetchstore,
    apiToken,
    apiDomain,
    eventsDomain,
  } from "../../js/store";
  import { onMount } from "svelte";
  import ImportantMessagesDetails from "./MIC-ImportantMessagesDetails.svelte";

  //mocking data

  const [data, loading, error, get] = fetchstore();
  onMount(() => {
    if ($apiToken && !$data.messages) {
      get(
        $apiToken,
        // `${$apiDomain}/api/ibill/webcomponents/v1/Post/ImportantMessages`

        "../../data/messages.json"
      );
    }
  });
  $: if ($data && $data.messages) {
    state = $data;
  }

  //slice long message
  $: if (state && state.messages) {
    message = state.messages[0].message.slice(0, 237);
  }

  ///////// acordion functionality
  import { slide } from "svelte/transition";
  import MicImportantMessagesDetails from "./MIC-ImportantMessagesDetails.svelte";
  let isOpen = true;
  let svgId = "rotate-svg-" + isOpen;

  const toggle = () => {
    isOpen = !isOpen;
    svgId = "rotate-svg-" + isOpen;
  };
</script>

{#if $loading}
  Loading: {$loading}
{:else if $error}
  Error: {$error}
{:else if state.messages}
  <div class="container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div id="message-header" on:click={toggle} aria-expanded={isOpen}>
      <div class="message-counter">
        <img src={messageNotification} alt="" />
        <span id="unreaded-msgs">&nbsp;{state.messages.length}&nbsp;</span>
      </div>
      <h4 id="title">Important Message</h4>
      <img src={circyle} alt="" id={svgId} />
    </div>
    {#if state.messages}
      {#if isOpen}
        <div class="message-body" transition:slide={{ duration: 300 }}>
          <p class="msg-data">{@html message + "..."}</p>
        </div>
        <div class="message-footer">
          <MicImportantMessagesDetails messages={state.messages} />
        </div>
      {/if}
    {:else}
      <h1>no messages to load</h1>
    {/if}
  </div>
  <!-- </div> -->
{:else}
  <h1>failed to load in messages</h1>
{/if}

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 370px;
    max-width: calc(100% - 40px);
    padding: 20px;
    transition: 0.3s;
    border-radius: 16px;
    box-shadow: 0px 0px 10px rgb(34 34 34 / 24%);
    margin-bottom: 15px;
    background-color: #ffff;
    overflow: hidden;
    @media screen and (max-width: 767px) {
      width: 100%;
    }
  }
  #message-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    width: 100%;
    height: 40px;

    cursor: pointer;
  }
  #message-header h4 {
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #005faa;
  }
  .message-counter {
    position: relative;
  }
  #notification {
    position: absolute;
    left: 4.71%;
    right: 0;
    top: -2px;
  }
  #unreaded-msgs {
    position: absolute;
    right: 0;
    color: #ffffff;
    background: #da1e28;
    border-radius: 50%;
    border: 2px solid white;
  }
  .message .message-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 499px;
    width: 392px;
    height: auto;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  .msg-data {
    font-family: "Interstate";
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #000000;
    flex: none;
    order: 1;
    flex-grow: 0;
    height: auto;
    padding: 1rem;
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
    flex: none;
    order: 0;
    flex-grow: 0;
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
    flex: none;
    order: 1;
    flex-grow: 0;
  }

  .message-footer {
    height: auto;
    display: flex;
    flex-direction: row-reverse;
    width: 90%;
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
