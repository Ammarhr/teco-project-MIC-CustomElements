<svelte:options tag="mic-meterTable" />

<script>
    // @ts-nocheck
    import toggle from "../../assets/cr.svg";
    import toolTip from "../../assets/toolTip.svg";
    import verticalLine from "../../assets/vertical-line.svg";
    import { slide } from "svelte/transition";
    import { fetchstore } from "../../js/store";
    import { chart } from "svelte-apexcharts";
    import { renderMixChart } from "../../js/MIC-chart-bundle";

    export let token;
    let tableData;
    let options;
    let selectedMeter;
    const [data, loading, error, get] = fetchstore(
        "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/meterDataUsage.json",
        token
    );

    ///////// acordion functionality
    let isOpen = false;
    let svgId = "rotate-svg-" + isOpen;

    const toggleContainer = () => {
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
    //////// change the selected meter
    const handleSelectedMeter = (meterObject) => {
        selectedMeter = meterObject;
    };
    ////// search & filter
    const handleSearch = () => {
        // console.log("searching...");
        let str = event.target.value;
        let searchArray;
        if (str == "") {
            // console.log("nothing catched");

            items = $data.results;
            selectedMeter = $data.results[0];
        }
        searchArray = $data.results.filter((meter) => {
            return meter.meterTable.meterNumbeR.includes(str);
        });
        // console.log("searching...---> step1", searchArray);
        if (searchArray[0]) {
            items = searchArray;
            // console.log("searching...---> step2", items);
        }
    };
    ////// change the charts reference
    $: if (selectedMeter) {
        let { gas, tempereature, x } = selectedMeter.settings;
        options = renderMixChart(
            [gas, tempereature],
            x,
            ["#044F8D"],
            "1210px",
            650
        );
    }
    ///////// pagination:
    import { paginate, LightPaginationNav } from "svelte-paginate";
    let items;
    let currentPage = 1;
    let pageSize = 5;
    let paginatedItems;
    //////// first render
    $: if ($data && $data.results) {
        tableData = $data.results;
        selectedMeter = $data.results[0];
        items = $data.results;
    }
    $: if (items) {
        paginatedItems = paginate({ items, pageSize, currentPage });
    }
</script>

<!------ html ------->
{#if $loading}
    <h1>loading..</h1>
{:else if $error}
    <h1>{error}</h1>
{:else if $data}
    <div class="card">
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
            <div class="table-container" transition:slide={{ duration: 300 }}>
                {#if items[0]}
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
                            {#each Object.values(paginatedItems) as row}
                                <!-- {#each Object.values(tableData) as row} -->
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
                            <!-- {/each} -->
                            {#if $data.meterLocation}
                                <div id="location">
                                    <span
                                        ><strong> Meter Location:</strong>
                                        {$data.meterLocation}</span
                                    >
                                </div>
                            {/if}
                        </table>
                    {/if}
                {/if}
            </div>
            <div class="options">
                <LightPaginationNav
                    totalItems={items.length}
                    {pageSize}
                    {currentPage}
                    limit={1}
                    showStepOptions={true}
                    on:setPage={(e) => (currentPage = e.detail.page)}
                />
            </div>
            <div id="tab-container">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div id="tabs">
                    <h6
                        id={"btn" + tab1}
                        on:click={() => activateTab("1", "2")}
                    >
                        Daily
                    </h6>
                    <h6
                        id={"btn" + tab2}
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
                <div id={"tab1" + tab1}>
                    <div class="chart" use:chart={options} />
                </div>
                <div id={"tab1" + tab2}>
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
                    <h4>65??</h4>
                </div>
            </div>
        {/if}
    </div>
{:else}
    <h1>somthing went wrong</h1>
{/if}

<style>
    @font-face {
        font-family: "Interstate";
        src: url("../../assets/fonts/Interstate.ttf") format("truetype");
    }
    * {
        font-family: "Interstate";
    }
    #meter-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .card {
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
    #tab-container {
        width: 93%;
    }
    #tabs {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 2%;
        width: 100%;
    }

    #btn1 {
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
    #btn2 {
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
    #tab11 {
        display: none;
    }
    #tab12 {
        display: flex;
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
        .card {
            display: flex;
            flex-direction: column;
            row-gap: 2rem;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            transition: 0.3s;
            border-radius: 16px;
            width: 90%;
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
