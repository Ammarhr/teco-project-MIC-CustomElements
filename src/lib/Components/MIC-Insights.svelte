<svelte:options tag="mic-insights" />

<script>
  // @ts-nocheck
  // @ts-ignore

  //svg imports
  import arrowUp from "../../assets/arrowUp.svg";
  import dropDown from "../../assets/cr.svg";
  import redArrow from "../../assets/redArrow.svg";
  //////
  import { chart } from "svelte-apexcharts";
  import { renderBarChart, renderRadialBar } from "../../js/MIC-chart-bundle";
  import {
    fetchstore,
    date,
    CopmarsionDate,
    billNumber,
    getToken,
    apiToken,
  } from "../../js/store";
  import { slide } from "svelte/transition";
  //state
  export let dataLables = [$date, $CopmarsionDate];
  export let demandIsightsData = [79];
  export let insightsDataLables = [$date];
  export let thisMonthComparisonPercentage = 105;
  export let token;
  let show = false;
  // export let item = { name: "Item" };
  let avgClass = "red"; //toggle style class (complete it later)

  ///////// modal pop up dunctionality
  // import { writable } from "svelte/store";
  // import Modal from "svelte-simple-modal";
  import MicInsightsRecomendation from "./MIC-InsightsRecomendation.svelte";
  // const modal = writable(null);
  // const showModal = () => modal.set(MicInsightsRecomendation);
  //charts renderer
  let options1;
  let options2 = renderRadialBar(demandIsightsData, insightsDataLables);
  let options3 = renderRadialBar(demandIsightsData, insightsDataLables);

  // const [datatoken] = getToken(
  //   "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/Token.json",
  //   "Ammar"
  // );

  const [data, loading, error, get] = fetchstore(
    "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/Insights.json",
    token
  );
  // const [servicesData] = fetchstore(
  //   "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/Insights.json",
  //   token
  // );

  $: if ($billNumber) {
    get(token);
  }

  ///////// acordion functionality
  let isOpen = false;
  let svgId = "rotate-svg-" + isOpen;

  const toggle = () => {
    isOpen = !isOpen;
    svgId = "rotate-svg-" + isOpen;
  };
  ////////// tabs functionality
  let tab1 = "1";
  let tab2 = "2";
  const activateTab = (num1, num2) => {
    tab2 = num2;
    tab1 = num1;
  };

  ////////////////////////

  $: if ($billNumber && $data && $data.y) {
    let { x, y } = $data;
    insightsDataLables = [$date];
    dataLables = [$date];
    options1 = renderBarChart(
      [y],
      x,
      ["#005FAA", "#B1DBFD"],
      "100%",
      250,
      " kWh"
    );
    options2 = renderRadialBar(
      demandIsightsData,
      insightsDataLables,
      "#005FAA"
    );
    options3 = renderRadialBar(demandIsightsData, [$CopmarsionDate], "#B1DBFD");
  }
  let showModal = false;

  function toggleModal() {
    showModal = !showModal;
  }
</script>

