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
  import { useLazyImage as lazyImage } from "svelte-lazy-image";

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
<div class="container">
  <p>Oops!</p>

  <img
    src="https://cdn.dribbble.com/users/774806/screenshots/3823110/media/6fed552a31a9ed3d0ef9bc210dcc70a2.gif"
    alt=""
    style="width: 150%;"
    use:lazyImage
  />
  <p id="err-body">
    
  </p>
</div>
{:else if $data && $data.HTMLBody}
  <div class="container">
    <p>Oops! Something went wrong.</p>

    <img
      src={`data:image/png;base64,${$data.RecommendationImage}`}
      alt=""
      class="err-img"
      use:lazyImage
    />
    <p id="err-body">
      
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
    overflow: hidden;
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
