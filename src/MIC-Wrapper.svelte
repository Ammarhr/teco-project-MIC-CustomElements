<svelte:options tag="mic-wrapper" />

<script>
  // @ts-nocheck
  import {setDomain, setToken} from './js/store'
  export let token;
  export let domain;

  
  $: if (token || domain) {
    // console.log('this is the token: ', token, "and this is the api domain: ", domain);
    setToken(token);
    setDomain(domain);
  }

</script>
{#if token && domain}
<div class="wrapper">
  <mic-balancesummary></mic-balancesummary>
  <mic-billselector></mic-billselector>
  <mic-bulkdownload></mic-bulkdownload>
</div>
{:else}
<mic-render-error err={"failed to load: unvailed token or domain"} />
{/if}

<style lang="scss">
  .wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
</style>