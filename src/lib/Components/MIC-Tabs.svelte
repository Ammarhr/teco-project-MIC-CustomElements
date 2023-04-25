<script>
  export let currentPage;
  export let totalPages;
  export let limitPerPage;
  export let onChange;

  const pagesToShow = 5; // number of buttons to show at a time
  const startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  const pages = Array(endPage - startPage + 1)
    .fill()
    .map((_, idx) => startPage + idx);

  function goToPreviousPage() {
    onChange(Math.max(currentPage - 1, 1));
  }

  function goToNextPage() {
    onChange(Math.min(currentPage + 1, totalPages));
  }
</script>

<div class="pagination">
  <button disabled={currentPage === 1} on:click={goToPreviousPage}
    >Previous</button
  >
  {#if startPage > 1}
    <button on:click={() => onChange(1)}>1</button>
    {#if startPage > 2}
      <span>...</span>
    {/if}
  {/if}

  {#each pages as page}
    <button
      class:selected={currentPage === page}
      on:click={() => onChange(page)}>{page}</button
    >
  {/each}

  {#if endPage < totalPages}
    {#if endPage < totalPages - 1}
      <span>...</span>
    {/if}
    <button on:click={() => onChange(totalPages)}>{totalPages}</button>
  {/if}

  <button disabled={currentPage === totalPages} on:click={goToNextPage}
    >Next</button
  >
</div>
