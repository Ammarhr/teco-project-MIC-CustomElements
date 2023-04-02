<svelte:options tag={"mic-sunselect"} />

<script>
    // @ts-nocheck

    // import dropDown from "../../assets/cr.svg";
    // import percentageIcon from "../../assets/percentage-icon.svg";
    import { slide } from "svelte/transition";
    import {
        fetchstore,
        apiToken,
        apiDomain,
        eventsDomain,
        newToken,
        sunSelectServicesArray,
    } from "../../js/store";
    import { onMount } from "svelte";
    export let contractnum;

    let arrayOfToggles = [];
    let newTokenTrigger;
    let sunSelectData;
    ///////// acordion functionality

    const toggle = (i) => {
        arrayOfToggles[i] = !arrayOfToggles[i];
    };
    ////////////////////////
    $: if (contractnum && contractnum.length > 0) {
        // sunSelectServicesArray.set($data.SunSelect);
        // console.log($sunSelectServicesArray);
        for (let i = 0; i < contractnum.length; i++) {
            arrayOfToggles.push(true);
        }
    }
</script>

{#if contractnum && contractnum[0]}
    {#each contractnum as sunSelectObj, i}
        {#if sunSelectObj.SunSelectValue && sunSelectObj.SunSelectValue !== ""}
            <div class="card">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                    id="header"
                    on:click={() => toggle(i)}
                    aria-expanded={arrayOfToggles[i]}
                >
                    <h5 class="title">SUN SELECT</h5>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <img
                        src={`${$apiDomain}/micwc-external/assets/toggle.svg`}
                        alt=""
                        id={"rotate-svg-" + arrayOfToggles[i]}
                    />
                </div>
                {#if arrayOfToggles[i]}
                    <div
                        class="sun-select-content"
                        transition:slide={{ duration: 300 }}
                    >
                        {#if sunSelectObj.SunSelectValue.includes("%")}
                            <h2 id="percentage" style="font-size: 5.5rem;">
                                {sunSelectObj.SunSelectValue.split("%")[0]}
                                <img
                                    src={`${$apiDomain}/micwc-external/assets/sunselectPercentage.svg`}
                                    alt=""
                                />
                            </h2>
                        {:else}
                            <h2 id="percentage">
                                {sunSelectObj.SunSelectValue}
                            </h2>
                        {/if}
                        <p>{sunSelectObj.SunSelectMessage}</p>
                    </div>
                    <div
                        class="sub-content"
                        transition:slide={{ duration: 300 }}
                    >
                        <p>
                            {sunSelectObj.SunSelectTooltip}
                            <!-- As a Sun Select customer you <span>DO NOT</span> pay fuel cost
                                for the energy you consume from solar. -->
                        </p>
                    </div>
                {/if}
            </div>
        {/if}
    {/each}
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
        // width: 370px;
        // max-width: calc(100% - 40px);
        padding: 20px;
        transition: 0.3s;
        border-radius: 16px;
        box-shadow: 0px 0px 10px rgb(34 34 34 / 24%);
        margin-bottom: 15px;
        background-color: #ffff;
        overflow: hidden;
        @media screen and (max-width: 767px) {
            // width: 100%;
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
        font-size: 3.5rem;
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
