<svelte:options tag="mic-combo-bill" />

<script>
    // @ts-nocheck
    //svg imports

    import MicBillingSummary from "./MIC-BillingSummary.svelte";
    import MicInsights from "./MIC-Insights.svelte";
    import {
        fetchstore,
        apiDomain,
        apiToken,
        eventsDomain,
        showToolTipDetails,
        newToken,
        fetchAndRedirect,
        persona,
        billNumber,
        latestBill,
    } from "../../js/store";
    import { onMount } from "svelte";
    import MicBillInsightsCombo from "./MIC-BillInsights-combo.svelte";
    import MicChargeDetailsCombo from "./MIC-ChargeDetails-combo.svelte";
    let invoiceTotal;
    let comboNewToken;
    let arrayOfBillInsights = [];
    let arrayOfCharges = [];
    const [data, loading, error, get] = fetchstore();
    const [chargeData, chargeLoading, chargeError, chargeGet] = fetchstore();
    onMount(() => {
        if (
            $apiToken &&
            $apiDomain &&
            !$chargeData.Sections &&
            !$data.services
        ) {
            chargeGet(
                $apiToken,
                // `${$apiDomain}/api/ibill/webcomponents/v1/Post/ChargeDetails`
                "../../../data/ChargeDetails.json"
            );
            get(
                $apiToken,
                "../../../data/DemandInsight.json"
                // `${$apiDomain}/api/ibill/webcomponents/v1/Post/BillInsight`
            );
        }
        comboNewToken = $apiToken;
    });

    $: if (
        $newToken &&
        $newToken.token &&
        (comboNewToken == $apiToken || comboNewToken !== $newToken.token)
    ) {
        chargeGet(
            $newToken.token,
            `${$apiDomain}/api/ibill/webcomponents/v1/Post/ChargeDetails`
            // "../../data/ChargeDetails.json"
        ).then(() => {
            insightsArray = [];
            chargesArray = [];
            console.log($chargeData, "data from charge details");
            arrayOfCharges = $chargeData.Sections;
        });
        get(
            $newToken.token,
            `${$apiDomain}/api/ibill/webcomponents/v1/Post/BillInsight`
            // "../../../data/Insights.json"
        ).then(() => {
            insightsArray = [];
            chargesArray = [];
            arrayOfBillInsights = [];
            console.log($data, "data from insights");
            arrayOfBillInsights = $data.services;
        });
        comboNewToken = $newToken.token;
    }

    $: if ($data && $data.services && $data.services.length) {
        arrayOfBillInsights = $data.services;
    }
    $: if ($chargeData && $chargeData.Sections) {
        arrayOfCharges = $chargeData.Sections;
        invoiceTotal = $chargeData.Sections[$chargeData.Sections.length - 2];
    }
    let insight;
    let insightsArray = [];
    let chargesArray = [];
    $: if (
        $chargeData &&
        $chargeData.Sections &&
        arrayOfBillInsights.length > 0 &&
        insightsArray.length == 0
    ) {
        let arryOfConfigue = $chargeData.Sections.map((res) => {
            if (res.Section_Level1s) {
                return res.Section_Level1s.filter((subSection) => {
                    return subSection.SectionType == "Config";
                });
            }
        });
        console.log(arryOfConfigue, "filtered configue");
        for (let i = 0; i < $chargeData.Sections.length; i++) {
            insight = arrayOfBillInsights.filter((results) => {
                if (arryOfConfigue[i] && arryOfConfigue[i][0]) {
                    console.log(arryOfConfigue[i][0].Value, "con Number");
                    return arryOfConfigue[i][0].Value == results.BillContractNo;
                }
            });
            insightsArray.push(insight);
            chargesArray.push([$chargeData.Sections[i]]);
        }
        console.log(insightsArray, "insiiiiiiiiiiiiiiiiights");
        console.log(chargesArray, "chaaaaaaaaaaaaaaaaaaarges");
    }
</script>

{#if $loading || $chargeLoading}
    <mic-loading />
{:else if arrayOfCharges}
    <div class="refreshable">
        {#each arrayOfCharges as charge, i}
            {#if charge && charge.SectionType}
                {#if charge.SectionType}
                    <div class="charge-detailes">
                        {#if i == arrayOfCharges.length - 2}
                            <MicChargeDetailsCombo
                                charges={chargesArray[i]}
                                invoicetotal={chargesArray[chargesArray.length - 1]}
                            />
                            <mic-billingsummary-combo
                                charges={chargesArray[i]}
                                invoicetotal={invoiceTotal}
                            />
                        {:else}
                            <MicChargeDetailsCombo
                                charges={chargesArray[i]}
                                invoicetotal={""}
                            />
                            <mic-billingsummary-combo
                                charges={chargesArray[i]}
                                invoicetotal={""}
                            />
                        {/if}
                    </div>
                    {#if insightsArray && insightsArray[i] && insightsArray[i].length > 0}
                        <div class="insights">
                            <MicBillInsightsCombo
                                insightservices={insightsArray[i]}
                            />
                            <mic-insights-combo
                                insightservices={insightsArray[i]}
                            />
                        </div>
                    {:else}
                        <div class="insights" />
                    {/if}
                    <!-- </div> -->
                {/if}
            {/if}
        {/each}
    </div>
{/if}

<style lang="scss">
    .refreshable {
        display: grid;
        flex-direction: row;
        column-gap: 30px;
        grid-template-columns: calc(66.66% - 30px) 33.33%;
        width: 100%;
        @media screen and (max-width: 992px) {
            grid-template-columns: 100%;
        }
    }
    .charge-detailes {
        @media screen and (max-width: 992px) {
            width: 100%;
        }
    }
    .mic-insights {
        width: 100%;
        // max-width: 410px;
        @media screen and (max-width: 767px) {
            max-width: unset;
        }
    }
</style>
