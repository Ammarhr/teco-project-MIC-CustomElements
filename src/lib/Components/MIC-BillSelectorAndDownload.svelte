<script>
  // svg imports
  import downloadIcon from "../../assets/Icon-left.svg";
  import line from "../../assets/Line1812.svg";
  import { date, getDate } from "../../js/store";
</script>

<svelte:options tag="mic-billselector" />
<div id="selector-card">
  <div id="selector-container">
    <div id="sub-container">
      <div id="date-container">
        <label for="bill-selector">VIEW PRIOR STATEMENTS</label>
        <!-- <input type="date" name="bill-selector" bind:value={date} /> -->
        <input
          type="date"
          name="bill-selector"
          bind:value={$date}
          on:change={(event) => ($date = event.currentTarget.value)}
        />
      </div>
      <div id="btn-container">
        <button id="btn-download">
          <span>
            <img src={downloadIcon} alt="download icon" />
            Download Bill
          </span>
        </button>
        <button id="show-btn">
          <span> VIEW LATEST BILL </span>
          <img src={line} alt="line icon" />
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  @font-face {
    font-family: "Interstate";
    src: url("../../assets/fonts/Interstate.ttf") format("truetype");
  }
  * {
    font-family: "Interstate";
  }

  #selector-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 51px;
    width: 370px;
    height: 48px;
    flex: none;
    order: 1;
    flex-grow: 0;
  }
  #selector-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 798px;
    height: 140px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 1;
    box-shadow: 0px 0px 10px rgba(34, 34, 34, 0.24);
  }

  #sub-container {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 0px 32px;
    gap: 41px;
    position: absolute;
    width: 770px;
    height: 86px;
    left: 0px;
    top: 26px;
  }

  #date-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
    width: 286px;
    height: 88px;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }

  label {
    width: 286px;
    height: 30px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #000000;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
  }
  input {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px 12px;
    gap: 12px;
    width: 286px;
    height: 50px;
    background: #ffffff;
    border: 1px solid #d1d5db;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 6px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
  }
  #btn-container {
    padding-top: 36px;
    display: flex;
    flex-direction: row;
    gap: 51px;
    flex: none;
    order: 3;
    flex-grow: 0;
    width: 130px;
    height: 0px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
  }
  #btn-download {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 24px;
    gap: 10px;
    width: 189px;
    height: 48px;
    background: #ffffff;
    border: 1px solid #d1d5db;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 6px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #btn-download span {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 7px;
    width: 141px;
    height: 28px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #show-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px 0px;
    gap: 10px;
    width: 130px;
    height: 38px;
    border: 1px solid #d1d5db17;
    border-radius: 6px;
    flex: none;
    order: 0;
    flex-grow: 0;
    background: #ffffff;
    order: 0;
    flex-grow: 0;
  }
  #show-btn span {
    width: 130px;
    height: 28px;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    color: #000000;
    flex: none;
    order: 1;
    flex-grow: 0;
  }
  #show-btn img {
    width: 130px;
    height: 0px;
    border: 1px solid #005faa;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
  }
</style>
