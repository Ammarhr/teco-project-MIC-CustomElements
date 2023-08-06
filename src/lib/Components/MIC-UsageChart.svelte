<svelte:options tag="mic-usage-charts" />

<script>
  // @ts-nocheck
  import { onMount } from "svelte";

  import {
    apiDomain,
    apiToken,
    fetchDailyUsageChart,
    fetchMonthlyUsageChart,
    persona,
    fetchAndRedirect,
    SAPToken,
  } from "../../js/store";
  import { chart } from "../../js/apexchartsBundle";
  import {
    renderMixChart,
    onPeakOffPeakChart,
  } from "../../js/MIC-chart-bundle";
  import { useLazyImage as lazyImage } from "svelte-lazy-image";

  let tab1 = "1";
  let tab2 = "2";
  let activeSection = "daily";
  let toolTipShow = false;
  let toolTipStyle = "display:none; position: absolute; top:20px";
  let monthlyMinwidth = "unset";
  let dailyMinwidth = "unset";
  let chartColor = "#044F8D";
  let onOffPeakDemand;
  let chartLegend = "";
  let toolTipIconCon;
  let chartDisplayUnit = "usage";
  let tempData = true;
  let disableTemp = false;
  let onPeakOprand;
  let offPeakOprand;
  let words;
  let currentWord = 0;
  let scrollClass = "scroll-image";

  export let refreshabletoken;
  export let selectedmeter;

  //demo:
  // export let dailyurl;
  // export let monthlyurl;

  const [dailyUsageData, dailyUsageLoading, dailyUsageError, dailyUsageGet] =
    fetchDailyUsageChart(); // daily usage fetch
  const [
    monthlyUsageData,
    monthlyUsageLoading,
    monthlyUsageError,
    monthlyUsageGet,
  ] = fetchMonthlyUsageChart(); // monthly usage fetch
  // let selectedmeter;
  onMount(() => {
    // selectedmeter = JSON.parse(meterobj);
    if (selectedmeter) {
      let {
        DLN,
        AMI_Flag,
        Contract,
        HistoricalFact,
        ZipCode,
        DAP_StartDate,
        DAP_EndDate,
        intp,
        DAP_dkwh,
        DAP_rkwh,
        DAP_pf,
        DAP_kw,
        UOF,
        DAP_dtoun,
        DAP_dtouf,
        StandbyCustomer_Flag,
      } = selectedmeter;
      scrollClass = "scroll-image";
      chartLegend = "";
      onOffPeakDemand = "";
      currentWord = 0;
      // call daily chart api when the AMI_Flag is exist
      if (AMI_Flag == "X") {
        dailyUsageGet(
          refreshabletoken,
            `${$apiDomain}/api/ibill/webcomponents/v1/Post/meterDataDailyUsage?BilledAmount=${BilledAmount}`,
          // "/data/meterUsageDaily.json",
          // dailyurl,
          {
            dln: DLN,
            sdt: DAP_StartDate,
            edt: DAP_EndDate,
            intp: intp,
            dkwh: DAP_dkwh,
            rkwh: DAP_rkwh,
            pf: DAP_pf,
            kw: DAP_kw,
            dtoun: DAP_dtoun,
            dtouf: DAP_dtouf,
          },
          $SAPToken
        );
      }
      // call monthy api cases calls
      let monthlyUrl;
      if (StandbyCustomer_Flag == "X" && DAP_dtoun == "x" && DAP_dtouf == "x") {
        onPeakOprand = "SUSTKWHP";
        offPeakOprand = "SUSTKWHO";
        monthlyUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/meterDataMonthlyUsage?Contract=${Contract}&MeterNo=&Operand1=SUSTKWHP&Operand2=SUSTKWHO&Dln=${DLN}&ZipCode=${ZipCode}`;
      } else {
        onPeakOprand = "HIST_PKKWH";
        offPeakOprand = "HIST_OFKWH";
        if (DAP_dtoun == "x" && DAP_dtouf == "x" && Operand == "YKWH") {
          monthlyUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/meterDataMonthlyUsage?Contract=${Contract}&MeterNo=&Operand1=HIST_OFKWH&Operand2=HIST_PKKWH&Dln=${DLN}&ZipCode=${ZipCode}`;
        } else if (DAP_dtoun !== "x" && DAP_dtouf == "x" && Operand == "YKWH") {
          monthlyUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/meterDataMonthlyUsage?Contract=${Contract}&MeterNo=&Operand1=HIST_OFKWH&Operand2=&Dln=${DLN}&ZipCode=${ZipCode}`;
        } else if (DAP_dtoun == "x" && DAP_dtouf !== "x" && Operand == "YKWH") {
          monthlyUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/meterDataMonthlyUsage?Contract=${Contract}&MeterNo=&Operand1=HIST_PKKWH&Operand2=&Dln=${DLN}&ZipCode=${ZipCode}`;
        } else {
          monthlyUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/meterDataMonthlyUsage?Contract=${Contract}&MeterNo=&Operand1=${HistoricalFact}&Operand2=&Dln=${DLN}&ZipCode=${ZipCode}`;
        }
      }

      // monthly chart api call
      monthlyUsageGet(
        refreshabletoken,
        monthlyUrl,
        // "/data/meterUsageMonthly.json",
        // monthlyurl,
        $SAPToken
      ).then(() => {});

      // toggle animation words
      words = [
        {
          text: UOF,
          size: 14,
        },
        {
          text: "Cost",
          size: 18,
        },
        {
          text: "$",
          size: 14,
        },
        {
          text: "Usage",
          size: 18,
        },
      ];
    }

    // chart legend:
    if (selectedmeter) {
      if (selectedmeter.DAP_kw == "x") {
        chartColor = "#411084";
        chartLegend = "Demand";
        if (selectedmeter) {
          if (selectedmeter.HistoricalFact == "KW_R_OPK") {
            onOffPeakDemand = "Off Peak: ";
          } else if (selectedmeter.HistoricalFact == "KW_R_PK") {
            onOffPeakDemand = "On Peak: ";
          } else {
            onOffPeakDemand = "Demand: ";
          }
        }
      } else if (
        selectedmeter.DAP_dtoun == "x" &&
        selectedmeter.DAP_dtouf !== "x"
      ) {
        chartColor = "#00B6F0";
      } else if (
        selectedmeter.DAP_dtoun !== "x" &&
        selectedmeter.DAP_dtouf == "x"
      ) {
        chartColor = "#00294A";
      } else if (
        selectedmeter.DAP_dtoun == "x" &&
        selectedmeter.DAP_dtouf == "x"
      ) {
        chartColor = "both";
      } else if (selectedmeter.DAP_rkwh == "x") {
        chartColor = "#96BDFF";
        if (selectedmeter) {
          if (selectedmeter.Operand == "YKWHRC") {
            onOffPeakDemand = "Received: ";
            chartLegend = "SELF-GENERATED";
          }
        }
      } else {
        chartColor = "#044F8D";
        if (selectedmeter) {
          if (selectedmeter.Operand == "YKWHDL") {
            onOffPeakDemand = "Delivered: ";
            chartLegend = "UTILITY PROVIDED";
          }
        }
      }
    }
  });


   // select the dafault active tab
   $: if (selectedmeter && selectedmeter.AMI_Flag == "") {
    activeSection = "monthly";
    tab1 = "2";
    tab2 = "1";
  } else if (selectedmeter && selectedmeter.AMI_Flag != "") {
    activeSection = "daily";
    tab1 = "1";
    tab2 = "2";
  }

  // tabs functionality
  const activateTab = (num1, num2, activeTab) => {
    scrollClass = "scroll-image";
    if (setTimeoutId) {
      clearTimeout(setTimeoutId);
    }
    chartDisplayUnit = "usage";
    activeSection = activeTab;
    tab2 = num2;
    tab1 = num1;
    currentWord = 0;
    if (activeTab == "daily") {
      // MiJurney event call
      fetchAndRedirect(
        $apiToken,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "Click_Daily_Tab",
          Outcome: ``,
          Feedback: "",
          Persona: $persona,
        }
      );
    } else {
      // MiJurney event call
      fetchAndRedirect(
        $apiToken,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "Click_Monthly_Tab",
          Outcome: ``,
          Feedback: "",
          Persona: $persona,
        }
      );
    }
  };
  // cost/usage chart toggle function
  const costUsageToggle = (e) => {
    if (e.target.checked == true) {
      chartDisplayUnit = "cost";

      // MiJurney event call
      fetchAndRedirect(
        $apiToken,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "Click_Cost_Switch",
          Outcome: ``,
          Feedback: "",
          Persona: $persona,
        }
      );
    } else if (e.target.checked == false) {
      chartDisplayUnit = "usage";
      // MiJurney event call
      fetchAndRedirect(
        $apiToken,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "Click_Usage_Switch",
          Outcome: ``,
          Feedback: "",
          Persona: $persona,
        }
      );
    }
    changeWord();
    setTimeoutId = setTimeout(changeWord, 800);
  };

  // sroll animation annotation (table)
  const srollHandle = () => {
    scrollClass = "disable-scroll";
  };

  // show/hide tempreature chart
  const tempreatureShow = () => {
    tempData = !tempData;
    // MiJurney event call
    if (tempData == true) {
      fetchAndRedirect(
        $apiToken,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "Click_Temp_Checkbox",
          Outcome: `active`,
          Feedback: "",
          Persona: $persona,
        }
      );
    } else {
      fetchAndRedirect(
        $apiToken,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "Click_Temp_Checkbox",
          Outcome: `inactive`,
          Feedback: "",
          Persona: $persona,
        }
      );
    }
  };

  // tempreature tool tip toggle function
  function tooltipToggle(close) {
    if (close == true) {
      toolTipShow = false;
    } else {
      toolTipShow = !toolTipShow;
    }
    if (toolTipShow == true) {
      toolTipStyle = "position: absolute; top:20px";
    } else {
      toolTipStyle =
        "display:none; height:0; opacity: 0;margin: 0; transition:200ms; padding:0; position: absolute; top:20px";
    }
  }
  $: toolTipIconCon = document.querySelector(".chart-tool-tip");
  $: container = document.querySelector(".meter-card");

  let setTimeoutId;
  $: if (container) {
    container.addEventListener("click", function (event) {
      // check if the click event originated from the container
      if (event.target != toolTipIconCon) {
        // do something when the container is clicked
        tooltipToggle(true);
      }
    });
  }
  // change the chart unit (toggle animation)
  function changeWord() {
    currentWord = (currentWord + 1) % words.length;
  }

  // scroll on click for chart tooltip into view
  function scrollTo(e) {
    let sad = document.querySelector(".apexcharts-tooltip");
    if (sad)
      setTimeout(() => {
        sad.scrollIntoView({ behavior: "smooth" });
      }, 200);
  }
  // min width for scroll (Monthly chart)
  $: if (
    $monthlyUsageData &&
    $monthlyUsageData.MonthlyUsage &&
    $monthlyUsageData.MonthlyUsage.MonthlyDetails &&
    $monthlyUsageData.MonthlyUsage.MonthlyDetails.length > 0
  ) {
    switch (true) {
      case $monthlyUsageData.MonthlyUsage.MonthlyDetails.length >= 25:
        monthlyMinwidth = "1500px";
        break;
      case $monthlyUsageData.MonthlyUsage.MonthlyDetails.length >= 15 &&
        $monthlyUsageData.MonthlyUsage.MonthlyDetails.length < 25:
        monthlyMinwidth = "1200px";
        break;
      case $monthlyUsageData.MonthlyUsage.MonthlyDetails.length >= 10 &&
        $monthlyUsageData.MonthlyUsage.MonthlyDetails.length < 15:
        monthlyMinwidth = "900px";
        break;
      case $monthlyUsageData.MonthlyUsage.MonthlyDetails.length >= 6 &&
        $monthlyUsageData.MonthlyUsage.MonthlyDetails.length < 10:
        monthlyMinwidth = "600px";
        break;
      default:
        // code to be executed if none of the cases are true
        break;
    }
  }

  // min width for scroll (daily chart)
  $: if (
    $dailyUsageData &&
    $dailyUsageData.DailyUsage &&
    $dailyUsageData.DailyUsage.DailyDetails &&
    $dailyUsageData.DailyUsage.DailyDetails.length > 0
  ) {
    switch (true) {
      case $dailyUsageData.DailyUsage.DailyDetails.length > 25:
        dailyMinwidth = "1500px";
        break;
      case $dailyUsageData.DailyUsage.DailyDetails.length >= 15 &&
        $dailyUsageData.DailyUsage.DailyDetails.length < 25:
        dailyMinwidth = "1200px";
        break;
      case $dailyUsageData.DailyUsage.DailyDetails.length >= 10 &&
        $dailyUsageData.DailyUsage.DailyDetails.length < 15:
        dailyMinwidth = "900px";
        break;
      case $dailyUsageData.DailyUsage.DailyDetails.length >= 6 &&
        $dailyUsageData.DailyUsage.DailyDetails.length < 10:
        dailyMinwidth = "600px";
        break;
      case $dailyUsageData.DailyUsage.DailyDetails.length < 6:
        dailyMinwidth = "400px";
        break;
      default:
        // code to be executed if none of the cases are true
        break;
    }
  }
</script>

{#key selectedmeter}
  <div id="meter-tab-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if $dailyUsageLoading || $monthlyUsageLoading}
      <mic-shadowloading />
    {:else if ($dailyUsageData && $dailyUsageData.DailyUsage) || ($monthlyUsageData && $monthlyUsageData.MonthlyUsage)}
      <div id="meter-tabs">
        {#if selectedmeter && selectedmeter.AMI_Flag != ""}
          <h6
            id={"meter-btn" + tab1}
            on:click={() => {
              activateTab("1", "2", "daily");
            }}
          >
            Daily
          </h6>
        {/if}
        {#if $monthlyUsageData && $monthlyUsageData.MonthlyUsage}
          <h6
            id={"meter-btn" + tab2}
            on:click={() => activateTab("2", "1", "monthly")}
          >
            Monthly
          </h6>
        {/if}
      </div>
      <div />
      <!-- option for Hadi to style -->
      <div class="options" style="position: relative;">
        {#if disableTemp == false}
          <div class="temp">
            <input
              type="checkbox"
              name="trmprature"
              id="temp"
              checked
              on:click={tempreatureShow}
            />
            <span>Temperature</span>
            <img
              src={`https://tecocdn.azureedge.net/ibill/iBill-assets/tool-tip-icon.svg`}
              alt="usage chart tool tip"
              class="chart-tool-tip"
              bind:this={toolTipIconCon}
              on:click={tooltipToggle}
              use:lazyImage
            />
          </div>
        {/if}
        {#if activeSection == "monthly" && $monthlyUsageData && $monthlyUsageData.MonthlyUsage && $monthlyUsageData.MonthlyUsage.TempTooltip}
          <div class="tooltip-content" style={toolTipStyle}>
            {@html $monthlyUsageData.MonthlyUsage.TempTooltip}
          </div>
        {:else if activeSection == "daily" && $dailyUsageData && $dailyUsageData.DailyUsage && $dailyUsageData.DailyUsage.TempTooltip}
          <div class="tooltip-content" style={toolTipStyle}>
            {@html $dailyUsageData.DailyUsage.TempTooltip}
          </div>
        {/if}
        {#if $monthlyUsageData && $monthlyUsageData.MonthlyUsage && $monthlyUsageData.MonthlyUsage.MonthlyDetails && $monthlyUsageData.MonthlyUsage.MonthlyDetails.length && activeSection == "monthly"}
          <div class="toggle">
            <input
              type="checkbox"
              id="check-4"
              on:change={(e) => {
                costUsageToggle(e);
              }}
            />
            <label for="check-4">
              <p class="toggle_usage">Usage</p>
              <p class="toggle_cost">Cost</p></label
            >
          </div>
        {/if}
      </div>
      <!-- Monthly Chart -->
      <div id={"meter-tab1" + tab1} on:scroll={srollHandle}>
        <div class={scrollClass}>
          <img
            src="https://tecocdn.azureedge.net/ibill/iBill-assets/scroll-image.gif"
            alt=""
            use:lazyImage
          />
        </div>
        {#if $monthlyUsageData && $monthlyUsageData.MonthlyUsage && $monthlyUsageData.MonthlyUsage.MonthlyDetails}
          {#if $monthlyUsageData && $monthlyUsageData.MonthlyUsage.MonthlyDetails && $monthlyUsageData.MonthlyUsage.MonthlyDetails.length && $monthlyUsageData.MonthlyUsage.MonthlyDetails.length == 0}
            <div
              class="chart"
              style="min-width: {monthlyMinwidth};"
              use:chart={renderMixChart(
                null,
                [chartColor],
                "1410px",
                400,
                null,
                null,
                tempData
              )}
            />
          {:else if selectedmeter.DAP_dtoun !== "x" && selectedmeter.DAP_dtouf !== "x"}
            <div class="text">
              <p>
                {#each words as word, i}
                  <span
                    class="letter {i === currentWord ? 'in' : 'out'}"
                    style="font-size: {word.size}px"
                  >
                    {word.text}
                  </span>
                {/each}
              </p>
            </div>
            <!-- {console.log(JSON.parse(selectedmeter).Service, "selectedmeter.Service")}
            {console.log(selectedmeter, "selectedmeter")} -->
            <div
              class="chart"
              style="min-width: {monthlyMinwidth};"
              use:chart={renderMixChart(
                $monthlyUsageData.MonthlyUsage.MonthlyDetails,
                [chartColor],
                "1410px",
                400,
                selectedmeter.Service,
                selectedmeter.UOF,
                chartDisplayUnit,
                tempData,
                true,
                onOffPeakDemand,
                chartLegend,
                $monthlyUsageData.MonthlyUsage.MaxUsage
              )}
            />
          {:else if selectedmeter.DAP_dtoun == "x" || selectedmeter.DAP_dtouf == "x"}
            <!-- Monthly usage OnPeak & OffPeak chart -->
            <div class="text">
              <p>
                {#each words as word, i}
                  <span
                    class="letter {i === currentWord ? 'in' : 'out'}"
                    style="font-size: {word.size}px"
                  >
                    {word.text}
                  </span>
                {/each}
              </p>
            </div>
            <div
              class="chart"
              style="min-width: {monthlyMinwidth};"
              use:chart={onPeakOffPeakChart(
                $monthlyUsageData.MonthlyUsage.MonthlyDetails,
                selectedmeter.UOF,
                true,
                selectedmeter.BillingPeriod,
                tempData,
                selectedmeter.DAP_dtoun,
                selectedmeter.DAP_dtouf,
                chartColor,
                chartDisplayUnit,
                400,
                $monthlyUsageData.MonthlyUsage.MaxUsage,
                onPeakOprand,
                offPeakOprand
              )}
            />
          {/if}
        {/if}
      </div>
      <!-- Daily Chart -->
      {#if selectedmeter && selectedmeter.AMI_Flag != ""}
        <div id={"meter-tab1" + tab2} on:scroll={srollHandle}>
          <!-- <div class={scrollClass}>
            <img
              src="https://tecocdn.azureedge.net/ibill/iBill-assets/scroll-image.gif"
              alt=""
              use:lazyImage
            />
          </div> -->
          {#if $dailyUsageData && $dailyUsageData.DailyUsage && $dailyUsageData.DailyUsage.DailyDetails}
            {#if $dailyUsageData && $dailyUsageData.DailyUsage && $dailyUsageData.DailyUsage.DailyDetails && $dailyUsageData.DailyUsage.DailyDetails.length && $dailyUsageData.DailyUsage.DailyDetails.length == 0}
              <div
                class="chart"
                style="min-width: {dailyMinwidth};"
                use:chart={renderMixChart(
                  null,
                  [chartColor],
                  "1410px",
                  400,
                  null,
                  null,
                  tempData
                )}
              />
            {:else if selectedmeter.DAP_dtoun !== "x" && selectedmeter.DAP_dtouf !== "x"}
              <!-- Daily usage simple chart -->
              <div class="text">
                <p>
                  {#each words as word, i}
                    <span
                      class="letter {i === currentWord ? 'in' : 'out'}"
                      style="font-size: {word.size}px"
                    >
                      {word.text}
                    </span>
                  {/each}
                </p>
              </div>
              <div
                class="chart"
                style="min-width: {dailyMinwidth};"
                use:chart={renderMixChart(
                  $dailyUsageData.DailyUsage.DailyDetails,
                  [chartColor],
                  "1410px",
                  400,
                  selectedmeter.Service,
                  selectedmeter.UOF,
                  chartDisplayUnit,
                  tempData,
                  false,
                  onOffPeakDemand,
                  chartLegend,
                  $dailyUsageData.DailyUsage.MaxUsage
                )}
                on:click={(e) => scrollTo(e)}
              />
            {:else if selectedmeter.DAP_dtoun == "x" || selectedmeter.DAP_dtouf == "x"}
              <!-- Daily usage OnPeak & OffPeak chart -->
              <div class="text">
                <p>
                  {#each words as word, i}
                    <span
                      class="letter {i === currentWord ? 'in' : 'out'}"
                      style="font-size: {word.size}px"
                    >
                      {word.text}
                    </span>
                  {/each}
                </p>
              </div>
              <div
                class="chart"
                style="min-width: {dailyMinwidth};"
                use:chart={onPeakOffPeakChart(
                  $dailyUsageData.DailyUsage.DailyDetails,
                  selectedmeter.UOF,
                  false,
                  null,
                  tempData,
                  selectedmeter.DAP_dtoun,
                  selectedmeter.DAP_dtouf,
                  chartColor,
                  chartDisplayUnit,
                  400,
                  $dailyUsageData.DailyUsage.MaxUsage,
                  onPeakOprand,
                  offPeakOprand
                )}
              />
            {/if}
          {/if}
        </div>
      {/if}
      <div class="legend-con">
        {#if selectedmeter.DAP_dtoun == "x" || selectedmeter.DAP_dtouf == "x"}
          {#if chartDisplayUnit == "usage"}
            {#if selectedmeter.DAP_dtoun == "x"}
              <div class="chart-legend">
                <span
                  class="legend-point"
                  style="background: rgb(0, 182, 240); color: rgb(0, 182, 240);"
                /><span class="legend-text">ON-PEAK</span>
              </div>
            {/if}
            {#if selectedmeter.DAP_dtouf == "x"}
              <div class="chart-legend">
                <span
                  class="legend-point"
                  style="background: rgb(0, 41, 74); color: rgb(0, 41, 74);"
                /><span class="legend-text">OFF-PEAK</span>
              </div>
            {/if}
          {:else if chartDisplayUnit == "cost"}
            <div class="chart-legend">
              <span
                class="legend-point"
                style="background: rgb(4, 79, 141); color: rgb(4, 79, 141);"
              /><span class="legend-text">ُELECTRIC</span>
            </div>
          {/if}
        {:else}
          <div class="chart-legend">
            <span
              class="legend-point"
              style="background: {chartColor}; color: {chartColor};"
            /><span class="legend-text">
              {#if selectedmeter.Service}
                {chartLegend
                  ? chartLegend.toUpperCase()
                  : selectedmeter.Service.toUpperCase()}
              {/if}
            </span>
          </div>
        {/if}
        {#if tempData == true}
          <div class="chart-legend">
            <span
              class="legend-point leg-temp"
              style="background: rgb(255, 131, 43); color: rgb(255, 131, 43);"
            /><span class="legend-text">TEMPERATURE</span>
          </div>
        {/if}
      </div>
      <!-- Boxes of Information: Cost, Temp And Hit Peak -->
      {#if $dailyUsageData.DailyUsage && activeSection == "daily"}
        <div class="information-box">
          {#if $dailyUsageData.DailyUsage.AVGCost}
            <div>
              <h6>AVG. COST PER DAY</h6>
              <h4>
                ${$dailyUsageData.DailyUsage.AVGCost}
              </h4>
            </div>
          {/if}
          {#if disableTemp == false}
            {#if $dailyUsageData.DailyUsage.AVGTemp}
              <div>
                <h6>AVG. TEMP PER DAY</h6>
                <h4>
                  {$dailyUsageData.DailyUsage.AVGTemp}°
                </h4>
              </div>
            {/if}
          {/if}
          {#if $dailyUsageData.DailyUsage.HitPeakDemand}
            <div>
              <h6>YOU HIT PEAK DEMAND</h6>
              <h4>
                {$dailyUsageData.DailyUsage.HitPeakDemand}
              </h4>
            </div>
          {/if}
        </div>
      {/if}
      <!-- DisClaimer Footer -->
      {#if (activeSection == "daily" && $dailyUsageData.DailyUsage && $dailyUsageData.DailyUsage.FooterDisclaimer) || (activeSection == "monthly" && $monthlyUsageData.MonthlyUsage && $monthlyUsageData.MonthlyUsage.FooterDisclaimer)}
        <div class="diclimer">
          <span>
            {#if activeSection == "daily"}
              {@html $dailyUsageData.DailyUsage.FooterDisclaimer}
            {:else if activeSection == "monthly"}
              {@html $monthlyUsageData.MonthlyUsage.FooterDisclaimer}
            {/if}
          </span>
        </div>
      {/if}
    {/if}
  </div>
{/key}

<style lang="scss">
  * {
    font-family: "Interstate";
  }
  ////////////
  #cta {
    width: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.75;
    transform: translate(0, -50%) scale(4);
    left: 50%;
    bottom: 50%;
    width: 80px;
    opacity: 75%;
  }

  #cta .arrow {
    left: 30%;
  }
  .arrow {
    position: absolute;
    margin-left: 0px;
    width: 18px;
    height: 18px;
    background-size: contain;
  }
  .segunda {
    margin-left: 8px;
  }
  .next {
    background-image: url(data:image/png;base64,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);
  }

  @keyframes bounceAlpha {
    0% {
      opacity: 1;
      transform: translateX(0px) scale(1);
    }
    25% {
      opacity: 0;
      transform: translateX(-10px) scale(0.9);
    }
    26% {
      opacity: 0;
      transform: translateX(10px) scale(0.9);
    }
    55% {
      opacity: 1;
      transform: translateX(0px) scale(1);
    }
  }

  @media (min-width: 577px) {
    .bounceAlpha {
      animation-name: bounceAlpha;
      animation-duration: 1.4s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }

    .arrow.primera.bounceAlpha {
      animation-name: bounceAlpha;
      animation-duration: 1.4s;
      animation-delay: 0.2s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    // .round {
    //   transform: scale(2.5);
    //   opacity: 0.75;
    // }
    #cta .arrow {
      animation-name: bounceAlpha;
      animation-duration: 1.4s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    #cta .arrow.primera {
      animation-name: bounceAlpha;
      animation-duration: 1.4s;
      animation-delay: 0.2s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
  @media (max-width: 576px) {
    .arrow.primera {
      animation-name: bounceAlpha;
      animation-duration: 2s;
      animation-delay: 1.2s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    .arrow {
      animation-name: bounceAlpha;
      animation-duration: 2s;
      animation-delay: 1s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
  ////////////
  //
  .scroll-image {
    display: none;
    z-index: 3;
    @media screen and (max-width: 480px) {
      display: unset;
      img {
        position: absolute;
        transform: translate(0, -87%);
        right: 10px;
        bottom: 50%;
        rotate: 180deg;
        width: 80px;
        opacity: 50%;
      }
    }
  }
  .disable-scroll {
    display: none;
  }
  .text {
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
    font-size: 40px;
    p {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      vertical-align: top;
      margin: 0;
      span {
        grid-area: 1 / 1 / 1 / 1;
        margin-left: 36px;
        font-style: normal;
        font-weight: 300;
        font-size: 12px;
        color: #005faa;
      }
    }
  }

  .letter {
    display: inline-block;
    position: relative;
    transform: translateZ(25px);
    transform-origin: 50% 50% 25px;
    transition: transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .letter.out {
    transform: rotateX(90deg);
    transition: transform 0.32s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  .letter.behind {
    transform: rotateX(-90deg);
  }

  .chart-tool-tip {
    cursor: pointer;
  }
  #temp {
    width: 19px;
    height: 19px;
    cursor: pointer;
  }
  .apexcharts-tooltip-y-group {
    display: none !important;
  }
  .td-value {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
    img {
      width: 24px;
    }
  }

  .chart {
    width: 100%;
    @media screen and (min-width: 992px) {
      min-width: unset !important;
      overflow: unset;
      overflow-x: unset;
    }
  }
  .legend-con {
    display: flex;
    flex-direction: row;
    justify-content: right;
    gap: 16px;
    margin-top: 8px;
  }
  .chart-legend {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .legend-point {
    height: 12px;
    width: 12px;
    border-width: 0px;
    border-color: rgb(255, 255, 255);
    border-radius: 12px;
    display: inline-flex;
  }
  .leg-temp {
    width: 14px;
    height: 2px;
  }
  .legend-text {
    font-weight: 300;
    font-size: 16px;
    @media screen and (max-width: 480px) {
      font-size: 12px;
    }
  }
  .chart-unit {
    margin-left: 36px;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    color: #005faa;
  }
  #meter-tabs {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 2%;
    width: 100%;
  }
  #meter-btn1 {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #000000;
    cursor: pointer;
    border-bottom: solid #005faa;
    margin: 0;
  }
  #meter-btn2 {
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #6c6c6c;
    cursor: pointer;
    margin: 0;
    border-bottom: solid 2px transparent;
    &:hover {
      color: #0f0f0f;
      font-weight: 300;
      border-color: #005faa;
    }
  }
  #meter-tab11 {
    display: none;
  }
  #meter-tab12 {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    margin-top: 16px;
    overflow-x: auto;
    overflow-y: hidden;
    @media screen and (max-width: 480px) {
      box-shadow: inset -7px 0 7px -7px rgba(0, 0, 0, 0.5);
    }
  }

  /*--------*/
  .information-box {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 16px;
    // gap: 16px;
    width: fit-content;
    max-width: 550px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }
  .information-box div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    max-width: 300px;
    padding: 8px;
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
    &:not(:last-child) {
      border-right: 1px solid #e5e7eb;
    }
  }
  .information-box div h6 {
    display: inline-block;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: -0.02em;
    color: #6c6c6c;
    margin: 0;
  }
  .information-box div h4 {
    display: inline-block;
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 38px;
    color: #000000;
    margin: 0;
  }
  .diclimer {
    font-family: "Interstate";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #6c6c6c;
  }
  .tooltip-content {
    top: 35px !important;
    background-color: white;
    z-index: 5;
    border-radius: 12px;
    padding: 16px;
    right: 0;
    box-shadow: 0px 10px 15px rgba(16, 24, 40, 0.1),
      0px 4px 6px rgba(16, 24, 40, 0.1);
    width: calc(314px - 32px);
    &::before {
      content: "";
      position: absolute;
      z-index: 0;
      height: 10px;
      width: 14px;
      background-color: #005faa;
      top: -10px;
      right: 110px;
      clip-path: inset(0 0 0px 0);
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
  }
  .toggle {
    position: relative;
  }
  .toggle input[type="checkbox"] {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
    margin: 0;
  }

  .toggle label {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 13.33px;
    .toggle_usage {
      position: absolute;
      left: 6px;
      padding: 4px 6px;
    }
    .toggle_cost {
      position: absolute;
      right: 6px;
      padding: 4px 6px;
      color: #005faa;
    }
  }
  .toggle input[type="checkbox"]:checked + label {
    .toggle_usage {
      color: #005faa;
    }
    .toggle_cost {
      color: #000000;
    }
  }
  .toggle label:before {
    content: "";
    width: 110px;
    height: 32px;
    background: #ffffff;
    border: 4px solid #e6eff7;
    box-shadow: inset -48px 0 0 #e6eff7;
    position: relative;
    display: inline-block;
    border-radius: 9px;
    box-sizing: border-box;
    transition: 0.25s ease-in-out;
  }
  .toggle input[type="checkbox"]:checked + label:before {
    box-shadow: inset 56px 0 0 #e6eff7;
  }

  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(187, 187, 187);
    border-radius: 3px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
  h4 {
    margin: 0;
    padding: 0;
  }
  .options {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 6px;
    margin-top: 12px;
    align-items: center;
    @media screen and (max-width: 360px) {
      flex-direction: column-reverse;
    }
  }
  .options span {
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
  }
  @media screen and (max-width: 1000px) {
    .chart {
      overflow-y: hidden;
      overflow-x: scroll;
    }
    #tab12 {
      display: flex;
      overflow-x: auto;
    }
  }
</style>
