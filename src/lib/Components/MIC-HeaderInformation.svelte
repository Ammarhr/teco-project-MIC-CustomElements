<script>
  // @ts-nocheck

  import star from "../../assets/Vector.svg";
  import fire from "../../assets/Fire.svg";
  export let state = {};

  let statusClass = "Inactive";

  $: if (state.account) {
    if (state.account.status == true) {
      statusClass = "Active";
    } else {
      statusClass = "Inactive";
    }
  }
</script>

<div>
  {#if state.account}
    <header>
      <nav>
        <div class="header-container">
          <p class="header-label">Label</p>
          <img src={star} alt="star" class="star" />
          <button class="header-btn" on:click={() => alert("test")}
            >Change Account</button
          >
        </div>
        <div class="account-data-caontainer">
          <div class="gas-logo">
            <span>
              <img src={fire} alt="fire" />
            </span>
            <span class="account-number">
              Account #: <br /> {state.account.accountNumber}</span
            >
          </div>

          <span class="account-adress">Address: {state.account.adress}</span>
          <span class="account-status"
            >Status: <span class={statusClass}>{statusClass}</span></span
          >
        </div>
      </nav>
    </header>
  {:else}
    <div>
      <p>{state.message}</p>
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

  .header-label {
    /* Label */

    width: 62px;
    height: 29px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */

    /* Generic/White */

    color: #ffffff;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .header-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 32px;
    width: 1258px;
    height: 55px;

    /* Teco Primary Blue */

    background: #005faa;
    border-radius: 6px 6px 0px 0px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .header-btn {
    cursor: pointer;
    box-sizing: border-box;
    margin-left: 15px;
    /* Auto layout */

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 20px;
    gap: 10px;

    width: 161px;
    height: 35px;

    /* Generic/White */

    background: #ffffff;
    /* Neutral/300 */

    border: 1px solid #d1d5db;
    /* Drop shadow/XSmall */

    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 6px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-align: center;

    /* Neutral/700 */

    color: #374151;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
  }
  .star {
    position: static;
    left: 8.33%;
    right: 8.33%;
    top: 8.33%;
    bottom: 12.5%;
    padding-left: 5px;
    border-radius: 0.5px;
  }
  .account-data-caontainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 32px;
    gap: 330px;
    width: 1258px;
    height: 61px;
    background: #ffffff;
    border-radius: 0px 0px 6px 6px;
    flex: none;
    order: 1;
    flex-grow: 0;

    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
  .account-number {
    width: 174px;
    height: 38px;    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    flex: none;
    order: 1;
    flex-grow: 0;
  }
  .gas-logo {
    display: flex;
  }
  .account-adress {
    width: 300px;
    height: 19px;    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;
    color: #000000;
    flex: none;
    order: 1;
    flex-grow: 0;
  }
  .account-status {
    width: 150px;
    height: 19px;    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    flex: none;
    order: 2;
    flex-grow: 0;
  }

  .Active {
    color: #24a148;
  }
  .Inactive {
    color: #a12424;
  }
</style>
