<svelte:options tag="mic-combo-bill" />

<script>
  // @ts-nocheck
  //svg imports

  import {
    fetchstore,
    apiDomain,
    apiToken,
    newToken,
    billNumber,
    latestBill,
    SAPToken,
    isSummaryAccountFlag,
    isParentAccount,
  } from "../../js/store";
  import { onMount } from "svelte";
  import MicBillInsightsCombo from "./MIC-BillInsights-combo.svelte";
  import MicChargeDetailsCombo from "./MIC-ChargeDetails-combo.svelte";

  let comboNewToken;
  let arrayOfBillInsights = [];
  let sunSelectArray = [];
  let arrayOfCharges = [];
  let emptyTabs = true; // make tabs array empty
  const [data, loading, error, get] = fetchstore(); // bill insights  store fetch
  const [sundata, sunloading, sunerror, sunget] = fetchstore(); // sun select store fetch
  const [chargeData, chargeLoading, chargeError, chargeGet] = fetchstore(); // charge details  store fetch
  const [yearlyData, yearlyLoading, yearlyError, yearlyGet] = fetchstore(); // yearly energy store fetch
  let tries = 2;
  onMount(() => {
    if (
      $apiToken &&
      $SAPToken &&
      $apiDomain &&
      !$chargeData.Section &&
      !$data.services &&
      !$sundata.SunSelect &&
      !$yearlyData.NetMeter &&
      $isSummaryAccountFlag &&
      tries > 0
    ) {
      if ($isSummaryAccountFlag.toLowerCase() !== "true") {
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
      }
    }
    comboNewToken = $apiToken;
    tries--;
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
    )
      .then(() => {
        insightsArray = [];
        chargesArray = [];
        arrayOfbody = [];
        arrayOfCharges = $chargeData.Section;
      })
      .catch((err) => console.log());
    get(
      $newToken.token,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/BillInsight`,
      $SAPToken
      // "../../../data/Insights.json"
    )
      .then(() => {
        if ($data && $data.services) {
          arrayOfBillInsights = $data.services;
        }
        insightsArray = [];
        newSunSelectArray = [];
        chargesArray = [];
        arrayOfBillInsights = [];
        sunSelectArray = [];
        arrayOfbody = [];
        arrayOfBillInsights = $data.services;
      })
      .catch((err) => console.log());
    sunget(
      $newToken.token,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/SunSelect`,
      $SAPToken
      // "../../data/sunSelect.json"
    )
      .then(() => {
        if ($sundata && $sundata.SunSelect) {
          newSunSelectArray = [];
          sunSelectArray = $sundata.SunSelect;
        }
      })
      .catch((err) => console.log());
    yearlyGet(
      $newToken.token,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/YearlyEnergy`,
      $SAPToken
      // "../../data/yearlyEnergy.json"
    ).catch((err) => console.log());
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
  }

  $: if ($sundata && $sundata.SunSelect) {
    sunSelectArray = $sundata.SunSelect;
  }
  let insight;
  let insightsArray = [];
  let chargesArray = [];
  let arrayOfbody = [];
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
    arrayOfbody = [];
    let arryOfConfigue = $chargeData.Section.map((subSection) => {
      return subSection.ConfigValue;
    });
    arrayOfbody = [];
    for (let i = 0; i < $chargeData.Section.length; i++) {
      insight = arrayOfBillInsights.filter((results) => {
        if (arryOfConfigue[i]) {
          if (arryOfConfigue[i] == results.BillContractNo) {
            bulkPosition = i;
          }
          if (arryOfConfigue[i] == results.BillContractNo) {
            let serviceObj = {
              TempPreviousValue: results.monthly?.percentageTemp || 0,
              TempLastyearValue: results.yearly?.percentageTemp || 0,
              BillingClass: results.ZInstallBillClass,
              Division: results.serviceName,
              MonthlyUsageConsumption:
                results.monthly?.percentageConsumption || 0,
              YearlyUsageConsumption: results.yearly?.percentageConsumption,
            };
            arrayOfbody.push(serviceObj);
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

    if (insightsArray.length == 0) {
      bulkPosition = 0;
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
        {#if charge.SectionType !== "InvoiceTotal"}
          <div class="charge-detailes">
            {#if arrayOfCharges[i + 1] && arrayOfCharges[i + 1].SectionType == "InvoiceTotal" && invoiceTotalArray && invoiceTotalArray[0]}
              <mic-billingsummary-combo
                charges={[charge]}
                invoicetotal={invoiceTotalArray}
              />
              <!-- <MicChargeDetailsCombo
                charges={[charge]}
                invoicetotal={invoiceTotalArray}
              /> -->
            {:else if charge.SectionType !== "InvoiceTotal"}
              <mic-billingsummary-combo charges={[charge]} invoicetotal={""} />
              <!-- <MicChargeDetailsCombo
                charges={[charge]}
                invoicetotal={""}
              /> -->
            {/if}
            {#if $isParentAccount !== "X"}
              {#if arrayOfCharges[arrayOfCharges.length - 1] && arrayOfCharges[arrayOfCharges.length - 1].SectionType && arrayOfCharges[arrayOfCharges.length - 1].SectionType !== "InvoiceTotal"}
                {#if i == arrayOfCharges.length - 1 && arrayOfBillInsights && arrayOfBillInsights.length < arrayOfCharges.length - 1}
                  <mic-bulkdownload class="mic-insights bulk-mobile" />
                {/if}
              {:else if i == arrayOfCharges.length - 2 && arrayOfBillInsights && arrayOfBillInsights.length < arrayOfCharges.length - 1}
                <mic-bulkdownload class="mic-insights bulk-mobile" />
              {/if}
            {:else if $isParentAccount == "X" && i == arrayOfCharges.length - 1}
              <div class="insights">
                <mic-bulkdownload class="mic-insights bulk-mobile" />
              </div>
            {/if}
          </div>
        {/if}
        {#if $isParentAccount !== "X"}
          {#if (arrayOfCharges && arrayOfCharges.length > 0 && insightsArray && insightsArray.length == 0 && i == 0) || (insightsArray[0] && insightsArray[0].length == 0)}
            <div class="insights">
              {#if $isParentAccount !== "X"}
                {#if $yearlyLoading}
                  <mic-loading />
                {:else if YearlyArray}
                  <mic-yearlyenergy
                    class="mic-insights"
                    yearlyarray={YearlyArray}
                  />
                {/if}
                {#if i == 0}
                  <div class="insights">
                    <mic-bulkdownload class="mic-insights bulk-desk" />
                  </div>
                {:else if i == arrayOfCharges.length - 1}
                  <div class="insights">
                    <mic-bulkdownload class="mic-insights bulk-mobile" />
                  </div>
                {/if}
              {/if}
            </div>
          {:else if charge.SectionType !== "InvoiceTotal"}
            {#if insightsArray && insightsArray[i] && insightsArray[i].length > 0 && sunSelectArray}
              <div class="insights">
                {#key arrayOfbody}
                  {#if $latestBill == $billNumber && arrayOfbody && arrayOfbody[i]}
                    <mic-insights-combo
                      insightservices={insightsArray[i]}
                      sunselectdata={sunSelectArray}
                      emptytabs={emptyTabs}
                      arrayofbody={arrayOfbody[i]}
                    />
                    <!-- <MicBillInsightsCombo 
                  insightservices={insightsArray[i]}
                  sunselectdata={sunSelectArray}
                  emptytabs={emptyTabs}
                  arrayofbody={arrayOfbody[i]}
                /> -->
                  {:else}
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
                  {/if}
                {/key}
                {#if $isParentAccount !== "X"}
                  {#if $sunloading}
                    <mic-loading />
                  {:else if $sunerror}
                    <h1 />
                  {:else if newSunSelectArray && newSunSelectArray.length > 0}
                    <mic-sunselect contractnum={newSunSelectArray[i]} />
                  {/if}
                  {#if bulkPosition == i}
                    {#if $yearlyLoading}
                      <mic-loading />
                    {:else if YearlyArray}
                      <mic-yearlyenergy
                        class="mic-insights"
                        yearlyarray={YearlyArray}
                      />
                    {/if}
                    {#if arrayOfBillInsights && arrayOfBillInsights.length >= arrayOfCharges.length - 1}
                      <mic-bulkdownload class="mic-insights bulk-mobile" />
                    {/if}
                    <mic-bulkdownload class="mic-insights bulk-desk" />
                  {/if}
                {/if}
              </div>
            {:else}
              <div class="insights" />
            {/if}
          {/if}
        {:else if $isParentAccount == "X"}
          {#if i == 0}
            <div class="insights">
              {#if $yearlyLoading}
                <mic-loading />
              {:else if YearlyArray}
                <mic-yearlyenergy
                  class="mic-insights"
                  yearlyarray={YearlyArray}
                />
              {/if}
              <mic-bulkdownload class="mic-insights bulk-desk" />
            </div>
          {/if}
        {/if}
      {/if}
    {/each}
  {:else}
    <div class="charge-detailes" />
    <div class="insights">
      {#if $yearlyLoading}
        <mic-loading />
      {:else if YearlyArray}
        <mic-yearlyenergy class="mic-insights" yearlyarray={YearlyArray} />
      {/if}
      <mic-bulkdownload class="mic-insights" />
    </div>
  {/if}
</div>

<style lang="scss">
  .bulk-mobile {
    display: none;
    @media screen and (max-width: 992px) {
      display: unset;
    }
  }
  .bulk-desk {
    @media screen and (max-width: 992px) {
      display: none;
    }
  }
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
