<script>
    export let title1;
    export let title2;
    let tab1 = "1";
    let tab2 = "2";
    const activateTab = (num1, num2) => {
        tab2 = num2;
        tab1 = num1;
    };
</script>

<div id="insights-tab-container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div id="insights-tabs">
        <h6 id={"btn" + tab1} on:click={() => activateTab("1", "2")}>
            {title1}
        </h6>
        <h6 id={"btn" + tab2} on:click={() => activateTab("2", "1")}>
            {title2}
        </h6>
    </div>
    <div id={"tab1" + tab1}>
        <div class="chart-container">
            <slot name="annual-chart" />
            <slot name="annual-data" />
            <slot name="annual-temp" />
        </div>
    </div>
    <div id={"tab1" + tab2}>
        <div class="chart-container">
            <slot name="monthly-chart" />
            <slot name="monthly-data" />
            <slot name="monthly-temp" />
        </div>
    </div>
</div>

<style lang="scss">
    /*tabs*/
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
    }
</style>
