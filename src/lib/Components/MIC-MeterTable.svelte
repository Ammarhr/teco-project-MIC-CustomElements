<svelte:options tag="mic-metertable" />

<script>
    // @ts-nocheck
    import toggle from "../../assets/cr.svg";
    import toolTip from "../../assets/toolTip.svg";
    // import verticalLine from "../../assets/vertical-line.svg";
    // import elictric from "../../assets/electric.svg";
    import { slide } from "svelte/transition";
    import {
        fetchstore,
        apiDomain,
        apiToken,
        fetchDailyUsageChart,
        fetchMonthlyUsageChart,
        newToken,
        persona,
        fetchAndRedirect,
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
    let reGeneratedToken;
    let tab1 = "1";
    let tab2 = "2";
    let activeSection = "daily";
    let isOpen = true;
    let svgId = "rotate-svg-" + isOpen;
    let toolTipShow = false;
    let toolTipStyle = "display:none; position: absolute; top:20px";
    let styleSelectedRows = [];

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
        if ($apiToken && $apiDomain && !$data.results) {
            get(
                $apiToken,
                `${$apiDomain}/api/ibill/webcomponents/v1/Post/MeterData`
                // "../../data/meterTable.json"
            );
        }
        reGeneratedToken = $apiToken;
    });
    //////// change the selected meter + call Dap Api
    const handleSelectedMeter = (meterObject, i) => {
        first = false;
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
            } = selectedMeter;

            dailyUsageGet(
                $apiToken,
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
                }
            );

            monthlyUsageGet(
                $apiToken,
                `${$apiDomain}/api/ibill/webcomponents/v1/Post/meterDataMonthlyUsage?Contract=${Contract}&MeterNo=${MeterNumber}&Operand1=${Operand}&Operand2=${OperandLabel}&Dln=${DLN}&ZipCode=${ZipCode}`
                // "../../data/meterUsageMonthly.json"
            );
        }
        fetchAndRedirect(
            $apiToken,
            `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
            null,
            {
                EventCode: "Click_Meter_Line",
                Outcome: "",
                Feedback: "",
                Persona: $persona,
            }
        );
    };

    // refresh the component depend on the new generated token
    $: if (
        $newToken &&
        $newToken.token &&
        (reGeneratedToken == $apiToken || reGeneratedToken !== $newToken.token)
    ) {
        get(
            $newToken.token,
            `${$apiDomain}/api/ibill/webcomponents/v1/Post/MeterData`
            // "../../data/meterTable.json"
        );
        reGeneratedToken = $newToken.token;
    }
    // select the dafault active tab
    $: if (selectedMeter && selectedMeter.AMI_Flag == "" && first == false) {
        activeSection = "monthly";
        tab1 = "2";
        tab2 = "1";
        first = true;
    } else if (
        selectedMeter &&
        selectedMeter.AMI_Flag != "" &&
        first == false
    ) {
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
        handleSelectedMeter();
    }

    function getCurrentPage() {
        return currentPage + 1;
    }

    function getTotalPages() {
        return Math.ceil(items.length / pageSize);
    }
    function getPagesToShow() {
        const totalPages = getTotalPages();
        const currentPageIndex = currentPage;
        const startPageIndex = Math.max(0, currentPageIndex - 2);
        const endPageIndex = Math.min(totalPages - 1, currentPageIndex + 2);
        return Array(endPageIndex - startPageIndex + 1)
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
                    Outcome: "",
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
                    Outcome: "",
                    Feedback: "",
                    Persona: $persona,
                }
            );
        }
    };

    ////// search & filter
    const handleSearch = () => {
        let str = event.target.value;
        let searchArray = [];
        if (str == "") {
            items = $data.results;
            selectedMeter = $data.results[0];
            getPaginatedItems();
            handleSelectedMeter(selectedMeter);
        }
        searchArray = $data.results.filter((meter) => {
            return meter.meterTable.meterNumbeR.includes(str);
        });
        if (searchArray[0]) {
            items = searchArray;
            getPaginatedItems();
            handleSelectedMeter();
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
                "opacity: 0;margin: 0; transition:200ms; padding:0; position: absolute; top:20px";
        }
    }
    let container;
    let toolTipIconCon;
    $: toolTipIconCon = document.querySelector(".tool-tip");
    $: container = document.querySelector(".meter-card");
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
                    Outcome: "",
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
                    Outcome: "",
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
                    Outcome: "",
                    Feedback: "",
                    Persona: $persona,
                }
            );
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
                />
            </div>
            {#if isOpen}
                {#if tableData && tableData.length > 5}
                    <div class="search">
                        <input type="text" placeholder="Search" />
                    </div>
                {/if}
                <div
                    class="table-container"
                    transition:slide={{ duration: 300 }}
                >
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
                                                {row.MeterNumber != ""
                                                    ? "#" + row.MeterNumber
                                                    : "-"}
                                            </div></td
                                        >
                                        <td>
                                            <div class="td-value">
                                                {row.ReadDate != ""
                                                    ? row.ReadDate
                                                    : "-"}
                                            </div></td
                                        >
                                        <td>
                                            <div class="td-value">
                                                {row.BillingPeriod != ""
                                                    ? row.BillingPeriod
                                                    : "-"}
                                            </div></td
                                        >
                                        <td>
                                            <div class="td-value">
                                                <span>
                                                    {row.CurrentReading != ""
                                                        ? row.CurrentReading
                                                        : "-"}
                                                </span>
                                                <h4 style="color: black;">
                                                    {row.ReadType != ""
                                                        ? row.ReadType
                                                        : ""}
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
                                        <td>
                                            <div class="td-value">
                                                <span>
                                                    {row.TotalUsed != ""
                                                        ? row.TotalUsed
                                                        : "-"}
                                                </span>
                                                <h4 style="color: black;">
                                                    {row.OperandLabel != ""
                                                        ? row.OperandLabel
                                                        : ""}
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
                            <p>
                                Page {getCurrentPage()} of {getTotalPages()}
                            </p>
                        </div>
                        <div>
                            <button
                                on:click={prevPage}
                                disabled={currentPage === 0}
                            >
                                Previous
                            </button>

                            {#each getPagesToShow() as pageIndex}
                                <button
                                    on:click={() => goToPage(pageIndex)}
                                    class:selected={pageIndex === currentPage}
                                >
                                    {pageIndex + 1}
                                </button>
                            {/each}

                            <button
                                on:click={nextPage}
                                disabled={currentPage === getTotalPages() - 1}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                {/if}
                <!-- <div class="options" /> -->
                <!-- Tabs container -->
                <div
                    id="meter-tab-container"
                    transition:slide={{ duration: 300 }}
                >
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    {#if $dailyUsageData && $dailyUsageData.DailyUsage}
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
                                    on:click={() =>
                                        activateTab("2", "1", "monthly")}
                                >
                                    Monthly
                                </h6>
                            {/if}
                        </div>
                        <div />
                        <!-- option for Hadi to style -->
                        <div class="options" style="position: relative;">
                            {#if (activeSection == "daily" && $dailyUsageData.DailyUsage && $dailyUsageData.DailyUsage.TempTooltip) || (activeSection == "monthly" && $monthlyUsageData.MonthlyUsage && $monthlyUsageData.MonthlyUsage.TempTooltip)}
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
                                    class="tool-tip"
                                    on:click={tooltipToggle}
                                    bind:this={toolTipIconCon}
                                />

                                {#if $monthlyUsageData.MonthlyUsage.TempTooltip && activeSection == "monthly"}
                                    <div
                                        class="tooltip-content"
                                        style={toolTipStyle}
                                    >
                                        {@html $monthlyUsageData.MonthlyUsage
                                            .TempTooltip}
                                    </div>
                                {:else if $dailyUsageData.DailyUsage.TempTooltip && activeSection == "daily"}
                                    <div
                                        class="tooltip-content"
                                        style={toolTipStyle}
                                    >
                                        {@html $dailyUsageData.DailyUsage
                                            .TempTooltip}
                                    </div>
                                {/if}
                                <!--  -->
                            {/if}
                            {#if $monthlyUsageData && $monthlyUsageData.MonthlyUsage && activeSection == "monthly"}
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
                            {#if $monthlyUsageData && $monthlyUsageData.MonthlyUsage && $monthlyUsageData.MonthlyUsage.MonthlyDetails && $monthlyUsageData.MonthlyUsage.MonthlyDetails.length > 0}
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
                                    use:chart={renderMixChart(
                                        $monthlyUsageData.MonthlyUsage
                                            .MonthlyDetails,
                                        ["#044F8D"],
                                        "1410px",
                                        400,
                                        selectedMeter.Service,
                                        selectedMeter.UOF,
                                        chartDisplayUnit,
                                        null,
                                        tempData
                                    )}
                                />
                            {/if}
                        </div>
                        <!-- Daily Chart -->
                        {#if selectedMeter && selectedMeter.AMI_Flag != ""}
                            <div id={"meter-tab1" + tab2}>
                                {#if $dailyUsageData.DailyUsage.DailyDetails && $dailyUsageData.DailyUsage.DailyDetails.length == 0}
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
                                        use:chart={renderMixChart(
                                            null,
                                            ["#044F8D"],
                                            "1410px",
                                            400,
                                            null,
                                            null,
                                            tempData
                                        )}
                                    />
                                {:else if selectedMeter.DAP_dkwh == "x"}
                                    <!-- Daily usage simple chart -->
                                    <div
                                        class="chart"
                                        use:chart={renderMixChart(
                                            $dailyUsageData.DailyUsage
                                                .DailyDetails,
                                            ["#044F8D"],
                                            "1410px",
                                            400,
                                            selectedMeter.Service,
                                            selectedMeter.UOF,
                                            null,
                                            tempData
                                        )}
                                    />
                                {:else if selectedMeter.DAP_dtoun == "x" || selectedMeter.DAP_dtouf == "x"}
                                    <!-- Daily usage OnPeak & OffPeak chart -->
                                    <div
                                        class="chart"
                                        use:chart={onPeakOffPeakChart(
                                            $dailyUsageData.DailyUsage
                                                .DailyDetails,
                                            selectedMeter.UOF
                                        )}
                                    />
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
                                            ${$dailyUsageData.DailyUsage
                                                .AVGCost}
                                        </h4>
                                    </div>
                                {/if}
                                {#if $dailyUsageData.DailyUsage.AVGTemp}
                                    <div>
                                        <h6>AVG. TEMP PER DAY</h6>
                                        <h4>
                                            {$dailyUsageData.DailyUsage
                                                .AVGTemp}°
                                        </h4>
                                    </div>
                                {/if}
                                {#if $dailyUsageData.DailyUsage.HitPeakDemand}
                                    <div>
                                        <h6>YOU HIT PEAK DEMAND</h6>
                                        <h4>
                                            {$dailyUsageData.DailyUsage
                                                .HitPeakDemand}
                                        </h4>
                                    </div>
                                {/if}
                            </div>
                            <!-- DisClaimer Footer -->
                            {#if (activeSection == "daily" && $dailyUsageData.DailyUsage && $dailyUsageData.DailyUsage.FooterDisclaimer) || (activeSection == "monthly" && $monthlyUsageData.MonthlyUsage && $monthlyUsageData.MonthlyUsage.FooterDisclaimer)}
                                <div class="diclimer">
                                    <span>
                                        {#if activeSection == "daily"}
                                            {@html $dailyUsageData.DailyUsage
                                                .FooterDisclaimer}
                                        {:else if activeSection == "monthly"}
                                            {@html $monthlyUsageData
                                                .MonthlyUsage.FooterDisclaimer}
                                        {/if}
                                    </span>
                                </div>
                            {/if}
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
        min-width: 95%;
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
    .tool-tip {
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
        width: 100%;
    }
    h4 {
        margin: 0;
        padding: 0;
    }
    .chart {
        width: 100%;
        // overflow-x: scroll;
    }
    .chart-unit {
        margin-left: 36px;
        font-style: normal;
        font-weight: 300;
        font-size: 12px;
        color: #005faa;
    }
    .search {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
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
        flex: none;
        order: 1;
        align-self: stretch;
        flex-grow: 0;
    }
    /*tabs*/
    #meter-tab-container {
        width: 100%;
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
            overflow-x: scroll;
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
</style>
