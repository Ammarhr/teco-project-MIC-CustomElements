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

<!-- <script>
  import toggle from "../../assets/Icon.svg";
  import electricityIcon from "../../assets/Iconawesome-bolt.svg";
</script>

<div id="summary-card">
  <div id="header">
    <h5>BILLING SUMMARY</h5>
    <img src={toggle} alt="" />
  </div>
  <div id="details">
    <span id="main-label">
      <img src={electricityIcon} alt="" />
      <h4>Electricity Charges</h4>
    </span>
    <span id="labels">
      <span id="sub-label-1">
        Service Period: Nov 25, 2021 - Dec 28, 2021
      </span>
      <span id="sub-label-2">
        <b>Rate Schedule: </b> General Service
      </span>
    </span>
    <div id="sub-details">
      <span id="label">
        <h6>Basic Service Charge</h6>
      </span>
      <span id="value"> 1,000 @ $0.05830/kWh </span>
      <span id="ammount"> $15.05 </span>
      <br>
      <hr>
      <div id="info-container">
        <span>
            <h5>
                Energy Charge
            </h5>
        </span>
        <span>
            <a href="#asd">View Breakdown</a>
        </span>
        <div id="dropdown">
            <ul>
                <li>
                    <span>First 1,000 kWh</span> 
                    <span>1,000 @ $0.05830/kWh</span>
                    <span>1,000 @ $0.05830/kWh</span>
                </li>
                <li><span></span></li>
            </ul>
        </div>
      </div>
    </div>
  </div>
  <div id="additional-info" />
  <div id="footer" />
</div>

<style>
  #summary-card {
    width: 770px;
    height: 1335px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px;
    gap: 10px;

    position: absolute;
    width: 770px;
    height: 1335px;
    left: 0px;
    top: 0px;

    /* Generic/White */

    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(34, 34, 34, 0.24);
    border-radius: 20px;
  }
  #header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 499px;

    width: 710px;
    height: 40px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #header h5 {
    width: 223px;
    height: 29px;

    /* H5/Interstate Regular */

    font-family: sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */

    display: flex;
    align-items: center;
    letter-spacing: -0.02em;

    /* Teco Primary Blue */

    color: #005faa;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #header img {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    padding: 15px;

    background: #ecf7ff;
    border-radius: 24px;

    flex: none;
    order: 1;
    flex-grow: 0;
  }
  #details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 20px;

    width: 710px;
    height: 822px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
  }
  #main-label {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 8px;

    width: 273.63px;
    height: 34px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #details span img {
    width: 18.63px;
    height: 28px;

    /* another Blue */

    /* Inside auto layout */

    flex: none;
    order: 2;
    flex-grow: 0;
  }
  #details span h4 {
    width: 247px;
    height: 34px;

    /* H4/Interstate Regular */

    font-family: sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
    line-height: 34px;
    /* identical to box height */

    display: flex;
    align-items: center;

    /* another Blue */

    color: #00294a;

    /* Inside auto layout */

    flex: none;
    order: 3;
    flex-grow: 0;
  }
  #labels {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    gap: 13px;

    width: 632px;
    height: 28px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
  }
  #sub-label-1 {
    width: 360px;
    height: 28px;

    /* Paragraph/Interstate Regular */

    font-family: sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    /* identical to box height, or 156% */

    display: flex;
    align-items: center;

    /* TECO Dark Gray */

    color: #6c6c6c;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #sub-label-2 {
    width: 260px;
    height: 28px;

    /* Paragraph/Interstate Regular */

    font-family: sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    /* identical to box height, or 156% */

    display: flex;
    align-items: center;

    /* TECO Dark Gray */

    color: #6c6c6c;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
  }
  #sub-details {
    position: relative;
    width: 710px;
    height: 51px;

    /* Inside auto layout */

    flex: none;
    order: 3;
    flex-grow: 0;
  }
  #label {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 4px;
    width: 220px;
    height: 30px;
  }
  #label h6 {
    width: 196px;
    height: 30px;

    /* H6/Interstate Regular */

    font-family: sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    /* identical to box height, or 150% */

    display: flex;
    align-items: center;

    /* TECO Black */

    color: #000000;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #value {
    position: absolute;
    left: 51.27%;
    right: 22.96%;
    top: 12.53%;
    bottom: 84.06%;

    font-family: sans-serif;
    font-style: italic;
    font-weight: 300;
    font-size: 18px;
    line-height: 28px;
    /* identical to box height, or 156% */

    display: flex;
    align-items: center;
    letter-spacing: -0.02em;

    /* Teco Primary Blue */

    color: #005faa;
  }
  #ammount {
    position: absolute;
    left: 91.13%;
    right: 0%;
    top: 12.41%;
    bottom: 83.94%;

    /* H6/Interstate Regular */

    font-family: sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    /* identical to box height, or 150% */

    display: flex;
    align-items: center;

    /* TECO Black */

    color: #000000;
  }
</style> -->
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
