<svelte:options tag="mic-insights" />

<script>
  // @ts-nocheck
  // @ts-ignore

  ///////// svg imports
  // import dropDown from "../../assets/cr.svg";
  import arrow from "../../assets/arrowUp.svg";

  ///////// sub web components
  import MicInsightsRecomendation from "./MIC-InsightsRecomendation.svelte";
  import MicSunSelect from "./MIC-SunSelect.svelte";

  ///////// js files (store & chart bundles)
  import { chart } from "svelte-apexcharts";
  import { renderBarChart, renderRadialBar } from "../../js/MIC-chart-bundle";
  import {
    billNumber,
    fetchstore,
    fetchAndRedirect,
    newToken,
    apiDomain,
    apiToken,
    latestBill,
    eventsDomain,
    persona,
    sunSelectServicesArray,
  } from "../../js/store";
  import { onMount } from "svelte";
  ///// important variables
  let toggleArray = []; // array of toggle statuses
  let styleToggleArr = []; // array of toggle style
  let tabsToggleArr = [];
  let sunSelectArray = [];
  let sunArrayVal;
  let recoToken;
  let isOpen = true; // toggle card status
  let svgId = "rotate-svg-" + isOpen; // toggle button rotate ID
  let avgClass = "red"; //toggle style class (complete it later)
  let chartWidth = 310; // the width of the charts
  let tries = 3;
  const [data, loading, error, get] = fetchstore(); // store fetch
  const [sundata, sunloading, sunerror, sunget] = fetchstore(); // store fetch

  onMount(() => {
    if (
      $apiDomain &&
      $apiToken &&
      !$data.services &&
      tries > 0 &&
      $newToken === ""
    ) {
      get(
        $apiToken,
        // "../../../data/DemandInsight.json"
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/BillInsight`
      );
      sunget(
        $apiToken,
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/SunSelect`
        // "../../data/sunSelect.json"
      );
      tries--;
    }
    //////
    recoToken = $apiToken;
  });
  $: if (
    $newToken &&
    $newToken.token &&
    (recoToken == $apiToken || recoToken !== $newToken.token)
  ) {
    get(
      $newToken.token,
      // "../../../data/Insights.json"
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/BillInsight`
    ).then(() => {
      tabsToggleArr = [];
    });
    /// sunSelect fetch:
    sunget(
      $newToken.token,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/SunSelect`
      // "../../data/sunSelect.json"
    ).then(() => {
      sunSelectArray = [];
    });
    recoToken = $newToken.token;
  }

  ///////// acordion functionality
  const toggle = (i) => {
    toggleArray[i] = !toggleArray[i];
    svgId = "rotate-svg-";

    if (!toggleArray[i]) {
      styleToggleArr[i] = "max-height: 200vh;opacity: 1;transition:200ms;";
    } else {
      styleToggleArr[i] =
        "opacity: 0;max-height: 0;margin: 0; transition:200ms;";
    }
  };
  ////////////////////////
  let newArr;
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
      sunSelectArray.push(sunArrayVal);
    }
  }

  $: if ($data.services && !tabsToggleArr[0]) {
    tabsToggleArr = [];
    for (let i = 0; i < $data.services.length; i++) {
      if (
        $data.services[i].monthly.VisibilityTab == true &&
        $data.services[i].yearly.VisibilityTab == true
      ) {
        tabsToggleArr.push(["2", "1"]);
      } else if (
        $data.services[i].monthly.VisibilityTab == false &&
        $data.services[i].yearly.VisibilityTab == true
      ) {
        tabsToggleArr.push(["2", "1"]);
      } else if (
        $data.services[i].monthly.VisibilityTab == true &&
        $data.services[i].yearly.VisibilityTab == false
      ) {
        tabsToggleArr.push(["1", "2"]);
      } else {
        tabsToggleArr.push(["2", "1"]);
      }
      toggleArray.push(false);
    }
  }
  window.addEventListener("resize", function () {
    if (window.innerWidth < 650) {
      chartWidth = window.innerWidth - 75;
    }
  });

  // tabs:
  const activateTab = (i, j) => {
    if (j == 1) {
      tabsToggleArr[i][1] = "2";
      tabsToggleArr[i][0] = "1";
    } else if (j == 0) {
      tabsToggleArr[i][0] = "2";
      tabsToggleArr[i][1] = "1";
    }
  };
</script>

