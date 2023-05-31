<!-- <svelte:options tag="mic-tooltip" /> -->

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
                    <div class="grid-layout">
                        {#each value.toolTips as toolTips}
                            <div class="grid-items">
                                <h4 class="sub-title">{toolTips.title}</h4>
                                <p>{toolTips.description}</p>
                            </div>
                        {/each}
                    </div>
                {/if}
                <hr />
            {/each}
        </div>
    {/if}
{/if}

<style lang="scss">
    .title {
        font-weight: 400;
        line-height: 30px;
        color: #005faa;
        margin: 24px 8px 24px 8px;
    }
    .search-con input {
        width: 100%;
        padding: 10px 12px;
        background: #ffffff;
        border: 1px solid #d1d5db;
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 6px;
    }
    .sec-header {
        display: flex;
        flex-direction: row;
    }
    .grid-layout {
        display: grid;
        grid-template-columns: auto auto;
        padding: 10px;
        gap: 24px 32px;
        @media screen and (max-width: 833px) {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
    }
    .grid-items {
        font-size: 30px;
        .sub-title {
            font-style: normal;
            line-height: 30px;
            font-size: 20px;
            font-weight: 400;
            line-height: 30px;
            margin: 0 !important;
            color: #005faa;
        }
        p {
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 30px;
            margin: 0;
        }
    }
</style>
