<script>
    // @ts-nocheck

    import culLine from "../../assets/Vector 550.svg";
    import rowLine from "../../assets/Vector 549.svg";
    import groupVector from "../../assets/balance-summary-svgs.svg";

    //state
    export let token;

    // store
    import { fetchstore } from "../../js/store";

    //mocking data
    const [data, loading, error, get] = fetchstore(
        "../../../data/AccountBalanceData.json",
        token
    );

    var newElement;
    let color; // this change the charge color depend in the its value
    $: newElement = document.getElementById("info-container");

    $: if (newElement && $data && $data.html_message) {
        newElement.innerHTML = $data.html_message;
        if ($data.totalAmmount > 0) {
            color = $data.postive_color;
        } else {
            color = $data.negative_color;
        }
    }
</script>

<div id="card">
    <!-- <img src={groupVector} alt="" id="group" /> -->
    {#if $data && $data.html_message}
        <div id="info-container" bind:this={newElement} />
        <img src={culLine} alt="" id="cul-line" />
        <img src={rowLine} alt="" id="row-line" />
        <div id="info-container2">
            <span id="label2">{$data.title}</span>
            <div id="total" style="color:{color};">
                <sup id="coin">$</sup>
                <span id="ammount">{$data.totalAmmount}</span>
                <sup>02</sup>
            </div>
            <p id="due-date">Due Date: {$data.dueDate}</p>
            <a href={$data.pay_now_link} target="_blank" rel="noreferrer">
                <button>PAY NOW</button></a
            >
        </div>
    {/if}
</div>

<style>
    @font-face {
        font-family: "Interstate";
        src: url("../../assets/fonts/Interstate.ttf") format("truetype");
    }
    * {
        font-family: "Interstate";
    }
    #card {
        display: flex;
        flex: auto;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        height: fit-content;
        background-color: #ffff;
        gap: 1rem;
        width: 60%;
        border-radius: 16px;
        padding: 3rem 1rem;
        box-shadow: 0px 0px 10px rgb(34 34 34 / 24%);
    }
    #info-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 45%;
        height: 280px;
        gap: 24px;
    }
    #row-line {
        display: none;
    }
    #info-container2 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 48%;
        height: fit-content;
        gap: 22px;
    }
    #info-container2 a {
        order: 3;
        cursor: pointer;
    }
    button {
        padding: 10px 24px;
        gap: 10px;
        width: 197px;
        height: 50px;
        background: #005faa;
        border-radius: 6px;
        flex: none;
        order: 3;
        flex-grow: 0;
        color: #fff;
        cursor: pointer;
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
    }
    #label2 {
        width: 90%;
        height: 30px;
        font-style: normal;
        font-weight: 400;
        font-size: 1.5rem;
        line-height: 30px;
        color: #005faa;
        align-items: center;
        display: flex;
        flex-direction: column;
    }
    #total {
        font-size: 3rem;
    }
    #ammount {
        width: 90%;
        height: 98px;
        font-style: normal;
        font-weight: 400;
        font-size: 82px;
        line-height: 98px;
        text-align: center;
        flex: none;
        order: 1;
        flex-grow: 0;
    }
    #due-date {
        width: 15rem;
        height: 20px;
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 30px;
        color: #005faa;
        flex: none;
        order: 2;
        flex-grow: 0;
    }
    @media screen and (max-width: 1000px) {
        #card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 90%;
            height: fit-content;
            gap: 30px;
            padding: 20px 10px;
        }
        #cul-line {
            display: none;
        }
        #row-line {
            width: 90%;
            display: flex;
            order: 1;
        }
        #info-container {
            order: 2;
            gap: 5px;
            width: 100%;
            height: fit-content;
            gap: 10px;
        }
        #info-container2 {
            order: 0;
            gap: 5px;
            width: 100%;
            height: fit-content;
            gap: 10px;
        }
    }
</style>