<!----------html----------->
{#if $loading}
  <mic-loading />
{:else if $billNumber && $data.services && tabsToggleArr.length == $data.services.length}
  {#each $data.services as insightsService, i}
    {#if insightsService.yearly.VisibilityTab == true || insightsService.monthly.VisibilityTab == true}
      <div class="insight-card">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div id="header" on:click={() => toggle(i)}>
          <h5 class="insights-title">MY BILLING INSIGHTS</h5>
          <img
            src={`${$apiDomain}/micwc-external/assets/toggle.svg`}
            alt="toggle"
            id={`${svgId}${toggleArray[i]}`}
          />
        </div>
        <div class="content-container" style={styleToggleArr[i]}>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div id="insights-tabs">
            {#if insightsService?.yearly?.VisibilityTab == true}
              <h6
                id={"btn" + tabsToggleArr[i][1]}
                on:click={(e) => {
                  activateTab(i, 0);
                  fetchAndRedirect(
                    recoToken,
                    `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
                    null,
                    {
                      EventCode: "IN_Yearly_Compare",
                      Outcome: "",
                      Feedback: "",
                      Persona: $persona,
                    }
                  );
                }}
              >
                {"Annual Comparison"}
              </h6>
            {/if}
            {#if insightsService?.monthly?.VisibilityTab == true}
              <h6
                id={"btn" + tabsToggleArr[i][0]}
                on:click={(e) => {
                  activateTab(i, 1);
                  fetchAndRedirect(
                    recoToken,
                    `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
                    null,
                    {
                      EventCode: "IN_Monthly_Compare",
                      Outcome: "",
                      Feedback: "",
                      Persona: $persona,
                    }
                  );
                }}
              >
                {"Monthly Comparison"}
              </h6>
            {/if}
          </div>
          <!-- ---Annual--- -->
          {#if insightsService?.yearly?.VisibilityTab == true}
            <div id={"tab1" + tabsToggleArr[i][0]}>
              <div class="chart-container">
                {#if insightsService?.yearly?.y.data[0] > insightsService?.yearly?.y.data[1]}
                  <div
                    use:chart={renderBarChart(
                      [insightsService?.yearly?.y],
                      insightsService?.yearly?.x,
                      ["#005FAA", "#B1DBFD"],
                      chartWidth,
                      350,
                      ` ${insightsService?.yearly?.unit}`,
                      insightsService?.yearly?.y.data[0] +
                        insightsService?.yearly?.y.data[0] / 10
                    )}
                  />
                {:else}
                  <div
                    use:chart={renderBarChart(
                      [insightsService?.yearly?.y],
                      insightsService?.yearly?.x,
                      ["#005FAA", "#B1DBFD"],
                      chartWidth,
                      350,
                      ` ${insightsService?.yearly?.unit}`,
                      insightsService?.yearly?.y.data[1] +
                        insightsService?.yearly?.y.data[1] / 10
                    )}
                  />
                {/if}
                <div class="content">
                  <h6 class="insights-label">THIS MONTH</h6>
                  <div class="val-content">
                    <p class="insights-value">
                      {insightsService?.yearly?.valueConsumption}
                      {insightsService?.yearly?.unit}
                    </p>
                    {#if insightsService.yearly.percentageConsumption > 0}
                      <span
                        class={avgClass}
                        style="background-color:rgba(218, 30, 40, 0.03); border: 1px solid #DA1E28;"
                      >
                        <img
                          src={`${$apiDomain}/micwc-external/assets/redArrow.svg`}
                          class="arrow"
                          alt=""
                        />
                        {Math.abs(
                          insightsService.yearly?.percentageConsumption
                        )}% {insightsService?.yearly?.unit}</span
                      >
                    {:else if insightsService.yearly.percentageConsumption < 0}
                      <span
                        class={avgClass}
                        style="background: rgba(36, 161, 72, 0.03); border: 1px solid #24A148;"
                      >
                        <img
                          src={`${$apiDomain}/micwc-external/assets/greenArrow.svg`}
                          class="arrow"
                          alt=""
                        />
                        {Math.abs(
                          insightsService.yearly?.percentageConsumption
                        )}% {insightsService?.yearly?.unit}</span
                      >
                    {:else if insightsService.yearly.percentageConsumption == 0}
                      <span
                        class={"red"}
                        style="background: #E6EFF7; border: 1px solid #005FAA"
                      >
                        {Math.abs(
                          insightsService.yearly?.percentageConsumption
                        )}% {insightsService?.yearly?.unit}</span
                      >
                    {/if}
                  </div>
                </div>
                {#if insightsService?.yearly?.valueTemp}
                  <div class="content">
                    <h6 class="insights-label">Avg. Temp.</h6>
                    <div class="val-content">
                      <p class="insights-value">
                        {insightsService?.yearly?.valueTemp + "°"}
                      </p>
                      {#if insightsService.yearly.percentageTemp >= 0}
                        <span
                          class="red"
                          style="background: #E6EFF7; border: 1px solid #005FAA;"
                        >
                          <img
                            src={`${$apiDomain}/micwc-external/assets/arrowUp.svg`}
                            class="arrow"
                            alt="arrow"
                          />{Math.abs(insightsService?.yearly?.percentageTemp) +
                            "°"}</span
                        >
                      {:else if insightsService.yearly.percentageTemp < 0}
                        <span
                          class="red"
                          style="background: rgba(36, 161, 72, 0.03); border: 1px solid rgb(36, 161, 72);"
                        >
                          <img
                            src={`${$apiDomain}/micwc-external/assets/greenArrow.svg`}
                            style="rotate:calc(180deg)"
                            class="arrow"
                            alt="arrow"
                          />{Math.abs(insightsService?.yearly?.percentageTemp) +
                            "°"}</span
                        >
                      {/if}
                    </div>
                  </div>
                {/if}
              </div>
              {#if insightsService?.yearly && insightsService?.yearly?.CurrentFactorValue && insightsService?.yearly?.CurrentFactorValue !== ""}
                <h4 class="insights-title-2">MY Demand INSIGHTS</h4>
                <div class="chart-container flex-center-items">
                  <div class="insights-sub-container">
                    <div
                      use:chart={renderRadialBar(
                        [insightsService?.yearly?.PreviousFactorValue],
                        [insightsService?.yearly?.PreviousFactorDate],
                        250,
                        "#005FAA"
                      )}
                    />
                  </div>
                  <div
                    class="insights-sub-container"
                    use:chart={renderRadialBar(
                      [insightsService?.yearly?.CurrentFactorValue],
                      [insightsService?.yearly?.CurrentFactorDate],
                      250,
                      "#B1DBFD"
                    )}
                  />
                </div>
                <div class="content">
                  <h6 class="insights-label">THIS MONTH</h6>
                  <div class="val-content">
                    <p class="insights-value">
                      {insightsService?.yearly?.CurrentDemandValue}
                      {insightsService?.yearly?.DemandUnit}
                    </p>
                    {#if insightsService.yearly.LoadFactorArrowComparison > 0}
                      <span
                        class={avgClass}
                        style="background-color:rgba(218, 30, 40, 0.03); border: 1px solid #DA1E28;"
                      >
                        <img
                          src={`${$apiDomain}/micwc-external/assets/redArrow.svg`}
                          class="arrow"
                          alt="arrow icon"
                        />
                        {Math.abs(
                          insightsService.yearly?.LoadFactorArrowComparison
                        )}% {insightsService?.yearly?.DemandUnit}</span
                      >
                    {:else if insightsService.yearly.LoadFactorArrowComparison < 0}
                      <span
                        class={avgClass}
                        style="background: rgba(36, 161, 72, 0.03); border: 1px solid #24A148;"
                      >
                        <img
                          src={`${$apiDomain}/micwc-external/assets/greenArrow.svg`}
                          class="arrow"
                          alt=""
                        />
                        {Math.abs(
                          insightsService.yearly?.LoadFactorArrowComparison
                        )}% {insightsService?.yearly?.DemandUnit}</span
                      >
                    {:else if insightsService.yearly.LoadFactorArrowComparison == 0}
                      <span
                        class={"red"}
                        style="background: #E6EFF7; border: 1px solid #005FAA;"
                      >
                        {Math.abs(
                          insightsService.yearly?.LoadFactorArrowComparison
                        )}% {insightsService?.yearly?.DemandUnit}</span
                      >
                    {/if}
                  </div>
                </div>
              {/if}
            </div>
          {/if}
          <!-- ---Monthly---- -->
          {#if insightsService?.monthly?.VisibilityTab == true}
            <div id={"tab1" + tabsToggleArr[i][1]}>
              <div class="chart-container">
                {#if insightsService?.monthly?.y.data[0] > insightsService?.monthly?.y.data[1]}
                  <div
                    use:chart={renderBarChart(
                      [insightsService?.monthly?.y],
                      insightsService?.monthly?.x,
                      ["#005FAA", "#B1DBFD"],
                      chartWidth,
                      350,
                      ` ${insightsService?.monthly?.unit}`,
                      insightsService?.monthly?.y.data[0] +
                        insightsService?.monthly?.y.data[0] / 10
                    )}
                  />
                {:else}
                  <div
                    use:chart={renderBarChart(
                      [insightsService?.monthly?.y],
                      insightsService?.monthly?.x,
                      ["#005FAA", "#B1DBFD"],
                      chartWidth,
                      350,
                      ` ${insightsService?.monthly?.unit}`,
                      insightsService?.monthly?.y.data[1] +
                        insightsService?.monthly?.y.data[1] / 10
                    )}
                  />
                {/if}
                <div class="content">
                  <h6 class="insights-label">THIS MONTH</h6>
                  <div class="val-content">
                    <p class="insights-value">
                      {insightsService?.monthly?.valueConsumption}
                      {insightsService?.monthly?.unit}
                    </p>
                    {#if insightsService.monthly.percentageConsumption > 0}
                      <span
                        class={avgClass}
                        style="background-color:rgba(218, 30, 40, 0.03); border: 1px solid #DA1E28;"
                      >
                        <img
                          src={`${$apiDomain}/micwc-external/assets/redArrow.svg`}
                          class="arrow"
                          alt="arrow icon"
                        />
                        {Math.abs(
                          insightsService.monthly?.percentageConsumption
                        )}% {insightsService?.monthly?.unit}</span
                      >
                    {:else if insightsService.monthly.percentageConsumption < 0}
                      <span
                        class={avgClass}
                        style="background: rgba(36, 161, 72, 0.03); border: 1px solid #24A148;"
                      >
                        <img
                          src={`${$apiDomain}/micwc-external/assets/greenArrow.svg`}
                          class="arrow"
                          alt=""
                        />
                        {Math.abs(
                          insightsService.monthly?.percentageConsumption
                        )}% {insightsService?.monthly?.unit}</span
                      >
                    {:else if insightsService.monthly.percentageConsumption == 0}
                      <span
                        class={"red"}
                        style="background: #E6EFF7; border: 1px solid #005FAA"
                      >
                        {Math.abs(
                          insightsService.monthly?.percentageConsumption
                        )}% {insightsService?.monthly?.unit}</span
                      >
                    {/if}
                  </div>
                </div>
                {#if insightsService?.monthly?.valueTemp}
                  <div class="content">
                    <h6 class="insights-label">Avg. Temp.</h6>
                    <div class="val-content">
                      <p class="insights-value">
                        {insightsService?.monthly?.valueTemp + "°"}
                      </p>
                      {#if insightsService.monthly.percentageTemp >= 0}
                        <span
                          class="red"
                          style="background: #E6EFF7; border: 1px solid #005FAA;"
                        >
                          <img
                            src={`${$apiDomain}/micwc-external/assets/arrowUp.svg`}
                            class="arrow"
                            alt="arrow"
                          />{Math.abs(insightsService?.monthly?.percentageTemp) +
                            "°"}</span
                        >
                      {:else if insightsService.monthly.percentageTemp < 0}
                        <span
                          class="red"
                          style="background: rgba(36, 161, 72, 0.03); border: 1px solid rgb(36, 161, 72);"
                        >
                          <img
                            src={`${$apiDomain}/micwc-external/assets/greenArrow.svg`}
                            style="rotate:calc(180deg)"
                            class="arrow"
                            alt="arrow"
                          />{Math.abs(insightsService?.monthly?.percentageTemp) +
                            "°"}</span
                        >
                      {/if}
                    </div>
                  </div>
                {/if}
              </div>
              {#if insightsService?.monthly && insightsService?.monthly?.CurrentFactorValue && insightsService?.monthly?.CurrentFactorValue !== ""}
                <h4 class="insights-title-2">MY Demand INSIGHTS</h4>
                <div class="chart-container flex-center-items">
                  <div class="insights-sub-container">
                    <div
                      use:chart={renderRadialBar(
                        [insightsService?.monthly?.PreviousFactorValue],
                        [insightsService?.monthly?.PreviousFactorDate],
                        250,
                        "#005FAA"
                      )}
                    />
                  </div>
                  <div
                    class="insights-sub-container"
                    use:chart={renderRadialBar(
                      [insightsService?.monthly?.CurrentFactorValue],
                      [insightsService?.monthly?.CurrentFactorDate],
                      250,
                      "#B1DBFD"
                    )}
                  />
                </div>
                <div class="content">
                  <h6 class="insights-label">THIS MONTH</h6>
                  <div class="val-content">
                    <p class="insights-value">
                      {insightsService?.monthly?.CurrentDemandValue}
                      {insightsService?.monthly?.DemandUnit}
                    </p>
                    {#if insightsService.monthly.LoadFactorArrowComparison > 0}
                      <span
                        class={avgClass}
                        style="background-color:rgba(218, 30, 40, 0.03); border: 1px solid #DA1E28;"
                      >
                        <img
                          src={`${$apiDomain}/micwc-external/assets/redArrow.svg`}
                          class="arrow"
                          alt="arrow icon"
                        />
                        {Math.abs(
                          insightsService.monthly?.LoadFactorArrowComparison
                        )}% {insightsService?.monthly?.DemandUnit}</span
                      >
                    {:else if insightsService.monthly.LoadFactorArrowComparison < 0}
                      <span
                        class={avgClass}
                        style="background: rgba(36, 161, 72, 0.03); border: 1px solid #24A148;"
                      >
                        <img
                          src={`${$apiDomain}/micwc-external/assets/greenArrow.svg`}
                          class="arrow"
                          alt=""
                        />
                        {Math.abs(
                          insightsService.monthly?.LoadFactorArrowComparison
                        )}% {insightsService?.monthly?.DemandUnit}</span
                      >
                    {:else if insightsService.monthly.LoadFactorArrowComparison == 0}
                      <span
                        class={"red"}
                        style="background: #E6EFF7; border: 1px solid #005FAA;"
                      >
                        {Math.abs(
                          insightsService.monthly?.LoadFactorArrowComparison
                        )}% {insightsService?.monthly?.DemandUnit}</span
                      >
                    {/if}
                  </div>
                </div>
              {/if}
            </div>
          {/if}
          {#if $billNumber === $latestBill && insightsService.BillContractNo && recoToken == $apiToken}
            <mic-recomendation
              token={$apiToken}
              url={$apiDomain}
              billcontractnumber={insightsService.BillContractNo}
            />
          {:else if $billNumber === $latestBill && $newToken && $newToken !== "" && insightsService.BillContractNo}
            <mic-recomendation
              token={$newToken.token}
              url={$apiDomain}
              billcontractnumber={insightsService.BillContractNo}
            />
          {/if}
        </div>
      </div>
    {/if}
    {#if $sunloading}
      <mic-loading />
    {:else if $sunerror}
      <h1 />
    {:else if sunSelectArray && sunSelectArray.length > 0}
      <mic-sunselect contractnum={sunSelectArray[i]} />
    {/if}
  {/each}
{:else if $sundata && $sundata.SunSelect}
  {#if $sunloading}
    <mic-loading />
  {:else if $sunerror}
    <h1 />
  {:else if $sundata && $sundata.SunSelect.length > 0}
    <mic-sunselect contractnum={$sundata.SunSelect} class="sun-select" />
  {/if}
{:else}
  <div />
{/if}

<style lang="scss">
  .insight-card {
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
  .sun-select {
    width: 100%;
    // max-width: 410px;
    @media screen and (max-width: 767px) {
      max-width: unset;
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
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    gap: 8px;
    height: 38px;
    border-radius: 24px;
    width: fit-content;
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
    transform: rotate(0turn);
    transition: transform 0.2s ease-in;
  }
  #rotate-svg-true {
    cursor: pointer;
    transition: transform 0.2s ease-in;
    transform: rotate(180deg);
  }
  /*----------tabs--------------*/
  #insights-tab-container {
    width: 100%;
  }
  #insights-tabs {
    border-bottom: 1px solid #808080b5;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h6 {
      margin: 0;
    }
  }
  #btn1 {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #000000;
    order: 1;
    border-bottom: solid #005faa;
    cursor: pointer;
  }
  #btn2 {
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 30px;
    order: 1;
    display: flex;
    align-items: center;
    color: #6c6c6c;
    cursor: pointer;
  }
  #tab11 {
    display: none;
  }
  #tab12 {
    display: flex;
    flex-direction: column;
  }
</style>