<!----------html----------->
{#if $loading && !token}
  <h1>loading...</h1>
{:else if $error}
  <h1>{$error}</h1>
{:else if $data.VisibilityTab == true}
  {#key $billNumber}
    <div class="insights-container">
      <div class="insight-card">
        <div id="header">
          <h5 class="insights-title">MY BILLING INSIGHTS</h5>
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
          <div transition:slide={{ duration: 300 }}>
            <div id="insights-tab-container">
              <div id="insights-tabs">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <h6 id={"btn" + tab1} on:click={() => activateTab("1", "2")}>
                  Annual Comparison
                </h6>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <h6 id={"btn" + tab2} on:click={() => activateTab("2", "1")}>
                  Monthly Comparison
                </h6>
              </div>
              <div id={"tab1" + tab1}>
                <div
                  class="chart-container"
                  transition:slide={{ duration: 300 }}
                >
                  <div use:chart={options1} />
                </div>
              </div>
              <div id={"tab1" + tab2}>
                <div
                  class="chart-container"
                  transition:slide={{ duration: 300 }}
                >
                  <div use:chart={options1} />
                </div>
              </div>
            </div>
            <div class="content">
              <h6 class="insights-label">THIS MONTH</h6>
              <div class="val-content">
                <p class="insights-value">
                  {$data.valueConsumption}
                  {$data.unit}
                </p>
                <p class="percentage">
                  <span
                    class={avgClass}
                    style="background-color:{$data.colorConsumption}"
                  >
                    <img src={redArrow} class="arrow" alt="" />
                    {thisMonthComparisonPercentage}% {$data.unit}</span
                  >
                </p>
              </div>
            </div>
            <div class="content">
              <h6 class="insights-label">Avg. Temp.</h6>
              <div class="val-content">
                <p class="insights-value">{$data.valueTemp + "°"}</p>
                <p class="percentage">
                  <img src={arrowUp} class="arrow" alt="" />
                  <span class="blue" style="background-color:{$data.colorTemp}"
                    >{$data.valueTemp + "°"}</span
                  >
                </p>
              </div>
            </div>
            <h4 class="insights-title-2">MY Demand INSIGHTS</h4>
            <div class="chart-container">
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
            </div>
            <hr id="hr-footer" />
            <div id="footer">
              <p>Insight title here</p>
              <button class="" on:click={toggleModal}> VIEW</button>
              {#if showModal}
                <div class="modal-container">
                  <div class="modal-content">
                    <button on:click={toggleModal}>X</button>
                    <mic-recomendation token={token}></mic-recomendation>
                  </div>
                </div>
              {/if}
              {#if show}
                <div />
              {/if}
            </div>
          </div>
        {/if}
      </div>
      <slot />
      <mic-sunselect {token} ></mic-sunselect>
      <mic-yearlyenergy {token} ></mic-yearlyenergy>
      <mic-bulkdownload {token} ></mic-bulkdownload>
    </div>
  {/key}
{:else}
  <h1>error</h1>
{/if}

<style scoped>
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
  }
  /*...........................**/
  .insights-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
  }
  .insight-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-items: center;
    width: 100%;
    padding: 20px;
    transition: 0.3s;
    border-radius: 16px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin-top: 10px;
  }
  #header {
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

  .insights-title {
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

  .insights-title-2 {
    width: 251px;
    height: 29px;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #005faa;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  .chart-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 225px;
    background: #ffffff;
    flex: none;
    order: 2;
    flex-grow: 0;
  }
  .insights-sub-container {
    width: 185.85px;
    height: 184.4px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  .insights-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;
    width: 100%;
    height: 134px;
    flex: none;
    order: 1;
    flex-grow: 1;
  }

  .val-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;
    width: 83%;
    height: 38px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
  }
  .insights-label {
    height: 0;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    text-transform: uppercase;
    color: #000000;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }
  .insights-value {
    height: 29px;
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    letter-spacing: -0.02em;
    color: #005faa;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  .percentage {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    width: 113px;
    height: 38px;
    flex: none;
    order: 1;
    flex-grow: 0;
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
    flex: none;
    order: 0;
    flex-grow: 0;
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
    flex: none;
    order: 0;
    flex-grow: 0;
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
    width: 392px;
    height: 50px;
    flex: none;
    order: 9;
    flex-grow: 0;
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
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #footer button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 24px;
    gap: 10px;
    width: 98px;
    height: 50px;
    background: #005faa;
    border-radius: 6px;
    flex: none;
    order: 0;
    flex-grow: 0;
    color: white;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
  }
  #hr-footer {
    margin: 5%;
    border: 1px solid #eaecee;
    flex: none;
    order: 8;
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
  /*tabs*/
  #insights-tab-container {
    width: 100%;
  }
  #insights-tabs {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    justify-content: space-between;
    /* width: 100%; */
  }

  #btn1 {
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #000000;
    flex: none;
    order: 1;
    flex-grow: 0;
    cursor: pointer;
    border-bottom: solid #005faa;
  }
  #btn2 {
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #6c6c6c;
    flex: none;
    order: 1;
    flex-grow: 0;
    cursor: pointer;
  }
  #tab11 {
    display: none;
  }
  #tab12 {
    display: flex;
  }
  /*--------*/
  @media screen and (max-width: 1000px) {
    .insight-card {
      width: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
</style>
