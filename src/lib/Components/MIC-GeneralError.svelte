<svelte:options tag="mic-generalerror" />

<script>
    // @ts-nocheck

    import { generalErr, errorCallback, apiToken } from "../../js/store";
    import setting from "../../js/setting";

    let tries = 3;
    const [data, loading, err, errorHandler] = errorCallback();

    $: if ($apiToken && $generalErr == true && !$data.HTMLBody && tries > 0) {
        console.log("kkk");
        errorHandler(
            $apiToken,
            // "../../../data/generalErr.json"
            `${setting.feedBack}rest/recommendationsfeedback/v1/Feedback/ErrorMessages?Code=ER_General_001`
        );
        tries--;
    }
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
