<script>
  //svg imports
  import arrowUp from "../../assets/arrowUp.svg";
  import dropDown from "../../assets/cr.svg";
  import redArrow from "../../assets/redArrow.svg";
  // @ts-ignore
  import { chart } from "svelte-apexcharts";
  import { renderBarChart, renderRadialBar } from "../../js/MIC-chart-bundle";
  import { date, getDate } from "../../js/store";

  //state
  export let data = [1.358, 1.453];
  export let dataLables = [$date, "Feb 2021"];
  export let demandIsightsData = [79];
  export let insightsDataLables = [$date];
  export let avgTempComparison = 65;
  export let thisMonthComparisonPercentage = 105;
  export let thisMonthComparsionAmmount = 1.358;

  let avgClass = "red"; //toggle style class (complete it later)

  //charts renderer
  let options = renderBarChart(data, dataLables);

  let options2 = renderRadialBar(demandIsightsData, insightsDataLables);
  let options3 = renderRadialBar(demandIsightsData, insightsDataLables);

  $: if (date) {
    console.log($date, "this is from store and insights");
    insightsDataLables = [$date];
    dataLables = [$date, $date];
    options = renderBarChart(data, dataLables);
    options2 = renderRadialBar(demandIsightsData, insightsDataLables);
    options3 = renderRadialBar(demandIsightsData, insightsDataLables);
  }
</script>

<div class="card">
  <div id="header">
    <h5 class="title">MY BILLING INSIGHTS</h5>
    <img src={dropDown} alt="" id="drop" />
  </div>
  <div id="tabs">
    <h6 id="tab-title-active">Annual Comparison</h6>
    <h6 id="tab-title-inactive">
      Monthly Comparison <br />
    </h6>
  </div>
  <!-- <hr id="active"/>
  <hr id="inactive" style="width: 50%;"/> -->
  <div class="chart-container">
    {#key $date}
      <div use:chart={options} />
    {/key}
  </div>
  <div class="content">
    <h6 class="label">THIS MONTH</h6>
    <div class="val-content">
      <p class="value">{thisMonthComparsionAmmount} kWh</p>
      <p class="percentage">
        <!-- <img src={arrowUp} class="arrow" alt="" /> -->
        <img src={redArrow} class="arrow" alt="" />
        <span class={avgClass}>{thisMonthComparisonPercentage}% kWh</span>
      </p>
    </div>
  </div>
  <div class="content">
    <h6 class="label">Avg. Temp.</h6>
    <div class="val-content">
      <p class="value">{avgTempComparison + "°"}</p>
      <p class="percentage">
        <!-- <img src={redArrow} class="arrow" alt="" /> -->
        <img src={arrowUp} class="arrow" alt="" />
        <span class="blue">{avgTempComparison + "°"}</span>
      </p>
    </div>
  </div>
  <h4 class="title-2">MY Demand INSIGHTS</h4>
  <div class="chart-container">
    {#key $date}
      <div class="sub-container"><div use:chart={options2} /></div>
      <div class="sub-container"><div use:chart={options3} /></div>
    {/key}
  </div>
  <div class="content">
    <h6 class="label">THIS MONTH</h6>
    <div class="val-content">
      <p class="value">{thisMonthComparsionAmmount}% kWh</p>
      <p class="percentage">
        <img src={redArrow} class="arrow" alt="" />
        <!-- <img src={arrowUp} class="arrow" alt="" /> -->
        <span class={avgClass}>{thisMonthComparisonPercentage}% kWh</span>
      </p>
    </div>
  </div>
  <hr id="hr-footer" />
  <div id="footer">
    <p>Insight title here</p>
    <button>VIEW</button>
  </div>
</div>

<style>
  @font-face {
    font-family: "Interstate";
    src: url("../../assets/fonts/Interstate.ttf") format("truetype");
  }
  * {
    font-family: "Interstate";
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 5px;
    min-width: 30%;
    min-height: 1121.4px;
    padding: 20px;
    background: #ffffff;
    border-radius: 20px;
  }
  #header {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 499px;
    width: 392px;
    height: 50px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #drop {
    position: absolute;
    right: 0;
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
  #tabs {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    width: 392px;
    height: 65px;
    border-bottom: 1px solid #f4f5f7;
    flex: none;
    order: 1;
    flex-grow: 0;
  }
  #tab-title-active {
    width: 195px;
    height: 30px;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #000000;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #tab-title-inactive {
    width: 195px;
    height: 30px;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 30px;
    color: #6c6c6c;
  }
  #active {
    background-color: #005faa;
    width: 80%;
  }
  #inactive {
    display: none;
  }
  .title-2 {
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
    width: 100%;
    height: 225px;
    background: #ffffff;
    flex: none;
    order: 2;
    flex-grow: 0;
  }
  .sub-container {
    width: 185.85px;
    height: 184.4px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 4px;

    width: 392px;
    height: 134px;

    flex: none;
    order: 1;
    flex-grow: 1;
  }

  .val-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 16px;

    width: 392px;
    height: 38px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
  }
  .label {
    width: 392px;
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
  .value {
    width: 260px;
    height: 29px;
    font-style: normal;
    font-weight: 300;
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
</style>
