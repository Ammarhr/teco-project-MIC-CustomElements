<svelte:options tag="mic-billingsummary" />

<script>
  // @ts-nocheck
  //svg imports
  import toggle from "../../assets/cr.svg";
  import breakdownToggle from "../../assets/breakdown-drop-icon.svg";
  import electricityIcon from "../../assets/Iconawesome-bolt.svg";
  import toolTip from "../../assets/tool-tip-icon.svg";
  // export let item = { name: "Item" };
  export let token;
  let billingData;
  let toggleArray = [];

  class BillingSummary {
    constructor(service) {
      this.isOpen = true;
      this.service = service;
    }
    toggleContainer(card, breakDown) {
      if (card) this.isOpen = !this.isOpen;
      if (breakDown) subIsOpen = !subIsOpen;
      svgId = "rotate-svg-" + this.isOpen;
    }
  }

  import { fetchstore } from "../../js/store";

  //mocking data
  const [data, loading, error, get] = fetchstore(
    "https://cdn.jsdelivr.net/gh/ammarhr/teco-project-MIC-CustomElements@main/data/ChargeDetails.json",
    token
  );
  $: if (token && !$data.services) {
    get(token);
  }
  ///////// acordion functionality

  import { slide } from "svelte/transition";
  let isOpen = false;
  let subIsOpen = true;
  let svgId = "rotate-svg-" + isOpen;

  const toggleContainer = (i) => {
    toggleArray[i] = !toggleArray[i];
    svgId = "rotate-svg-" + isOpen;
  };
  ////////////////////////

  $: if ($data && $data.services && token) {
    for (let i = 0; i > toggleArray.length; i++) {
      toggleArray.push(false);
      // arr.push(new BillingSummary({ service }));
    }
    billingData = $data.services;
    console.log("details", $data.services);
  }
  // $: if ($data && $data.services) {
  //   $data.services.map((item, i) => {
  //     console.log(item);
  //     item.sections[0].forEach(controls=>{
  //       // controls.forEach(breakdown=>{
  //       //   console.log(breakdown);

  //       // })
  //     })
  //   })
  // }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $loading && !token}
  Loading: {$loading}
{:else if $error}
  Error: {$error}
{:else if $data.services}
  <div class="billing-container">
    {#each $data.services as billService, i}
      <div class="card">
        <div id="bills-header">
          <h4 id="title">BILLING SUMMARY</h4>
          <img
            src={toggle}
            alt=""
            id={svgId}
            on:click={() => toggleContainer(i)}
            aria-expanded={isOpen}
          />
        </div>
        {#if toggleArray[i]}
          <h3 id="sectiontitle" transition:slide={{ duration: 300 }}>
            <span
              ><img src={electricityIcon} alt="" style="width: 15px;" /></span
            >
            {billService.title}
          </h3>
          <p id="comment">
            Service Period: {billService.servicePeriod}
          </p>
          <div id="content" transition:slide={{ duration: 300 }}>
            {#each billService.sections as section}
              <img src="" alt="{section.title} icon" />
              <p>{section.title}</p>
              {#if section.controls}
                {#each section.controls as control}
                  <div class="row-container">
                    <div class="row" id="daily-basic-service-charge">
                      <p class="first-label">
                        {control.label}
                        {#if control.tooltip}
                          <img src={toolTip} alt="" />
                        {/if}
                      </p>
                      <p class="sub-label">{control.description}</p>
                      <p class="value">{control.value}</p>
                    </div>
                    {#if control.breakdown}
                      <div
                        class="breakdown-header"
                        on:click={console.log("hide")}
                      >
                        <h6>View Breakdown</h6>
                        <img
                          src={breakdownToggle}
                          on:click={() => toggleContainer(false, true)}
                          id={svgId}
                          alt=""
                          aria-expanded={isOpen}
                        />
                      </div>
                      {#if subIsOpen}
                        <div
                          class="break-down"
                          transition:slide={{ duration: 300 }}
                        >
                          {#each control.breakdown as breakdown}
                            <div class="sub-container">
                              <h6 class="breakdown-label">{breakdown.label}</h6>
                              <h6 class="breakdown-description">
                                {breakdown.description}
                              </h6>
                              <h6 class="breakdown-values">
                                {breakdown.value}
                              </h6>
                            </div>
                          {/each}
                        </div>
                      {/if}
                      {#if control.isTotal}
                        <div
                          class="sub-row total-row"
                          id="electric-charges-subtotal"
                        >
                          <p class="first-label">{control.totalTitle}</p>
                          <p class="value">${control.totalValue}</p>
                        </div>
                      {/if}
                    {/if}
                  </div>
                {/each}
              {/if}
            {/each}
          </div>
          {#if billService.total}
            <div class="total">
              <h6 class="total-label">Total Current Charges</h6>
              <h6 class="total-value">${billService.total}</h6>
            </div>
          {/if}
        {/if}
      </div>
    {/each}
  </div>
{:else}
  <h5>failed in billing summaty</h5>
{/if}

<style scoped>
  @font-face {
    font-family: "Interstate";
    src: url("../../assets/fonts/Interstate.ttf") format("truetype");
  }
  * {
    font-family: "Interstate";
  }
  .billing-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 60%;
  }
  .breakdown-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
  }
  .breakdown-header h6 {
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
    display: flex;
    align-items: center;
    color: #005faa;
    flex: none;
    order: 0;
    flex-grow: 0;
    padding: 10px;
    margin: 0;
  }
  .break-down {
    padding: 16px 0px;
    gap: 16px;
    max-width: 100%;
    max-height: 242px;
    background: #f4f5f7;
    border-radius: 6px;
    flex: none;
    order: 1;
    flex-grow: 0;
  }
  .sub-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 15px;
  }
  .breakdown-label {
    font-family: "Interstate";
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 28px;
    color: #000000;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0;
  }
  .breakdown-description {
    font-family: "Interstate";
    font-style: italic;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #005faa;
    margin: 0;
  }
  .breakdown-values {
    font-family: "Interstate";
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 28px;
    text-align: right;
    color: #000000;
    margin: 0;
  }
  #bills-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    width: 100%;
    height: 40px;
    order: 0;
    flex-grow: 0;
  }
  /*-----------------------*/
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
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 16px;
    min-width: 90%;
    padding: 20px;
    margin-bottom: 5%;
  }
  .row-container {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(150, 150, 150, 0.3);
  }
  .row {
    /* margin-bottom: 10px;
    padding-bottom: 10px; */
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sub-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #title {
    height: 29px;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: #005faa;
    flex: none;
    order: 0;
    flex-grow: 0;
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
    color: #005faa;
    font-style: italic;
    font-weight: 400;
    margin: 0;
    font-weight: 300;
    font-size: 18px;
    line-height: 28px;
  }

  .total-row {
    font-weight: 500;
  }

  .first-label {
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    color: #000000;
    padding: 5px 0;
    margin: 0;
    text-align: left;
    width: 50%;
  }

  .value {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
  }
  #electric-charges-subtotal {
    margin-top: 10px;
    border-top: 2px solid #bbb;
  }
  #electric-charges-subtotal p {
    font-family: "Interstate";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #005faa;
  }
  .total {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 25px 30px;
    max-width: 710px;
    max-height: 92px;
    background: #005faa;
    border-radius: 6px;
    flex: none;
    order: 4;
    flex-grow: 0;
  }
  .total-label {
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: #ffffff;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0;
  }
  .total-value {
    font-family: "Interstate";
    font-style: normal;
    font-weight: 400;
    font-size: 35px;
    line-height: 42px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #ffffff;
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0;
  }
  @media screen and (max-width: 1000px) {
    .card {
      width: 90%;
    }
  }
</style>
