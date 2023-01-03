<script>
    // @ts-nocheck

    import dropDown from "../../assets/cr.svg";
    import { slide } from "svelte/transition";
    import { fetchstore } from "../../js/store";
    export let token;
    let sunSelectData;
    ///////// acordion functionality
    let isOpen = false;
    let svgId = "rotate-svg-" + isOpen;

    const toggle = () => {
        isOpen = !isOpen;
        svgId = "rotate-svg-" + isOpen;
    };
    ////////////////////////
    const [data, loading, error, get] = fetchstore(
        "../../../data/sunSelect.json",
        token
    );
    $: if ($data) {
        sunSelectData = $data;
    }
</script>

{#if $loading}
    <h1>loading...</h1>
{:else if $error}
    <h1>{$error}</h1>
{:else if sunSelectData}
    <div class="card">
        <div class="card-header">
            <h5 class="title">SUN SELECT</h5>
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
            <div class="content" transition:slide={{ duration: 300 }}>
                <h2 id="percentage">{sunSelectData.SubSelectValue}%</h2>
                <p>{sunSelectData.SubSelectMessage}</p>
            </div>
            <div class="sub-content" transition:slide={{ duration: 300 }}>
                <p>
                    {sunSelectData.SubSelectTooltip}
                    <!-- As a Sun Select customer you <span>DO NOT</span> pay fuel cost
                    for the energy you consume from solar. -->
                </p>
            </div>
        {/if}
    </div>
{/if}

<style>
    @font-face {
        font-family: "Interstate";
        src: url("../../assets/fonts/Interstate.ttf") format("truetype");
    }
    * {
        font-family: "Interstate";
    }
    .card {
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
    .content {
        width: 100%;
        padding: 5px;
    }
    #percentage {
        font-family: "Interstate";
        font-style: normal;
        font-weight: 700;
        font-size: 88px;
        line-height: 106px;
        color: #005faa;
        margin: 0;
    }
    .content p {
        width: 403px;
        height: 60px;
        font-family: "Interstate";
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #000000;
    }
    .sub-content {
        padding-top: 10px;
        border-top: 1px solid #eaecee;
    }
    .sub-content p {
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 30px;
        color: #6c6c6c;
        flex: none;
        order: 4;
        flex-grow: 0;
    }
    .sub-content p span {
        text-transform: uppercase;
        color: #005faa;
    }
</style>
