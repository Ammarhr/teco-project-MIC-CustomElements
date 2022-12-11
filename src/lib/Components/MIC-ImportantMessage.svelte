<svelte:options tag="mic-importentmessage" />

<script>
  // @ts-nocheck

  //svg imports
  import messageLogo from "../../assets/envelope-solid.svg";
  import circyle from "../../assets/cr.svg";
  import notification from "../../assets/notification.svg";

  //state
  let state = {};
  export let item = { name: "Item" };
  export let token;

  let message;
  //unreaded messages counter
  let counter;
  const unReadedMessagesHandle = () => {
    let unreadedMwssages = state.messages.filter(
      (message) => message.readed == false
    );
    counter = unreadedMwssages.length;
  };
  import { fetchstore } from "../../js/store";

  //mocking data
  const [data, loading, error, get] = fetchstore(
    "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/data.json",
    token
  );

  $: if ($data) {
    state = $data;
  }

  //slice long message
  $: if (state && state.messages) {
    unReadedMessagesHandle();
    message = state.messages[0].message.slice(0, 240);
  }

  ///////// acordion functionality

  import { slide } from "svelte/transition";
  let isOpen = true;
  let svgId = "none";

  const toggle = () => {
    isOpen = !isOpen;
    svgId = "rotate-svg-" + isOpen;
    modal.set(null);
  };

  ////////////////////////
  ///////// modal pop up dunctionality
  import { writable } from "svelte/store";
  import Modal from "svelte-simple-modal";
  import ImportantMessagesDetails from "./MIC-ImportantMessagesDetails.svelte";
  const modal = writable(null);
  const showModal = () => modal.set(ImportantMessagesDetails);
  /////////////////////////
</script>

{#if $loading}
  Loading: {$loading}
{:else if $error}
  Error: {$error}
{:else}
  <div class="message-container">
    <div class="container">
      <div class="message-logo">
        <img src={messageLogo} alt="" /><img
          src={notification}
          alt=""
          id="notification"
        />
        <span id="unreaded-msgs">{counter}</span>
      </div>
      <div class="message-lable">Important Message</div>
      <div class="message-btn">
        <button id="btn-toggle" on:click={toggle} aria-expanded={isOpen}
          ><img src={circyle} alt="" id={svgId} /></button
        >
      </div>
      {#if state.messages}
        {#if isOpen}
          <div class="message-body" transition:slide={{ duration: 300 }}>
            <p class="msg-data">{message}...</p>
          </div>
          <div class="message-footer" transition:slide={{ duration: 300 }}>
            <Modal
              show={$modal}
              styleWindow={{
                boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.15)",
                minHeight: "62rem",
                maxWidth: "30rem",
              }}
            >
              <button on:click={showModal}><span>View</span></button>
            </Modal>
          </div>
        {/if}
      {/if}
    </div>
  </div>
{/if}

<style>
  @font-face {
    font-family: "Interstate";
    src: url("../../assets/fonts/Interstate.ttf") format("truetype");
  }
  * {
    font-family: "Interstate";
  }

  .message-container {
    max-height: 25.188rem;
    max-width: 30rem;
  }
  .container {
    display: grid;
    grid-template-columns: 0.4fr 1.7fr 0.4fr;
    grid-template-rows: 0.4fr 2.1fr 0.4fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      "message-logo message-lable message-"
      "message-body message-body message-body"
      "message-footer message-footer message-footer";
    padding: 32px;
    gap: 7px;
    max-width: 23.125rem;
    min-height: auto;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(34, 34, 34, 0.24);
    border-radius: 20px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .message-lable {
    width: 267px;
    height: 29px;
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
    order: 1;
    flex-grow: 0;
  }
  #notification {
    position: absolute;
    left: 5.71%;
    left: 25.71%;
    right: 0;
    top: -7px;
    border: 2px solid #ffffff;
  }
  #unreaded-msgs {
    position: absolute;
    left: 40.88%;
    right: 89.07%;
    top: -7.54%;
    bottom: 30.58%;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    font-feature-settings: "salt" on;

    color: #ffffff;
  }
  .message-body {
    grid-area: message-body;
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
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #000000;
    flex: none;
    order: 1;
    flex-grow: 0;
    height: auto;
  }

  .message-logo {
    grid-area: message-logo;
    position: relative;
    width: 58px;
  }

  .message-btn {
    grid-area: message-;
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
    grid-area: message-footer;
    height: auto;
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

  #btn-toggle img {
    transition: transform 0.2s ease-in;
  }

  #rotate-svg-true {
    transform: rotate(0.5turn);
  }
</style>
