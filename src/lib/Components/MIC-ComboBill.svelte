<svelte:options tag="mic-combo-bill" />

<script>
  // @ts-nocheck
  //svg imports

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
    SAPToken,
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
  const [data, loading, error, get] = fetchstore(); // bill insights  store fetch
  const [sundata, sunloading, sunerror, sunget] = fetchstore(); // sun select store fetch
  const [chargeData, chargeLoading, chargeError, chargeGet] = fetchstore(); // charge details  store fetch
  const [yearlyData, yearlyLoading, yearlyError, yearlyGet] = fetchstore(); // yearly energy store fetch

  onMount(() => {
    if (
      $apiToken &&
      $SAPToken &&
      $apiDomain &&
      !$chargeData.Section &&
      !$data.services &&
      !$sundata.SunSelect &&
      !$yearlyData.NetMeter
    ) {
      chargeGet(
        $apiToken,
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/ChargeDetails`,
        // "../../../data/ChargeDetails.json",
        $SAPToken
      );
      get(
        $apiToken,
        // "../../../data/DemandInsight.json",
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/BillInsight`,
        $SAPToken
      ).then(() => {
        if ($data && $data.services) {
          arrayOfBillInsights = $data.services;
        }
      });
    }
    sunget(
      $apiToken,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/SunSelect`,
      // "../../data/sunSelect.json",
      $SAPToken
    ).then(() => {
      if ($sundata && $sundata.SunSelect) {
        newSunSelectArray = [];
        sunSelectArray = $sundata.SunSelect;
      }
    });
    yearlyGet(
      $apiToken,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/YearlyEnergy`,
      // "../../data/yearlyEnergy.json",
      $SAPToken
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
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/ChargeDetails`,
      $SAPToken
      // "../../data/ChargeDetails.json"
    ).then(() => {
      insightsArray = [];
      chargesArray = [];
      arrayOfCharges = $chargeData.Section;
    });
    get(
      $newToken.token,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/BillInsight`,
      $SAPToken
      // "../../../data/Insights.json"
    ).then(() => {
      if ($data && $data.services) {
        arrayOfBillInsights = $data.services;
      }
      insightsArray = [];
      newSunSelectArray = [];
      chargesArray = [];
      arrayOfBillInsights = [];
      sunSelectArray = [];
      arrayOfBillInsights = $data.services;
    });
    sunget(
      $newToken.token,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/SunSelect`,
      $SAPToken
      // "../../data/sunSelect.json"
    ).then(() => {
      if ($sundata && $sundata.SunSelect) {
        newSunSelectArray = [];
        sunSelectArray = $sundata.SunSelect;
      }
    });
    yearlyGet(
      $newToken.token,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/YearlyEnergy`,
      $SAPToken
      // "../../data/yearlyEnergy.json"
    );
    comboNewToken = $newToken.token;
  }
  let YearlyArray;
  $: if ($yearlyData && $yearlyData.NetMeter) {
    YearlyArray = $yearlyData.NetMeter;
  }
  $: if ($data && $data.services) {
    arrayOfBillInsights = $data.services;
  }
  let agencySection;
  $: if ($chargeData && $chargeData.Section) {
    arrayOfCharges = $chargeData.Section;
    invoiceTotalArray = $chargeData.Section.filter((subSection) => {
      return subSection.SectionType == "InvoiceTotal";
    });
    // invoiceTotal = $chargeData.Section[$chargeData.Section.length - 2];
  }

  $: if ($sundata && $sundata.SunSelect) {
    sunSelectArray = $sundata.SunSelect;
  }

  let insight;
  let insightsArray = [];
  let chargesArray = [];
  let bulkPosition = 0;
  let invoiceTotalArray;
  $: if (
    $chargeData &&
    $chargeData.Section &&
    $chargeData.Section.length &&
    arrayOfBillInsights &&
    arrayOfBillInsights.length > 0 &&
    insightsArray.length == 0
  ) {
    let arryOfConfigue = $chargeData.Section.map((subSection) => {
      return subSection.ConfigValue;
    });
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
  ////////////////////
  let newArr;
  let newSunSelectArray = [];
  let sunArrayVal;
  $: if (
    $data.services &&
    $data.services.length > 0 &&
    $sundata.SunSelect &&
    $sundata.SunSelect.length > 0
  ) {
    newArr = $sundata.SunSelect;
    for (let i = 0; i < $data.services.length; i++) {
      sunArrayVal = newArr.filter((results) => {
        return $data.services[i].BillContractNo == results.SunSelectContract;
      });
      newSunSelectArray.push(sunArrayVal);
    }
  }
</script>

<div class="refreshable">
  {#if $chargeLoading || $loading || $sunloading}
    <div class="charge-detailes"><mic-loading /></div>
    <div class="insights"><mic-loading /></div>
  {:else if arrayOfCharges && invoiceTotalArray}
    {#each arrayOfCharges as charge, i}
      {#if charge && charge.SectionType}
        {#if charge.SectionType}
          <div class="charge-detailes">
            <!-- {#if i == chargesArray.length - 2} -->
            {#if arrayOfCharges[i + 1] && arrayOfCharges[i + 1].SectionType == "InvoiceTotal" && invoiceTotalArray && invoiceTotalArray[0]}
              <!-- <MicChargeDetailsCombo
                charges={[charge]}
                invoicetotal={invoiceTotalArray}
                /> -->
              <!-- invoicetotal={chargesArray[chargesArray.length - 1]} -->
              <mic-billingsummary-combo
                charges={[charge]}
                invoicetotal={invoiceTotalArray}
              />
            {:else}
              <!-- <MicChargeDetailsCombo charges={[charge]} invoicetotal={""} /> -->
              <mic-billingsummary-combo charges={[charge]} invoicetotal={""} />
            {/if}
          </div>
          {#if insightsArray && insightsArray[i] && insightsArray[i].length > 0 && sunSelectArray}
            <div class="insights">
              <mic-insights-combo
                insightservices={insightsArray[i]}
                sunselectdata={sunSelectArray}
                emptytabs={emptyTabs}
              />
              <!-- <MicBillInsightsCombo
                insightservices={insightsArray[i]}
                sunselectdata={sunSelectArray}
                emptytabs={emptyTabs}
              /> -->
              {#if $sunloading}
                <mic-loading />
              {:else if $sunerror}
                <h1 />
              {:else if newSunSelectArray && newSunSelectArray.length > 0}
                <mic-sunselect contractnum={newSunSelectArray[i]} />
              {/if}
              <!-- {#if sunSelectArray && sunSelectArray.length > 0}
                {#each sunSelectArray as sunSelectObj}
                  {#if sunSelectObj && insightsArray[i] && insightsArray[i][0] && insightsArray[i][0].BillContractNo}
                    {#if insightsArray[i][0].BillContractNo == sunSelectObj.SunSelectContract}
                      <mic-sunselect contractnum={[sunSelectObj]} />
                    {/if}
                  {/if}
                {/each}
              {/if} -->
              {#if bulkPosition == i}
                {#if $yearlyLoading}
                  <mic-loading />
                {:else if YearlyArray}
                  <mic-yearlyenergy
                    class="mic-insights"
                    yearlyarray={YearlyArray}
                  />
                {/if}
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
    {#if arrayOfCharges && arrayOfCharges.length > 0 && insightsArray && insightsArray.length == 0}
      <div class="insights">
        {#if $yearlyLoading}
          <mic-loading />
        {:else if YearlyArray}
          <mic-yearlyenergy class="mic-insights" yearlyarray={YearlyArray} />
        {/if}
        <mic-bulkdownload class="mic-insights" />
      </div>
    {/if}
  {/if}
</div>

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

    & > div {
      @if height == 0 {
        display: none;
      }
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
