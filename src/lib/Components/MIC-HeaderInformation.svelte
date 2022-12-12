<svelte:options tag="mic-headerinformation" />

<script>
  // @ts-nocheck

  import star from "../../assets/Vector.svg";
  import fire from "../../assets/Fire.svg";
  import { fetchstore } from "../../js/store";
  export let token;
  export let item = { name: "Item" };
  let account;
  let statusClass = "Inactive";

  //mocking data
  const [data, loading, error, get] = fetchstore(
    "../../../data/accountData.json",
    token
  );

  $: if ($data) {
    account = $data.account;
  }

  $: if (account) {
    if (account.status == "Active") {
      statusClass = "Active";
    } else {
      statusClass = "Inactive";
    }
  }
</script>

<div>
  {#if $loading}
    Loading: {$loading}
  {:else if $error}
    Error: {$error}
  {:else if account}
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
              Account #: <br /> {account.accountNumber}</span
            >
          </div>

          <span class="account-adress">Address: {account.adress}</span>
          <span class="account-status"
            >Status: <span class={statusClass}>{statusClass}</span></span
          >
        </div>
      </nav>
    </header>
  {:else}
    <div>
      <p>{$data.errrorMessage}</p>
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
    width: 62px;
    height: 29px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #ffffff;
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .header-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 32px;
    width: 78.625rem;
    height: 3.438rem;
    background: #005faa;
    border-radius: 6px 6px 0px 0px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  .header-btn {
    position: absolute;
    right: 10px;
    cursor: pointer;
    box-sizing: border-box;
    margin-left: 15px;
    padding: 8px 20px;
    gap: 10px;
    width: 163px;
    height: 35px;
    background: #ffffff;
    border: 1px solid #d1d5db;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 6px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #374151;
    order: 1;
    flex-grow: 0;
  }
  .star {
    position: absolute;
    right: 190px;
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
    height: 38px;
    font-style: normal;
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
    height: 19px;
    font-size: 16px;
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
    height: 19px;
    font-style: normal;
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
