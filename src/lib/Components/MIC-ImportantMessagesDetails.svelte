<svelte:options tag="mic-messagesdetails" />

<script>
  // @ts-nocheck

  // import circyle from "../../assets/cr.svg";
  // import messageNotification from "../../assets/messages-notification.svg";
  // import messageNotification from "../../assets/envelope-solid.svg";

  import {
    fetchAndRedirect,
    apiToken,
    eventsDomain,
    apiDomain,
    persona,
  } from "../../js/store";
  import { useLazyImage as lazyImage } from "svelte-lazy-image";

  export let messages;
  let container;
  //state
  let show = false;

  const showMessages = (toggle) => {
    show = !show;
    if (toggle == "view") {
      fetchAndRedirect(
        $apiToken,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "IN_Important_Messages_view",
          Outcome: `Number Of Messsages: ${messages.length}`,
          Feedback: "",
          Persona: $persona,
        }
      );
    } else {
      fetchAndRedirect(
        $apiToken,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "IN_Important_Messages_Close",
          Outcome: `Number Of Messsages: ${messages.length}`,
          Feedback: "",
          Persona: $persona,
        }
      );
    }
  };
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      if (show == true) {
        show = false;
        fetchAndRedirect(
          $apiToken,
          `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
          null,
          {
            EventCode: "IN_Important_Messages_Close",
            Outcome: `Number Of Messsages: ${messages.length}`,
            Feedback: "",
            Persona: $persona,
          }
        );
      }
    }
  });
  $: container = document.querySelector(".container");
  $: if (container) {
    container.addEventListener("click", function (event) {
      // check if the click event originated from the container
      if (event.target === container) {
        // do something when the container is clicked
        showMessages();
      }
    });
  }
</script>

<div class="message-footer" >
  <button class="enable" on:click={() => showMessages("view")}>View</button>
</div>
{#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="modal-container" bind:this={container}>
    <div>
      {#if messages}
        <div class="modal-content">
          <div class="message-header">
            <div class="message-logo">
              <img
                src={`https://tecocdn.azureedge.net/ibill/iBill-assets/envelope-solid.svg`}
                alt=""
                use:lazyImage
              />
              <span id="unreaded-msgs">&nbsp;{messages.length}&nbsp;</span>
            </div>
            <div class="message-lable">Important Message</div>
            <button on:click={() => showMessages()}>×</button>
          </div>
          {#if messages}
            <div class="message-body">
              {#each messages as messageObj, i}
                {#if messageObj.message !== ""}
                  <section>
                    <h4 class="msg-title">
                      Message {i + 1}
                    </h4>
                    <p class="msg-data">
                      {#if messageObj && messageObj.Title !== ""}
                        <span>
                          <span class="msg-title">
                            {messageObj.Title}
                          </span>
                          {@html messageObj.message}
                        </span>
                      {:else}
                        {@html messageObj.message}
                      {/if}
                    </p>
                    <br />
                    <hr />
                  </section>
                {/if}
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    overflow-y: auto;
  }
  .modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    max-width: 100vw;
    overflow-y: auto;
    max-height: 75%;
    padding: 20px 20px 25px 20px;
    min-width: 240px;
    button {
      background: none;
      border: none;
      color: #6b7280;
      font-size: 36px;
      font-weight: 600;
      padding: 0;
      cursor: pointer;
    }
    img {
      cursor: pointer;
    }
  }
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 0 25px 0 0%;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(216, 216, 216);
    border-radius: 0 25px 0 0%;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(192, 192, 192, 0.759);
  }
  hr {
    margin-top: 32px;
  }
  .container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
  }
  .message-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 10px;
    align-items: center;
    .message-lable {
      display: flex;
      align-items: center;
      text-transform: uppercase;
      color: #005faa;
      letter-spacing: -0.02em;
      font-weight: 400;
      font-size: 21px;
      line-height: 29px;
      text-align: center;
      @media screen and (max-width: 480px) {
        font-size: 18px;
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
  #notification {
    position: absolute;
    left: 5.71%;
    left: 25.71%;
    right: 0;
    top: -7px;
  }

  .msg-title {
    font-weight: 700;
    font-size: 20px;
    letter-spacing: -0.02em;
    color: #005faa;
    height: 1.5rem;
  }
  p {
    // display: contents;
    margin: 0;
    @media screen and (max-width: 480px) {
      font-size: 18px !important;
    }
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
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .message-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    max-width: 392px;
    height: 80%;
  }
  .msg-data {
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 30px;
  }

  .message-logo {
    position: relative;
  }
  .message-footer {
    height: auto;
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    .enable {
      padding: 10px 24px;
      gap: 10px;
      width: 93px;
      height: 50px;
      font-weight: 400;
      font-size: 20px;
      line-height: 30px;
      background: #005faa;
      color: #ffffff;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      &:hover {
        background-color: #145093;
        /* darker */
      }
      &:active {
        background-color: #004083;
        /* darker */
      }
    }
  }
</style>
