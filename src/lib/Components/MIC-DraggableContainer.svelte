<svelte:options tag={null}/>
<script>
  // @ts-nocheck
  export let itemData;
  export let onDrop;
  export let idPropertyName = "id";
  export let flipDurationMs = 300;
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { getToken } from "../../js/store";
  let apiToken;

  //mocking data
  const [token, loading, error, get] = getToken("data/Token.json", "Ammar");

  $: if (!apiToken) {
    apiToken = $token.token;
  }

  function handleConsider(e) {
    itemData = e.detail.items;
  }
  function handleFinalize(e) {
    onDrop(e.detail.items);
  }
</script>

<div class="wrapper-container">
  {#if $loading}
    Loading: {$loading}
  {:else if $error}
    Error: {$error}
  {:else}
    <section
      use:dndzone={{ items: itemData, flipDurationMs }}
      on:consider={handleConsider}
      on:finalize={handleFinalize}
    >
      {#each itemData as item (item[idPropertyName])}
        <div animate:flip={{ duration: flipDurationMs }}>
          <svelte:component
            this={item.name}
            {item}
            class="grid-item"
            token={apiToken}
          />
        </div>
      {/each}
    </section>
  {/if}
</div>

<style>
  section {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    column-gap:2rem;
    row-gap: 2.5rem;
  }
  .wrapper-container {
    margin-top: 20px;
    width: 60%;
  }
</style>
