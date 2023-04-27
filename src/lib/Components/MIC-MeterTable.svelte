<svelte:options tag="mic-metertable" />

<script>
  // @ts-nocheck
  //   import toggle from "../../assets/cr.svg";
  //   import toolTip from "../../assets/toolTip.svg";
  //   import nextIcon from "../../assets/next.svg";
  //   import prevIcon from "../../assets/prev.svg";
  //   import searchIcon from "../../assets/search.svg";
  // import verticalLine from "../../assets/vertical-line.svg";
  // import elictric from "../../assets/electric.svg";
  //   import { slide } from "svelte/transition";
  import {
    fetchstore,
    apiDomain,
    apiToken,
    fetchDailyUsageChart,
    fetchMonthlyUsageChart,
    newToken,
    persona,
    fetchAndRedirect,
    SAPToken,
  } from "../../js/store";
  import { chart } from "svelte-apexcharts";
  import {
    renderMixChart,
    onPeakOffPeakChart,
  } from "../../js/MIC-chart-bundle";
  import { onMount } from "svelte";

  let items;
  let tableData;
  let pageSize = 5; // number of items per page
  let pagenateItems = [];
  let currentPage = 0;
  let selectedMeter;
  let tab1 = "1";
  let tab2 = "2";
  let activeSection = "daily";
  let isOpen = true;
  let svgId = "rotate-svg-" + isOpen;
  let toolTipShow = false;
  let toolTipStyle = "display:none; position: absolute; top:20px";
  let styleSelectedRows = [];
  let timeoutId;
  let refreshableToken;
  const [data, loading, error, get] = fetchstore(); // meterTable fetch
  const [dailyUsageData, dailyUsageLoading, dailyUsageError, dailyUsageGet] =
    fetchDailyUsageChart(); // daily usage fetch
  const [
    monthlyUsageData,
    monthlyUsageLoading,
    monthlyUsageError,
    monthlyUsageGet,
  ] = fetchMonthlyUsageChart(); // monthly usage fetch

  // fetch meterTable fetch api on component mount
  onMount(() => {
    if ($apiToken && $SAPToken && $apiDomain && !$data.results) {
      get(
        $apiToken,
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/MeterData`,
        // "../../data/meterTable.json",
        $SAPToken
      );
      refreshableToken = $apiToken;
    }
  });
  let chartColor;
  let onOffPeakDemand;
  let chartLegend;

  //////// change the selected meter + call Dap Api
  const handleSelectedMeter = (meterObject, i) => {
    chartLegend = "";
    onOffPeakDemand = "";
    first = false;
    tempData = true;
    styleSelectedRows = [];
    if (meterObject) {
      selectedMeter = meterObject;
    } else {
      selectedMeter = pagenateItems[0];
    }
    // change the style of the selected table row:
    if (i) {
      styleSelectedRows[i] =
        "background-color:#fff9ce; color:#005FAA; font-weight: 400;";
    } else {
      styleSelectedRows[0] =
        "background-color:#fff9ce; color:#005FAA; font-weight: 400;";
    }
    if (selectedMeter) {
      let {
        DLN,
        ZipCode,
        DAP_StartDate,
        DAP_EndDate,
        intp = "D",
        DAP_dkwh,
        DAP_rkwh,
        DAP_pf,
        DAP_kw,
        DAP_dtoun,
        DAP_dtouf,
        BilledAmount,
        Contract,
        MeterNumber,
        Operand,
        OperandLabel,
        HistoricalFact,
        AMI_Flag,
      } = selectedMeter;

      if (AMI_Flag == "X") {
        dailyUsageGet(
          refreshableToken,
          `${$apiDomain}/api/ibill/webcomponents/v1/Post/meterDataDailyUsage?BilledAmount=${BilledAmount}`,
          // "../../data/meterUsageDaily.json",
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
      let monthlyUrl;

      if (DAP_dtoun == "x" && DAP_dtouf == "x") {
        monthlyUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/meterDataMonthlyUsage?Contract=${Contract}&MeterNo=${MeterNumber}&Operand1=HIST_OFKWH&Operand2=HIST_PKKWH&Dln=${DLN}&ZipCode=${ZipCode}`;
      } else if (DAP_dtoun !== "x" && DAP_dtouf == "x") {
        monthlyUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/meterDataMonthlyUsage?Contract=${Contract}&MeterNo=${MeterNumber}&Operand1=HIST_OFKWH&Operand2=&Dln=${DLN}&ZipCode=${ZipCode}`;
      } else if (DAP_dtoun == "x" && DAP_dtouf !== "x") {
        monthlyUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/meterDataMonthlyUsage?Contract=${Contract}&MeterNo=${MeterNumber}&Operand1=HIST_PKKWH&Operand2=&Dln=${DLN}&ZipCode=${ZipCode}`;
      } else {
        monthlyUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/meterDataMonthlyUsage?Contract=${Contract}&MeterNo=${MeterNumber}&Operand1=${HistoricalFact}&Operand2=&Dln=${DLN}&ZipCode=${ZipCode}`;
      }

      monthlyUsageGet(
        refreshableToken,
        monthlyUrl,
        // "../../data/meterUsageMonthly.json",
        $SAPToken
      );
    }
    if (selectedMeter) {
      fetchAndRedirect(
        $apiToken,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "Click_Meter_Line",
          Outcome: `Meter ID ${selectedMeter.MeterNumber} is active`,
          Feedback: "",
          Persona: $persona,
        }
      );
    }
    if (selectedMeter) {
      if (selectedMeter.DAP_kw == "x") {
        chartColor = "#411084";
        chartLegend = "Demand";
        if (selectedMeter) {
          if (selectedMeter.HistoricalFact == "KW_R_OPK") {
            onOffPeakDemand = "Off Peak: ";
          } else if (selectedMeter.HistoricalFact == "KW_R_PK") {
            onOffPeakDemand = "On Peak: ";
          } else {
            onOffPeakDemand = "Demand: ";
          }
        }
      } else if (
        selectedMeter.DAP_dtoun == "x" &&
        selectedMeter.DAP_dtouf !== "x"
      ) {
        chartColor = "#00B6F0";
      } else if (
        selectedMeter.DAP_dtoun !== "x" &&
        selectedMeter.DAP_dtouf == "x"
      ) {
        chartColor = "#00294A";
      } else if (
        selectedMeter.DAP_dtoun == "x" &&
        selectedMeter.DAP_dtouf == "x"
      ) {
        chartColor = "both";
      } else if (selectedMeter.DAP_rkwh == "x") {
        chartColor = "#96BDFF";
        if (selectedMeter) {
          if (selectedMeter.HistoricalFact == "HIST_RKWH") {
            chartLegend = "SELF-GENERATED";
          }
        }
      } else {
        chartColor = "#044F8D";
        if (selectedMeter) {
          if (selectedMeter.HistoricalFact == "HIST_DKWH") {
            chartLegend = "UTILITY PROVIDED";
          }
        }
      }
    }
  };

  // refresh the component depend on the new generated token
  $: if (
    $newToken &&
    $newToken.token &&
    (refreshableToken == $apiToken || refreshableToken !== $newToken.token)
  ) {
    get(
      $newToken.token,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/MeterData`,
      $SAPToken
      // "../../data/meterTable.json"
    );
    refreshableToken = $newToken.token;
  }
  // select the dafault active tab
  $: if (selectedMeter && selectedMeter.AMI_Flag == "" && first == false) {
    activeSection = "monthly";
    tab1 = "2";
    tab2 = "1";
    first = true;
  } else if (selectedMeter && selectedMeter.AMI_Flag != "" && first == false) {
    activeSection = "daily";
    tab1 = "1";
    tab2 = "2";
    first = true;
  }

  //////// table first render
  $: if ($data && $data.MeterTabel) {
    tableData = $data.MeterTabel;
    selectedMeter = $data.MeterTabel[0];
    items = $data.MeterTabel;
    getPaginatedItems();
  }

  ///////// pagination:
  function nextPage() {
    currentPage++;
    getPaginatedItems();
  }

  function prevPage() {
    currentPage--;
    getPaginatedItems();
  }
  function goToPage(page) {
    currentPage = page;
    getPaginatedItems();
  }
  function getPaginatedItems() {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    pagenateItems = items.slice(startIndex, endIndex);
    getPagesToShow();
    handleSelectedMeter();
  }

  function getCurrentPage() {
    return currentPage + 1;
  }
  function getTotalPages() {
    return Math.ceil(items.length / pageSize);
  }
  let arrayOfBtns = [];
  let totalPagesShowen;
  function getPagesToShow() {
    const totalPages = getTotalPages();
    totalPagesShowen = getTotalPages();
    const currentPageIndex = currentPage;
    const startPageIndex = Math.max(0, currentPageIndex - 2);
    const endPageIndex = Math.min(totalPages - 1, currentPageIndex + 2);
    arrayOfBtns = Array(endPageIndex - startPageIndex + 1)
      .fill()
      .map((_, idx) => startPageIndex + idx);
  }
  /// card toggle
  const cardToggle = () => {
    isOpen = !isOpen;
    svgId = "rotate-svg-" + isOpen;
  };

  ////////// tabs functionality
  let first = false; // trigger first render for the tabs
  const activateTab = (num1, num2, activeTab) => {
    costUsageToggle("usage");
    activeSection = activeTab;
    tab2 = num2;
    tab1 = num1;
    if (activeTab == "Daily") {
      fetchAndRedirect(
        $apiToken,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "Click_Daily_Tab",
          Outcome: `Meter ID ${selectedMeter.MeterNumber} is active`,
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
          EventCode: "Click_Monthly_Tab",
          Outcome: `Meter ID ${selectedMeter.MeterNumber} is active`,
          Feedback: "",
          Persona: $persona,
        }
      );
    }
  };

  ////// search & filter
  const handleSearch = (event) => {
    currentPage = 0;
    let str;
    event.preventDefault();
    if (event.target.search) {
      str = event.target.search.value;
    } else if (event.target.value) {
      str = event.target.value;
    } else if (searchInput && searchInput.value) {
      str = searchInput.value;
    }
    let searchArray = [];
    if (str == "" || str == undefined) {
      items = $data.MeterTabel;
      getPaginatedItems();
    } else if (str) {
      searchArray = $data.MeterTabel.filter((meter) => {
        return meter.MeterNumber.toLowerCase().includes(str.toLowerCase());
      });
    }
    if (searchArray[0]) {
      items = searchArray;
      getPaginatedItems();
    }
  };

  // toolt tip toggle function
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
        "height:0; opacity: 0;margin: 0; transition:200ms; padding:0; position: absolute; top:20px";
    }
  }
  let container;
  let toolTipIconCon;
  $: toolTipIconCon = document.querySelector(".chart-tool-tip");
  $: container = document.querySelector(".meter-card");
  $: searchInput = document.getElementById("#search");

  $: if (container) {
    container.addEventListener("click", function (event) {
      // check if the click event originated from the container
      if (event.target != toolTipIconCon) {
        // do something when the container is clicked
        tooltipToggle(true);
      }
    });
  }
  // cost/usage chart toggle function
  let costBtnClass = "sw-btn-inactive";
  let usageBtnClass = "sw-btn-active";
  let chartDisplayUnit = "usage";
  let tempData = true;
  const costUsageToggle = (activeBtn) => {
    chartDisplayUnit = activeBtn;
    if (activeBtn == "cost") {
      costBtnClass = "sw-btn-active";
      usageBtnClass = "sw-btn-inactive";
      fetchAndRedirect(
        $apiToken,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "Click_Cost_Switch",
          Outcome: `Meter ID ${selectedMeter.MeterNumber} is active`,
          Feedback: "",
          Persona: $persona,
        }
      );
    } else if (activeBtn == "usage") {
      usageBtnClass = "sw-btn-active";
      costBtnClass = "sw-btn-inactive";
      fetchAndRedirect(
        $apiToken,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "Click_Usage_Switch",
          Outcome: `Meter ID ${selectedMeter.MeterNumber} is active`,
          Feedback: "",
          Persona: $persona,
        }
      );
    }
  };
  const tempreatureShow = () => {
    tempData = !tempData;

    fetchAndRedirect(
      $apiToken,
      `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
      null,
      {
        EventCode: "Click_Temp_Checkbox",
        Outcome: `Meter ID ${selectedMeter.MeterNumber} is active`,
        Feedback: "",
        Persona: $persona,
      }
    );
  };
  let monthlyMinwidth = "unset";
  let dailyMinwidth = "unset";
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
      default:
        // code to be executed if none of the cases are true
        break;
    }
  }
</script>

<!------ html ------->
{#if $loading}
  <mic-loading />
{:else if $error}
  <h1 />
{:else if $data && pagenateItems && pagenateItems.length > 0}
  {#key $apiToken}
    <div class="meter-card" bind:this={container}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div id="meter-header" on:click={cardToggle} aria-expanded={isOpen}>
        <h4 id="title">Usage Details</h4>

        <img
          src={`https://tecocdn.azureedge.net/ibill/iBill-assets/toggle.svg`}
          alt="toggle"
          id={svgId}
        />
      </div>
      {#if isOpen}
        {#if tableData && tableData.length > 5}
          <div
            class="search"
            on:submit={(e) => {
              clearTimeout(timeoutId);
              handleSearch(e);
            }}
          >
            <input
              type="text"
              id="search"
              placeholder="Search"
              bind:this={searchInput}
              on:input={(e) => {
                clearTimeout(timeoutId); // Clear any existing timeout
                timeoutId = setTimeout(() => {
                  handleSearch(e);
                }, 750);
              }}
            />
            <button type="submit">
              <img
                src={`https://tecocdn.azureedge.net/ibill/iBill-assets/search.svg`}
                alt=""
              />
            </button>
          </div>
        {/if}
        <div class="table-container">
          {#if items}
            {#if tableData}
              <table class="table" id="table">
                <tr>
                  <th>Service</th>
                  <th>Meter Number</th>
                  <th>Read Date</th>
                  <th>Biling Read</th>
                  <th>Current Reading</th>
                  <th>Previous Reading</th>
                  <th>Total Used</th>
                </tr>
                {#each pagenateItems as row, i}
                  <tr
                    style={styleSelectedRows[i]}
                    class="table-row"
                    on:click={() => {
                      handleSelectedMeter(row, i);
                    }}
                  >
                    <td>
                      <div class="td-value">
                        <!-- src={elictric} -->
                        <img
                          src={`https://tecocdn.azureedge.net/ibill/iBill-assets/${row.Service.toLowerCase()}Service.svg`}
                          alt={row.Service}
                        />
                      </div>
                    </td>
                    <td>
                      <div class="td-value">
                        {row.MeterNumber != "" ? row.MeterNumber : "-"}
                      </div></td
                    >
                    <td>
                      <div class="td-value">
                        {row.ReadDate != "" ? row.ReadDate : "-"}
                      </div></td
                    >
                    <td>
                      <div class="td-value">
                        {row.BillingPeriod != "" ? row.BillingPeriod : "-"}
                      </div></td
                    >
                    <td>
                      <div class="td-value">
                        <span>
                          {row.CurrentReading != "" ? row.CurrentReading : "-"}
                        </span>
                        <h4 style="color: black;">
                          {row.ReadType != "" ? row.ReadType : ""}
                        </h4>
                      </div></td
                    >
                    <td>
                      <div class="td-value">
                        {row.PreviousReading != "" ? row.PreviousReading : "-"}
                      </div></td
                    >
                    <td>
                      <div class="td-value">
                        <span>
                          {row.TotalUsed != "" ? row.TotalUsed : "-"}
                        </span>
                        <h4 style="color: black;">
                          {row.OperandLabel != "" ? row.OperandLabel : ""}
                        </h4>
                      </div></td
                    >
                  </tr>
                {/each}
              </table>
            {/if}
          {/if}
        </div>
        {#if selectedMeter && selectedMeter.MeterLocation}
          <div id="location">
            <span
              ><strong> Meter Location:</strong>
              {selectedMeter.MeterLocation}</span
            >
          </div>
        {/if}
        {#if tableData && tableData.length > 5}
          <div class="pagination-options">
            <div>
              <p class="showing">
                Showing {pagenateItems.length} Of {items.length} Results
              </p>
            </div>
            {#if items && items.length > 5}
              <div class="pagination-btns">
                <button
                  on:click={prevPage}
                  disabled={currentPage === 0}
                  class="prev-next"
                >
                  <img
                    src={`https://tecocdn.azureedge.net/ibill/iBill-assets/prev.svg`}
                    alt=""
                  />
                  Previous
                </button>
                {#each arrayOfBtns as pageIndex}
                  <button
                    on:click={() => goToPage(pageIndex)}
                    class:selected={pageIndex === currentPage}
                    disabled={currentPage === pageIndex}
                    class="page-btn"
                  >
                    {#key pageIndex}
                      {pageIndex + 1}
                    {/key}
                  </button>
                {/each}
                <button
                  on:click={nextPage}
                  disabled={currentPage === totalPagesShowen - 1}
                  class="prev-next"
                >
                  Next
                  <img
                    src={`https://tecocdn.azureedge.net/ibill/iBill-assets/next.svg`}
                    alt=""
                  />
                </button>
              </div>
            {/if}
          </div>
          <!-- Tabs container -->
        {/if}
        <div id="meter-tab-container">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          {#if $dailyUsageLoading || $monthlyUsageLoading}
            <mic-shadowloading />
          {:else if ($dailyUsageData && $dailyUsageData.DailyUsage) || ($monthlyUsageData && $monthlyUsageData.MonthlyUsage)}
            <div id="meter-tabs">
              {#if selectedMeter && selectedMeter.AMI_Flag != ""}
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
              />
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
                <div class="switch">
                  <button
                    class={usageBtnClass}
                    on:click={() => {
                      costUsageToggle("usage");
                    }}
                  >
                    Usage
                  </button>
                  <button
                    class={costBtnClass}
                    on:click={() => {
                      costUsageToggle("cost");
                    }}
                  >
                    Cost
                  </button>
                </div>
              {/if}
            </div>
            <!-- Monthly Chart -->
            <div id={"meter-tab1" + tab1}>
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
                {:else if selectedMeter.DAP_dtoun !== "x" && selectedMeter.DAP_dtouf !== "x"}
                  <span class="chart-unit">
                    {#if chartDisplayUnit == "usage"}
                      {selectedMeter.UOF}
                    {:else if chartDisplayUnit == "cost"}
                      $
                    {:else}
                      {selectedMeter.UOF}
                    {/if}
                  </span>
                  <div
                    class="chart"
                    style="min-width: {monthlyMinwidth};"
                    use:chart={renderMixChart(
                      $monthlyUsageData.MonthlyUsage.MonthlyDetails,
                      [chartColor],
                      "1410px",
                      400,
                      selectedMeter.Service,
                      selectedMeter.UOF,
                      chartDisplayUnit,
                      tempData,
                      true,
                      onOffPeakDemand,
                      chartLegend
                    )}
                  />
                {:else if selectedMeter.DAP_dtoun == "x" || selectedMeter.DAP_dtouf == "x"}
                  <!-- Monthly usage OnPeak & OffPeak chart -->
                  <span class="chart-unit">
                    {#if chartDisplayUnit == "usage"}
                      {selectedMeter.UOF}
                    {:else if chartDisplayUnit == "cost"}
                      $
                    {:else}
                      {selectedMeter.UOF}
                    {/if}
                  </span>
                  <div
                    class="chart"
                    style="min-width: {monthlyMinwidth};"
                    use:chart={onPeakOffPeakChart(
                      $monthlyUsageData.MonthlyUsage.MonthlyDetails,
                      selectedMeter.UOF,
                      true,
                      selectedMeter.BillingPeriod,
                      tempData,
                      selectedMeter.DAP_dtoun,
                      selectedMeter.DAP_dtouf,
                      chartColor,
                      chartDisplayUnit
                    )}
                  />
                {/if}
              {/if}
            </div>
            <!-- Daily Chart -->
            {#if selectedMeter && selectedMeter.AMI_Flag != ""}
              <div id={"meter-tab1" + tab2}>
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
                  {:else if selectedMeter.DAP_dtoun !== "x" && selectedMeter.DAP_dtouf !== "x"}
                    <!-- Daily usage simple chart -->
                    <span class="chart-unit">
                      {#if chartDisplayUnit == "usage"}
                        {selectedMeter.UOF}
                      {:else if chartDisplayUnit == "cost"}
                        $
                      {:else}
                        {selectedMeter.UOF}
                      {/if}
                    </span>
                    <div
                      class="chart"
                      style="min-width: {dailyMinwidth};"
                      use:chart={renderMixChart(
                        $dailyUsageData.DailyUsage.DailyDetails,
                        [chartColor],
                        "1410px",
                        400,
                        selectedMeter.Service,
                        selectedMeter.UOF,
                        chartDisplayUnit,
                        tempData,
                        false,
                        onOffPeakDemand,
                        chartLegend
                      )}
                    />
                  {:else if selectedMeter.DAP_dtoun == "x" || selectedMeter.DAP_dtouf == "x"}
                    <!-- Daily usage OnPeak & OffPeak chart -->
                    <span class="chart-unit">
                      {#if chartDisplayUnit == "usage"}
                        {selectedMeter.UOF}
                      {:else if chartDisplayUnit == "cost"}
                        $
                      {:else}
                        {selectedMeter.UOF}
                      {/if}
                    </span>
                    <div
                      class="chart"
                      style="min-width: {dailyMinwidth};"
                      use:chart={onPeakOffPeakChart(
                        $dailyUsageData.DailyUsage.DailyDetails,
                        selectedMeter.UOF,
                        false,
                        null,
                        tempData,
                        selectedMeter.DAP_dtoun,
                        selectedMeter.DAP_dtouf,
                        chartColor,
                        chartDisplayUnit
                      )}
                    />
                  {/if}
                {/if}
              </div>
            {/if}
            <!-- Boks of Information: Cost, Temp And Hit Peak -->
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
                {#if $dailyUsageData.DailyUsage.AVGTemp}
                  <div>
                    <h6>AVG. TEMP PER DAY</h6>
                    <h4>
                      {$dailyUsageData.DailyUsage.AVGTemp}°
                    </h4>
                  </div>
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
      {/if}
    </div>
  {/key}
{/if}

<style lang="scss">
  * {
    font-family: "Interstate";
  }
  #meter-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
  }
  .meter-card {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 16px;
    padding: 20px;
    background-color: #ffffff;
  }
  #title {
    margin: 3px 0;
    font-weight: 500;
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
  #rotate-svg-false {
    cursor: pointer;
    transform: rotate(180deg);
    transition: transform 0.2s ease-in;
  }
  #rotate-svg-true {
    cursor: pointer;
    transition: transform 0.2s ease-in;
    // transform: rotate(180deg);
  }
  .table-container {
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    width: 100%;
    height: fit-content;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    overflow-x: auto;
  }
  .options {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 6px;
    margin-top: 12px;
    align-items: center;
  }
  .options span {
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
  }
  .chart-tool-tip {
    cursor: pointer;
  }
  #temp {
    width: 19px;
    height: 19px;
    cursor: pointer;
  }
  table {
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid rgb(0 0 0 / 5%);
    min-width: 900px;
    width: 100%;
    margin: 10px auto 20px auto;
    border-radius: 6px;
  }
  th {
    box-sizing: border-box;
    width: fit-content;
    height: 50px;
    background: #005faa;
    border-right: 1px solid #ffffff;
    color: #ffffff;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    flex: none;
    order: 0;
    flex-grow: 0;
    &:first-child {
      border-radius: 6px 0px 0px 0px;
    }
    &:last-child {
      border-radius: 0px 6px 0px 0px;
    }
  }
  .pagination-btns {
    display: flex;
    align-items: center;
    gap: 4px;
    @media screen and (max-width: 480px) {
      gap: 0;
    }
  }
  .prev-next {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
  }
  .prev-next[disabled] {
    display: none;
  }
  .page-btn {
    background: none;
    border: none;
    border-radius: 6px;
    padding: 8px;
    min-width: 36px;
    height: 36px;
    cursor: pointer;
    @media screen and (max-width: 480px) {
      min-width: 28px;
    }
  }
  .page-btn[disabled] {
    background: #005faa;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px;
    min-width: 36px;
    height: 36px;
    cursor: default;
  }
  .table-row {
    width: 45px;
    height: 50px;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.02em;
    font-style: normal;
    cursor: pointer;
    text-align: center;
    color: #000000;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  tr:hover {
    background-color: #e6eff7;
  }
  tr {
    &:last-child {
      td {
        &:first-child {
          border-radius: 0 0 0 6px;
        }
        &:last-child {
          border-radius: 0 0 6px 0;
        }
      }
    }
  }
  td {
    padding: 12px;
    border: 1px solid rgba(194, 194, 194, 0.749);
    transition: background-color 0.4s;
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
  .pagination-options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    @media screen and (max-width: 480px) {
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  }
  h4 {
    margin: 0;
    padding: 0;
  }
  .chart {
    width: 100%;
    @media screen and (min-width: 992px) {
      min-width: unset !important;
      overflow: unset;
    }
  }
  .chart-unit {
    margin-left: 36px;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    color: #005faa;
  }
  .search {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: relative;
    width: fit-content;
    max-width: 100%;
    button {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      width: 40px;
      display: flex;
      padding: 0;
      border: none;
      height: 100%;
      justify-content: center;
      align-items: center;
      background: none;
      cursor: pointer;
      img {
        width: 20px;
      }
    }
  }
  .search input {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 12px;
    gap: 12px;
    width: 280px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #d1d5db;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 6px;
    padding-right: 40px;
  }
  .showing {
    font-weight: 300;
    font-size: 16px;
    color: #005faa;
  }
  /*tabs*/
  #meter-tab-container {
    min-width: 100%;
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
  @media screen and (max-width: 1000px) {
    .meter-card {
      display: flex;
      flex-direction: column;
      row-gap: 2rem;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;
      border-radius: 16px;
      padding: 20px;
    }
    .table-container {
      overflow: auto;
    }
    .chart {
      overflow-y: hidden;
      overflow-x: scroll;
    }
    #tab12 {
      display: flex;
      overflow-x: auto;
    }
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
    max-width: 400px;
    &::before {
      content: "";
      position: absolute;
      z-index: 0;
      height: 10px;
      width: 14px;
      background-color: #005faa;
      top: -10px;
      /* transform: rotate(45deg); */
      right: 110px;
      clip-path: inset(0 0 0px 0);
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
  }
  .switch {
    background: #e6eff7;
    padding: 4px;
    border-radius: 6px;
    .sw-btn-active {
      cursor: pointer;
      background: white;
      border: none;
      border-radius: 6px;
      padding: 4px 6px;
    }
    .sw-btn-inactive {
      cursor: pointer;
      border: none;
      background: unset;
      color: #005faa;
    }
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
</style>
