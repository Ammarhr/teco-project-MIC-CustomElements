<svelte:options tag={null}/>
<script>
  // @ts-nocheck

  //svg imports
  import culLine from "../../assets/Vector 550.svg";
  import groupVector from "../../assets/balance-summary-svgs.svg";
  // store
  import { fetchstore , SAPToken} from "../../js/store";
  //state
  export let token;
  var newElement;
  let color;

  //mocking data
  const [data, loading, error, get] = fetchstore(
    "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/AccountBalanceData.json",
    token,
    $SAPToken
  );


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
  <img src={groupVector} alt="" id="group" />
  {#if $data && $data.html_message}
    <img src={culLine} alt="" id="cul-line" />
    <div id="info-container" bind:this={newElement} />
    <div id="info-container2">
      <span id="label2">{$data.title}</span>
      <div id="total" style="color:{color};">
        <span id="coin">$</span>
        <span id="ammount">{$data.totalAmmount}</span>
        <span id="power">02</span>
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
    position: relative;
    width: 60%;
    height: 25.188rem;
    border-radius: 16px;
    flex: none;
    order: 0;
    flex-grow: 0;
    box-shadow: 0px 0px 10px rgba(34, 34, 34, 0.24);
    padding: 26px;
  }
  #group {
    width: 100%;
    position: absolute;
    left: 57px;
    bottom: 0;
    height: 100%;
    border-radius: 20px;
  }
  #cul-line {
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
    order: 0;
  }
  #info-container2 a {
    order: 3;
    cursor: pointer;
  }
  button {
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
    cursor: pointer;
  }
  #label2 {
    width: 166px;
    height: 30px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
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
    flex: none;
    order: 2;
    flex-grow: 0;
  }
  #due-date {
    width: 15rem;
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

  @media screen and (max-width: 480px) {
    #card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 90%;
    }
    #info-container2 {
      width: 100%;
    }
  }
</style>
