<svelte:options tag={"mic-sunselect"} />

<script>
    // @ts-nocheck

    import dropDown from "../../assets/cr.svg";
    import { slide } from "svelte/transition";
    import {
        fetchstore,
        apiToken,
        apiDomain,
        eventsDomain,
        newToken,
    } from "../../js/store";
    import { onMount } from "svelte";
    import percentageIcon from "../../assets/percentage-icon.svg";

    let newTokenTrigger;
    let sunSelectData;
    ///////// acordion functionality
    let isOpen = true;
    let svgId = "rotate-svg-" + isOpen;

    const toggle = () => {
        isOpen = !isOpen;
        svgId = "rotate-svg-" + isOpen;
    };
    ////////////////////////
    const [data, loading, error, get] = fetchstore();
    onMount(() => {
        if ($apiToken && !sunSelectData) {
            get(
                $apiToken,
                `${$apiDomain}/api/ibill/webcomponents/v1/Post/SunSelect`
                // "../../data/sunSelect.json"
            );
        }
        newTokenTrigger = $apiToken;
    });
    $: if (
        $newToken &&
        $newToken.token &&
        (newTokenTrigger == $apiToken || newTokenTrigger !== $newToken.token)
    ) {
        get(
            $newToken.token,
            // "../../data/yearlyEnergy.json"
            `${$apiDomain}/api/ibill/webcomponents/v1/Post/SunSelect`
        );
        newTokenTrigger = $newToken.token;
    }
    $: if ($data && $data.SunSelectValue) {
        sunSelectData = $data;
    }
</script>

{#if $loading}
    <mic-loading />
{:else if sunSelectData && sunSelectData.SunSelectValue && sunSelectData.SunSelectValue !== ""}
    <div class="card">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div id="header" on:click={toggle} aria-expanded={isOpen}>
            <h5 class="title">SUN SELECT</h5>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img src={dropDown} alt="" id={svgId} />
        </div>
        {#if isOpen}
            <div
                class="sun-select-content"
                transition:slide={{ duration: 300 }}
            >
                {#if sunSelectData.SunSelectValue !== ""}
                    <h2 id="percentage">
                        {#if sunSelectData.SunSelectValue.includes("%")}
                            {sunSelectData.SunSelectValue.split("%")[0]}
                            <img src={percentageIcon} alt="" />
                        {:else}
                            {sunSelectData.SunSelectValue}
                        {/if}
                    </h2>
                {/if}
                <p>{sunSelectData.SunSelectMessage}</p>
            </div>
            <div class="sub-content" transition:slide={{ duration: 300 }}>
                <p>
                    {sunSelectData.SunSelectTooltip}
                    <!-- As a Sun Select customer you <span>DO NOT</span> pay fuel cost
                    for the energy you consume from solar. -->
                </p>
            </div>
        {/if}
    </div>
{/if}

<style lang="scss">
    * {
        font-family: "Interstate";
    }
    .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 370px;
        max-width: calc(100% - 40px);
        padding: 20px;
        transition: 0.3s;
        border-radius: 16px;
        box-shadow: 0px 0px 10px rgb(34 34 34 / 24%);
        margin-bottom: 15px;
        background-color: #ffff;
        overflow: hidden;
        @media screen and (max-width: 767px) {
            width: 100%;
        }
    }
    #header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px;
        width: 100%;
        height: 40px;
        cursor: pointer;
    }
    .insights-title {
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        display: flex;
        align-items: center;
        color: #005faa;
        margin: 0;
    }
    .title {
        /* width: 242px; */
        /* height: 29px; */
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 29px;
        /* display: flex; */
        /* align-items: center; */
        letter-spacing: -0.02em;
        color: #005faa;
        /* flex: none; */
        /* order: 0; */
        /* flex-grow: 0; */
        margin: 0;
    }

    /*----------acordion-------------*/
    #rotate-svg-true {
        cursor: pointer;
        transform: rotate(0turn);
        transition: transform 0.2s ease-in;
    }
    #rotate-svg-false {
        cursor: pointer;
        transition: transform 0.2s ease-in;
        transform: rotate(180deg);
    }
    /*------------------*/
    .sun-select-content {
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
</style>
