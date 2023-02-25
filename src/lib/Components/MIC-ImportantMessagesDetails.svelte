<svelte:options tag="mic-messagesdetails" />

<script>
    // @ts-nocheck

    import messageLogo from "../../assets/envelope-solid.svg";
    import notification from "../../assets/notification.svg";
    import { slide } from "svelte/transition";
    import { fetchAndRedirect, apiToken, eventsDomain } from "../../js/store";

    export let messages;
    let container;
    //state
    let show = false;

    const showMessages = (toggle) => {
        show = !show;
        if (toggle) {
            fetchAndRedirect(
                $apiToken,
                `${$eventsDomain}/api/admin/MiJourney/v1/Create/Event`,
                null,
                {
                    EventCode: "IN_Important_Messages_view",
                    Outcome: "",
                }
            );
        } else {
            fetchAndRedirect(
                $apiToken,
                `${$eventsDomain}/api/admin/MiJourney/v1/Create/Event`,
                null,
                {
                    EventCode: "IN_Important_Messages_Close",
                    Outcome: "",
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
                    `${$eventsDomain}/api/admin/MiJourney/v1/Create/Event`,
                    null,
                    {
                        EventCode: "IN_Important_Messages_Close",
                        Outcome: "",
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

<div class="message-footer" transition:slide={{ duration: 300 }}>
    <button on:click={() => showMessages("view")}><span>View</span></button>
</div>
{#if show}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="modal-container" bind:this={container}>
        <div>
            {#if messages}
                <div class="modal-content">
                    <div class="message-header">
                        <div class="message-logo">
                            <img src={messageLogo} alt="" /><img
                                src={notification}
                                alt=""
                                id="notification"
                            />
                            <span id="unreaded-msgs">{messages.length}</span>
                        </div>
                        <div class="message-lable">Important Message</div>
                        <button on:click={showMessages}>×</button>
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
                                            {#if messageObj.title !== ""}
                                                <span>
                                                    <span class="msg-title">
                                                        <b>
                                                            {messageObj.title}</b
                                                        >
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
        // width: 80%;
        @media screen and (max-width: 450px) {
            width: 80%;
        }
        button {
            background: none;
            border: none;
            color: #6b7280;
            font-size: 36px;
            font-weight: 600;
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
        justify-content: space-evenly;

        width: 100%;
        .message-lable {
            display: flex;
            align-items: center;
            text-transform: uppercase;
            color: #005faa;
            letter-spacing: -0.02em;
            font-weight: 400;
            font-size: 21px;
            line-height: 29px;
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
        font-family: "Interstate";
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        letter-spacing: -0.02em;
        color: #005faa;
        height: 1.5rem;
    }
    #unreaded-msgs {
        position: absolute;
        left: 1.4rem;
        top: -0.4rem;
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
        max-width: 392px;
        height: 80%;
        width: 90%;
    }
    .msg-data {
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 30px;
    }

    .message-logo {
        grid-area: message-logo;
        position: relative;
        width: 58px;
    }
    .message-footer {
        height: auto;
        display: flex;
        flex-direction: row-reverse;
        width: 90%;
        button {
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
        }
    }
</style>
