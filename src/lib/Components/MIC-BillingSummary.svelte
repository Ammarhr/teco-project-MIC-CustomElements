<script>
  //svg imports
  import toggle from "../../assets/Icon.svg";
  import electricityIcon from "../../assets/Iconawesome-bolt.svg";
  //state
  export let servicePeriod = "November 25, 2021 - December 28, 2022";
  export let dailyBasicServiceCharge = 36.38;
  export let billingDemandCharge = 387.2;
  export let peakDemandCharge = 91.12;
  export let energyCharge = { onPeak: 156.16, offPeak: 243.61 };
  export let fuelCharge = { onPeak: 437.98, offPeak: 1267.1 };
  export let capacityCharge = 7.92;
  export let stormProtectionCharge = 51.92;
  export let energyConservationCharge = 71.28;
  export let environmentalCostRecovery = 73.11;
  export let cleanEnergyTransitionMechanism = 96.8;
  export let electricChargesSubtotal = 3638.58;
</script>

<div class="card">
  <h4 id="title">BILLING SUMMARY</h4>
  <h3 id="sectiontitle">
    <span><img src={electricityIcon} alt="" style="width: 15px;" /></span> Electric
    Charges
  </h3>
  <p id="comment">Service Period: {servicePeriod}</p>
  <div id="content">
    <div class="row" id="daily-basic-service-charge">
      <p class="first-label">Daily Basic Service Charge</p>
      <p class="sub-label">26 days @ $1.07000</p>
      <p class="value">${dailyBasicServiceCharge}</p>
    </div>
    <div class="row" id="billing-demand-charge">
      <p class="first-label">Billing Demand Charge</p>
      <p class="sub-label">88 kW @ 4.40000/kW</p>
      <p class="value">${billingDemandCharge}</p>
    </div>
    <div class="row" id="peak-demand-charge">
      <p class="first-label">Peak Demand Charge</p>
      <p class="sub-label">88 kW @ 8.990000/kW</p>
      <p class="value">$7{peakDemandCharge}</p>
    </div>
    <div class="multi-row" id="EnergyCharge">
      <h5 class="bold-label">Energy Charge</h5>
      <div class="sub-row" id="energy-charge-on-peak">
        <p class="first-label">On Peak</p>
        <p class="sub-label">13,200 kWh @ $0.01183/kWh</p>
        <p class="value">${energyCharge.onPeak}</p>
      </div>
      <div class="sub-row" id="energy-charge-off-peak">
        <p class="first-label">Off Peak</p>
        <p class="sub-label">43,040 kWh @ $0.00566/kWh</p>
        <p class="value">${energyCharge.offPeak}</p>
      </div>
    </div>
    <div class="multi-row" id="FuelCharge">
      <h5 class="bold-label">Fuel Charge</h5>
      <div class="sub-row" id="fuel-charge-on-peak">
        <p class="first-label">On Peak</p>
        <p class="sub-label">13,200 kWh @ $0.03318/kWh</p>
        <p class="value">${fuelCharge.onPeak}</p>
      </div>
      <div class="sub-row" id="fuel-charge-off-peak">
        <p class="first-label">Off Peak</p>
        <p class="sub-label">43,040 kWh @ $0.02944/kWh</p>
        <p class="value">${fuelCharge.offPeak}</p>
      </div>
    </div>
    <div class="row" id="capacity-charge">
      <p class="first-label">Capacity Charge</p>
      <p class="sub-label">88 kW @ $0.09000/kW</p>
      <p class="value">${capacityCharge}</p>
    </div>
    <div class="row" id="storm-protection-charge">
      <p class="first-label">Storm Protection Charge</p>
      <p class="sub-label">88 kW @ $0.74000</p>
      <p class="value">${stormProtectionCharge}</p>
    </div>
    <div class="row" id="energy-conservation-charge">
      <p class="first-label">Energy Conservation Charge</p>
      <p class="sub-label">88 kW @ $0.74000</p>
      <p class="value">${energyConservationCharge}</p>
    </div>
    <div class="row" id="environmental-cost-recovery">
      <p class="first-label">Environmental Cost Recovery</p>
      <p class="sub-label">56,240 kWh @ $0.00130/kWh</p>
      <p class="value">${environmentalCostRecovery}</p>
    </div>
    <div class="sub-row" id="clean-energy-transition-mechanism">
      <p class="first-label">Clean Energy Transition Mechanism</p>
      <p class="sub-label">88 kW @ $0.74000</p>
      <p class="value">${cleanEnergyTransitionMechanism}</p>
    </div>
  </div>
  <hr />
  <div class="sub-row total-row" id="electric-charges-subtotal">
    <p class="first-label">Electric Charges Subtotal</p>
    <p class="value">${electricChargesSubtotal}</p>
  </div>
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
