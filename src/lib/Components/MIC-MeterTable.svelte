<svelte:options tag="mic-metertable" />

<script>
    // @ts-nocheck
    import toggle from "../../assets/cr.svg";
    import toolTip from "../../assets/toolTip.svg";
    import verticalLine from "../../assets/vertical-line.svg";
    import { slide } from "svelte/transition";
    import { fetchstore, apiDomain, apiToken } from "../../js/store";
    import { chart } from "svelte-apexcharts";
    import { renderMixChart } from "../../js/MIC-chart-bundle";
    import { onMount } from "svelte";

    let tableData;
    let options;
    let selectedMeter;
    const [data, loading, error, get] = fetchstore();

    // acordion functionality
    let isOpen = true;
    let svgId = "rotate-svg-" + isOpen;

    const toggleContainer = () => {
        isOpen = !isOpen;
        svgId = "rotate-svg-" + isOpen;
    };

    //////// change the selected meter + call Dap Api
    const handleSelectedMeter = (meterObject) => {
        if (meterObject) {
            selectedMeter = meterObject;
        } else {
            selectedMeter = pagenateItems[0];
        }
    };
    ////// search & filter
    const handleSearch = () => {
        let str = event.target.value;
        let searchArray;
        if (str == "") {
            items = $data.results;
            selectedMeter = $data.results[0];
        }
        searchArray = $data.results.filter((meter) => {
            return meter.meterTable.meterNumbeR.includes(str);
        });
        if (searchArray[0]) {
            items = searchArray;
        }
    };
    ////// change the charts reference
    $: if (selectedMeter) {
        let { gas, tempereature, x } = selectedMeter.settings;
        options = renderMixChart(
            [gas, tempereature],
            x,
            ["#044F8D"],
            "100%",
            650
        );
    }
    ///////// pagination:
    let items;
    //////// first render
    onMount(() => {
        if ($apiToken && $apiDomain && !$data.results) {
            get($apiToken, "../../data/meterDataUsage.json");
        }
    });

    $: if ($data && $data.results) {
        tableData = $data.results;
        selectedMeter = $data.results[0];
        items = $data.results;
        getPaginatedItems();
    }
    ////////// tabs functionality
    let tab1 = "1";
    let tab2 = "2";
    const activateTab = (num1, num2) => {
        tab2 = num2;
        tab1 = num1;
    };

    ////////////////////////////
    // export let items = []; // array of items to paginate
    export let pageSize = 5; // number of items per page
    let pagenateItems = [];
    let currentPage = 0;

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
        console.log("grommemteete :", items.slice(startIndex, endIndex));
        pagenateItems = items.slice(startIndex, endIndex);
        handleSelectedMeter()
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
</script>

