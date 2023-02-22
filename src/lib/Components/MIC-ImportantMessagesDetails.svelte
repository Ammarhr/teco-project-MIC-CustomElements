<svelte:options tag="mic-messagesdetails" />

<script>
    // @ts-nocheck

    import messageLogo from "../../assets/envelope-solid.svg";
    import notification from "../../assets/notification.svg";
    import { slide } from "svelte/transition";

    export let messages;
    //state
    let show = false;

    const showMessages = () => {
        show = !show;
    };
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" || event.keyCode === 27) {
            if (show == true) show = false;
        }
    });
</script>

<div class="message-footer" transition:slide={{ duration: 300 }}>
    <button on:click={showMessages}><span>View</span></button>
</div>
{#if show}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="modal-container" on:click={showMessages}>
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
                            {#each messages as { message }, i}
                                <section>
                                    <h4>Message {i + 1}</h4>
                                    <p class="msg-data">
                                        {@html message}
                                    </p>
                                    <br />
                                    <hr />
                                </section>
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
        top: 25px;
        background-color: white;
        border-radius: 10px;
        max-width: 100vw;
        overflow-y: auto;
        max-height: 75%;
        padding: 20px 20px 25px 20px;

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
        font-weight: 400;
        font-size: 24px;
        line-height: 29px;
        display: flex;
        align-items: center;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        color: #005faa;
        display: flex;
        width: 100%;
    }
    #notification {
        position: absolute;
        left: 5.71%;
        left: 25.71%;
        right: 0;
        top: -7px;
    }
    h4 {
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
        grid-area: message-body;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 0px;
        width: 392px;
        height: 80%;
        flex: none;
        order: 0;
        flex-grow: 0;
    }
    .msg-data {
        font-family: "Interstate";
        font-style: normal;
        font-size: 18px;
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
