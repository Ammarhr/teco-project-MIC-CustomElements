<svelte:options tag="mic-insights" />

<script>
  // @ts-nocheck
  // @ts-ignore

  ///////// svg imports
  import arrowUp from "../../assets/arrowUp.svg";
  import dropDown from "../../assets/cr.svg";
  import redArrow from "../../assets/redArrow.svg";
  
  ///////// sub web components
  import MicLoading from "./MIC-Loading.svelte";
  import MicRenderError from "./MIC-RenderError.svelte";
  import MicInsightsRecomendation from "./MIC-InsightsRecomendation.svelte";
  import MicTabs from "./MIC-Tabs.svelte";

  ///////// js files (store & chart bundles)
  import { chart } from "svelte-apexcharts";
  import { renderBarChart, renderRadialBar } from "../../js/MIC-chart-bundle";
  import {
    billNumber,
    fetchstore,
    apiDomain,
    apiToken,
    date,
    CopmarsionDate,
  } from "../../js/store";
  
  //state
  /// TODOs:
  // let dataLables = [$date, $CopmarsionDate];
  // let demandIsightsData = [79];
  // let insightsDataLables = [$date];
  // let options2 = renderRadialBar(demandIsightsData, insightsDataLables);
  // let options3 = renderRadialBar(demandIsightsData, insightsDataLables);
  
  ///// important variables
  let toggleArray = [];  // array of toggle statuses
  let styleToggleArr = []; // array of toggle styles
  let isOpen = true; // toggle card status
  let svgId = "rotate-svg-" + isOpen; // toggle button rotate ID
  let avgClass = "red"; //toggle style class (complete it later)
  let chartWidth = 400; // the width of the charts

  const [data, loading, error, get] = fetchstore(); // store fetch
  // test url: https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/Insights.json
  // dev url:
  $: if ($apiDomain && $apiToken && !$data.services) {
    get(
      $apiToken,
      "../../../data/Insights.json"
      // `https://miadmindev.${$apiDomain}/api/ibill/webcomponents/v1/Post/Insights`
      // `https://cdn.jsdelivr.net/gh/Ammarhr/teco-project-MIC-CustomElements@main/data/Insights.json`
    );
  }

  ///////// acordion functionality
  const toggle = (i) => {
    toggleArray[i] = !toggleArray[i];
    isOpen = !isOpen;
    if (!toggleArray[i]) {
      styleToggleArr[i] = "max-height: 200vh;opacity: 1;transition:200ms;";
    } else {
      styleToggleArr[i] =
        "opacity: 0;max-height: 0;margin: 0; transition:200ms;";
    }
  };
  ////////////////////////

  $: if ($billNumber && $data.services) {
    for (let i = 0; i > toggleArray.length; i++) {
      toggleArray.push(true);
      styleToggleArr.push("max-height: 200vh;opacity: 1;transition:200ms;");
    }

    // TODO: Radial Bar chart options
    // insightsDataLables = [$date];
    // dataLables = [$date];
    // options2 = renderRadialBar(
    //   demandIsightsData,
    //   insightsDataLables,
    //   "230%",
    //   "#005FAA"
    // );
    // options3 = renderRadialBar(
    //   demandIsightsData,
    //   [$CopmarsionDate],
    //   "230%",
    //   "#B1DBFD"
    // );
  }
  let showModal = false;

  function toggleModal() {
    showModal = !showModal;
  }
  window.addEventListener("resize", function () {
    if (window.innerWidth < 650) {
      chartWidth = window.innerWidth - 75;
    }
  });
</script>

