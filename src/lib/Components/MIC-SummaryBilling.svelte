<svelte:options tag="mic-summarybilling" />

<script>
  // @ts-nocheck
  import {
    fetchstore,
    apiDomain,
    apiToken,
    newToken,
    persona,
    fetchAndRedirect,
    SAPToken,
  } from "../../js/store";
  import { onMount } from "svelte";

  let items;
  let tableData;
  let pageSize = 5; // number of items per page
  let pagenateItems = [];
  let currentPage = 0;
  let selectedAccount;
  let isOpen = true;
  let svgId = "rotate-svg-" + isOpen;
  let styleSelectedRows = [];
  let timeoutId;
  let avgClass = "red";
  const [data, loading, error, get] = fetchstore(); // initial store fetch
  $: searchInput = document.getElementById("#search");
  // fetch accountTable fetch api on component mount
  onMount(() => {
    if ($apiToken && $SAPToken && $apiDomain && !$data.results) {
      get(
        $apiToken,
        // `${$apiDomain}/api/ibill/webcomponents/v1/Post/SummaryBilling`,
        "../../data/SummaryBilling.json",
        $SAPToken
      ).then(() => {});
    }
  });

  const handleSelecteAccount = (accountObj, i) => {
    styleSelectedRows = [];
    if (accountObj) {
      selectedAccount = accountObj;
    } else {
      selectedAccount = pagenateItems[0];
    }

    // change the style of the selected table row:
    if (i) {
      styleSelectedRows[i] =
        "background-color:#fff9ce; color:#005FAA; font-weight: 400;";
    } else {
      styleSelectedRows[0] =
        "background-color:#fff9ce; color:#005FAA; font-weight: 400;";
    }
  };

  $: if ($data && $data.Accounts) {
    tableData = $data.Accounts;
    selectedAccount = $data.Accounts[0];
    items = $data.Accounts;
    getPaginatedItems();
  }

  ///////// pagination:
  function nextPage() {
    currentPage++;
    getPaginatedItems();
  }

  function prevPage() {
    currentPage--;
    getPaginatedItems();
  }
  function goToPage(page) {
    currentPage = page;
    getPaginatedItems();
  }
  function getPaginatedItems() {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    pagenateItems = items.slice(startIndex, endIndex);
    getPagesToShow();
    handleSelecteAccount();
  }

  function getCurrentPage() {
    return currentPage + 1;
  }
  function getTotalPages() {
    return Math.ceil(items.length / pageSize);
  }
  let arrayOfBtns = [];
  let totalPagesShowen;
  function getPagesToShow() {
    const totalPages = getTotalPages();
    totalPagesShowen = getTotalPages();
    const currentPageIndex = currentPage;
    const startPageIndex = Math.max(0, currentPageIndex - 2);
    const endPageIndex = Math.min(totalPages - 1, currentPageIndex + 2);
    arrayOfBtns = Array(endPageIndex - startPageIndex + 1)
      .fill()
      .map((_, idx) => startPageIndex + idx);
  }
  /// card toggle
  const cardToggle = () => {
    isOpen = !isOpen;
    svgId = "rotate-svg-" + isOpen;
  };

  ////// search & filter
  const handleSearch = (event) => {
    currentPage = 0;
    let str;
    event.preventDefault();
    if (event.target.search) {
      str = event.target.search.value;
    } else if (event.target.value) {
      str = event.target.value;
    } else if (searchInput && searchInput.value) {
      str = searchInput.value;
    }
    let searchArray = [];
    if (str == "" || str == undefined) {
      items = $data.Accounts;
      getPaginatedItems();
    } else if (str) {
      searchArray = $data.Accounts.filter((account) => {
        return account.AccountNumber?.toLowerCase().includes(str.toLowerCase());
      });
    }
    if (searchArray[0]) {
      items = searchArray;
      getPaginatedItems();
    }
  };

  /// sorting
  import {
    sortByService,
    sortByAccountNumber,
    sortByServiceAddress,
    sortByCurrentCharges,
    sortByStatus,
  } from "../../js/sorting-bundle";
  let activeSort, prevSortth, sortingType;
  const handleSort = (register) => {
    sortUiObj.activeSort = register;
    activeSort = register;
    if (prevSortth !== undefined && prevSortth !== activeSort) {
      sortUiObj.sortingType = "asen";
      sortingType = "asen";
    } else if (prevSortth !== undefined && prevSortth == activeSort) {
      if (sortingType == "asen") {
        sortUiObj.sortingType = "des";
        sortingType = "des";
      } else {
        sortUiObj.sortingType = "asen";
        sortingType = "asen";
      }
    } else {
      sortUiObj.sortingType = "asen";
      sortingType = "asen";
    }
    if (items && items.length > 1) {
      switch (true) {
        case register == "0":
          items = sortByService(sortingType, items);
          break;
        case register == "1":
          items = sortByAccountNumber(sortingType, items);
          break;
        case register == "2":
          items = sortByServiceAddress(sortingType, items);
          break;
        case register == "3":
          items = sortByCurrentCharges(sortingType, items);
          break;
        case register == "4":
          items = sortByStatus(sortingType, items);
          break;
        default:
          break;
      }
      prevSortth = register;
      getPaginatedItems();
    }
  };
  /// sorting:
  let sortUiObj = {
    sortingType: "",
    activeSort: "",
  };
  const renderSortSvg = (thIndex) => {
    if (items && items.length > 1) {
      if (activeSort == thIndex && sortingType == "asen") {
        return '<img src=https://tecocdn.azureedge.net/ibill/iBill-assets/sort-up.svg  alt="sort"/>';
      } else if (activeSort == thIndex && sortingType == "des") {
        return '<img src=https://tecocdn.azureedge.net/ibill/iBill-assets/sort-down.svg alt="sort" />';
      } else {
        return '<img src=https://tecocdn.azureedge.net/ibill/iBill-assets/sort.svg  alt="sort"  />';
      }
    } else {
      return "";
    }
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="account-con">
  <div class="account-card">
    <div id="account-header" on:click={cardToggle} aria-expanded={isOpen}>
      <h4 id="title">Your AccountS</h4>
      <img
        src={`https://tecocdn.azureedge.net/ibill/iBill-assets/toggle.svg`}
        alt="toggle"
        id={svgId}
      />
    </div>

    {#if isOpen}
      <div class="tool-bar">
        {#if tableData && tableData.length > 5}
          <div class="summary-account">
            <p><span class="sub-title">Summary Account:</span> #2234567890</p>
            <p><span class="sub-title">Statement Date: </span> Nov 30, 2021</p>
          </div>
          <div
            class="search"
            on:submit={(e) => {
              clearTimeout(timeoutId);
              handleSearch(e);
            }}
          >
            <input
              type="text"
              id="search"
              placeholder="Search"
              bind:this={searchInput}
              on:input={(e) => {
                clearTimeout(timeoutId); // Clear any existing timeout
                timeoutId = setTimeout(() => {
                  handleSearch(e);
                }, 750);
              }}
            />
            <button type="submit">
              <img
                src={`https://tecocdn.azureedge.net/ibill/iBill-assets/search.svg`}
                alt=""
              />
            </button>
          </div>
        {/if}
      </div>
      <div class="table-container">
        {#if items}
          {#if tableData}
            <table class="table" id="table">
              <tr>
                <th on:click={() => handleSort("0")}>
                  Service
                  {#key sortUiObj}
                    {@html renderSortSvg(0)}
                  {/key}
                </th>
                <th on:click={() => handleSort("1")}>
                  Account Number
                  {#key sortUiObj}
                    {@html renderSortSvg(1)}
                  {/key}
                </th>
                <th on:click={() => handleSort("2")}>
                  Service Address
                  {#key sortUiObj}
                    {@html renderSortSvg(2)}
                  {/key}
                </th>
                <th on:click={() => handleSort("3")}>
                  Current Charges
                  {#key sortUiObj}
                    {@html renderSortSvg(3)}
                  {/key}
                </th>
                <th on:click={() => handleSort("4")}>
                  Status
                  {#key sortUiObj}
                    {@html renderSortSvg(4)}
                  {/key}</th
                >
              </tr>
              {#each pagenateItems as row, i}
                <tr
                  style={styleSelectedRows[i]}
                  class="table-row"
                  on:click={() => {
                    handleSelecteAccount(row, i);
                  }}
                >
                  <td>
                    <div class="td-value">
                      <img
                        src={`https://tecocdn.azureedge.net/ibill/iBill-assets/${row.Service.toLowerCase()}Service.svg`}
                        alt={row.Service}
                      />
                    </div>
                  </td>
                  <td>
                    <div class="td-value">
                      {#if row.AccountNumber != ""}
                        {row.AccountNumber}
                      {/if}
                    </div></td
                  >
                  <td>
                    <div class="td-value">
                      {#if row.ServiceAddress != ""}
                        {row.ServiceAddress}
                      {/if}
                    </div></td
                  >
                  <td>
                    <div class="td-value">
                      {#if row.CurrentCharges != ""}
                        ${row.CurrentCharges}
                      {/if}
                    </div></td
                  >
                  <td>
                    <div class="td-value">
                      <p>
                        {#if row.Status == true}
                          <span
                            class={avgClass}
                            style="background: rgba(36, 161, 72, 0.03); border: 1px solid #24A148;"
                          >
                            <span class="status"> Active </span>
                          </span>
                        {:else}
                          <span
                            class={avgClass}
                            style="background-color:rgba(218, 30, 40, 0.03); border: 1px solid #DA1E28;"
                          >
                            <span class="status"> Inactive </span>
                          </span>
                        {/if}
                      </p>
                    </div></td
                  >
                </tr>
              {/each}
            </table>
          {/if}
        {/if}
      </div>
      {#if tableData && tableData.length > 5}
      <div class="pagination-options">
        <div>
          <p class="showing">
            Showing {pagenateItems.length} Of {items.length} Results
          </p>
        </div>
        {#if items && items.length > 5}
          <div class="pagination-btns">
            <button
              on:click={prevPage}
              disabled={currentPage === 0}
              class="prev-next" 
            >
              <img
                src={`https://tecocdn.azureedge.net/ibill/iBill-assets/prev.svg`}
                alt=""
              />
              Previous
            </button>
            {#each arrayOfBtns as pageIndex}
              <button
                on:click={() => goToPage(pageIndex)}
                class:selected={pageIndex === currentPage}
                disabled={currentPage === pageIndex}
                class="page-btn"
              >
                {#key pageIndex}
                  {pageIndex + 1}
                {/key}
              </button>
            {/each}
            <button
              on:click={nextPage}
              disabled={currentPage === totalPagesShowen - 1}
              class="prev-next"
            >
              Next
              <img
                src={`https://tecocdn.azureedge.net/ibill/iBill-assets/next.svg`}
                alt=""
              />
            </button>
          </div>
        {/if}
      </div>
    {/if}
    {/if}
  </div>

  <div class="account-details account-card">
    <p>
      Service Address: <span
        >{selectedAccount && selectedAccount.ServiceAddress
          ? selectedAccount.ServiceAddress
          : ""}</span
      >
    </p>
    {#if selectedAccount && selectedAccount.AccountName}
      <p>Contact Name: <span>{selectedAccount.AccountName}</span></p>
    {/if}
    <p>
      Status: <span
        class="acc-status"
        style={selectedAccount && selectedAccount.Status == true
          ? "color:#24a148;"
          : "color:#DA1E28"}
        >{selectedAccount && selectedAccount.Status == true
          ? "Active"
          : "Inactive"}
      </span>
    </p>
  </div>
</div>

<style lang="scss">
  * {
    font-family: "Interstate";
  }
  .account-con {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .account-details {
    display: flex;
    flex-direction: row !important;
    justify-content: space-between;
    p {
      margin: 0;
      font-size: 20px;
      font-weight: 300;
      color: #005faa;
      font-size: 20px;
      span {
        font-weight: 400;
      }
    }
  }
  .acc-status {
    color: #24a148;
  }
  .red {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    gap: 8px;
    height: 38px;
    border-radius: 24px;
    width: fit-content;
  }
  .status {
    width: max-content;
    font-weight: 400;
    font-size: 18px;
    color: #000000;
  }
  #account-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
  }
  .account-card {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 16px;
    padding: 20px;
    background-color: #ffffff;
  }
  #title {
    margin: 3px 0;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    color: #005faa;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  #rotate-svg-false {
    cursor: pointer;
    transform: rotate(180deg);
    transition: transform 0.2s ease-in;
  }
  #rotate-svg-true {
    cursor: pointer;
    transition: transform 0.2s ease-in;
    // transform: rotate(180deg);
  }
  .table-container {
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    width: 100%;
    height: fit-content;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    overflow-x: auto;
  }
  table {
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid rgb(0 0 0 / 5%);
    min-width: 900px;
    width: 100%;
    margin: 10px auto 20px auto;
    border-radius: 6px;
    text-align: center !important;
  }
  th {
    box-sizing: border-box;
    width: fit-content;
    height: 50px;
    background: #005faa;
    border-right: 1px solid #ffffff;
    color: #ffffff;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    cursor: pointer;
    &:first-child {
      border-radius: 6px 0px 0px 0px;
    }
    &:last-child {
      border-radius: 0px 6px 0px 0px;
    }
  }
  .pagination-btns {
    display: flex;
    align-items: center;
    gap: 4px;
    @media screen and (max-width: 480px) {
      gap: 0;
    }
  }
  .prev-next {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    cursor: pointer;
  }
  .prev-next[disabled] {
    display: none;
  }
  .page-btn {
    background: none;
    border: none;
    border-radius: 6px;
    padding: 8px;
    min-width: 36px;
    height: 36px;
    cursor: pointer;
    @media screen and (max-width: 480px) {
      min-width: 28px;
    }
  }
  .page-btn[disabled] {
    background: #005faa;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px;
    min-width: 36px;
    height: 36px;
    cursor: default;
  }
  .table-row {
    width: 45px;
    height: 50px;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.02em;
    font-style: normal;
    cursor: pointer;
    text-align: center;
    color: #000000;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  tr:hover {
    background-color: #e6eff7;
  }
  tr {
    &:last-child {
      td {
        &:first-child {
          border-radius: 0 0 0 6px;
        }
        &:last-child {
          border-radius: 0 0 6px 0;
        }
      }
    }
  }
  td {
    padding: 12px;
    border: 1px solid rgba(194, 194, 194, 0.749);
    transition: background-color 0.4s;
  }
  .apexcharts-tooltip-y-group {
    display: none !important;
  }
  .td-value {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    column-gap: 5px;
    img {
      width: 24px;
    }
    p {
      margin: 0;
    }
  }
  .pagination-options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    @media screen and (max-width: 480px) {
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  }
  h4 {
    margin: 0;
    padding: 0;
  }

  .search {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: relative;
    width: fit-content;
    max-width: 100%;
    input {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      display: flex;
      align-items: center;
      letter-spacing: -0.02em;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px 12px;
      gap: 12px;
      width: 280px;
      height: 40px;
      background: #ffffff;
      border: 1px solid #d1d5db;
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
      border-radius: 6px;
      padding-right: 40px;
    }

    button {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      width: 40px;
      display: flex;
      padding: 0;
      border: none;
      height: 100%;
      justify-content: center;
      align-items: center;
      background: none;
      cursor: pointer;
      img {
        width: 20px;
      }
    }
  }
  .summary-account {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    gap: 15px;
    p {
      margin: 0;
      font-weight: 400;
    }
  }
  .sub-title {
    font-weight: 300;
    color: #6c6c6c;
  }
  .tool-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .showing {
    font-weight: 300;
    font-size: 16px;
    color: #005faa;
  }

  @media screen and (max-width: 1000px) {
    .account-card {
      display: flex;
      flex-direction: column;
      row-gap: 2rem;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      transition: 0.3s;
      border-radius: 16px;
      padding: 20px;
    }
    .table-container {
      overflow: auto;
    }
  }

  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(187, 187, 187);
    border-radius: 3px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
</style>
