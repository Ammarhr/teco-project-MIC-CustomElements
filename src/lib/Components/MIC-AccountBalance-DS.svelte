<svelte:options tag="mic-accountbalance" />

<script>
  // @ts-nocheck

  //svg imports
  import vector550 from "../../assets/Vector 550.svg";
  import vector549 from "../../assets/Vector 549.svg";
  import vector1 from "../../assets/backgroundicons/Vector1.svg";
  import vector2 from "../../assets/backgroundicons/Vector2.svg";
  import vector3 from "../../assets/backgroundicons/Vector3.svg";
  import vector from "../../assets/backgroundicons/Vector.svg";

  //state
  export let item = { name: "Item" };
  export let token;

  import { fetchstore } from "../../js/store";

  //mocking data
  const [data, loading, error, get] = fetchstore(
    "../../../data/AccountBalanceData.json",
    token
  );
</script>

<div id="card">
  {#if $loading}
    Loading: {$loading}
  {:else if $error}
    Error: {$error}
  {:else}
    <img src={vector550} alt="" id="vector550" />
    <div id="info-container">
      <img src={vector1} alt="" id="v1" />
      <img src={vector2} alt="" id="v2" />
      <img src={vector3} alt="" id="v3" />
      <img src={vector} alt="" id="v" />
      <span id="label">Past Due</span>
      <span id="details"
        >Your bill is past due. You owe {$data.oweAmmount}.</span
      >
      <img src={vector549} alt="" id="vector549" />
      <span id="details2">
        Your previous bill of {$data.previousBill} is past due on Dec. {$data.pastDueDate}
      </span>
    </div>
    <div id="info-container2">
      <span id="label2">Total Amount Due</span>
      <div id="total">
        <span id="coin">$</span>
        <span id="ammount">{$data.totalAmmountDue}</span>
        <span id="power">02</span>
      </div>
      <p id="due-date">Due Date: {$data.pastDueDate}</p>
      <button>PAY NOW</button>
      <div id="icon">
        <div id="group" />
      </div>
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
  #v1 {
    position: absolute;
    left: 101.67%;
    right: -7.59%;
    top: 76.83%;
    bottom: -65.28%;
    border-radius: 20px;
  }
  #v2 {
    position: absolute;
    left: 173.67%;
    right: -1.59%;
    top: -39.17%;
    bottom: -75.28%;
    border-radius: 20px;
    height: 513px;
    rotate: 358deg;
  }
  #v3 {
    position: absolute;
    left: 201.67%;
    right: -1.59%;
    top: -37.17%;
    bottom: -75.28%;
    border-radius: 20px;
    height: 456px;
    rotate: 183deg;
  }
  #v {
    position: absolute;
    left: 59.67%;
    right: -7.59%;
    top: 76.83%;
    bottom: -65.28%;
    border-radius: 20px;
  }
  #card {
    position: relative;
    width: 46.875rem;
    height: 25.188rem;
    border-radius: 20px;
    flex: none;
    order: 0;
    flex-grow: 0;
    box-shadow: 0px 0px 10px rgba(34, 34, 34, 0.24);
    padding: 26px;
  }
  #vector550 {
    position: absolute;
    left: 50%;
    right: 50%;
    top: 11.66%;
    bottom: 11.91%;
  }
  #info-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 24px;
    position: absolute;
    width: 313px;
    height: 236px;
    left: 36px;
    top: 83px;
  }
  #label {
    width: 303px;
    height: 44px;
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 44px;
    color: #da1e28;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #details {
    width: 309px;
    height: 60px;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 30px;
    color: #000000;
    flex: none;
    order: 1;
    flex-grow: 0;
  }
  #details2 {
    width: 313px;
    height: 60px;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 30px;
    color: #000000;
    flex: none;
    order: 3;
    flex-grow: 0;
  }
  #info-container2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 24px;
    position: absolute;
    width: 279px;
    height: 280px;
    left: 441px;
    top: 61px;
  }
  #info-container2 button {
    padding: 10px 24px;
    gap: 10px;
    width: 137px;
    height: 50px;
    background: #005faa;
    border-radius: 6px;
    flex: none;
    order: 3;
    flex-grow: 0;

    color: #fff;
  }
  #label2 {
    width: 166px;
    height: 30px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    color: #005faa;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #total {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    width: 279px;
    height: 98px;
    flex: none;
    order: 1;
    flex-grow: 0;
  }
  #coin {
    width: 33px;
    height: 56px;
    font-style: normal;
    font-weight: 400;
    font-size: 52px;
    line-height: 56px;
    text-align: center;
    color: #005faa;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #ammount {
    width: 179px;
    height: 98px;
    font-style: normal;
    font-weight: 400;
    font-size: 82px;
    line-height: 98px;
    text-align: center;
    color: #005faa;
    flex: none;
    order: 1;
    flex-grow: 0;
  }
  #power {
    width: 68px;
    height: 56px;
    font-style: normal;
    font-weight: 400;
    font-size: 52px;
    line-height: 56px;
    text-align: center;
    color: #005faa;
    flex: none;
    order: 2;
    flex-grow: 0;
  }
  #due-date {
    width: 218px;
    height: 30px;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 30px;
    color: #005faa;
    flex: none;
    order: 2;
    flex-grow: 0;
  }
</style>