<!----------html----------->
{#if $loading}
  <MicLoading />
{:else if $error}
  <MicRenderError />
{:else if $data.services}
  {#each $data.services as InsightsService, i}
    {#key $billNumber}
      <div class="insight-card">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div id="header" on:click={() => toggle(i)}>
          <h5 class="insights-title">MY BILLING INSIGHTS</h5>
          <img src={dropDown} alt="" id={svgId} />
        </div>
        <div class="content-container" style={styleToggleArr[i]}>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <MicTabs title1="Annual Comparison" title2="Monthly Comparison">
            <!-- monthly   -->
            <div
              slot="monthly-chart"
              use:chart={renderBarChart(
                [InsightsService.yearly.y],
                InsightsService.yearly.x,
                ["#005FAA", "#B1DBFD"],
                "100%",
                300,
                " kWh"
              )}
            />
            <div class="content" slot="monthly-data">
              <h6 class="insights-label">THIS MONTH</h6>
              <div class="val-content">
                <p class="insights-value">
                  {InsightsService.yearly.valueConsumption}
                  {InsightsService.yearly.unit}
                </p>
                <p class="percentage">
                  <span
                    class={avgClass}
                    style="background-color:{InsightsService.yearly
                      .colorConsumption}"
                  >
                    <img src={redArrow} class="arrow" alt="" />
                    {InsightsService.yearly.percentageConsumption}% {InsightsService
                      .yearly.unit}</span
                  >
                </p>
              </div>
            </div>
            <div slot="monthly-temp" class="content">
              <h6 class="insights-label">Avg. Temp.</h6>
              <div class="val-content">
                <p class="insights-value">
                  {InsightsService.yearly.valueTemp + "°"}
                </p>
                <p class="percentage">
                  <img src={arrowUp} class="arrow" alt="" />
                  <span
                    class="blue"
                    style="background-color:{InsightsService.yearly.colorTemp}"
                    >{InsightsService.yearly.valueTemp + "°"}</span
                  >
                </p>
              </div>
            </div>
            <!-- annual   -->
            <div
              slot="annual-chart"
              use:chart={renderBarChart(
                [InsightsService.monthly.y],
                InsightsService.monthly.x,
                ["#005FAA", "#B1DBFD"],
                "100%",
                300,
                " kWh"
              )}
            />
            <div class="content" slot="annual-data">
              <h6 class="insights-label">THIS MONTH</h6>
              <div class="val-content">
                <p class="insights-value">
                  {InsightsService.monthly.valueConsumption}
                  {InsightsService.monthly.unit}
                </p>
                <p class="percentage">
                  <span
                    class={avgClass}
                    style="background-color:{InsightsService.monthly
                      .colorConsumption}"
                  >
                    <img src={redArrow} class="arrow" alt="" />
                    {InsightsService.monthly.percentageConsumption}% {InsightsService
                      .monthly.unit}</span
                  >
                </p>
              </div>
            </div>
            <div slot="annual-temp" class="content">
              <h6 class="insights-label">Avg. Temp.</h6>
              <div class="val-content">
                <p class="insights-value">
                  {InsightsService.monthly.valueTemp + "°"}
                </p>
                <p class="percentage">
                  <img src={arrowUp} class="arrow" alt="" />
                  <span
                    class="blue"
                    style="background-color:{InsightsService.monthly.colorTemp}"
                    >{InsightsService.monthly.valueTemp + "°"}</span
                  >
                </p>
              </div>
            </div>
          </MicTabs>
          <!-- TODO: Demand INSIGHTS  -->
          <!-- <h4 class="insights-title-2">MY Demand INSIGHTS</h4>
        <div class="chart-container flex-center-items">
          {#key $date}
          <div class="insights-sub-container">
              <div use:chart={options2} />
            </div>
            <div class="insights-sub-container">
              <div use:chart={options3} />
            </div>
          {/key}
        </div>
        <div class="insights-content">
          <h6 class="insights-label">THIS MONTH</h6>
          <div class="val-content">
            <p class="insights-value">
              {$data.valueConsumption}% {$data.unit}
            </p>
            <p class="percentage">
              <img src={redArrow} class="arrow" alt="" />
              <span
                class={avgClass}
                style="background-color:{$data.colorConsumption}"
                >{thisMonthComparisonPercentage}% {$data.unit}</span
              >
            </p>
          </div>
        </div> -->
          {#if InsightsService.recommendation}
            <hr id="hr-footer" />
            <div id="footer">
              <p>Insight title here</p>
              <button class="" on:click={toggleModal}> VIEW</button>
              {#if showModal}
                <div class="modal-container">
                  <div class="modal-content">
                    <button on:click={toggleModal}>X</button>
                    <MicInsightsRecomendation token={$apiToken} url="../../../data/recomendationMessages.json"/>
                  </div>
                </div>
              {/if}
                <div />
            </div>
          {/if}
        </div>
      </div>
    {/key}
  {/each}
{:else}
  <h1>error</h1>
{/if}

<style lang="scss">
  @font-face {
    font-family: "Interstate";
    src: url("../../assets/fonts/Interstate.ttf") format("truetype");
  }
  * {
    font-family: "Interstate";
  }
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
  }
  .modal-content {
    position: fixed;
    top: 0;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 675px;
  }
  /*...........................**/
  .insight-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: fit-content;
    max-width: calc(100% - 40px);
    padding: 20px;
    transition: 0.3s;
    border-radius: 16px;
    box-shadow: 0px 0px 10px rgb(34 34 34 / 24%);
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
  .insights-title-2 {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: #005faa;
  }
  .content-container {
    margin-top: 20px;
    width: calc(100% - 20px);
  }
  .chart-container {
    width: 100%;
    margin-bottom: 15px;
  }
  .flex-center-items {
    display: flex;
    justify-content: space-around;
  }
  .insights-sub-container {
    max-width: 185.85px;
    display: flex;
    justify-content: center;
  }
  .insights-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
    width: 100%;
  }
  .content {
    margin-bottom: 15px;
  }
  .val-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  .insights-label {
    font-weight: 400;
    font-size: 18px;
    text-transform: uppercase;
    margin: 0 0 10px 0;
  }
  .insights-value {
    font-size: 22px;
    font-weight: 300;
    margin: 0;
    color: #005faa;
  }
  .percentage {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
  }
  .blue {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    gap: 8px;
    min-width: 120px;
    height: 38px;
    background: #e6eff7;
    border: 1px solid #1e5dda;
    border-radius: 24px;
  }
  .red {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
    gap: 8px;
    min-width: 120px;
    height: 38px;
    background: #f7e6e6;
    border: 1px solid #da1e1e;
    border-radius: 24px;
  }
  .arrow {
    position: absolute;
    left: 6.68%;
    right: 16.71%;
    top: 37.75%;
    bottom: 18.75%;
  }
  .red-arrow {
    display: none;
    position: absolute;
    left: 6.68%;
    right: 16.71%;
    top: 37.75%;
    bottom: 18.75%;
  }
  #footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    width: 100%;
    height: 50px;
  }
  #footer p {
    width: 239px;
    height: 30px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #6c6c6c;
  }
  #footer button {
    padding: 8px 20px;
    background: #005faa;
    border-radius: 6px;
    color: white;
    border: none;
    font-weight: 400;
    font-size: 18px;
    cursor: pointer;
  }
  #hr-footer {
    margin: 5%;
    border: 1px solid #eaecee;
  }
  /*----------acordion-------------*/
  #rotate-svg-false {
    cursor: pointer;
    transform: rotate(0.25turn);
    transition: transform 0.2s ease-in;
  }
  #rotate-svg-true {
    cursor: pointer;
    transition: transform 0.2s ease-in;
    transform: rotate(0.5turn);
  }
</style>