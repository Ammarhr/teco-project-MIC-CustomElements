<svelte:options tag={"mic-yearlyenergy"} />

<script>
  import { useLazyImage as lazyImage } from "svelte-lazy-image";

  // @ts-nocheck
  export let yearlyarray;
  let yearlyEnergyData;
  let arrayOfToggles = [];

  const toggle = (i) => {
    arrayOfToggles[i] = !arrayOfToggles[i];
  };
  $: if (yearlyarray && yearlyarray[0]) {
    yearlyEnergyData = yearlyarray;
    for (let i = 0; i < yearlyEnergyData.length; i++) {
      arrayOfToggles.push(true);
    }
  }
</script>

{#if yearlyarray && yearlyarray[0]}
  {#each yearlyEnergyData as YearlyValue, i}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if YearlyValue.CurrentBillSurplus && YearlyValue.CurrentBillSurplus !== ""}
      <div class="yearly-energy-card">
        <div class="card-header">
          <h5 class="title">YOUR GENERATED ENERGY SUMMARY</h5>
          <img
            src={`https://tecocdn.azureedge.net/ibill/iBill-assets/toggle.svg`}
            alt=""
            id={"rotate-svg-" + arrayOfToggles[i]}
            on:click={() => toggle(i)}
            aria-expanded={arrayOfToggles[i]}
            use:lazyImage
          />
        </div>
        {#if arrayOfToggles[i]}
          {#if YearlyValue.PreviousYTDBalance !== ""}
            <div class="yearly-content">
              <h2 class="yearly-label">Previous YTD Balance</h2>
              <p>{YearlyValue.PreviousYTDBalance}</p>
            </div>
          {/if}
          {#if YearlyValue.CurrentBillSurplus !== ""}
            <div class="yearly-content">
              <h2 class="yearly-label">This Bill’s Surplus</h2>
              <p>{YearlyValue.CurrentBillSurplus}</p>
            </div>
          {/if}
          {#if YearlyValue.AppliedToCurrentBill !== ""}
            <div class="yearly-content">
              <h2 class="yearly-label">Applied To This Bill</h2>
              <p>{YearlyValue.AppliedToCurrentBill}</p>
            </div>
          {/if}
          {#if YearlyValue.NewYTDBalance !== ""}
            <div class="sum-content">
              <h2 id="sum-label">New YTD Balance</h2>
              <p id="sum-value">{YearlyValue.NewYTDBalance}</p>
            </div>
          {/if}
          <div class="tool-tip">
            <p>
              At the end of each calendar year, your balance will be applied to
              your account on or around your February statement.
            </p>
          </div>
        {/if}
      </div>
    {/if}
  {/each}
{/if}

<style lang="scss">
  .yearly-energy-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: calc(100% - 40px);
    padding: 20px;
    transition: 0.3s;
    border-radius: 16px;
    box-shadow: 0px 0px 10px rgb(34 34 34 / 24%);
    margin-bottom: 15px;
    background-color: #ffff;
    overflow: hidden;
    @media screen and (max-width: 767px) {
      width: 100%;
    }
  }
  .card-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    width: 100%;
    height: 40px;
    cursor: pointer;
  }
  .title {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: #005faa;
  }

  /*----------acordion-------------*/
  #rotate-svg-true {
    cursor: pointer;
    transition: transform 0.2s ease-in;
    transform: rotate(0);
  }
  #rotate-svg-false {
    cursor: pointer;
    transition: transform 0.2s ease-in;
    transform: rotate(180deg);
  }
  /*------------------*/
  .yearly-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #eaecee;
  }
  .yearly-label {
    font-weight: 300;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #000000;
    margin: 0;
  }

  .yearly-content p {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #000000;
  }
  .sum-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 5px;
    border-top: 2px solid #005faa;
  }
  #sum-label {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #005faa;
  }
  #sum-value {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #005faa;
  }
  .tool-tip {
    height: 66px;
    font-family: "Interstate";
    font-style: italic;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #005faa;
    flex: none;
    order: 2;
    flex-grow: 0;
  }
</style>
