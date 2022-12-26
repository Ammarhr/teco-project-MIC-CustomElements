<script>
    // @ts-nocheck

    import { paginate, LightPaginationNav } from "svelte-paginate";

    let arr = [
        1, 21, 65, 46, 84, 96847, 98, 749, 874, 65, 46, 46, 54, 684, 84, 84,
        684, 65, 4, 1, 3, 21, 354, 8, 486, 4, 64, 864, 68, 46, 84, 684, 864,
        684, 68, 468, 4, 684, 64, 5, 43, 21, 31, 4, 5, 46, 4, 684, 684, 68, 46,
        84, 684, 684, 8, 468, 468, 4, 684, 6, 46, 84, 564, 68, 465, 4, 31, 6,
        51, 354, 6, 4,
    ];
    let page = [];
    let pageNubmer = 0;

    const pagination = (num, prev) => {
        if (prev && num % 5 != 0) {
            console.log("it is not mod of 5", Math.floor(num % 5));
            pageNubmer -= Math.floor(num % 5) + 5;
        } else if (prev) {
            pageNubmer -= 10;
        }

        console.log(pageNubmer, "this is the page number");
        num = pageNubmer;
        page = [];
        for (let i = num; i < num + 5; i++) {
            console.log("this is the i", i);
            if (arr[i]) {
                page.push(arr[i]);
                pageNubmer++;
            }
        }
        page = page;
    };
    $: if (arr) {
        console.log("this is the page now", page);
    }
    $: if (!page[0]) {
        pagination(pageNubmer);
    }
    //////////

    let items = arr;
    let currentPage = 1;
    let pageSize = 5;
    $: paginatedItems = paginate({ items, pageSize, currentPage });
</script>

<ul class="items">
    {#each paginatedItems as item}
        <li class="item">
            {item}
        </li>
    {/each}
</ul>

<!-- <LightPaginationNav
    totalItems={items.length}
    {pageSize}
    {currentPage}
    limit={1}
    showStepOptions={true}
    on:setPage={(e) => (currentPage = e.detail.page)}
/> -->

<div id="tess-pagination">
    <ul>
        {#each page as val, i}
            <li>{val}</li>
        {/each}
        {#if pageNubmer > 5}
            <button
                on:click={() => {
                    pagination(pageNubmer, true);
                }}>pre</button
            >
        {/if}
        {#each arr as val, i}
            {#if i % 5 == 0}
                <button>{i / 5 + 1}</button>
            {/if}
        {/each}
        {#if pageNubmer < arr.length - 1}
            <button
                on:click={() => {
                    pagination(pageNubmer);
                }}>next</button
            >
        {/if}
    </ul>
</div>
