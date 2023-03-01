<svelte:options tag="mic-tooltip" />

<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { apiDomain, apiToken, fetchstore } from "../../js/store";
    import minusCircle from "../../assets/minus-circle.svg";
    import search from "../../assets/search.svg";
    let searchTerm = "";
    let results = [];
    let filteredResults = results;
    const [data, loading, error, get] = fetchstore();

    onMount(() => {
        if ($apiDomain && $apiToken) {
            get($apiToken, "../../data/toolTip.json");
        }
    });

    $: if ($data && $data.groups) {
        results = $data.groups;
        filteredResults = results;
    }

    function handleSearch() {
        filteredResults = results
            .map((obj) => {
                return {
                    ...obj,
                    toolTips: obj.toolTips.filter((toolTip) => {
                        return (
                            toolTip.title
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()) ||
                            toolTip.description
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                        );
                    }),
                };
            })
            .filter((obj) => {
                return obj.toolTips.length > 0;
            });
    }
</script>

{#if $loading}
    <mic-loading />
{:else if $data && $data.groups}
    {#if results && results[0]}
        <div>
            <div>
                <h1 class="title">Understanding Your Charges</h1>
            </div>
            <div class="search-con">
                <input
                type="search"
                    bind:value={searchTerm}
                    on:input={handleSearch}
                    placeholder="Search Terms"
                    />
                    <!-- <img role="img" style="width:16px;" src={search} /> -->
            </div>
            {#each filteredResults as value}
                <div class="sec-header">
                    <img src={minusCircle} alt="" />&nbsp;
                    <h2 class="title">{value.Title}</h2>
                </div>
                <!-- {JSON.stringify(value.toolTips)} -->
                {#if value.toolTips}
                    {#each value.toolTips as toolTips}
                        <h4 class="title">{toolTips.title}</h4>
                        <p>{toolTips.description}</p>
                    {/each}
                {/if}
                <hr />
            {/each}
        </div>
    {/if}
{/if}

<style lang="scss">
    .title {
        color: #005faa;
        font-weight: 400;
    }
   .search-con input {
        width: 100%;
        border: 2px solid #005faa;
        border-radius: 5px;
        color: black;
    }
    .sec-header {
        display: flex;
        flex-direction: row;
    }
</style>
