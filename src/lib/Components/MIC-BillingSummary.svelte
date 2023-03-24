<svelte:options tag="mic-billingsummary" />

<script>
  // @ts-nocheck
  //svg imports
  import toggle from "../../assets/cr.svg";
  import breakdownToggle from "../../assets/breakdown-drop-icon.svg";
  import electricityIcon from "../../assets/Iconawesome-bolt.svg";
  import percentageGas from "../../assets/gas-percentage.svg";
  import toolTip from "../../assets/tool-tip-icon.svg";
  import {
    fetchstore,
    apiDomain,
    apiToken,
    eventsDomain,
    showToolTipDetails,
    newToken,
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
        "opacity: 0;max-height: 0;margin: 0; transition:200ms;";
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
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if $loading}
  <mic-loading />
{:else if $data && $data.Sections && toggleArray && billsObjectsArray}
  <div class="billing-container">
    {#each $data.Sections as billService, i}
      {#if billService.SectionType == "Service"}
        <div class="card">
          <div
            id="bills-header"
            on:click={() => toggleContainer(i)}
            aria-expanded={isOpen}
          >
            <h4 id="title">BILLING SUMMARY</h4>
            <img
              src={`${$apiDomain}/micwc-external/assets/toggle.svg`}
              alt=""
              id={"rotate-svg-" + !toggleArray[i]}
            />
          </div>
          <!-- {#if toggleArray[i]} -->
          <div style={styleToggleArr[i]} class="bill-content">
            <span>
              <h3
                id="sectiontitle"
                style="color:{billService.Color}; display:flex;  justify-content:flex-start; flex-direction:row; align-items:center; gap:6px;"
              >
                {#if billService.ServiceType && billService.ServiceType == "Electric"}
                  <img
                    src={`${$apiDomain}/micwc-external/assets/electricCharge.svg`}
                    alt=""
                    style="width: 25px;"
                  />
                {:else if billService.ServiceType && billService.ServiceType == "GAS"}
                  <img
                    src={`${$apiDomain}/micwc-external/assets/gasCharge.svg`}
                    alt=""
                    style="width: 25px;"
                  />
                {:else if billService.ServiceType && billService.ServiceType == "Lighting"}
                  <img
                    src={`${$apiDomain}/micwc-external/assets/lighting.0131cc59.svg`}
                    alt=""
                    style="width: 25px;"
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
              {#if billService.Section_Level1s}
                {#each billService.Section_Level1s as section, j}
                  {#if section.SectionType == "Charge_Group"}
                    {#if section.Section_Level2s && section.Section_Level2s[0] && section.Section_Level2s[0].IsBreakdown == true}
                      <!-- {#if section.Lable && section.Lable != ""}
                        <div class="sub-title">
                          <div
                            class="sub-sec-header"
                            style="display: flex; flex-direction:row; gap:10px; font-size:{section.FontSize}px; color:{section.Color}"
                          >
                            {#if section.IconPath && section.IconPath != ""}
                              <img src={percentageGas} alt="" />
                            {/if}
                            <h4 tyle="font-size:{section.FontSize}px">
                              {section.Lable}
                            </h4>
                          </div>
                        </div>
                      {/if} -->
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
                      <!-- style={billsObjectsArray[i].subToggleStyleArray[j]} -->
                      <div class="charges-container break-down">
                        {#each section.Section_Level2s as level2Obj}
                          <!-- {section.SectionType} -->
                          {#if level2Obj.SectionType == "Charge"}
                            {#if level2Obj.Order == 1}
                              <p class={"level" + level2Obj.Order}>
                                {level2Obj.Value}
                                {#if level2Obj.ToolTip && level2Obj.ToolTip !== ""}
                                  <div class="tooltip-icon">
                                    <img
                                      src={`${$apiDomain}/micwc-external/assets/tool-tip-icon.svg`}
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
                                            href="#"
                                            on:click={() => {
                                              showToolTipDetails.set(true);
                                            }}>UNDERSTANDING YOUR CHARGES</a
                                          >
                                        </div>
                                      </div>
                                    {/if}
                                  </div>
                                {/if}
                              </p>
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
                    {:else if section.Section_Level2s && section.Section_Level2s[0] && section.Section_Level2s[0].IsBreakdown == false}
                      {#if section.Section_Level2s}
                        {#if section.Lable && section.Lable != ""}
                          <div class="sub-title">
                            <div
                              class="sub-sec-header"
                              style="display: flex; flex-direction:row; gap:10px; font-size:{section.FontSize}px; color:{section.Color}"
                            >
                              {#if section.IconPath && section.IconPath != ""}
                                <img src={percentageGas} alt="" />
                              {/if}
                              <h4 tyle="font-size:{section.FontSize}px">
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
                                <p class={"level" + level2Obj.Order}>
                                  <!-- {console.log(level2Obj.tooltip)} -->
                                  {level2Obj.Value}
                                  {#if level2Obj.ToolTip && level2Obj.ToolTip !== ""}
                                    <div class="tooltip-icon">
                                      <img
                                        src={`${$apiDomain}/micwc-external/assets/tool-tip-icon.svg`}
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
                                              href="#"
                                              on:click={() => {
                                                console.log("on tool tip");
                                              }}>UNDERSTANDING YOUR CHARGES</a
                                            >
                                          </div>
                                        </div>
                                      {/if}
                                    </div>
                                  {/if}
                                </p>
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
                  {:else if section.SectionType == "CustomeSection"}
                    {#if section.Lable && section.Lable != ""}
                      <div class="sub-title">
                        <div
                          class="sub-sec-header"
                          style="display: flex; flex-direction:row; gap:10px; font-size:{section.FontSize}px; color:{section.Color}"
                        >
                          {#if section.IconPath && section.IconPath != ""}
                            <img src={percentageGas} alt="" />
                          {/if}
                          <h4 tyle="font-size:{section.FontSize}px">
                            {section.Lable}
                          </h4>
                        </div>
                      </div>
                      <div class="charges-container">
                        {#each section.Section_Level2s as subSection}
                          {#each subSection.Section_Level3s as level2Obj}
                            <!-- {section.SectionType} -->
                            {#if level2Obj.SectionType == "Charge"}
                              {#if level2Obj.Order == 1}
                                <p class={"level" + level2Obj.Order}>
                                  {level2Obj.Value}
                                  {#if level2Obj.tooltip && level2Obj.tooltip != ""}
                                    <div class="tooltip-icon">
                                      <img
                                        src={`${$apiDomain}/micwc-external/assets/tool-tip-icon.svg`}
                                        alt=""
                                        on:click={() => toolTipToggle(j, i)}
                                      />
                                      <!-- {#if billsObjectsArray[i].toolTipStylleArray[j]} -->
                                      <div class="tooltip-description">
                                        <!-- style={billsObjectsArray[i]
                                      .toolTipStylleArray[j]} -->
                                        <div class="tooltip-con">
                                          Covers the costs of moving gas from
                                          its source to your premise, other than
                                          the cost of gas itself. <br />
                                          <a
                                            href="#"
                                            on:click={() => {
                                              showToolTipDetails.set(true);
                                            }}>UNDERSTANDING YOUR CHARGES</a
                                          >
                                        </div>
                                      </div>
                                      <!-- {/if}   -->
                                    </div>
                                  {/if}
                                </p>
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
                        {/each}
                      </div>
                    {/if}
                  {:else if section.SectionType == "Total"}
                    <div
                      class="sub-row total-row"
                      id="electric-charges-subtotal"
                    >
                      <p class="first-label">{section.Lable}</p>
                      <p class="value">{section.Value}</p>
                    </div>
                  {/if}
                {/each}
              {/if}
            </div>
            {#if i == $data.Sections.length - 2}
              <div
                class="total"
                style="background-color:{$data.Sections[
                  $data.Sections.length - 1
                ].Color} ;"
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
  .tooltip-icon {
    display: inline;
    // position: relative;
    cursor: pointer;
  }
  .tooltip-description {
    position: absolute;
    right: -100%;
    bottom: 100%;
    z-index: 1;
    min-width: 320px;
    border-radius: 6px;
    padding: 5px 0 32px 6px;
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

    @media screen and (max-width: 480px) {
      left: 0;
      right: unset;
    }
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
    row-gap: 26px;
    hr {
      height: 3px;
      background-color: #eaecee;
      border: none;
    }
  }
  .sub-title {
    h4 {
      font-weight: 400;
      line-height: 29px;
      margin: 16px 0 16px 0;
    }
  }
  .charges-container {
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eaecee;
    display: grid;
    grid-template-columns: 45% auto 1fr auto;
    @media screen and (max-width: 767px) {
      justify-content: unset;
      align-items: center;
      display: flex;
      flex-wrap: wrap;
    }
    @media screen and (min-width: 993px) and (max-width: 1100px) {
      justify-content: unset;
      align-items: center;
      display: flex;
      flex-wrap: wrap;
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
      line-height: 17px;
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
    h6 {
      margin: 13px 0;
    }
    p {
      font-weight: 300;
      font-size: 18px;
    }
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
    margin-top: 24px;

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
    font-weight: 300;
    margin: 0;
    font-size: 18px;
    font-style: italic;
    @media screen and (max-width: 767px) {
      order: 3;
    }
    @media screen and (min-width: 993px) and (max-width: 1100px) {
      order: 3;
    }
  }
  .level3 {
    color: #005faa;
    font-style: italic;
    font-weight: 300;
    margin: 0;
    font-size: 18px;
    font-style: italic;
    @media screen and (max-width: 767px) {
      order: 4;
    }
    @media screen and (min-width: 993px) and (max-width: 1100px) {
      order: 4;
    }
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
    position: relative;
    @media screen and (max-width: 767px) {
      flex: 1 0 66%;
    }
    @media screen and (min-width: 993px) and (max-width: 1100px) {
      flex: 1 0 66%;
    }
  }

  .level4 {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #000000;
    margin: 0;
    grid-column-start: 4;
    text-align: right;
    @media screen and (max-width: 767px) {
      flex: 1 0 25%;
    }
    @media screen and (min-width: 993px) and (max-width: 1100px) {
      flex: 1 0 25%;
    }
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
    padding: 22px 30px;
    height: 70px;
    background: #005faa;
    border-radius: 6px;
  }
  .total-label {
    display: flex;
    align-items: center;
    font-weight: 300;
    font-size: 24px;
    letter-spacing: -0.02em;
    color: #ffffff;
  }
  .total-value {
    font-family: "Interstate";
    font-style: normal;
    font-weight: 400;
    line-height: 42px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #ffffff;
  }
</style>
