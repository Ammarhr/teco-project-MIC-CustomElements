<svelte:options tag="mic-messagesdetails" />

<script>
    // @ts-nocheck

    import messageLogo from "../../assets/envelope-solid.svg";
    import notification from "../../assets/notification.svg";
    export let token;
    //state
    let state = {};
    //unreaded messages counter
    import { fetchstore } from "../../js/store";

    //mocking data
    const [data, loading, error, get] = fetchstore(
        "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/messages.json",
        token
    );
    $: if (token && !state) {
       get(token)
    }
    $: if ($data) {
        state = $data;
    }
</script>

{#if $loading & !token}
    Loading: {$loading}
{:else if $error}
    Error: {$error}
{:else}
    <div class="container">
        <div class="message-header">
            <div class="message-logo">
                <img src={messageLogo} alt="" /><img
                    src={notification}
                    alt=""
                    id="notification"
                />
                <span id="unreaded-msgs">{state.messages.length}</span>
            </div>
            <div class="message-lable">Important Message</div>
        </div>
        {#if state.messages}
            <div class="message-body">
                {#each state.messages as { message }, i}
                    <section>
                        <h4>Message {i + 1}</h4>
                        <p class="msg-data">
                            {message}...
                        </p>
                        <br />
                        <hr />
                    </section>
                {/each}
            </div>
        {/if}
    </div>
{/if}

<style scoped>
    @font-face {
        font-family: "Interstate";
        src: url("../../assets/fonts/Interstate.ttf") format("truetype");
    }
    * {
        font-family: "Interstate";
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
        font-family: "Interstate";
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
        letter-spacing: -0.02em;
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
</style>
