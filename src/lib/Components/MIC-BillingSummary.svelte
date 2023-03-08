<svelte:options tag="mic-billingsummary" />

<script>
  // @ts-nocheck
  //svg imports
  import toggle from "../../assets/cr.svg";
  import breakdownToggle from "../../assets/breakdown-drop-icon.svg";
  import electricityIcon from "../../assets/Iconawesome-bolt.svg";
  import toolTip from "../../assets/tool-tip-icon.svg";
  import {
    fetchstore,
    apiDomain,
    apiToken,
    eventsDomain,
    showToolTipDetails,
  } from "../../js/store";

  let toggleArray = [];

  //mocking data
  const [data, loading, error, get] = fetchstore();

  ///////// acordion functionality
  import { onMount } from "svelte";
  let isOpen = false;
  let styleToggleArr = [];
  let billsObjectsArray = [];

  ////////////////////////
  onMount(() => {
    if ($apiToken && $apiDomain && !$data.services) {
      get($apiToken, "../../data/BillingSummary.json");
    }
  });

  $: if (
    $data &&
    $data.services &&
    $data.services.length > 0 &&
    typeof toggleArray[0] !== "boolean"
  ) {
    console.log("data from billing:", $data);
    for (let i = 0; i < $data.services.length; i++) {
      toggleArray.push(true);
      let billObj = {
        subSectionArray: [],
        subToggleStyleArray: [],
        toolTipArray: [],
        toolTipStylleArray: [],
      };
      billsObjectsArray.push(billObj);
    }
  }

  const toggleContainer = (i) => {
    toggleArray[i] = !toggleArray[i];

    if (toggleArray[i]) {
      styleToggleArr[i] = "max-height: 200vh;opacity: 1;transition:200ms;";
    } else {
      styleToggleArr[i] =
        "opacity: 0;max-height: 0;margin: 0; transition:200ms;";
    }
    console.log(toggleArray);
  };

  const subSectionToggle = (j, i) => {
    if (typeof billsObjectsArray[i].subSectionArray[j] !== "boolean")
      billsObjectsArray[i].subSectionArray.push(false);

    billsObjectsArray[i].subSectionArray[j] =
      !billsObjectsArray[i].subSectionArray[j];
    if (!billsObjectsArray[i].subSectionArray[j]) {
      billsObjectsArray[i].subToggleStyleArray[j] =
        "max-height: 200vh;opacity: 1;transition:200ms; ";
    } else {
      billsObjectsArray[i].subToggleStyleArray[j] =
        "opacity: 0;max-height: 0;margin: 0; transition:200ms; ";
    }
  };

  const toolTipToggle = (j, i) => {
    if (typeof billsObjectsArray[i].toolTipArray[j] !== "boolean")
      billsObjectsArray[i].toolTipArray.push(false);

    billsObjectsArray[i].toolTipArray[j] =
      !billsObjectsArray[i].toolTipArray[j];
    if (billsObjectsArray[i].toolTipArray[j]) {
      billsObjectsArray[i].toolTipStylleArray[j] =
        "max-height: 200vh;opacity: 1;transition:200ms;";
    } else {
      billsObjectsArray[i].toolTipStylleArray[j] =
        "opacity: 0;max-height: 0;margin: 0; transition:200ms;";
    }
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $loading}
  Loading: {$loading}
{:else if $error}
  Error: {$error}
{:else if $data.services}
  <div class="billing-container">
    <div class="card">
      {#each $data.services as billService, i}
        <div
          id="bills-header"
          on:click={() => toggleContainer(i)}
          aria-expanded={isOpen}
        >
          <h4 id="title">BILLING SUMMARY</h4>
          <img src={toggle} alt="" id={"rotate-svg-" + !toggleArray[i]} />
        </div>
        <!-- {#if toggleArray[i]} -->
        <div style={styleToggleArr[i]} class="bill-content">
          <h3 id="sectiontitle">
            <span
              ><img src={electricityIcon} alt="" style="width: 15px;" /></span
            >
            {billService.Lable}
          </h3>
          {#if billService.servicePeriod}
            <p id="comment">
              Service Period: {billService.servicePeriod}
            </p>
          {/if}
          <div id="content">
            {#if billService.Section_Level1s}
              {#each billService.Section_Level1s as section}
              {console.log(section.ToolTip)}
                {#if section.SectionType == "Charge_Group"}
                  {#if section.Section_Level2s}
                    <div class="charges-container">
                      {#each section.Section_Level2s as level2Obj}
                        <!-- {section.SectionType} -->
                        {#if level2Obj.SectionType == "Charge"}
                          {#if level2Obj.Order == 1}
                            <p class={"level" + level2Obj.Order}>
                              {level2Obj.Value}
                              {#if section.ToolTip && section.ToolTip !== ""}
                                <div class="tooltip-icon">
                                  <img
                                    src={toolTip}
                                    alt=""
                                    on:pointerenter={() => toolTipToggle(j, i)}
                                  />
                                  <!-- {#if billsObjectsArray[i].toolTipStylleArray[j]}
                                <div
                                  class="tooltip-description"
                                  style={billsObjectsArray[i]
                                    .toolTipStylleArray[j]}
                                >
                                  Covers the costs of moving gas from its source
                                  to your premise, other than the cost of gas
                                  itself. <br />
                                  <a
                                    href="#"
                                    on:click={() => {
                                      showToolTipDetails.set(true);
                                    }}>UNDERSTANDING YOUR CHARGES</a
                                  >
                                </div>
                              {/if} -->
                                </div>
                              {/if}
                            </p>
                          {:else if level2Obj.Order == 2 || level2Obj.Order == 3}
                            <div class="row" id="daily-basic-service-charge">
                              <p class={"level2"}>
                                {level2Obj.Value}
                              </p>
                            </div>
                          {:else}
                            <p class={"level" + level2Obj.Order}>
                              {level2Obj.Value}
                            </p>
                          {/if}
                        {/if}
                      {/each}
                    </div>
                  {/if}
                {:else if section.SectionType == "SubTotal"}
                  <div class="sub-row total-row" id="electric-charges-subtotal">
                    <p class="first-label">{section.Lable}</p>
                    <p class="value">${section.Value}</p>
                  </div>
                {/if}
                <!-- <img src="" alt="{section.title} icon" />
              -->
                <!-- {#if section.controls}
                  {#each section.controls as control, j}
                    <div class="row-container">
                      <div class="row" id="daily-basic-service-charge">
                        <p class="sub-label">{control.description}</p>
                        <p class="value">{control.value}</p>
                      </div>
                      {#if control.breakdown}
                        <div
                          class="breakdown-header"
                          on:click={() => {
                            subSectionToggle(j, i);
                          }}
                        >
                          <h6>View Breakdown</h6>
                          <img
                            src={breakdownToggle}
                            alt=""
                            id={"rotate-svg-" +
                              billsObjectsArray[i].subSectionArray[j]}
                          />
                        </div>
                        <div
                          class="break-down"
                          style={billsObjectsArray[i].subToggleStyleArray[j]}
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
                {/if} -->
              {/each}
            {/if}
          </div>
          <!-- {#if billService.total}
            <div class="total">
              <h6 class="total-label">Total Current Charges</h6>
              <h6 class="total-value">${billService.total}</h6>
            </div>
          {/if} -->
          {#if i == $data.services.length - 1 && $data.total}
            <div class="total">
              <h6 class="total-label">{$data.total.Lable}</h6>
              <h6 class="total-value">{$data.total.Value}</h6>
            </div>
          {/if}
          {#if i < $data.services.length - 1}
            <hr />
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}

<style lang="scss">
  * {
    font-family: "Interstate";
  }
  .tooltip-icon {
    display: inline;
    position: relative;
    cursor: pointer;
  }
  .tooltip-description {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 125%;
    left: -156px;
    z-index: 1;
    width: 441px;
    border-radius: 6px;
    padding: 5px 0 32px 6px;
    margin-left: -60px;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    background: #cbe8ff;
    color: #000000;
    clip-path: polygon(
      50% 0%,
      100% 0,
      100% 35%,
      100% 86%,
      54% 86%,
      50% 100%,
      47% 85%,
      0 85%,
      0% 35%,
      0 0
    );
  }
  .bill-content {
    display: flex;
    flex-direction: column;
    row-gap: 26px;
    hr {
      height: 3px;
      background-color: #eaecee;
      border: none;
    }
  }
  .charges-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaecee;
    padding: 10px 0 10px 0;
  }
  .billing-container {
    display: flex;
    flex-direction: column;
    min-width: 60%;
  }
  .breakdown-header {
    cursor: pointer;
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
    padding: 10px;
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
    margin-bottom: 24px;
  }
  /*-----------------------*/
  #rotate-svg-false {
    cursor: pointer;
    transform: rotate(0turn);
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

  .level2 {
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

  .level1 {
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    color: #000000;
    padding: 5px 0;
    margin: 0;
  }

  .level4 {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    margin: 0;
  }
  #electric-charges-subtotal {
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
    max-height: 92px;
    background: #005faa;
    border-radius: 6px;
  }
  .total-label {
    display: flex;
    align-items: center;
    font-weight: 300;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.02em;
    color: #ffffff;
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
