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
  // import errorImage from "../../assets/Computer troubleshooting-rafiki.svg";
  export let token;
  const [data, loading, err, errorHandler] = errorCallback();
  onMount(() => {
    if (token && $SAPToken && $generalErr == true && !$data.HTMLBody) {
      errorHandler(
        token,
        // "../../../data/generalErr.json"
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/GetErrorMessages?Code=ER_General_001`,
        // "http://localhost:3030/simulate-error",
        $SAPToken
      ).then(() => loading.set(false));
    }
  });
  function refreshPage() {
    location.reload();
  }
</script>

{#if $loading == true}
  <mic-loading />
{:else if $err}
  <div class="container">
    <!-- <img src={errorImage} alt="" style="width: 540px;" use:lazyImage /> -->
    <!-- <p>Oops!</p> -->
    <div id="err-body">
      <!-- <p style="font-size: 28px;">An unexpected error has occurred.</p> -->
      <p style="font-size: 22px; line-height:1; margin-bottom: 12px;">
        An unexpected error has occurred. Please refresh your browser and try
        again.
      </p>
    </div>
    <div class="buttons">
      <button class="btn-refresh" on:click={refreshPage}>
        <img
          class="icon"
          src="https://htmlacademy.ru/assets/icons/reload-6x-white.png"
          use:lazyImage
        /> Refresh
      </button>
    </div>
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
    overflow: hidden;
    font-family: "Interstate";
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
  p {
    margin: unset;
  }
  // refresh button
  .buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    padding: 12px;
    font-size: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    overflow: hidden;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    transition: transform 0.4s ease-in-out;
    border-radius: 6px;
    margin-top: 12px;
  }

  button:active {
    top: 1px;
    box-shadow: none;
  }

  .btn-refresh {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #005faa;
    &:hover .icon {
      transform: rotate(360deg) scale(1.2);
    }
    .icon {
      width: 18px;
      height: 18px;
      transition: all 0.4s ease-in-out;
    }
  }
</style>
