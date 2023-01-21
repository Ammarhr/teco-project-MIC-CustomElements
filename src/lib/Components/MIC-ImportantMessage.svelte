<svelte:options tag="mic-importentmessage" />

<script>
  // @ts-nocheck

  //svg imports
  import messageLogo from "../../assets/envelope-solid.svg";
  import circyle from "../../assets/cr.svg";
  import notification from "../../assets/notification.svg";

  //state
  let state = {};
  // export let item = { name: "Item" };
  export let token;
  let show = false;
  let message;
  //unreaded messages counter
  import { fetchstore, apiToken } from "../../js/store";
  import ImportantMessagesDetails from "./MIC-ImportantMessagesDetails.svelte";

  //mocking data

  const [data, loading, error, get] = fetchstore(
    "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/messages.json",
    token
  );
  $: if (token && !$data.messages) {
    get(token)
  }
  $: if ($data && $data.messages) {
    state = $data;
  }

  //slice long message
  $: if (state && state.messages) {
    message = state.messages[0].message.slice(0, 233);
  }

  ///////// acordion functionality
  import { slide } from "svelte/transition";
  let isOpen = false;
  let svgId = "rotate-svg-" + isOpen;

  const toggle = () => {
    isOpen = !isOpen;
    svgId = "rotate-svg-" + isOpen;
  };

  const showMessages = () => {
    show = !show;
  };
</script>

{#if $loading && !token}
Loading: {$loading}
{:else if $error}
  Error: {$error}
{:else if state.messages}
  <div class="message-container">
    <div class="container">
      <div id="message-header">
        <img src={messageLogo} alt="" /><img
          src={notification}
          alt=""
          id="notification"
        />
        <span id="unreaded-msgs">{state.messages.length}</span>
        <h4 id="title">Important Message</h4>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img
          src={circyle}
          alt=""
          id={svgId}
          on:click={toggle}
          aria-expanded={isOpen}
        />
      </div>
      {#if state.messages}
        {#if isOpen}
          <div class="message-body" transition:slide={{ duration: 300 }}>
            <p class="msg-data">{message}...</p>
          </div>
          <div class="message-footer" transition:slide={{ duration: 300 }}>
            <button on:click={showMessages}><span>View</span></button>
          </div>
          {#if show}
            <div>
              <mic-messagesdetails token={token}></mic-messagesdetails>
            </div>
          {/if}
        {/if}
      {:else}
        <h1>no messages to load</h1>
      {/if}
    </div>
  </div>
{:else}
  <h1>failed to load in messages</h1>
{/if}

<style scoped>
@font-face {
    font-family: "Interstate";
    src: url("../../assets/fonts/InterstateThin.ttf") format("truetype");
  }
  * {
    font-family: "Interstate";
    letter-spacing: -0.02em;
  }
  .message-container {
    min-width: 38%;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: fit-content;
    min-width: fit-content;
    order: 0;
    padding: 2rem;
    transition: 0.3s;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
  }
  #message-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    width: 90%;
    height: 40px;
    order: 0;
    flex-grow: 0;
    position: relative;
    text-transform: uppercase;
  }
  #message-header h4 {
    height: 29px;
    font-family: "Interstate";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #005faa;
    flex: none;
    flex-grow: 0;
  }
  #rotate-svg-false {
    cursor: pointer;
    transform: rotate(0.25turn);
    transition: transform 0.2s ease-in;
  }
  #rotate-svg-true {
    cursor: pointer;
    transition: transform 0.2s ease-in;
    transform: rotate(0.5turn);
  }
  #notification {
    position: absolute;
    left: 4.71%;
    right: 0;
    top: -2px;
  }
  #unreaded-msgs {
    position: absolute;
    left: 1.5rem;
    top: -0.1rem;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    font-feature-settings: "salt" on;
    color: #ffffff;
  }
  .message-body {
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

  #rotate-svg {
    transition: transform 0.2s ease-in;
    transform: rotate(0.25turn);
  }

  #rotate-svg-true {
    transition: transform 0.2s ease-in;
    transform: rotate(0.5turn);
  }
  @media screen and (max-width: 1000px) {
    .container {
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.7rem 0.2rem;
    }
    .message-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>