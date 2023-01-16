<svelte:options tag={null}/>
<script>
    // @ts-nocheck

    let arr = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    ];
    let page = [];
    let pageNubmer = 0;
    let pageSize = 5;
    let activePageClass = "active";
    let deactivePageClass = "deactive";
    let activePageNumber = 0;
    let pagesRange = [];

    const pagination = (num, prev, next) => {
        console.log("math", Math.ceil((arr.length - 1) / 5));
        if (!prev && !next && !num) {
            // firtst range
            range();
            activePageNumber += 1;
            num = pageNubmer;
            activePageNumber = 1;
        } else if (prev && num % pageSize != 0) {
            pageNubmer -= Math.floor(num % pageSize) + pageSize;
            console.log("here 1 prev", pageNubmer);
        } else if (prev) {
            if (pagesRange[0] > 1) {
                console.log("here 2 prev");
                range(prev, null);
            }
            pageNubmer -= 10;
            activePageNumber -= 1;
            console.log("here 3 prev", pageNubmer, activePageNumber);
        } else if (next) {
            activePageNumber += 1;
            if (
                activePageNumber >= pagesRange.length - 1 &&
                activePageNumber != Math.floor(arr.length / 5)
            ) {
                range(prev, next);
            }
        }
        page = [];
        if (!prev && !next && num) {
            activePageNumber = num;
            num = activePageNumber * pageSize - 5;
            if (
                activePageNumber >= 5 &&
                activePageNumber != Math.floor(arr.length / 5)
            ) {
                range(prev, next, activePageNumber);
            }
        }
        for (let i = num; i < num + pageSize; i++) {
            if (arr[i]) {
                page.push(arr[i]);
                pageNubmer++;
            }
        }
        page = page;
    };

    const range = (prev, next, page) => {
        if (next) {
            if (activePageNumber < Math.floor((arr.length - 1) / 5) ) {
                pagesRange.shift();
                pagesRange.push(
                    parseInt(pagesRange[pagesRange.length - 1]) + 1
                );
            }
        } else if (prev) {
            pagesRange.pop();
            pagesRange.unshift(parseInt(pagesRange[0]) - 1);
        } else if (page) {
            if (page >= 5) {
                pagesRange.shift();
                pagesRange.push(
                    parseInt(pagesRange[pagesRange.length - 1]) + 1
                );
            }
        } else {
            for (let i = 0; i < Math.floor(arr.length / 5) - 1; i++) {
                if (i + 1 > 5) break;
                pagesRange.push(i + 1);
            }
        }
        pagesRange = pagesRange;
    };
    $: if (!page[0]) {
        pagination(pageNubmer);
    }
    //////////
</script>

<div id="tess-pagination">
    <ul>
        {#each page as val, i}
            <li>{val}</li>
        {/each}
        {#if activePageNumber > 1}
            <button
                class="next-prev"
                on:click={() => {
                    pagination(pageNubmer, true, null);
                }}>Previous</button
            >
        {/if}
        {#each pagesRange as val, i}
            {#if val == activePageNumber}
                <button
                    class="page-btn {activePageClass}"
                    on:click={() => {
                        pagination(val);
                    }}>{val}</button
                >
            {:else}
                <button
                    class="page-btn {deactivePageClass}"
                    on:click={() => {
                        pagination(val);
                    }}>{val}</button
                >
            {/if}
        {/each}
        {#if activePageNumber < Math.floor((arr.length - 1) / 5)}
            <button
                class="next-prev"
                on:click={() => {
                    pagination(pageNubmer, null, true);
                }}>Next</button
            >
        {/if}
    </ul>
</div>

<style>
    @font-face {
        font-family: "Interstate";
        src: url("../../assets/fonts/Interstate.ttf") format("truetype");
    }
    * {
        font-family: "Interstate";
    }
    .next-prev {
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
        color: #3c4043;
        background-color: #fff;
        border: none;
        cursor: pointer;
    }
    .page-btn {
        margin-left: 1%;
        border-radius: 5px;
        width: 25px;
        height: 25px;
        cursor: pointer;
        background: #005faa;
        color: #fff;
        border: none;
    }
    .deactive {
        background: #fff;
        color: rgb(0, 0, 0);
        border: none;
    }
    .active {
        background: #005faa;
        color: #fff;
    }
</style>
