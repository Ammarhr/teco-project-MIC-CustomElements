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
  let sunSelectArray = [];
  let arrayOfCharges = [];
  let emptyTabs = true; // make tabs array empty
  const [data, loading, error, get] = fetchstore(); // bill insights select store fetch
  const [sundata, sunloading, sunerror, sunget] = fetchstore(); // sun select store fetch
  const [chargeData, chargeLoading, chargeError, chargeGet] = fetchstore(); // charge details select store fetch

  onMount(() => {
    if ($apiToken && $apiDomain && !$chargeData.Section && !$data.services) {
      chargeGet(
        $apiToken,
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/ChargeDetails`
        // "../../../data/ChargeDetails.json"
      );
      get(
        $apiToken,
        // "../../../data/DemandInsight.json"
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/BillInsight`
      );
    }
    sunget(
      $apiToken,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/SunSelect`
      // "../../data/sunSelect.json"
    );
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
      // console.log($chargeData, "data from charge details");
      arrayOfCharges = $chargeData.Section;
    });
    get(
      $newToken.token,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/BillInsight`
      // "../../../data/Insights.json"
    ).then(() => {
      insightsArray = [];
      chargesArray = [];
      arrayOfBillInsights = [];
      // console.log($data, "data from insights");
      arrayOfBillInsights = $data.services;
    });
    sunget(
      $apiToken,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/SunSelect`
      // "../../data/sunSelect.json"
    ).then(() => {
      sunSelectArray = [];
    });
    comboNewToken = $newToken.token;
  }

  $: if ($data && $data.services && $data.services.length) {
    arrayOfBillInsights = $data.services;
  }
  let agencySection;
  $: if ($chargeData && $chargeData.Section) {
    arrayOfCharges = $chargeData.Section;
    invoiceTotal = $chargeData.Section[$chargeData.Section.length - 2];
  }

  $: if ($sundata.SunSelect && $sundata.SunSelect.length > 0) {
    sunSelectArray = $sundata.SunSelect;
  }
  let insight;
  let insightsArray = [];
  let chargesArray = [];
  let bulkPosition = 0;
  $: if (
    $chargeData &&
    $chargeData.Section &&
    $chargeData.Section.length &&
    arrayOfBillInsights.length > 0 &&
    insightsArray.length == 0
  ) {
    let arryOfConfigue = $chargeData.Section.map((subSection) => {
      // console.log(subSection.ConfigValue, "subSection.ConfigValue");
      return subSection.ConfigValue;
    });
    // console.log(arryOfConfigue, "filtered configue");
    for (let i = 0; i < $chargeData.Section.length; i++) {
      insight = arrayOfBillInsights.filter((results) => {
        if (arryOfConfigue[i]) {
          if (arryOfConfigue[i] == results.BillContractNo) {
            bulkPosition = i;
          }
          return arryOfConfigue[i] == results.BillContractNo;
        }
      });
      if ($chargeData.Section[i].Collapsible == true) {
        agencySection = $chargeData.Section[i];
      }
      insightsArray.push(insight);
      if ($chargeData.Section[i].Collapsible == false) {
        chargesArray.push([$chargeData.Section[i]]);
      }
    }
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
            {#if i == chargesArray.length - 2}
              <!-- <MicChargeDetailsCombo
                                charges={chargesArray[i]}
                                invoicetotal={chargesArray[
                                    chargesArray.length - 1
                                ]}
                            /> -->
              <mic-billingsummary-combo
                charges={[charge]}
                invoicetotal={chargesArray[chargesArray.length - 1]}
              />
            {:else}
              <!-- <MicChargeDetailsCombo
                                charges={chargesArray[i]}
                                invoicetotal={""}
                            /> -->
              <mic-billingsummary-combo charges={[charge]} invoicetotal={""} />
            {/if}
          </div>
          {#if insightsArray && insightsArray[i] && insightsArray[i].length > 0 && sunSelectArray}
            <div class="insights">
              <!-- <MicBillInsightsCombo
                                insightservices={insightsArray[i]}
                                sunselectdata={sunSelectArray}
                            /> -->
              <mic-insights-combo
                insightservices={insightsArray[i]}
                sunselectdata={sunSelectArray}
                emptytabs={emptyTabs}
              />
              {#if bulkPosition == i}
                <mic-yearlyenergy class="mic-insights" />
                <mic-bulkdownload class="mic-insights" />
              {/if}
            </div>
          {:else}
            <div class="insights" />
          {/if}
          <!-- </div> -->
        {/if}
      {/if}
    {/each}
    {#if insightsArray && insightsArray.length == 0}
      <div class="insights">
        <mic-yearlyenergy class="mic-insights" />
        <mic-bulkdownload class="mic-insights" />
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  .refreshable {
    display: grid;
    flex-direction: row;
    column-gap: 30px;
    row-gap: 30px;
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
