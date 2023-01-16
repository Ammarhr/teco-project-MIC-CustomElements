<svelte:options tag={"mic-yearlyenergy"} />

<script>
    // @ts-nocheck

    import dropDown from "../../assets/cr.svg";
    import { slide } from "svelte/transition";
    import { fetchstore } from "../../js/store";
    export let token;
    let yearlyEnergyData;
    ///////// acordion functionality
    let isOpen = false;
    let svgId = "rotate-svg-" + isOpen;

    const toggle = () => {
        isOpen = !isOpen;
        svgId = "rotate-svg-" + isOpen;
    };
    ////////////////////////
    const [data, loading, error, get] = fetchstore(
        "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/yearlyEnergy.json",
        token
    );
    $: if (token && !$data.YearlyValues) {
       get(token)
    }
    $: if ($data && $data.YearlyValues) {
        yearlyEnergyData = $data.YearlyValues;
    }
</script>

{#if $loading && !token}
    <h1>loading...</h1>
{:else if $error}
    <h1>{$error}</h1>
{:else if yearlyEnergyData}
    <div class="yearly-energy-card">
        <div class="card-header">
            <h5 class="title">YOUR GENERATED ENERGY SUMMARY</h5>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
                src={dropDown}
                alt=""
                id={svgId}
                on:click={toggle}
                aria-expanded={isOpen}
            />
        </div>
        {#if isOpen}
            {#each yearlyEnergyData as YearlyValue}
                {#if !YearlyValue.SumFlag}
                    <div
                        class="yearly-content"
                        transition:slide={{ duration: 300 }}
                    >
                        <h2 class="yearly-label">{YearlyValue.Label}</h2>
                        <p>{YearlyValue.Value}</p>
                    </div>
                {:else}
                    <div
                        class="sum-content"
                        transition:slide={{ duration: 300 }}
                    >
                        <h2 id="sum-label">{YearlyValue.Label}</h2>
                        <p id="sum-value">{YearlyValue.Value}</p>
                    </div>
                {/if}
            {/each}
            <div class="tool-tip" transition:slide={{ duration: 300 }}>
                <p>{$data.YearlyTooltip}</p>
            </div>
        {/if}
    </div>
{:else}
    <h1>failed to load</h1>
{/if}

<style scoped>
    @font-face {
        font-family: "Interstate";
        src: url("../../assets/fonts/Interstate.ttf") format("truetype");
    }
    * {
        font-family: "Interstate";
    }
    .yearly-energy-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-items: center;
        width: 100%;
        padding: 20px;
        transition: 0.3s;
        border-radius: 16px;
        margin-top: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
    .card-header {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px;
        width: 100%;
        height: 40px;
        flex: none;
        order: 0;
        flex-grow: 0;
    }
    .title {
        width: 242px;
        height: 29px;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 29px;
        display: flex;
        align-items: center;
        letter-spacing: -0.02em;
        color: #005faa;
        flex: none;
        order: 0;
        flex-grow: 0;
    }

    /*----------acordion-------------*/
    #rotate-svg-false {
        cursor: pointer;
        position: absolute;
        transform: rotate(0.25turn);
        transition: transform 0.2s ease-in;
        right: 0;
    }
    #rotate-svg-true {
        cursor: pointer;
        transition: transform 0.2s ease-in;
        transform: rotate(0.5turn);
        position: absolute;
        right: 0;
    }
    /*------------------*/
    .yearly-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding: 5px;
        border-bottom: 1px solid #eaecee;
    }
    .yearly-label {
        font-weight: 300;
        font-size: 20px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #000000;
        margin: 0;
    }

    .yearly-content p {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        display: flex;
        align-items: center;
        text-align: right;
        color: #000000;
    }
    .sum-content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding: 5px;
        border-top: 2px solid #005faa;
    }
    #sum-label {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #005faa;
    }
    #sum-value {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        display: flex;
        align-items: center;
        text-align: right;
        color: #005faa;
    }
    .tool-tip {
        max-width: 392px;
        height: 66px;
        font-family: "Interstate";
        font-style: italic;
        font-weight: 300;
        font-size: 18px;
        line-height: 22px;
        display: flex;
        align-items: center;
        color: #005faa;
        flex: none;
        order: 2;
        flex-grow: 0;
    }
</style>
