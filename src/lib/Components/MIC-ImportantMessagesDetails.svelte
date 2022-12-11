<script>
    // @ts-nocheck

    import messageLogo from "../../assets/envelope-solid.svg";
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
        "token 2022"
    );

    $: if ($data) {
        state = $data;
    }

    //slice long message
    $: if (state && state.messages) {
        unReadedMessagesHandle();
        // message = state.messages.message;
    }
</script>

{#if $loading}
    Loading: {$loading}
{:else if $error}
    Error: {$error}
{:else}
    <!-- <div class="message-container"> -->
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
        {#if state.messages}
            <div class="message-body">
                {#each state.messages as { message }, i}
                    <p class="msg-data">
                        <!-- <span class="message-header"> -->
                        Message {i + 1}
                        <!-- </span> -->
                        <br />
                        {message}...
                    </p>
                {/each}
            </div>
        {/if}
    </div>
    <!-- </div> -->
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
        height: 100%;
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
        top: -2.54%;
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
        /* gap: 499px; */
        width: 392px;
        height: 100%;
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
</style>
