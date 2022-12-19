<svelte:options tag="mic-meterTable" />

<script>
    // @ts-nocheck
    import toggle from "../../assets/cr.svg";
    import { slide } from "svelte/transition";
    import { fetchstore } from "../../js/store";

    export let token;

    const [data, loading, error, get] = fetchstore(
        "../../../data/meterDataUsageChartDataMonthly.json",
        token
    );

    ///////// acordion functionality
    let isOpen = false;
    let svgId = "rotate-svg-" + isOpen;

    const toggleContainer = () => {
        isOpen = !isOpen;
        svgId = "rotate-svg-" + isOpen;
    };
    ////////////////////////
    $: if ($data) {
        console.log("data", $data);
    }
</script>

<!------ html ------->
{#if $loading}
    <h1>loading..</h1>
{:else if $error}
    <h1>{error}</h1>
{:else if $data}
    <div class="card">
        <div id="meter-header">
            <h4 id="title">Usage Details</h4>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <img
                src={toggle}
                alt=""
                id={svgId}
                on:click={toggleContainer}
                aria-expanded={isOpen}
            />
        </div>
        {#if isOpen}
            <div class="table-container" transition:slide={{ duration: 300 }}>
                <table class="table">
                    <tr><th>Name</th><th>Email</th><th>Country</th></tr>
                    <tr class="table-row" data-href="http://tutorialsplane.com"
                        ><td>Jhohn</td><td>jhone@gmail.com</td><td>USA</td></tr
                    >
                    <tr class="table-row" data-href="http://tutorialsplane.com"
                        ><td>Kelly</td><td>kelly@gmail.com</td><td>USA</td></tr
                    >
                    <tr class="table-row" data-href="http://tutorialsplane.com"
                        ><td>Kamana</td><td>kamna@gmail.com</td><td>India</td
                        ></tr
                    >
                    <tr class="table-row" data-href="http://tutorialsplane.com"
                        ><td>Anay</td><td>anay@gmail.com</td><td>Canada</td></tr
                    >
                </table>
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
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        border-radius: 16px;
        min-width: 100%;
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
        order: 2;
        align-self: stretch;
        flex-grow: 0;
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
    tr {
        width: 45px;
        height: 22px;
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 22px;
        /* identical to box height */

        text-align: center;
        letter-spacing: -0.02em;

        /* TECO Black */

        color: #000000;

        /* Inside auto layout */

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
</style>
