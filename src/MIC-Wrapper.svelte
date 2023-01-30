<svelte:options tag="mic-wrapper" />

<script>
  // @ts-nocheck
  import {setDomain, setToken} from './js/store'
  export let token;
  export let domain;

  
  $: if (token || domain) {
    console.log('this is the token: ', token, "and this is the api domain: ", domain);
    setToken(token);
    setDomain(domain);
  }

</script>
{#if token && domain}
<div>
  
</div>
{:else}
<mic-render-error err={"failed to load: unvailed token or domain"} />
{/if}