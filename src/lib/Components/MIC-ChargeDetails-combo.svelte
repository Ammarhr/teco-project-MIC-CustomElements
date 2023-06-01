<svelte:options tag="mic-billingsummary-combo" />

<script>
  // @ts-nocheck
  //svg imports

  import {
    fetchstore,
    apiDomain,
    apiToken,
    fetchAndRedirect,
    persona,
    billNumber,
    latestBill,
  } from "../../js/store";
  import { onMount } from "svelte";
  import MicToolTip from "./MIC-ToolTip.svelte";

  //store fetch data
  const [data, loading, error, get] = fetchstore();

  onMount(() => {
    // trigger the size of the screen:
    screentTrigger();
  });
  ///////// acordion functionality
  let isOpen = false;
  let styleToggleArr = [];
  let billsObjectsArray = [];
  let toggleArray = [];
  export let charges;
  export let invoicetotal;
  ////////////////////////

  $: if (charges && charges.length > 0 && typeof toggleArray[0] !== "boolean") {
    for (let i = 0; i < charges.length; i++) {
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
      styleToggleArr[i] = "opacity: 1;transition:200ms;";
    } else {
      styleToggleArr[i] =
        "opacity: 0;max-height: 0;margin: 0; transition:200ms; display:none";
    }
  };

  let componentContainer;
  let toolTipSvg;
  let toolTipCon;
  $: componentContainer = document.querySelector(".billing-container");
  $: toolTipSvg = document.querySelector(".tooltip-svg");
  $: toolTipCon = document.querySelector(".tooltip-con");

  let chargesClass = "";
  $: if ($billNumber == $latestBill) {
    chargesClass = "";
  } else {
    chargesClass = "gray";
  }

  let mobileScreen = false;

  function screentTrigger() {
    let screenSize = window.innerWidth;
    if (screenSize <= 480) {
      mobileScreen = true;
    } else {
      mobileScreen = false;
    }
  }
  window.addEventListener("resize", screentTrigger);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->
{#if $loading}
  <mic-loading />
{:else if charges && toggleArray && billsObjectsArray}
  <div class="billing-container">
    {#each charges as billService, i}
      {#if billService.SectionType == "Service" || billService.SectionType == "AccountLevel"}
        <div class="card" bind:this={componentContainer}>
          {#if billService.Collapsible == false || !billService.Collapsible}
            <div
              id="bills-header"
              on:click={() => toggleContainer(i)}
              aria-expanded={isOpen}
            >
              <h4 id="title">BILLING SUMMARY</h4>
              <img
                src={`https://tecocdn.azureedge.net/ibill/iBill-assets/toggle.svg`}
                alt=""
                id={"rotate-svg-" + !toggleArray[i]}
              />
            </div>
          {/if}
          <div style={styleToggleArr[i]} class="bill-content {chargesClass}">
            <span>
              <h3
                id="sectiontitle"
                style="color:{billService.Color}; font-size:{mobileScreen ==
                  true && billService.MobileFontSize
                  ? billService.MobileFontSize
                  : billService.FontSize}px; font-weight:{billService.FontWeight}; display:flex;  justify-content:flex-start; flex-direction:row; align-items:center; gap:6px;"
              >
                {#if billService.IconPath}
                  <img
                    src={`https://tecocdn.azureedge.net/ibill/iBill-assets/${billService.IconPath}`}
                    alt=""
                  />
                {/if}
                {billService.Lable}
              </h3>
            </span>
            {#if billService.servicePeriod}
              <p id="comment">
                Service Period: {billService.servicePeriod}
              </p>
            {/if}
            <div id="content">
              {#if billService.Section_Level1}
                {#each billService.Section_Level1 as section, j}
                  {#if section.SectionType == "ServiceHeaderGroup"}
                    <div class="headers-con">
                      <div class="sub-headers">
                        {#each section.Section_Level2 as level2Obj}
                          {#if level2Obj.Order < 5}
                            <p
                              style="font-size:{mobileScreen == true &&
                              level2Obj.MobileFontSize
                                ? level2Obj.MobileFontSize
                                : level2Obj.FontSize}px; color:{level2Obj.Color}; font-weight:{level2Obj.FontWeight}"
                            >
                              {level2Obj.Value}
                            </p>
                          {/if}
                        {/each}
                      </div>
                      <div class="sub-headers">
                        {#each section.Section_Level2 as level2Obj}
                          {#if level2Obj.Order >= 5}
                            <p
                              style="font-size:{mobileScreen == true &&
                              level2Obj.MobileFontSize
                                ? level2Obj.MobileFontSize
                                : level2Obj.FontSize}px; color:{level2Obj.Color}; font-weight:{level2Obj.FontWeight}"
                            >
                              {level2Obj.Value}
                            </p>
                          {/if}
                        {/each}
                      </div>
                    </div>
                  {:else if section.SectionType == "Charge_Group"}
                    <!-- BreakDown sections -->
                    {#if section.Section_Level2 && section.Section_Level2[0] && section.Section_Level2[0].IsBreakdown == true}
                      {#if billsObjectsArray[i]}
                        <div
                          class="charges-container break-down"
                          style={billsObjectsArray[i].subToggleStyleArray[j]}
                        >
                          {#each section.Section_Level2 as level2Obj, l}
                            {#if level2Obj.SectionType == "Charge"}
                              {#if level2Obj.Order == 1}
                                <div class="{'level' + level2Obj.Order} ">
                                  <p
                                    style="display: flex; flex-direction:row; gap:10px; font-size:{mobileScreen ==
                                      true && level2Obj.MobileFontSize
                                      ? level2Obj.MobileFontSize
                                      : level2Obj.FontSize}px; color:{level2Obj.Color}; font-weight:{level2Obj.FontWeight};"
                                  >
                                    {level2Obj.Value}
                                  </p>
                                  {#if level2Obj.ToolTip && level2Obj.ToolTip !== ""}
                                    <div
                                      class="tooltip-icon"
                                      bind:this={toolTipCon}
                                    />
                                  {/if}
                                </div>
                              {:else if level2Obj.Order == 2 || level2Obj.Order == 3}
                                <span
                                  class={"level" + level2Obj.Order}
                                  style="font-size:{mobileScreen == true &&
                                  level2Obj.MobileFontSize
                                    ? level2Obj.MobileFontSize
                                    : level2Obj.FontSize}px; color:{level2Obj.Color}; font-weight:{level2Obj.FontWeight};"
                                >
                                  {level2Obj.Value}
                                </span>
                              {:else}
                                <p class={"level" + level2Obj.Order}>
                                  {level2Obj.Value}
                                </p>
                              {/if}
                              <!-- {console.log(section.Section_Level2.length,"length",l)} -->
                              {#if section.Section_Level2 && section.Section_Level2.length < 3 && l == section.Section_Level2.length - 1}
                                <p class={"level4"} />
                              {/if}
                            {/if}
                          {/each}
                        </div>
                      {/if}
                      <!-- General Charges -->
                    {:else if section.Section_Level2 && section.Section_Level2[0] && section.Section_Level2[0].IsBreakdown == false}
                      {#if section.Section_Level2}
                        {#if section.Lable && section.Lable != ""}
                          <div class="sub-title">
                            <div
                              class="sub-sec-header"
                              style="display: flex; flex-direction:row; gap:10px; font-size:{mobileScreen ==
                                true && section.MobileFontSize
                                ? section.MobileFontSize
                                : section.FontSize}px; color:{section.Color}"
                            >
                              {#if section.IconPath && section.IconPath != ""}
                                <img
                                  src={`https://tecocdn.azureedge.net/ibill/iBill-assets/${section.IconPath}`}
                                  alt=""
                                />
                              {/if}
                              <h4
                                style="font-size:{mobileScreen == true &&
                                section.MobileFontSize
                                  ? section.MobileFontSize
                                  : section.FontSize}px"
                              >
                                {section.Lable}
                              </h4>
                            </div>
                          </div>
                        {/if}
                        {#each section.Section_Level2 as level2Obj, o}
                          {#if level2Obj.Section_Level3}
                            <div class="charges-container">
                              {#each level2Obj.Section_Level3 as level3Obj, p}
                                {#if level3Obj.SectionType == "Charge"}
                                  {#if level3Obj.Order == 1}
                                    <div class={"level" + level3Obj.Order}>
                                      <p
                                        style="font-size:{mobileScreen ==
                                          true && level3Obj.MobileFontSize
                                          ? level3Obj.MobileFontSize
                                          : level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight}"
                                      >
                                        {level3Obj.Value}
                                      </p>
                                      {#if level3Obj.ToolTip && level3Obj.ToolTip != ""}
                                        <mic-tooltip
                                          chargeline={level3Obj.Value}
                                          tooltipurl={billService.URL != ""
                                            ? billService.URL
                                            : ""}
                                          tooltipdis={level3Obj.ToolTip}
                                        />
                                        <!-- <MicToolTip
                                          tooltipurl={billService.URL!=""?billService.URL : ""}
                                          tooltipdis={level3Obj.ToolTip}
                                        /> -->
                                      {/if}
                                    </div>
                                  {:else if level3Obj.Order == 2 || level3Obj.Order == 3}
                                    <span
                                      class={"level" + level3Obj.Order}
                                      style="font-size:{mobileScreen == true &&
                                      level3Obj.MobileFontSize
                                        ? level3Obj.MobileFontSize
                                        : level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight};"
                                    >
                                      {level3Obj.Value}
                                    </span>
                                  {:else}
                                    <p class={"level" + level3Obj.Order}>
                                      {level3Obj.Value}
                                    </p>
                                  {/if}
                                {:else if level2Obj.SectionType == "CombinedGroup"}
                                  {#if level3Obj.Order == 1}
                                    <p
                                      class="service-for{level3Obj.Order} level1"
                                      style="font-size:{mobileScreen == true &&
                                      level3Obj.MobileFontSize
                                        ? level3Obj.MobileFontSize
                                        : level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight}"
                                    >
                                      {level3Obj.Lable}
                                    </p>
                                  {:else if level3Obj.Order == 2}
                                    <p
                                      class="service-for{level3Obj.Order} level2"
                                      style="font-size:{mobileScreen == true &&
                                      level3Obj.MobileFontSize
                                        ? level3Obj.MobileFontSize
                                        : level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight}"
                                    >
                                      {level3Obj.Value}
                                    </p>
                                  {/if}
                                {/if}
                              {/each}
                            </div>
                          {/if}
                        {/each}

                        <div class="charges-container">
                          {#each section.Section_Level2 as level2Obj, l}
                            {#if level2Obj.SectionType == "Charge"}
                              {#if level2Obj.Order == 1}
                                <div class={"level" + level2Obj.Order}>
                                  {#if level2Obj.Value && level2Obj.Value[0] == " "}
                                    <p
                                      style="padding-left: 16px; margin:0; display:block;font-size:{mobileScreen ==
                                        true && level2Obj.MobileFontSize
                                        ? level2Obj.MobileFontSize
                                        : level2Obj.FontSize}px; font-weight:{level2Obj.FontWeight}; color:{level2Obj.Color};"
                                    >
                                      {level2Obj.Value.trim()}
                                    </p>
                                  {:else}
                                    <p
                                      style="font-size:{mobileScreen == true &&
                                      level2Obj.MobileFontSize
                                        ? level2Obj.MobileFontSize
                                        : level2Obj.FontSize}px; color:{level2Obj.Color}; font-weight:{level2Obj.FontWeight}"
                                    >
                                      {level2Obj.Value}
                                    </p>
                                  {/if}
                                  {#if level2Obj.ToolTip && level2Obj.ToolTip !== ""}
                                    <mic-tooltip
                                      chargeline={level2Obj.Value}
                                      tooltipurl={billService.URL != ""
                                        ? billService.URL
                                        : ""}
                                      tooltipdis={level2Obj.ToolTip}
                                    />
                                    <!-- <MicToolTip
                                      tooltipurl={billService.URL || ""}
                                      tooltipdis={level2Obj.ToolTip}
                                    /> -->
                                  {/if}
                                </div>
                              {:else if level2Obj.Order == 2 || level2Obj.Order == 3}
                                <span
                                  class={"level" + level2Obj.Order}
                                  style="font-size:{mobileScreen == true &&
                                  level2Obj.MobileFontSize
                                    ? level2Obj.MobileFontSize
                                    : level2Obj.FontSize}px; color:{level2Obj.Color}; font-weight:{level2Obj.FontWeight};"
                                >
                                  {level2Obj.Value}
                                </span>
                              {:else}
                                <p class={"level" + level2Obj.Order}>
                                  {level2Obj.Value}
                                </p>
                              {/if}
                              <!--  -->
                              {#if section.Section_Level2 && section.Section_Level2.length < 3 && l == section.Section_Level2.length - 1}
                                <p class={"level4"} />
                              {/if}
                              <!--  -->
                            {/if}
                          {/each}
                        </div>
                      {/if}
                    {/if}
                    <!-- Sub Section -->
                  {:else if section.SectionType == "CustomeSection"}
                    {#if section.Lable && section.Lable != ""}
                      <div class="sub-title">
                        <div
                          class="sub-sec-header"
                          style="display: flex; flex-direction:row; gap:10px; font-size:{mobileScreen ==
                            true && section.MobileFontSize
                            ? section.MobileFontSize
                            : section.FontSize}px; color:{section.Color}"
                        >
                          {#if section.IconPath && section.IconPath != ""}
                            <!-- src="/src/assets/{section.IconPath}" -->
                            <img
                              src={`https://tecocdn.azureedge.net/ibill/iBill-assets/${section.IconPath}`}
                              alt=""
                            />
                          {/if}
                          <h4
                            tyle="font-size:{mobileScreen == true &&
                            section.MobileFontSize
                              ? section.MobileFontSize
                              : section.FontSize}px"
                          >
                            {section.Lable}
                          </h4>
                        </div>
                      </div>
                      {#if section.Section_Level2}
                        {#each section.Section_Level2 as subSection}
                          <div class="charges-container">
                            {#each subSection.Section_Level3 as level3Obj}
                              {#if level3Obj.SectionType == "Charge"}
                                {#if level3Obj.Order == 1}
                                  <div class={"level" + level3Obj.Order}>
                                    <p
                                      style="font-size:{mobileScreen == true &&
                                      level3Obj.MobileFontSize
                                        ? level3Obj.MobileFontSize
                                        : level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight}"
                                    >
                                      {level3Obj.Value}
                                    </p>
                                    {#if level3Obj.ToolTip && level3Obj.ToolTip != ""}
                                      <mic-tooltip
                                        chargeline={level3Obj.Value}
                                        tooltipurl={billService.URL != ""
                                          ? billService.URL
                                          : ""}
                                        tooltipdis={level3Obj.ToolTip}
                                      />
                                      <!-- <MicToolTip
                                        tooltipurl={billService.URL!=""?billService.URL : ""}
                                        tooltipdis={level3Obj.ToolTip}
                                      /> -->
                                    {/if}
                                  </div>
                                {:else if level3Obj.Order == 2 || level3Obj.Order == 3}
                                  <span
                                    class={"level" + level3Obj.Order}
                                    style="font-size:{mobileScreen == true &&
                                    level3Obj.MobileFontSize
                                      ? level3Obj.MobileFontSize
                                      : level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight};"
                                  >
                                    {level3Obj.Value}
                                  </span>
                                {:else}
                                  <p class={"level" + level3Obj.Order}>
                                    {level3Obj.Value}
                                  </p>
                                {/if}
                              {:else if subSection.SectionType == "CombinedGroup"}
                                {#if level3Obj.Order == 1}
                                  <p
                                    class="service-for{level3Obj.Order} level1"
                                    style="font-size:{mobileScreen == true &&
                                    level3Obj.MobileFontSize
                                      ? level3Obj.MobileFontSize
                                      : level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight}"
                                  >
                                    {level3Obj.Lable}
                                  </p>
                                {:else if level3Obj.Order == 2}
                                  <p
                                    class="service-for{level3Obj.Order} level2"
                                    style="font-size:{mobileScreen == true &&
                                    level3Obj.MobileFontSize
                                      ? level3Obj.MobileFontSize
                                      : level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight}"
                                  >
                                    {level3Obj.Value}
                                  </p>
                                {/if}
                              {/if}
                            {/each}
                          </div>
                        {/each}
                      {/if}
                    {/if}
                    <!-- Sub Total -->
                  {:else if section.SectionType == "Total"}
                    <div
                      class="sub-row total-row"
                      id="electric-charges-subtotal"
                    >
                      <p class="first-label">
                        {section.Lable}
                      </p>
                      <p class="value">{section.Value}</p>
                    </div>
                  {:else if section.SectionType == "ServiceTotal"}
                    <div
                      class="total"
                      style="background-color:{$billNumber === $latestBill
                        ? section.Color
                        : '#434343'} ;"
                    >
                      <h6 class="total-label">
                        {section.Lable}
                      </h6>
                      <h6
                        class="total-value"
                        style="font-size: {mobileScreen == true &&
                        section.MobileFontSize
                          ? section.MobileFontSize
                          : section.FontSize}px;"
                      >
                        {section.Value}
                      </h6>
                    </div>
                  {/if}
                {/each}
              {/if}
            </div>
            <!-- Section Total -->
            {#if invoicetotal && typeof invoicetotal !== "string" && invoicetotal[0]}
              <div
                class="total"
                style="background-color:{$billNumber === $latestBill
                  ? invoicetotal[0].Color
                  : '#6C6C6C'} ;"
              >
                <h6 class="total-label">
                  {invoicetotal[0].Lable}
                </h6>
                <h6
                  class="total-value"
                  style="font-size: {mobileScreen == true &&
                  invoicetotal[0].MobileFontSize
                    ? invoicetotal[0].MobileFontSize
                    : invoicetotal[0].FontSize}px;"
                >
                  {invoicetotal[0].Value}
                </h6>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    {/each}
  </div>
{/if}

<style lang="scss">
  * {
    font-family: "Interstate";
  }
  .charges-container:not(:has(.level4)) .level1 {
    max-width: unset;
    flex: 1 0 100%;
  }
  .overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: #00ccff00;
    z-index: 1;
  }
  .tooltip-svg {
    z-index: 12;
    position: relative;
  }
  p {
    margin: 0;
  }

  .sub-title {
    h4 {
      font-weight: 400;
      margin: 16px 0 16px 0;
    }
  }
  .charges-container {
    position: relative;
    justify-content: unset;
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    border-bottom: 1px solid #eaecee;
    gap: 6px;
    &:empty {
      /* Remove the style of the empty div */
      border: none;
      padding: 0;
      height: 0;
    }
  }
  .headers-con {
    display: flex;
    flex-direction: row;
    gap: 8px;
    flex-wrap: wrap;
    margin: 10px 0;
    @media screen and (max-width: 480px) {
      gap: 6px;
    }
  }
  .sub-headers {
    display: flex;
    flex-direction: row;
    align-items: end;
    gap: 10px;
    margin-bottom: 8px;
    @media screen and (max-width: 480px) {
      gap: 6px;
      flex-wrap: inherit;
      p {
        // font-size: 12px !important;
      }
    }
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
    h6 {
      font-style: normal;
      font-weight: 300;
      font-size: 14px;
      display: flex;
      align-items: center;
      color: #005faa;
      padding: 10px 0;
      margin: 0;
      margin-right: 12px;
    }
  }
  .break-down {
    background: #f4f5f7;
    padding: 8px;
    grid-template-columns: 40% auto 1fr auto;
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
    cursor: pointer;
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
    padding: 20px;
    margin-bottom: 5%;
    background-color: white;
  }
  .row-container {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(150, 150, 150, 0.3);
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sub-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  #title {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    display: flex;
    align-items: center;
    color: #005faa;
    margin: 0;
    @media screen and (max-width: 480px) {
      font-size: 20px;
    }
  }
  #sectiontitle {
    margin: 3px 0;
    margin-top: 24px;
    color: #06182d;
    font-weight: 500;
    @media screen and (max-width: 767px) {
      margin-top: 16px;
    }
    @media screen and (max-width: 480px) {
      font-size: 24px !important;
    }
  }
  #comment {
    color: rgba(128, 128, 128, 0.7);
    text-decoration: none;
    margin: 10px 0;
    font-weight: 500;
    font-size: 12px;
  }
  .level1 {
    display: flex;
    align-items: start;
    gap: 8px;
    font-weight: 400;
    font-size: 20px;
    color: #000000;
    padding: 5px 0;
    margin: 0;
    max-width: calc(60% - 12px);
    flex: 1 0 60%;
    @media screen and (max-width: 480px) {
      // font-size: 16px !important;
      // p {
      //   font-size: 16px !important;
      // }
    }
  }
  .level2 {
    color: #005faa;
    font-style: italic;
    font-weight: 300;
    margin: 0;
    font-size: 18px;
    padding-bottom: 5px;
    order: 3;

    // @media screen and (max-width: 480px) {
    //   font-size: 14px !important;
    // }
  }
  .level3 {
    color: #005faa;
    font-style: italic;
    font-weight: 300;
    font-size: 18px;
    margin: 0;
    padding-bottom: 5px;
    order: 4;
    // @media screen and (max-width: 480px) {
    //   font-size: 14px !important;
    // }
  }
  .total-row {
    font-weight: 500;
  }
  .level4 {
    font-weight: 400;
    font-size: 20px;
    color: #000000;
    margin: 0;
    grid-column-start: 4;
    text-align: right;
    padding: 5px 0;
    flex: 1 0 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // @media screen and (max-width: 480px) {
    //   font-size: 16px !important;
    // }
  }
  .service-for1 {
    margin: 8px 0;
    position: relative;
    // @media screen and (max-width: 480px) {
    //   font-size: 16px !important;
    // }
  }
  .service-for2 {
    margin: 8px 0;
    position: absolute;
    left: 112px;
    bottom: 10px;
    font-size: 18px !important;
    @media screen and (max-width: 480px) {
      top: 0;
      left: 95px;
      // font-size: 14px !important;
    }
  }
  #electric-charges-subtotal {
    border-top: 2px solid #bbb;
    padding: 10px 0;
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
    max-width: 275px;
    @media screen and (max-width: 767px) {
      // font-size: 18px !important;
    }
  }
  .total {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 22px 30px;
    background: #005faa;
    border-radius: 6px;
    text-align: center;
    margin-top: 16px;
    @media screen and (max-width: 767px) {
      flex-direction: column;
      justify-content: center;
      padding: 18px 26px;
      gap: 4px;
    }
  }
  .total-label {
    display: flex;
    align-items: center;
    font-weight: 300;
    font-size: 24px;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin: 0;
    @media screen and (max-width: 767px) {
      // font-size: 22px !important;
    }
  }
  .total-value {
    font-family: "Interstate";
    font-style: normal;
    font-weight: 400;
    display: flex;
    align-items: center;
    text-align: right;
    color: #ffffff;
    margin: 0;
    @media screen and (max-width: 767px) {
      // font-size: 24px !important;
    }
  }

  .gray {
    color: #6c6c6c !important;
    p {
      color: #6c6c6c !important;
    }
    h4 {
      color: #000000 !important;
    }
    h3 {
      color: #000000 !important;
    }
    img {
      -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
      filter: grayscale(100%);
    }
  }
</style>
