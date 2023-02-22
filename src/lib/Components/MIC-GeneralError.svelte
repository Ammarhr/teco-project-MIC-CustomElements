<svelte:options tag="mic-generalerror" />

<script>
    // @ts-nocheck

    import { generalErr, errorCallback, eventsDomain } from "../../js/store";
    import { onMount } from "svelte";
    export let token;
    const [data, loading, err, errorHandler] = errorCallback();
    onMount(() => {
        if (token && $generalErr == true && !$data.HTMLBody) {
            errorHandler(
                token,
                // "../../../data/generalErr.json"
                `${$eventsDomain}/rest/recommendationsfeedback/v1/Feedback/ErrorMessages?Code=ER_General_001`
            );
        }
    });
</script>

{#if $loading}
    <h1>loadingg..</h1>
{:else if $err}
    <div />
{:else if $data.HTMLBody}
    <div class="container">
        <p>Oops! Something went wrong.</p>

        <img
            src={`data:image/png;base64,${$data.RecommendationImage}`}
            alt=""
            class="err-img"
        />

        <p id="err-body">
            {@html $data.HTMLBody}
        </p>
    </div>
{:else}
    <h1 />
{/if}

<style lang="scss">
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 650px;
        margin: 20px auto;
        p {
            font-weight: 400;
            font-size: 36px;
            line-height: 43px;
            width: 100%;
            text-align: center;
        }
        .err-img {
            max-width: 50vw;
        }
    }
</style>
