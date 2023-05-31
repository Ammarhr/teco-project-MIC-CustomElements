<svelte:options tag="mic-generalerror" />

<script>
  // @ts-nocheck

  import {
    generalErr,
    errorCallback,
    apiDomain,
    SAPToken,
  } from "../../js/store";
  import { onMount } from "svelte";
  export let token;
  const [data, loading, err, errorHandler] = errorCallback();
  onMount(() => {
    if (token && $SAPToken && $generalErr == true && !$data.HTMLBody) {
      errorHandler(
        token,
        // "../../../data/generalErr.json"
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/GetErrorMessages?Code=ER_General_001`,
        $SAPToken
      ).then(() => loading.set(false));
    }
  });

</script>

{#if $loading == true}
  <mic-loading />
{:else if $err}
  <div>Error..</div>
{:else if $data && $data.HTMLBody}
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
