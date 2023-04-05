<svelte:options tag="mic-billingsummary" />

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

  let toggleArray = [];

  //mocking data
  const [data, loading, error, get] = fetchstore();

  ///////// acordion functionality
  import { onMount } from "svelte";
  let isOpen = false;
  let styleToggleArr = [];
  let billsObjectsArray = [];
  let refreshToken;
  let recoToken;
  ////////////////////////
  onMount(() => {
    if ($apiToken && $apiDomain && !$data.Sections) {
      get(
        $apiToken,
        `${$apiDomain}/api/ibill/webcomponents/v1/Post/ChargeDetails`
        // "../../data/ChargeDetails.json"
      );
    }
    refreshToken = $apiToken;
  });

  $: if (
    $newToken &&
    $newToken.token &&
    (recoToken == $apiToken || recoToken !== $newToken.token)
  ) {
    get(
      $newToken.token,
      `${$apiDomain}/api/ibill/webcomponents/v1/Post/ChargeDetails`
      // "../../data/ChargeDetails.json"
    ).then(() => {
      styleToggleArr = [];
      billsObjectsArray = [];
      toggleArray = [];
    });
    recoToken = $newToken.token;
  }

  let arrOfBreakDown = [];
  let arr = [];
  $: if (
    $data &&
    $data.Sections &&
    $data.Sections.length > 0 &&
    typeof toggleArray[0] !== "boolean"
  ) {
    for (let i = 0; i < $data.Sections.length; i++) {
      // console.log("section mapped", $data.Sections[i].Section_Level1s);
      // if ($data.Sections[i].Section_Level1s) {
      //   $data.Sections[i].Section_Level1s.map((dataMapped, j) => {
      //     if (dataMapped.Section_Level2s) {
      //       let resArray = [];
      //       dataMapped.Section_Level2s.filter((result, k) => {
      //         if (result.IsBreakdown == true) {
      //           resArray = dataMapped.Section_Level2s;
      //         }
      //         // return
      //       });
      //       if (resArray.length == 0) {
      //         arrOfBreakDown.push(dataMapped.Section_Level2s);
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
      styleToggleArr[i] = "max-height: 200vh;opacity: 1;transition:200ms;";
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
        "opacity: 0;max-height: 0;margin: 0; transition:200ms; display:none";
    }
    fetchAndRedirect(
      $apiToken,
      `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
      null,
      {
        EventCode: "CD_ChargeTooltipClick",
        Outcome: "Helper x Is Active",
        Persona: $persona,
      }
    );
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->
{#if $loading}
  <mic-loading />
{:else if $data && $data.Sections && toggleArray && billsObjectsArray}
  <div class="billing-container">
    {#each $data.Sections as billService, i}
      {#if billService.SectionType == "Service" || billService.SectionType == "AccountLevel"}
        <div class="card">
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
          <div style={styleToggleArr[i]} class="bill-content">
            <span>
              <h3
                id="sectiontitle"
                style="color:{billService.Color}; font-size:{billService.FontSize}px; display:flex;  justify-content:flex-start; flex-direction:row; align-items:center; gap:6px;"
              >
                <img
                  src={`https://tecocdn.azureedge.net/ibill/iBill-assets/${billService.IconPath}`}
                  alt=""
                />
                {billService.Lable}
              </h3>
            </span>
            {#if billService.servicePeriod}
              <p id="comment">
                Service Period: {billService.servicePeriod}
              </p>
            {/if}
            <div id="content">
              {#if billService.Section_Level1s}
                {#each billService.Section_Level1s as section, j}
                  {#if section.SectionType == "ServiceHeaderGroup"}
                    <div class="headers-con">
                      <div class="sub-headers">
                        {#each section.Section_Level2s as level2Obj}
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
                        {#each section.Section_Level2s as level2Obj}
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
                    {#if section.Section_Level2s && section.Section_Level2s[0] && section.Section_Level2s[0].IsBreakdown == true}
                      <!-- <div
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
                      </div> -->
                      <!-- {console.log(billsObjectsArray[i].subToggleStyleArray[j])} -->
                      {#if billsObjectsArray[i]}
                        <div
                          class="charges-container break-down"
                          style={billsObjectsArray[i].subToggleStyleArray[j]}
                        >
                          {#each section.Section_Level2s as level2Obj}
                            {#if level2Obj.SectionType == "Charge"}
                              {#if level2Obj.Order == 1}
                                <div class={"level" + level2Obj.Order}>
                                  <p
                                    style="display: flex; flex-direction:row; gap:10px; font-size:{level2Obj.FontSize}px; color:{section.Color}"
                                  >
                                    {level2Obj.Value}
                                  </p>
                                  {#if level2Obj.ToolTip && level2Obj.ToolTip !== ""}
                                    <div class="tooltip-icon">
                                      <!--  src="{toolTip}" -->
                                      <!-- src={`https://tecocdn.azureedge.net/ibill/iBill-assets/tool-tip-icon.svg`} -->
                                      <img
                                        src={`https://tecocdn.azureedge.net/ibill/iBill-assets/tool-tip-icon.svg`}
                                        alt=""
                                        on:click={() => toolTipToggle(j, i)}
                                      />
                                      {#if billsObjectsArray[i] && billsObjectsArray[i].toolTipStylleArray[j]}
                                        <div
                                          class="tooltip-description"
                                          style={billsObjectsArray[i]
                                            .toolTipStylleArray[j]}
                                        >
                                          <div class="tooltip-con">
                                            {level2Obj.ToolTip} <br />
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
                                              }}>UNDERSTANDING YOUR CHARGES</a
                                            >
                                          </div>
                                        </div>
                                      {/if}
                                    </div>
                                  {/if}
                                </div>
                              {:else if level2Obj.Order == 2 || level2Obj.Order == 3}
                                <p
                                  class={"level" + level2Obj.Order}
                                  style="font-weight:300;"
                                >
                                  {level2Obj.Value}
                                </p>
                              {:else}
                                <p class={"level" + level2Obj.Order}>
                                  {level2Obj.Value}
                                </p>
                              {/if}
                            {/if}
                          {/each}
                        </div>
                      {/if}
                      <!-- General Charges -->
                    {:else if section.Section_Level2s && section.Section_Level2s[0] && section.Section_Level2s[0].IsBreakdown == false}
                      {#if section.Section_Level2s}
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
                        <div class="charges-container">
                          {#each section.Section_Level2s as level2Obj}
                            <!-- {section.SectionType} -->
                            {#if level2Obj.SectionType == "Charge"}
                              {#if level2Obj.Order == 1}
                                <div class={"level" + level2Obj.Order}>
                                  {#if level2Obj.Value && level2Obj.Value[0] == " "}
                                    <p
                                      style="padding-left: 16px; margin:0; display:block;font-size:{level2Obj.FontSize}px; color:{level2Obj.Color}; font-weight:{level2Obj.FontWeight} "
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
                                    <div class="tooltip-icon">
                                      <img
                                        src={`https://tecocdn.azureedge.net/ibill/iBill-assets/tool-tip-icon.svg`}
                                        alt=""
                                        on:click={() => toolTipToggle(j, i)}
                                      />
                                      {#if billsObjectsArray[i] && billsObjectsArray[i].toolTipStylleArray[j]}
                                        <div
                                          class="tooltip-description"
                                          style={billsObjectsArray[i]
                                            .toolTipStylleArray[j]}
                                        >
                                          <div class="tooltip-con">
                                            {level2Obj.ToolTip}<br />
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
                                              }}>UNDERSTANDING YOUR CHARGES</a
                                            >
                                          </div>
                                        </div>
                                      {/if}
                                    </div>
                                  {/if}
                                </div>
                              {:else if level2Obj.Order == 2 || level2Obj.Order == 3}
                                <p class={"level" + level2Obj.Order}>
                                  {level2Obj.Value}
                                </p>
                              {:else}
                                <p class={"level" + level2Obj.Order}>
                                  {level2Obj.Value}
                                </p>
                              {/if}
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
                      {#each section.Section_Level2s as subSection}
                        <div class="charges-container">
                          {#each subSection.Section_Level3s as level3Obj}
                            {#if level3Obj.SectionType == "Charge"}
                              {#if level3Obj.Order == 1}
                                <div class={"level" + level3Obj.Order}>
                                  <p
                                    style="font-size:{level3Obj.FontSize}px; color:{level3Obj.Color}; font-weight:{level3Obj.FontWeight}"
                                  >
                                    {level3Obj.Value}
                                  </p>
                                  {#if level3Obj.tooltip && level3Obj.tooltip != ""}
                                    <div class="tooltip-icon">
                                      <!-- src={`https://tecocdn.azureedge.net/ibill/iBill-assets/tool-tip-icon.svg`} -->
                                      <img
                                        src={`https://tecocdn.azureedge.net/ibill/iBill-assets/tool-tip-icon.svg`}
                                        alt=""
                                        on:click={() => toolTipToggle(j, i)}
                                      />
                                      {#if billsObjectsArray[i] && billsObjectsArray[i].toolTipStylleArray[j]}
                                        <div class="tooltip-description">
                                          <div
                                            class="tooltip-con"
                                            style={billsObjectsArray[i]
                                              .toolTipStylleArray[j]}
                                          >
                                            Covers the costs of moving gas from
                                            its source to your premise, other
                                            than the cost of gas itself. <br />
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
                                              }}>UNDERSTANDING YOUR CHARGES</a
                                            >
                                          </div>
                                        </div>
                                      {/if}
                                    </div>
                                  {/if}
                                </div>
                              {:else if level3Obj.Order == 2 || level3Obj.Order == 3}
                                <p class={"level" + level3Obj.Order}>
                                  {level3Obj.Value}
                                </p>
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
                      <p class="first-label">{section.Lable}</p>
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
            {#if i == $data.Sections.length - 2}
              <div
                class="total"
                style="background-color:{$billNumber === $latestBill
                  ? $data.Sections[$data.Sections.length - 1].Color
                  : '#6C6C6C'} ;"
              >
                <h6 class="total-label">
                  {$data.Sections[$data.Sections.length - 1].Lable}
                </h6>
                <h6
                  class="total-value"
                  style="font-size: {$data.Sections[$data.Sections.length - 1]
                    .FontSize}px;"
                >
                  {$data.Sections[$data.Sections.length - 1].Value}
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
    z-index: 1;
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
      padding: 8px;
      > a {
        text-decoration: none;
        color: #005faa;
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
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaecee;
    display: grid;
    grid-template-columns: 45% auto 1fr auto;
    padding: 10px 0;
    @media screen and (max-width: 767px) {
      justify-content: unset;
      align-items: flex-start;
      display: flex;
      flex-wrap: wrap;
    }
    @media screen and (min-width: 993px) and (max-width: 1100px) {
      justify-content: unset;
      align-items: flex-start;
      display: flex;
      flex-wrap: wrap;
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
    min-width: 90%;
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
    align-items: center;
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
    @media screen and (min-width: 993px) and (max-width: 1100px) {
      flex: 1 0 60%;
    }
    @media screen and (max-width: 767px) {
      flex: 1 0 60%;
    }
    @media screen and (max-width: 480px) {
      flex: 1 0 60%;
      font-size: 16px;
    }
  }
  .level2 {
    color: #005faa;
    font-style: italic;
    font-weight: 300;
    margin: 0;
    font-size: 18px;
    padding-bottom: 5px;
    @media screen and (min-width: 993px) and (max-width: 1100px) {
      order: 3;
    }
    @media screen and (max-width: 767px) {
      order: 3;
    }
    @media screen and (max-width: 480px) {
      order: 3;
      font-size: 14px;
    }
  }
  .level3 {
    color: #005faa;
    font-style: italic;
    font-weight: 300;
    font-size: 18px;
    margin: 0;
    padding-bottom: 5px;
    @media screen and (min-width: 993px) and (max-width: 1100px) {
      order: 4;
    }
    @media screen and (max-width: 767px) {
      order: 4;
    }
    @media screen and (max-width: 480px) {
      font-size: 14px;
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
    @media screen and (min-width: 993px) and (max-width: 1100px) {
      padding: 5px 0;
      flex: 1 0 40%;
    }
    @media screen and (max-width: 767px) {
      padding: 5px 0;
      flex: 1 0 40%;
    }
    @media screen and (max-width: 480px) {
      font-size: 16px;
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
    @media screen and (max-width: 767px) {
      font-size: 18px;
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
      font-size: 22px;
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
</style>
