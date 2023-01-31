<svelte:options tag="mic-recomendation" />

<script>
    // @ts-nocheck

    import herImg from "../../assets/recomendation-img.svg";
    import { fetchstore } from "../../js/store";

    import MicLoading from "./MIC-Loading.svelte";
    import MicRenderError from "./MIC-RenderError.svelte";

    export let token;

    let fillColor = "#005FAA";
    let unFillColor = "#b1dbfd";
    let messages = [];

    //mocking data
    const [data, loading, error, get] = fetchstore();
    $: if (token && !$data.messages) {
        get(
            token,
            "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/recomendationMessages.json"
        );
    }
    // getting the data ready
    $: if ($data && $data.messages) {
        messages = $data.messages;
    }
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
    />
</svelte:head>
{#if $loading}
    <div class="loading">
        <MicLoading />
    </div>
{:else if $error}
    <MicRenderError />
{:else if messages}
    <div class="card">
        <div class="card-header">
            <h6>INSIGHTS</h6>
        </div>
        <div class="hero">
            <img src={herImg} alt="" />
            <p>
                You used <span> 2% less kWh </span> than the same period last year.
            </p>
        </div>
        <div class="messages-container">
            {#each messages as message}
                <div class="message">
                    <p>
                        {message.message}
                    </p>
                    <div class="react">
                        {#if message.liked}
                            <i
                                class="fa fa-thumbs-up fa-2x thumbs-fill"
                                style="color: {fillColor};"
                            />
                            <i
                                class="fa fa-thumbs-down fa-2x thumbs-fill thmb-down"
                                style="color: {unFillColor};"
                            />
                        {:else if message.liked == false}
                            <i
                                class="fa fa-thumbs-up fa-2x thumbs-fill"
                                style="color: {unFillColor};"
                            />
                            <i
                                class="fa fa-thumbs-down fa-2x thumbs-fill thmb-down"
                                style="color: {fillColor};"
                            />
                        {:else}
                            <i
                                class="fa fa-thumbs-up fa-2x thumbs-fill"
                                style="color: {unFillColor};"
                            />
                            <i
                                class="fa fa-thumbs-down fa-2x thumbs-fill thmb-down"
                                style="color: {unFillColor};"
                            />
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
{:else}
    <h1>failed to load</h1>
{/if}

<style scoped>
    .loading {
        width: 100%;
    }
    .card {
        overflow-y: scroll;
        max-height: 800px;
    }
    .card-header {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px;
        width: 100%;
        height: 40px;
        flex: none;
        order: 0;
        flex-grow: 0;
    }
    .card-header h6 {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        display: flex;
        align-items: flex-end;
        text-align: center;
        color: #000000;
        flex: none;
        order: 0;
        flex-grow: 0;
    }
    .hero {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }
    .hero p {
        width: 487px;
        height: 30px;
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #000000;
        flex: none;
        order: 2;
        flex-grow: 0;
    }
    .hero p span {
        color: #005faa;
    }
    .messages-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .message {
        display: flex;
        flex-direction: column;
        padding: 16px;
        max-width: 688px;
        height: 171px;
        background: rgba(66, 190, 101, 0.05);
    }
    .message p {
        max-width: 656px;
        height: 90px;
        font-family: "Interstate";
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #000000;
        flex: none;
        order: 0;
        flex-grow: 0;
    }
    .react {
        display: flex;
        flex-direction: row;
        align-self: flex-end;
        justify-content: space-evenly;
        background: #ffffff;
        border: 1px solid #e6eff7;
        border-radius: 16px;
        width: 96px;
        height: 39px;
        padding: 6px;
    }
    .thmb-down {
        transform: scaleX(-1);
    }
</style>