<svelte:options tag="mic-billingsummary" />

<script>
  // @ts-nocheck

  //svg imports
  import toggle from "../../assets/Icon.svg";
  import electricityIcon from "../../assets/Iconawesome-bolt.svg";
  //state
  export let servicePeriod = "November 25, 2021 - December 28, 2022";
  // export let dailyBasicServiceCharge = 36.38;
  // export let billingDemandCharge = 387.2;
  // export let peakDemandCharge = 91.12;
  // export let energyCharge = { onPeak: 156.16, offPeak: 243.61 };
  // export let fuelCharge = { onPeak: 437.98, offPeak: 1267.1 };
  // export let capacityCharge = 7.92;
  // export let stormProtectionCharge = 51.92;
  // export let energyConservationCharge = 71.28;
  // export let environmentalCostRecovery = 73.11;
  // export let cleanEnergyTransitionMechanism = 96.8;
  export let electricChargesSubtotal = 3638.58;
  export let item = { name: "Item" };
  export let token;
  let keys;
  let billingData;

  import { fetchstore } from "../../js/store";

  //mocking data
  const [data, loading, error, get] = fetchstore(
    "../../../data/BillingSummary.json",
    token
  );
  const getPropertyTitle = (str)=>{
    return str.split(/(?=[A-Z])/).join(" ").charAt(0).toUpperCase() + str.split(/(?=[A-Z])/).join(" ").slice(1)
  }
  $: if ($data && $data.electricityCharges) {
    billingData = $data.electricityCharges.billSummary;
    keys = Object.keys(billingData);
  }
</script>

<div class="card">
  {#if $loading}
    Loading: {$loading}
  {:else if $error}
    Error: {$error}
  {:else}
    <h4 id="title">BILLING SUMMARY</h4>
    <h3 id="sectiontitle">
      <span><img src={electricityIcon} alt="" style="width: 15px;" /></span> {$data.electricityCharges.BillsTitle}
    </h3>
    <p id="comment">Service Period: {$data.electricityCharges.servicePeriod}</p>
    <div id="content">
      {#each keys as value, i}
        {#if value != "energyCharge" && value != "fuelCharge"}
          <div class="row" id="daily-basic-service-charge">
            <p class="first-label">{getPropertyTitle(value)}</p>
            <p class="sub-label">{billingData[value].consumption}</p>
            <p class="value">${billingData[value].cost}</p>
          </div>
        {:else}
          <div class="multi-row" id="EnergyCharge">
            <h5 class="bold-label">{getPropertyTitle(value)}</h5>
            <div class="sub-row" id="energy-charge-on-peak">
              <p class="first-label">On Peak</p>
              <p class="sub-label">{billingData[value].onPeak.consumption}</p>
              <p class="value">${billingData[value].onPeak.cost}</p>
            </div>
            <div class="sub-row" id="energy-charge-off-peak">
              <p class="first-label">Off Peak</p>
              <p class="sub-label">{billingData[value].onPeak.consumption}</p>
              <p class="value">${billingData[value].offPeak.cost}</p>
            </div>
          </div>
        {/if}
      {/each}
    </div>
    <div class="sub-row total-row" id="electric-charges-subtotal">
      <p class="first-label">Electric Charges Subtotal</p>
      <p class="value">${electricChargesSubtotal}</p>
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

  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 5px;
    min-width: 60%;
    padding: 20px;
  }

  .row {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(150, 150, 150, 0.3);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .multi-row {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(150, 150, 150, 0.3);
    display: flex;
    flex-direction: column;
  }

  .sub-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #title {
    margin: 0 0 15px 0;
    color: #1f5da6;
    font-weight: 500;
  }

  #sectiontitle {
    margin: 3px 0;
    color: #06182d;
    font-weight: 500;
    font-size: x-large;
  }

  #comment {
    color: rgba(128, 128, 128, 0.7);
    text-decoration: none;
    margin: 10px 0;
    font-weight: 500;
    font-size: 12px;
  }

  .sub-label {
    font-weight: 400;
    padding: 5px 15px;
    margin: 0;
    text-align: left;
    color: #005faa;
    width: 38%;
    font-style: italic;
  }

  .bold-label {
    color: #4b4b4b;
    font-weight: 500;
    padding: 5px 0;
    margin: 0;
    font-size: 17px;
    text-align: left;
    width: 100%;
  }

  .total-row {
    font-weight: 500;
  }

  .first-label {
    color: #4b4b4b;
    padding: 5px 0;
    margin: 0;
    text-align: left;
    width: 50%;
  }

  /* .sub-label span {
    color: #a7a7a7;
    font-weight: 500;
  } */

  .value {
    padding: 5px 15px;
    margin: 0;
    font-size: 16px;
    width: 15%;
    text-align: right;
  }
</style>
