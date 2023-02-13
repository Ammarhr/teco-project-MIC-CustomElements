<svelte:options tag="mic-coursel" />

<script>
  import nexPrevBtn from "../../assets/next-svgr.svg";
  export let carouselelements;

  let index = 0;

  const next = () => {
    index = (index + 1) % carouselelements.length;
  };
  const prev = () => {
    index = (index - 1) % carouselelements.length;
  };
</script>

  {#each [carouselelements[index]] as ele}
    <img class="car_img" src={ele.img} alt="" />
  {/each}
  <div class="next_btn" on:click={next}>
    <img class="img_btn" src={nexPrevBtn} />
  </div>
  <!-- <button class="next_btn" on:click={next}>Next!</button> -->
  {#if index > 0}
    <div class="prev_btn" id="prev" on:click={prev}>
      <img class="img_btn" id="prev-img" src={nexPrevBtn} />
    </div>

    <!-- <button class="prev_btn" on:click={prev} id="prev">prev!</button> -->
  {/if}

<style>
  .car_img {
    width: 100%;
    max-width: 720px;
    height: 100%;
  }
  .next_btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    height: 100%;
    padding: 0 !important;
    margin: 0 !important;
    border: none;
    width: 25%;
    /* opacity: 0; */
    cursor: pointer;
    background: transparent;
    transition: linear 0.5s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15% 0% 0% 15% / 50% 0% 0% 50%;
  }
  .prev_btn {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 0;
    height: 100%;
    padding: 0 !important;
    margin: 0 !important;
    border: none;
    width: 25%;
    /* opacity: 0; */
    cursor: pointer;
    background: rgba(255, 255, 255, 0);
    transition: linear 1.5s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0% 15% 15% 0% / 0% 50% 50% 0%;
  }
  .prev_btn:hover {
    background: rgb(245, 245, 245);
    background: linear-gradient(
      90deg,
      rgba(245, 245, 245, 0.2) 0%,
      rgba(245, 245, 245, 0.05) 100%
    );
  }
  .next_btn:hover {
    background: rgb(245, 245, 245);
    background: linear-gradient(
      90deg,
      rgba(245, 245, 245, 0.05) 0%,
      rgba(245, 245, 245, 0.2) 100%
    );
  }
  .img_btn {
    position: absolute;
    right: 15px;
    width: 25px;
    opacity: 50%;
  }

  #prev-img {
    position: absolute;
    left: 15px;
    transform: rotate(180deg);
  }
</style>