<!------ html ------->
{#if $loading}
    <h1>loading..</h1>
{:else if $error}
    <h1>{error}</h1>
{:else if $data && pagenateItems && pagenateItems.length > 0}
    {#key $apiToken}
        <div class="meter-card">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                id="meter-header"
                on:click={toggleContainer}
                aria-expanded={isOpen}
            >
                <h4 id="title">Usage Details</h4>
                <img src={toggle} alt="" id={svgId} />
            </div>
            {#if isOpen}
                <div class="search">
                    <input
                        type="text"
                        placeholder="Search"
                        on:change={handleSearch}
                    />
                </div>
                <div
                    class="table-container"
                    transition:slide={{ duration: 300 }}
                >
                    {#if items}
                        {#if tableData}
                            <table class="table">
                                <tr>
                                    <th>Service</th>
                                    <th>Meter Number</th>
                                    <th>Read Date</th>
                                    <th>Biling Read</th>
                                    <th>Current Reading</th>
                                    <th>Previous Reading</th>
                                    <th>Total Used</th>
                                </tr>
                                {#each pagenateItems as row}
                                    <tr
                                        class="table-row"
                                        on:click={() => {
                                            handleSelectedMeter(row);
                                        }}
                                    >
                                        {#each Object.values(row.meterTable) as value}
                                            <td>{value}</td>
                                        {/each}
                                    </tr>
                                {/each}
                                {#if $data.meterLocation}
                                    <div id="location">
                                        <span
                                            ><strong> Meter Location:</strong>
                                            {$data.meterLocation}</span
                                        >
                                    </div>
                                {/if}
                            </table>
                            <div>
                                <p>
                                    Page {getCurrentPage()} of {getTotalPages()}
                                </p>
                                <button
                                    on:click={prevPage}
                                    disabled={currentPage === 0}
                                >
                                    Previous
                                </button>

                                {#each getPagesToShow() as pageIndex}
                                    <button
                                        on:click={() => goToPage(pageIndex)}
                                        class:selected={pageIndex ===
                                            currentPage}
                                    >
                                        {pageIndex + 1}
                                    </button>
                                {/each}

                                <button
                                    on:click={nextPage}
                                    disabled={currentPage ===
                                        getTotalPages() - 1}
                                >
                                    Next
                                </button>
                            </div>
                        {/if}
                    {/if}
                </div>
                <div class="options" />
                <div
                    id="meter-tab-container"
                    transition:slide={{ duration: 300 }}
                >
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div id="meter-tabs">
                        <h6
                            id={"meter-btn" + tab1}
                            on:click={() => activateTab("1", "2")}
                        >
                            Daily
                        </h6>
                        <h6
                            id={"meter-btn" + tab2}
                            on:click={() => activateTab("2", "1")}
                        >
                            Monthly
                        </h6>
                    </div>
                    <div class="options">
                        <input type="checkbox" name="trmprature" id="temp" />
                        <span>Temperature</span>
                        <img
                            src={toolTip}
                            alt="usage chart tool tip"
                            class="tool-tip"
                        />
                    </div>
                    <div id={"meter-tab1" + tab1}>
                        {#if selectedMeter.settings.gas.data.length == 0}
                            <h1 class="no-data">No Data to display</h1>
                        {/if}
                        <div class="chart" use:chart={options} />
                    </div>
                    <div id={"meter-tab1" + tab2}>
                        {#if selectedMeter.settings.gas.data.length == 0 && selectedMeter.settings.tempereature.data.length == 0}
                            <h1 class="no-data">No Data to display</h1>
                        {/if}
                        <div class="chart" use:chart={options} />
                    </div>
                </div>
                <div class="information-box">
                    <div>
                        <h6>AVG. COST PER DAY</h6>
                        <h4>$11,098.98</h4>
                    </div>
                    <img src={verticalLine} alt="" />
                    <div>
                        <h6>AVG. TEMP PER DAY</h6>
                        <h4>65°</h4>
                    </div>
                </div>
            {/if}
        </div>
    {/key}
{/if}

<style lang="scss">
    * {
        font-family: "Interstate";
    }
    .no-data {
        position: absolute;
        left: 41.24%;
        right: 37.43%;
        top: 42.91%;
        bottom: 45.6%;
        font-weight: 300;
        font-size: 32px;
        line-height: 38px;
        letter-spacing: -0.02em;
        color: #6c6c6c;
        z-index: 1;
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
        row-gap: 2rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        border-radius: 16px;
        min-width: 95%;
        padding: 20px;
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
        transform: rotate(0.25turn);
        transition: transform 0.2s ease-in;
    }
    #rotate-svg-true {
        cursor: pointer;
        transition: transform 0.2s ease-in;
        transform: rotate(0.5turn);
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
    }
    table {
        border-collapse: collapse;
        border: 1px solid rgb(0, 0, 0, 0.2);
        min-width: 100%;
        margin: 10px auto 20px auto;
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
        border-radius: 6px 0px 0px 0px;
        flex: none;
        order: 0;
        flex-grow: 0;
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
        background-color: #e8e8e8;
    }

    td {
        border: 1px solid rgba(194, 194, 194, 0.749);
        transition: background-color 0.4s;
    }

    td:hover {
        background-color: lightgrey;
    }

    .chart {
        width: 100%;
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
        width: 93%;
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
        font-weight: 300;
        font-size: 20px;
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
    #meter-btn2 {
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 30px;
        display: flex;
        align-items: center;
        color: #6c6c6c;
        flex: none;
        order: 1;
        flex-grow: 0;
        cursor: pointer;
    }
    #meter-tab11 {
        display: none;
    }
    #meter-tab12 {
        display: flex;
        position: relative;
    }
    /*--------*/
    .information-box {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 16px;
        gap: 16px;
        max-width: 500px;
        height: 97px;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        flex: none;
        order: 0;
        flex-grow: 0;
    }

    .information-box div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        gap: 8px;
        max-width: 300px;
        height: 65px;
        flex: none;
        order: 0;
        flex-grow: 0;
    }
    .information-box div h6 {
        display: inline-block;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: -0.02em;
        color: #6c6c6c;
        margin: 0;
    }
    .information-box div h4 {
        display: inline-block;
        font-style: normal;
        font-weight: 300;
        font-size: 32px;
        line-height: 38px;
        color: #000000;
        margin: 0;
    }
    @media screen and (max-width: 1000px) {
        .mwter-card {
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
        #tab12 {
            display: flex;
            overflow-x: auto;
        }
    }
</style>
