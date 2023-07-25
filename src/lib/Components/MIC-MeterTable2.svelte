<svelte:options tag="mic-metertable2" />

<script>
  // @ts-nocheck
  import {
    fetchstore,
    apiDomain,
    apiToken,
    newToken,
    persona,
    fetchAndRedirect,
    SAPToken,
    isSummaryAccountFlag,
  } from "../../js/store";
  import scrollImage from "../../assets/scroll.gif";
  import { onMount } from "svelte";
  import { useLazyImage as lazyImage } from "svelte-lazy-image";
  import MicUsageChart from "./MIC-UsageChart.svelte";
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
  let styleSelectedRows = [];
  let timeoutId;
  let refreshableToken;
  let EP_Flag;
  let chartColor = "#044F8D";
  let onOffPeakDemand;
  let chartLegend;
  let first = false; // trigger first render for the tabs
  let container;
  let toolTipIconCon;
  let chartDisplayUnit = "usage";
  let tempData = true;
  let sortingType;
  let activeSort;
  let prevSortth;
  let newSelect = "";
  let disableTemp = false;
  let onPeakOprand;
  let offPeakOprand;
  let words;
  let scrollClass = "scroll-image";
  const [data, loading, error, get] = fetchstore(); // meterTable fetch

  // fetch meterTable fetch api on component mount
  onMount(() => {
    if ($apiToken && $SAPToken && $apiDomain && !$data.results) {
      if ($isSummaryAccountFlag.toLowerCase() !== "true") {
        get(
          $apiToken,
          //   `${$apiDomain}/api/ibill/webcomponents/v1/Post/MeterData`,
          "../../data/meterTable.json",
          $SAPToken
        ).then(() => {
          if ($data && $data.EPFlag) {
            EP_Flag = $data.EPFlag;
          } else {
            EP_Flag = "";
          }
          if ($data && $data.TempFlag == false) {
            disableTemp = false;
            tempData = true;
          } else {
            disableTemp = true;
            tempData = false;
          }
        });
      }
      refreshableToken = $apiToken;
    }
  });
  let setTimeoutId;
  //////// change the selected meter + call Meter Api
  const handleSelectedMeter = (meterObject, i) => {
    scrollClass = "scroll-image";
    chartLegend = "";
    onOffPeakDemand = "";
    first = false;
    if (setTimeoutId) {
      clearTimeout(setTimeoutId);
    }
    if (disableTemp == false) {
      tempData = true;
    } else {
      tempData = false;
    }
    chartDisplayUnit = "usage";
    styleSelectedRows = [];
    if (meterObject) {
      selectedMeter = meterObject;
    } else {
      selectedMeter = pagenateItems[0];
    }
    // change the style of the selected table row:
    if (pagenateItems.length > 1) {
      if (i) {
        styleSelectedRows[i] =
          "background-color:#fff9ce; color:#005FAA; font-weight: 400;";
      } else {
        styleSelectedRows[0] =
          "background-color:#fff9ce; color:#005FAA; font-weight: 400;";
      }
    }
    // MiJurney event call
    if (newSelect !== "" && selectedMeter) {
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
    newSelect = selectedMeter;
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
          if (selectedMeter.Operand == "YKWHRC") {
            onOffPeakDemand = "Received: ";
            chartLegend = "SELF-GENERATED";
          }
        }
      } else {
        chartColor = "#044F8D";
        if (selectedMeter) {
          if (selectedMeter.Operand == "YKWHDL") {
            onOffPeakDemand = "Delivered: ";
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
    newSelect = "";
    tableData = [];
    pagenateItems = [];
    get(
      $newToken.token,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/MeterData`,
      $SAPToken
      // "../../data/meterTable.json"
    ).then(() => {
      if ($data && $data.EPFlag) {
        EP_Flag = $data.EPFlag;
      } else {
        EP_Flag = "";
      }
      if ($data && $data.TempFlag == false) {
        disableTemp = false;
        tempData = true;
      } else {
        disableTemp = true;
        tempData = false;
      }
    });
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

  // card toggle
  const cardToggle = () => {
    isOpen = !isOpen;
    svgId = "rotate-svg-" + isOpen;
  };

  // search & filter
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

  $: searchInput = document.getElementById("#search");

  // sort functionality
  import {
    sortByMeterNumber,
    sortByReadDate,
    sortByBillingPeriod,
    sortByBilledAmount,
    sortByCurrentReading,
    sortByPreviousReading,
    sortByTotalUsed,
    sortByLow,
    sortByMed,
    sortByHigh,
    sortByCritical,
    sortByService,
  } from "../../js/sorting-bundle";
  /// sorting obj
  let sortUiObj = {
    sortingType: "",
    activeSort: "",
  };

  const handleSort = (register) => {
    sortUiObj.activeSort = register;
    activeSort = register;
    if (prevSortth !== undefined && prevSortth !== activeSort) {
      sortUiObj.sortingType = "asen";
      sortingType = "asen";
    } else if (prevSortth !== undefined && prevSortth == activeSort) {
      if (sortingType == "asen") {
        sortUiObj.sortingType = "des";
        sortingType = "des";
      } else {
        sortUiObj.sortingType = "asen";
        sortingType = "asen";
      }
    } else {
      sortUiObj.sortingType = "asen";
      sortingType = "asen";
    }
    if (items && items.length > 1) {
      switch (true) {
        case register == "1":
          items = sortByMeterNumber(sortingType, items);
          break;
        case register == "2":
          items = sortByReadDate(sortingType, items);
          break;
        case register == "3":
          items = sortByBillingPeriod(sortingType, items);
          break;
        case register == "4":
          items = sortByCurrentReading(sortingType, items);
          break;
        case register == "5":
          items = sortByPreviousReading(sortingType, items);
          break;
        case register == "6":
          items = sortByTotalUsed(sortingType, items);
          break;
        case register == "7":
          items = sortByLow(sortingType, items);
          break;
        case register == "8":
          items = sortByMed(sortingType, items);
          break;
        case register == "9":
          items = sortByHigh(sortingType, items);
          break;
        case register == "10":
          items = sortByCritical(sortingType, items);
          break;
        case register == "0":
          items = sortByService(sortingType, items);
          break;
        default:
          break;
      }
      prevSortth = register;
      getPaginatedItems();
    }
  };

  // rendering sort svg
  const renderSortSvg = (thIndex) => {
    if (items && items.length > 1) {
      if (activeSort == thIndex && sortingType == "asen") {
        return '<img src=https://tecocdn.azureedge.net/ibill/iBill-assets/sort-up.svg  alt="sort"/>';
      } else if (activeSort == thIndex && sortingType == "des") {
        return '<img src=https://tecocdn.azureedge.net/ibill/iBill-assets/sort-down.svg alt="sort" />';
      } else {
        return '<img src=https://tecocdn.azureedge.net/ibill/iBill-assets/sort.svg  alt="sort"  />';
      }
    } else {
      return "";
    }
  };

  // sroll animation annotation (chart)
  let scrollClass2 = "scroll-image";
  const srollHandle2 = () => {
    scrollClass2 = "disable-scroll";
  };

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
          use:lazyImage
        />
      </div>
      {#if isOpen}
        {#if tableData && tableData.length > pageSize}
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
                use:lazyImage
              />
            </button>
          </div>
        {/if}
        <div class="table-container" on:scroll={srollHandle2}>
          <!-- <div class={scrollClass2}> -->
          <!-- <img
              src="https://tecocdn.azureedge.net/ibill/iBill-assets/scroll-image.gif"
              alt=""
              use:lazyImage
            /> -->
          <!-- <div id="cta">
                <span class="arrow primera next" />
              </div> -->
          <!-- </div> -->
          {#if items}
            {#if tableData}
              <table class="table" id="table">
                <tr>
                  <th on:click={() => handleSort("0")}>
                    <span>
                      Service
                      {#key sortUiObj}
                        {@html renderSortSvg(0)}
                      {/key}
                    </span>
                  </th>
                  <th on:click={() => handleSort("1")}
                    >Meter Number
                    {#key sortUiObj}
                      {@html renderSortSvg(1)}
                    {/key}
                  </th>
                  <th on:click={() => handleSort("2")}
                    >Read Date
                    {#key sortUiObj}
                      {@html renderSortSvg(2)}
                    {/key}</th
                  >
                  <th on:click={() => handleSort("3")}
                    >Billing Period
                    {#key sortUiObj}
                      {@html renderSortSvg(3)}
                    {/key}</th
                  >
                  {#if EP_Flag == "x"}
                    <th on:click={() => handleSort("7")}
                      >Low <br /> Pricing Level
                      {#key sortUiObj}
                        {@html renderSortSvg(7)}
                      {/key}
                    </th>
                    <th on:click={() => handleSort("8")}
                      >Medium <br /> Pricing Level
                      {#key sortUiObj}
                        {@html renderSortSvg(8)}
                      {/key}
                    </th>
                    <th on:click={() => handleSort("9")}
                      >High <br /> Pricing Level
                      {#key sortUiObj}
                        {@html renderSortSvg(9)}
                      {/key}
                    </th>
                    <th on:click={() => handleSort("10")}
                      >Critical<br /> Pricing Level
                      {#key sortUiObj}
                        {@html renderSortSvg(10)}
                      {/key}
                    </th>
                  {:else}
                    <th on:click={() => handleSort("4")}
                      >Current Reading
                      {#key sortUiObj}
                        {@html renderSortSvg(4)}
                      {/key}
                    </th>
                    <th on:click={() => handleSort("5")}
                      >Previous Reading
                      {#key sortUiObj}
                        {@html renderSortSvg(5)}
                      {/key}
                    </th>
                  {/if}
                  <th on:click={() => handleSort("6")}
                    >Total Used
                    {#key sortUiObj}
                      {@html renderSortSvg(6)}
                    {/key}</th
                  >
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
                        <img
                          src={`https://tecocdn.azureedge.net/ibill/iBill-assets/${row.Service.toLowerCase()}Service.svg`}
                          alt={row.Service}
                          use:lazyImage
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
                    {#if EP_Flag == "x"}
                      <td>
                        <div class="td-value">
                          <span>
                            {row.Low != "" ? row.Low : "-"}
                          </span>
                        </div></td
                      >
                      <td>
                        <div class="td-value">
                          <span>
                            {row.Med != "" ? row.Med : "-"}
                          </span>
                        </div></td
                      >
                      <td>
                        <div class="td-value">
                          <span>
                            {row.High != "" ? row.High : "-"}
                          </span>
                        </div></td
                      >
                      <td>
                        <div class="td-value">
                          <span>
                            {row.Critical != "" ? row.Critical : "-"}
                          </span>
                        </div></td
                      >
                    {:else}
                      <td>
                        <div class="td-value">
                          <span>
                            {row.CurrentReading != ""
                              ? row.CurrentReading
                              : "-"}
                          </span>
                          <h4 style="color: black;">
                            {row.ReadType != "" ? row.ReadType : ""}
                          </h4>
                        </div></td
                      >
                      <td>
                        <div class="td-value">
                          {row.PreviousReading != ""
                            ? row.PreviousReading
                            : "-"}
                        </div></td
                      >
                    {/if}
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
        {#if tableData && tableData.length > pageSize}
          <div class="pagination-options">
            <div>
              <p class="showing">
                Showing {pagenateItems.length} Of {items.length} Results
              </p>
            </div>
            {#if items && items.length > pageSize}
              <div class="pagination-btns">
                <button
                  on:click={prevPage}
                  disabled={currentPage === 0}
                  class="prev-next"
                >
                  <img
                    src={`https://tecocdn.azureedge.net/ibill/iBill-assets/prev.svg`}
                    alt=""
                    use:lazyImage
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
                    use:lazyImage
                  />
                </button>
              </div>
            {/if}
          </div>
          <!-- Tabs container -->
        {/if}
        {#key refreshableToken}
          {#key selectedMeter}
            <MicUsageChart {selectedMeter} {refreshableToken} />
          {/key}
        {/key}
      {/if}
    </div>
  {/key}
{/if}

<style lang="scss">
  //
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
    position: relative;
    @media screen and (max-width: 480px) {
      box-shadow: inset -7px 0 7px -7px rgba(0, 0, 0, 0.5);
    }
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

  table {
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid rgb(0 0 0 / 5%);
    min-width: 900px;
    width: 100%;
    margin: 10px auto 20px auto;
    border-radius: 6px;
    text-align: center !important;
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
    text-align: center;
    cursor: pointer;
    &:first-child {
      border-radius: 6px 0px 0px 0px;
    }
    &:last-child {
      border-radius: 0px 6px 0px 0px;
    }
    span {
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
