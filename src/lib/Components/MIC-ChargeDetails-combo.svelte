<svelte:options tag="mic-billingsummary-combo" />

<script>
  // @ts-nocheck
  //svg imports

  import {
    fetchstore,
    apiDomain,
    apiToken,
    eventsDomain,
    showToolTipDetails,
    newToken,
    fetchAndRedirect,
    persona,
    billNumber,
    latestBill,
  } from "../../js/store";
  import { onMount } from "svelte";
  import { each } from "svelte/internal";

  //mocking data
  const [data, loading, error, get] = fetchstore();

  ///////// acordion functionality
  let isOpen = false;
  let styleToggleArr = [];
  let billsObjectsArray = [];
  let toggleArray = [];
  let refreshToken;
  let recoToken;
  export let charges;
  export let invoicetotal;
  ////////////////////////
  onMount(() => {});

  let arrOfBreakDown = [];
  let arr = [];
  $: if (charges && charges.length > 0 && typeof toggleArray[0] !== "boolean") {
    for (let i = 0; i < charges.length; i++) {
      // console.log("section mapped", charges[i].Section_Level1);
      // if (charges[i].Section_Level1) {
      //   charges[i].Section_Level1.map((dataMapped, j) => {
      //     if (dataMapped.Section_Level2) {
      //       let resArray = [];
      //       dataMapped.Section_Level2.filter((result, k) => {
      //         if (result.IsBreakdown == true) {
      //           resArray = dataMapped.Section_Level2;
      //         }
      //         // return
      //       });
      //       if (resArray.length == 0) {
      //         arrOfBreakDown.push(dataMapped.Section_Level2);
      //       }
      //       if (resArray.length > 0) {
      //         arrOfBreakDown.push(resArray);
      //       } else {
      //         arr.push(arrOfBreakDown);
      //         arrOfBreakDown = [];
      //       }
      //     }
      //   });
      // }
      toggleArray.push(true);
      let billObj = {
        subSectionArray: [],
        subToggleStyleArray: [],
        toolTipArray: [],
        toolTipStylleArray: [],
      };
      billsObjectsArray.push(billObj);
    }
    // console.log("array fo break downs :", arr);
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
        "opacity: 0;max-height: 0;margin: 0; transition:200ms; padding:0; ";
    }
  };

  let componentContainer;
  let toolTipSvg;
  let toolTipCon;
  $: componentContainer = document.querySelector(".billing-container");
  $: toolTipSvg = document.querySelector(".tooltip-svg");
  $: toolTipCon = document.querySelector(".tooltip-con");
  const closeToggle = (e) => {
    // console.log(e.target !== toolTipSvg, "tool tip");
    // if (e.target !== toolTipSvg || e.target !== toolTipCon) {
    //   if (
    //     billsObjectsArray &&
    //     billsObjectsArray[activeSection] &&
    //     billsObjectsArray[activeSection].subSectionArray
    //   ) {
    //     // console.log("here", e.target);
    //     // console.log(
    //     //   "here",
    //     //   billsObjectsArray[activeSection].subSectionArray[activeTooltip]
    //     // );
    //     billsObjectsArray[activeSection].subSectionArray[activeTooltip] = false;
    //     billsObjectsArray[activeSection].subToggleStyleArray[activeTooltip] =
    //       "opacity: 0;max-height: 0;margin: 0; transition:200ms; display:none";
    //   } else if (arrOfLevel3[activeTooltip] && arrayOfL3Style[activeTooltip]) {
    //     console.log(arrOfLevel3[activeTooltip], arrayOfL3Style[activeTooltip]);
    //     arrOfLevel3[activeTooltip] = false;
    //     arrayOfL3Style[activeTooltip] =
    //       "opacity: 0;max-height: 0;margin: 0; transition:200ms; padding:0; ";
    //   }
    // }
  };
  $: if (componentContainer) {
  }
  let arrOfLevel3 = [
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ];
  let arrayOfL3Style = [
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ];
  let activeTooltip;
  let activeSection;
  let previouseActiveTooltip;
  let previouseActiveSec;
  let previouseLevel;
  let currentLevel;
  const toolTipToggle = (j, i, chargeLine, level3) => {
    previouseActiveTooltip = activeTooltip;
    previouseActiveSec = activeSection;
    activeTooltip = j;
    activeSection = i;
    if (level3) {
      previouseLevel = currentLevel;
      currentLevel = level3;
    } else {
      previouseLevel = currentLevel;
      currentLevel = "level2";
    }
    if (
      previouseActiveTooltip !== j ||
      previouseActiveSec !== i ||
      previouseLevel !== currentLevel
    ) {
      if (
        previouseActiveTooltip !== undefined &&
        previouseActiveSec !== undefined
      ) {
        if (
          arrOfLevel3[previouseActiveSec] &&
          arrOfLevel3[previouseActiveSec][previouseActiveTooltip] == true &&
          arrayOfL3Style[previouseActiveSec] &&
          arrayOfL3Style[previouseActiveSec][previouseActiveTooltip]
        )
          arrOfLevel3[previouseActiveSec][previouseActiveTooltip] =
            !arrOfLevel3[previouseActiveSec][previouseActiveTooltip];

        arrayOfL3Style[previouseActiveSec][previouseActiveTooltip] =
          "opacity: 0;max-height: 0;margin: 0; transition:200ms; display:none";
      }
      if (previouseActiveTooltip !== null && previouseActiveSec !== null) {
        if (
          billsObjectsArray[previouseActiveSec] &&
          billsObjectsArray[previouseActiveSec].toolTipArray[
            previouseActiveTooltip
          ] &&
          billsObjectsArray[previouseActiveSec].toolTipStylleArray[
            previouseActiveTooltip
          ]
        ) {
          billsObjectsArray[previouseActiveSec].toolTipArray[
            previouseActiveTooltip
          ] =
            !billsObjectsArray[previouseActiveSec].toolTipArray[
              previouseActiveTooltip
            ];
          billsObjectsArray[previouseActiveSec].toolTipStylleArray[
            previouseActiveTooltip
          ] =
            "opacity: 0;max-height: 0;margin: 0; transition:200ms; display:none";
        }
      }
    }
    if (level3) {
      arrOfLevel3[i][j] = !arrOfLevel3[i][j];
      if (arrOfLevel3[i][j] == true) {
        arrayOfL3Style[i][j] = "max-height: 200vh;opacity: 1;transition:200ms;";
      } else {
        arrayOfL3Style[i][j] =
          "opacity: 0;max-height: 0;margin: 0; transition:200ms; display:none";
      }
    } else {
      if (typeof billsObjectsArray[i].toolTipArray[j] !== "boolean") {
        billsObjectsArray[i].toolTipArray[j] == false;
      }
      billsObjectsArray[i].toolTipArray[j] =
        !billsObjectsArray[i].toolTipArray[j];
      if (billsObjectsArray[i].toolTipArray[j] == true) {
        billsObjectsArray[i].toolTipStylleArray[j] =
          "max-height: 200vh;opacity: 1;transition:200ms;";
      } else {
        billsObjectsArray[i].toolTipStylleArray[j] =
          "opacity: 0;max-height: 0;margin: 0; transition:200ms; display:none";
      }
    }
    fetchAndRedirect(
      $apiToken,
      `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
      null,
      {
        EventCode: "CD_ChargeTooltipClick",
        Outcome: `Helper ${chargeLine} Is Active`,
        Persona: $persona,
      }
    );
  };
  let chargesClass = "";
  $: if ($billNumber == $latestBill) {
    chargesClass = "";
  } else {
    chargesClass = "gray";
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->
{#if $loading}
  <mic-loading />
{:else if charges && toggleArray && billsObjectsArray}
  <div class="billing-container">
    <!-- {console.log(charges, "charges")} -->
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
                style="color:{billService.Color}; font-size:{billService.FontSize}px; font-weight:{billService.FontWeight}; display:flex;  justify-content:flex-start; flex-direction:row; align-items:center; gap:6px;"
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
              {#if billService.Lable && billService.Lable !== "" && billService.Lable.toLowerCase().includes("65456") === true}
                <!-- special case regarding the Installments & Adjustments -->
                {#each billService.Section_Level1 as section, k}
                  {#each section.Section_Level2 as subSection, j}
                    <div class="charges-container" />
                  {/each}
                {/each}
                <!--  -->
              {:else if billService.Section_Level1}
                {#each billService.Section_Level1 as section, j}
                  {#if section.SectionType == "ServiceHeaderGroup"}
                    <div class="headers-con">
                      <div class="sub-headers">
                        {#each section.Section_Level2 as level2Obj}
                          {#if level2Obj.Order < 5}
                            <p
                              style="font-size:{level2Obj.FontSize}px; color:{level2Obj.Color}; font-weight:{level2Obj.FontWeight}"
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
                              style="font-size:{level2Obj.FontSize}px; color:{level2Obj.Color}; font-weight:{level2Obj.FontWeight}"
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
                                    style="display: flex; flex-direction:row; gap:10px; font-size:{level2Obj.FontSize}px; color:{level2Obj.Color}; font-weight:{level2Obj.FontWeight};"
                                  >
                                    {level2Obj.Value}
                                  </p>
                                  {#if level2Obj.ToolTip && level2Obj.ToolTip !== ""}
                                    <div
                                      class="tooltip-icon"
                                      bind:this={toolTipCon}
                                    >
                                      <img
                                        src={`https://tecocdn.azureedge.net/ibill/iBill-assets/tool-tip-icon.svg`}
                                        alt=""
                                        class="tooltip-svg"
                                        bind:this={toolTipSvg}
                                        on:click={(e) =>
                                          toolTipToggle(j, i, level2Obj.Value)}
                                      />
                                      {#if billsObjectsArray[i] && billsObjectsArray[i].toolTipStylleArray[j]}
                                        <div
                                          class="overlay"
                                          on:click={(e) =>
                                            toolTipToggle(
                                              j,
                                              i,
                                              level2Obj.Value
                                            )}
                                          style={billsObjectsArray[i]
                                            .toolTipStylleArray[j]}
                                        />
                                        <div
                                          class="tooltip-description"
                                          style={billsObjectsArray[i]
                                            .toolTipStylleArray[j]}
                                        >
                                          <div class="tooltip-con">
                                            <div>
                                              {level2Obj.ToolTip}
                                              <br />
                                              {#if billService.URL && billService.URL != ""}
                                                <a
                                                  on:click={() => {
                                                    fetchAndRedirect(
                                                      $apiToken,
                                                      `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
                                                      billService.URL,
                                                      {
                                                        EventCode:
                                                          "CD_ChargeExplanationClick",
                                                        Outcome:
                                                          "Charge Exeplination Page Loaded",
                                                        Persona: $persona,
                                                      }
                                                    );
                                                  }}
                                                  >UNDERSTANDING YOUR CHARGES</a
                                                >
                                              {/if}
                                            </div>
                                            <img
                                              src={`https://tecocdn.azureedge.net/ibill/iBill-assets/x-close.svg`}
                                              alt=""
                                              class="tooltip-svg"
                                              on:click={() =>
                                                toolTipToggle(
                                                  j,
                                                  i,
                                                  level2Obj.Value
                                                )}
                                            />
                                          </div>
                                        </div>
                                      {/if}
                                    </div>
                                  {/if}
                                </div>
                              {:else if level2Obj.Order == 2 || level2Obj.Order == 3}
                                <span
                                  class={"level" + level2Obj.Order}
                                  style="font-size:{level2Obj.FontSize}px; color:{level2Obj.Color}; font-weight:{level2Obj.FontWeight};"
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
                              style="display: flex; flex-direction:row; gap:10px; font-size:{section.FontSize}px; color:{section.Color}"
                            >
                              {#if section.IconPath && section.IconPath != ""}
                                <img
                                  src={`https://tecocdn.azureedge.net/ibill/iBill-assets/${section.IconPath}`}
                                  alt=""
                                />
                              {/if}
                              <h4 style="font-size:{section.FontSize}px">
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
                                        style="font-size:{level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight}"
                                      >
                                        {level3Obj.Value}
                                      </p>
                                      {#if level3Obj.ToolTip && level3Obj.ToolTip != ""}
                                        <div
                                          class="tooltip-icon"
                                          bind:this={toolTipCon}
                                        >
                                          <img
                                            src={`https://tecocdn.azureedge.net/ibill/iBill-assets/tool-tip-icon.svg`}
                                            alt=""
                                            class="tooltip-svg"
                                            bind:this={toolTipSvg}
                                            on:click={() =>
                                              toolTipToggle(
                                                o,
                                                j,
                                                level3Obj.Value,
                                                "levele3"
                                              )}
                                          />

                                          {#if arrOfLevel3[j] && arrayOfL3Style[j][o]}
                                            <div
                                              class="overlay"
                                              on:click={(e) =>
                                                toolTipToggle(
                                                  o,
                                                  j,
                                                  level3Obj.Value,
                                                  "levele3"
                                                )}
                                              style={arrayOfL3Style[j][o]}
                                            />
                                            <div
                                              class="tooltip-description"
                                              style={arrayOfL3Style[j][o]}
                                            >
                                              <div class="tooltip-con">
                                                <div>
                                                  {level3Obj.ToolTip}
                                                  <br />
                                                  {#if billService.URL && billService.URL != ""}
                                                    <a
                                                      on:click={() => {
                                                        fetchAndRedirect(
                                                          $apiToken,
                                                          `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
                                                          billService.URL,
                                                          {
                                                            EventCode:
                                                              "CD_ChargeExplanationClick",
                                                            Outcome:
                                                              "Charge Exeplination Page Loaded",
                                                            Persona: $persona,
                                                          }
                                                        );
                                                      }}
                                                      >UNDERSTANDING YOUR
                                                      CHARGES</a
                                                    >
                                                  {/if}
                                                </div>
                                                <img
                                                  src={`https://tecocdn.azureedge.net/ibill/iBill-assets/x-close.svg`}
                                                  alt=""
                                                  class="tooltip-svg"
                                                  on:click={() =>
                                                    toolTipToggle(
                                                      o,
                                                      j,
                                                      level3Obj.Value,
                                                      "levele3"
                                                    )}
                                                />
                                              </div>
                                            </div>
                                          {/if}
                                        </div>
                                      {/if}
                                    </div>
                                  {:else if level3Obj.Order == 2 || level3Obj.Order == 3}
                                    <span
                                      class={"level" + level3Obj.Order}
                                      style="font-size:{level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight};"
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
                                      style="font-size:{level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight}"
                                    >
                                      {level3Obj.Lable}
                                    </p>
                                  {:else if level3Obj.Order == 2}
                                    <p
                                      class="service-for{level3Obj.Order} level2"
                                      style="font-size:{level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight}"
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
                                      style="padding-left: 16px; margin:0; display:block;font-size:{level2Obj.FontSize}px; font-weight:{level2Obj.FontWeight}; color:{level2Obj.Color};"
                                    >
                                      {level2Obj.Value.trim()}
                                    </p>
                                  {:else}
                                    <p
                                      style="font-size:{level2Obj.FontSize}px; color:{level2Obj.Color}; font-weight:{level2Obj.FontWeight}"
                                    >
                                      {level2Obj.Value}
                                    </p>
                                  {/if}
                                  {#if level2Obj.ToolTip && level2Obj.ToolTip !== ""}
                                    <div
                                      class="tooltip-icon"
                                      bind:this={toolTipCon}
                                    >
                                      <img
                                        src={`https://tecocdn.azureedge.net/ibill/iBill-assets/tool-tip-icon.svg`}
                                        alt=""
                                        class="tooltip-svg"
                                        bind:this={toolTipSvg}
                                        on:click={() =>
                                          toolTipToggle(j, i, level2Obj.Value)}
                                      />
                                      {#if billsObjectsArray[i] && billsObjectsArray[i].toolTipStylleArray[j]}
                                        <div
                                          class="overlay"
                                          on:click={(e) =>
                                            toolTipToggle(
                                              j,
                                              i,
                                              level2Obj.Value
                                            )}
                                          style={billsObjectsArray[i]
                                            .toolTipStylleArray[j]}
                                        />
                                        <div
                                          class="tooltip-description"
                                          style={billsObjectsArray[i]
                                            .toolTipStylleArray[j]}
                                        >
                                          <div class="tooltip-con">
                                            <div>
                                              {level2Obj.ToolTip}
                                              <br />
                                              {#if billService.URL && billService.URL != ""}
                                                <a
                                                  on:click={() => {
                                                    fetchAndRedirect(
                                                      $apiToken,
                                                      `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
                                                      billService.URL,
                                                      {
                                                        EventCode:
                                                          "CD_ChargeExplanationClick",
                                                        Outcome:
                                                          "Charge Exeplination Page Loaded",
                                                        Persona: $persona,
                                                      }
                                                    );
                                                  }}
                                                  >UNDERSTANDING YOUR CHARGES</a
                                                >
                                              {/if}
                                            </div>
                                            <img
                                              src={`https://tecocdn.azureedge.net/ibill/iBill-assets/x-close.svg`}
                                              alt=""
                                              class="tooltip-svg"
                                              on:click={() =>
                                                toolTipToggle(
                                                  j,
                                                  i,
                                                  level2Obj.Value
                                                )}
                                            />
                                          </div>
                                        </div>
                                      {/if}
                                    </div>
                                  {/if}
                                </div>
                              {:else if level2Obj.Order == 2 || level2Obj.Order == 3}
                                <span
                                  class={"level" + level2Obj.Order}
                                  style="font-size:{level2Obj.FontSize}px; color:{level2Obj.Color}; font-weight:{level2Obj.FontWeight};"
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
                          style="display: flex; flex-direction:row; gap:10px; font-size:{section.FontSize}px; color:{section.Color}"
                        >
                          {#if section.IconPath && section.IconPath != ""}
                            <!-- src="/src/assets/{section.IconPath}" -->
                            <img
                              src={`https://tecocdn.azureedge.net/ibill/iBill-assets/${section.IconPath}`}
                              alt=""
                            />
                          {/if}
                          <h4 tyle="font-size:{section.FontSize}px">
                            {section.Lable}
                          </h4>
                        </div>
                      </div>
                      {#each section.Section_Level2 as subSection}
                        <div class="charges-container">
                          {#each subSection.Section_Level3 as level3Obj}
                            {#if level3Obj.SectionType == "Charge"}
                              {#if level3Obj.Order == 1}
                                <div class={"level" + level3Obj.Order}>
                                  <p
                                    style="font-size:{level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight}"
                                  >
                                    {level3Obj.Value}
                                  </p>
                                  {#if level3Obj.ToolTip && level3Obj.ToolTip != ""}
                                    <div
                                      class="tooltip-icon"
                                      bind:this={toolTipCon}
                                    >
                                      <!-- src={`https://tecocdn.azureedge.net/ibill/iBill-assets/tool-tip-icon.svg`} -->
                                      <img
                                        src={`https://tecocdn.azureedge.net/ibill/iBill-assets/tool-tip-icon.svg`}
                                        alt=""
                                        class="tooltip-svg"
                                        bind:this={toolTipSvg}
                                        on:click={() =>
                                          toolTipToggle(j, i, level3Obj.Value)}
                                      />
                                      {#if billsObjectsArray[i] && billsObjectsArray[i].toolTipStylleArray[j]}
                                        <div
                                          class="overlay"
                                          on:click={(e) =>
                                            toolTipToggle(
                                              j,
                                              i,
                                              level3Obj.Value
                                            )}
                                          style={billsObjectsArray[i]
                                            .toolTipStylleArray[j]}
                                        />
                                        <div
                                          class="tooltip-description"
                                          style={billsObjectsArray[i]
                                            .toolTipStylleArray[j]}
                                        >
                                          <div class="tooltip-con">
                                            <div>
                                              {level3Obj.ToolTip}
                                              <br />
                                              {#if billService.URL && billService.URL != ""}
                                                <a
                                                  on:click={() => {
                                                    fetchAndRedirect(
                                                      $apiToken,
                                                      `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
                                                      billService.URL,
                                                      {
                                                        EventCode:
                                                          "CD_ChargeExplanationClick",
                                                        Outcome:
                                                          "Charge Exeplination Page Loaded",
                                                        Persona: $persona,
                                                      }
                                                    );
                                                  }}
                                                  >UNDERSTANDING YOUR CHARGES</a
                                                >
                                              {/if}
                                            </div>
                                            <img
                                              src={`https://tecocdn.azureedge.net/ibill/iBill-assets/x-close.svg`}
                                              alt=""
                                              class="tooltip-svg"
                                              on:click={() =>
                                                toolTipToggle(
                                                  j,
                                                  i,
                                                  level3Obj.Value
                                                )}
                                            />
                                          </div>
                                        </div>
                                      {/if}
                                    </div>
                                  {/if}
                                </div>
                              {:else if level3Obj.Order == 2 || level3Obj.Order == 3}
                                <span
                                  class={"level" + level3Obj.Order}
                                  style="font-size:{level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight};"
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
                                  style="font-size:{level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight}"
                                >
                                  {level3Obj.Lable}
                                </p>
                              {:else if level3Obj.Order == 2}
                                <p
                                  class="service-for{level3Obj.Order} level2"
                                  style="font-size:{level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight}"
                                >
                                  {level3Obj.Value}
                                </p>
                              {/if}
                            {/if}
                          {/each}
                        </div>
                      {/each}
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
                        style="font-size: {section.FontSize}px;"
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
                  style="font-size: {invoicetotal[0].FontSize}px;"
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
  .tooltip-icon {
    cursor: pointer;
  }
  .toolTipToggle {
    position: relative;
    &::after {
      content: "";
      width: 5px;
      height: 5px;
      background-color: #005faa;
      top: 0;
      left: 50%;
      z-index: 2;
      transform: translate(-50%, 0);
    }
  }
  .tooltip-description {
    position: absolute;
    bottom: 100%;
    z-index: 14;
    max-width: 100vw;
    max-width: 440px;
    border-radius: 6px;
    padding: 6px;
    font-weight: 400;
    font-size: 16px;
    background: rgb(203 232 255 / 96%);
    color: #000000;
    box-shadow: 0 0 8px 1px #9e9e9e96;
    left: 0;
    .tooltip-con {
      z-index: 15;
      position: relative;
      padding: 8px;
      display: flex;
      align-items: baseline;
      gap: 12px;
      div {
        > a {
          text-decoration: none;
          color: #005faa;
        }
      }
    }
  }
  .bill-content {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    hr {
      height: 3px;
      background-color: #eaecee;
      border: none;
    }
    @media screen and (max-width: 480px) {
      row-gap: 16px;
    }
  }
  .sub-title {
    h4 {
      font-weight: 400;
      margin: 16px 0 16px 0;
    }
  }
  .charges-container {
    position: relative;
    // justify-content: space-between;
    // align-items: center;
    // display: grid;
    // grid-template-columns: 45% auto 1fr auto;
    justify-content: unset;
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    border-bottom: 1px solid #eaecee;
    gap: 6px;
    // @media screen and (max-width: 767px) {
    //   justify-content: unset;
    //   align-items: flex-start;
    //   display: flex;
    //   flex-wrap: wrap;
    // }
    // @media screen and (min-width: 993px) and (max-width: 1100px) {
    //   justify-content: unset;
    //   align-items: flex-start;
    //   display: flex;
    //   flex-wrap: wrap;
    // }
    &:empty {
      /* Remove the style of the empty div */
      /* For example: */
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
    @media screen and (max-width: 480px) {
      gap: 6px;
    }
  }
  .sub-headers {
    display: flex;
    /* justify-content: space-between; */
    flex-direction: row;
    /* row-gap: 12px; */
    align-items: end;
    gap: 10px;
    margin-bottom: 8px;
    @media screen and (max-width: 480px) {
      gap: 6px;
      p {
        font-size: 12px !important;
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
    /* margin-bottom: 10px;
    padding-bottom: 10px; */
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
    // height: 29px;
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
    // @media screen and (min-width: 993px) and (max-width: 1100px) {
    //   flex: 1 0 60%;
    //   max-width: calc(60% - 12px);
    // }
    // @media screen and (max-width: 767px) {
    //   flex: 1 0 60%;
    //   max-width: calc(60% - 12px);
    // }
    @media screen and (max-width: 480px) {
      // flex: 1 0 60%;
      font-size: 16px !important;
      p {
        font-size: 16px !important;
      }
      // max-width: calc(60% - 12px);
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
    // @media screen and (min-width: 993px) and (max-width: 1100px) {
    //   order: 3;
    // }
    // @media screen and (max-width: 767px) {
    //   order: 3;
    // }
    @media screen and (max-width: 480px) {
      // order: 3;
      font-size: 14px !important;
    }
  }
  .level3 {
    color: #005faa;
    font-style: italic;
    font-weight: 300;
    font-size: 18px;
    margin: 0;
    padding-bottom: 5px;
    order: 4;
    // @media screen and (min-width: 993px) and (max-width: 1100px) {
    //   order: 4;
    // }
    // @media screen and (max-width: 767px) {
    //   order: 4;
    // }
    @media screen and (max-width: 480px) {
      font-size: 14px !important;
    }
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
    // @media screen and (min-width: 993px) and (max-width: 1100px) {
    //   padding: 5px 0;
    //   flex: 1 0 40%;
    // }
    // @media screen and (max-width: 767px) {
    //   padding: 5px 0;
    //   flex: 1 0 40%;
    // }
    @media screen and (max-width: 480px) {
      font-size: 16px !important;
    }
  }
  .service-for1 {
    margin: 8px 0;
    position: relative;
    @media screen and (max-width: 480px) {
      font-size: 16px !important;
    }
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
      font-size: 14px !important;
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
      font-size: 18px !important;
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
      font-size: 22px !important;
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
      font-size: 24px !important;
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
