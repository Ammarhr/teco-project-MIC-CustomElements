<script>
    let tab1 = "1";
    let tab2 = "2";
    const activateTab = (num1, num2) => {
        tab2 = num2;
        tab1 = num1;
    };
</script>

<div id="tab-container">
    <div id="tabs">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <h6 id={"btn" + tab1} on:click={() => activateTab("1", "2")}>Daily</h6>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <h6 id={"btn" + tab2} on:click={() => activateTab("2", "1")}>
            Monthly
        </h6>
    </div>
    <div id={"tab1" + tab1}>
        <h1>tab1</h1>
    </div>
    <div id={"tab1" + tab2}>
        <h1>tab2</h1>
    </div>
</div>

<style>
    #tab-container {
        width: 80%;
    }
    #tabs {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 2%;
        width: 100%;
    }

    #btn1{
        font-family: "Interstate";
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
        border-bottom: solid #005FAA;
    }
    #btn2{
        font-family: "Interstate";
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
</style>
