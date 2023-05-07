<svelte:options tag="mic-recomendation" />

<script>
  // @ts-nocheck
  import {
    fetchstore,
    fetchAndRedirect,
    feedbackCall,
    eventsDomain,
    apiDomain,
    newToken,
    persona,
    fetchRecommendations,
    SAPToken,
  } from "../../js/store";
  // import svg from "../../assets/un-filled-awesome-thumbs-up.svg";
  // import thumbsDown from "../../assets/un-filled-awesome-thumbs-down.svg";
  // import disabledButtons from "../../assets/disabled-feedback-button.svg";
  // import nexPrevBtn from "../../assets/next-svgr.svg";
  import { onMount } from "svelte";
  // import MicCoursel from "./MIC-Coursel.svelte";
  export let token;
  export let body;
  export let billcontractnumber;
  let messages = [];
  let arrOfPopUp = [];
  let comment = "";
  let feedbackBolean = "";
  let index = 0;

  //mocking data
  const [data, loading, error, get] = fetchRecommendations();
  const [feedbackData, feedbackLoading, feedbackError, setFeedback] =
    feedbackCall();

  onMount(() => {
    // console.log("this is nody from recommendations: ",body);
    if (
      body &&
      $SAPToken &&
      token &&
      token !== "" &&
      billcontractnumber &&
      !$data.messages
    ) {
      // let devUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/RecomendationMessages?BillContractNo=${billcontractnumber}`;
      let devUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/RecomendationMessages_New`;
      // let devUrl = "../../../data/recomendationMessages.json";
      get(token, devUrl, body, $SAPToken);
    }
  });
  // getting the data ready
  $: if ($data && $data.messages) {
    messages = $data.messages;
  }
  // main modal fun
  let showModal = false;
  function toggleModal() {
    showModal = !showModal;
  }

  // feedback fun
  const likeDislike = (e, id, i) => {
    let feedbackURL;
    arrOfPopUp[i] = !arrOfPopUp[i];
    thankMoadalShow = !thankMoadalShow;

    feedbackURL = `${$apiDomain}/api/ibill/webcomponents/v1/Post/Recommendationfeedback?MessageId=${id}&Liked=${feedbackBolean}`;
    setFeedback(token, feedbackURL, $SAPToken);

    if (feedbackBolean == "true") {
      fetchAndRedirect(
        token,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "IN_Recommendation_Feedback_Like",
          Outcome: `Recommendation ${id} Cast Submitted.`,
          Feedback: comment,
          Persona: $persona,
        }
      );
    } else {
      fetchAndRedirect(
        token,
        `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
        null,
        {
          EventCode: "IN_Recommendation_Feedback_Dislike",
          Outcome: `Recommendation ${id} Cast Submitted.`,
          Feedback: comment,
          Persona: $persona,
        }
      );
    }
    let devUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/RecomendationMessages_New`;
    // let devUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/RecomendationMessages?BillContractNo=${billcontractnumber}`;
    get(token, devUrl, body, $SAPToken);
  };
  function showPopUpHandle(i, fed) {
    feedbackBolean = "";
    arrOfPopUp[i] = !arrOfPopUp[i];
    feedbackBolean = fed;
  }
  function commentChange(e) {
    comment = e.target.value;
  }
  let thankMoadalShow = false;
  function thankMsg() {
    thankMoadalShow = !thankMoadalShow;
  }
  // coursel fun
  const next = () => {
    index = (index + 1) % messages.length;
  };
  const prev = () => {
    index = (index - 1) % messages.length;
  };
</script>

{#if $data && $data.messages && $data.messages.length > 0}
  <hr id="hr-footer" />
  <div id="footer">
    <p>Recommendations</p>
    <button
      class="enable"
      on:click={() => {
        toggleModal();
        fetchAndRedirect(
          token,
          `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
          null,
          {
            EventCode: "IN_Recommendation_View",
            Outcome: "",
            Persona: $persona,
          }
        );
      }}
    >
      VIEW</button
    >
  </div>
  {#if showModal == true}
    <div class="modal-container">
      <div class="modal-content">
        <div class="card">
          <div class="card-header">
            <h6>INSIGHTS</h6>
            <button
              on:click={() => {
                toggleModal();
                fetchAndRedirect(
                  token,
                  `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
                  null,
                  {
                    EventCode: "IN_Recommendation_Close",
                    Outcome: "",
                    Persona: $persona,
                  }
                );
              }}>×</button
            >
          </div>
          <div class="messages-container">
            <div class="consumption-con">
              {#if messages && messages[1] && messages[1].img && messages[1].img !== ""}
                <div class="hero">
                  {#each [messages[index]] as ele}
                    {#if ele.img}
                      <img
                        class="car_img"
                        src={`data:image/png;base64,${ele.img}`}
                        alt=""
                      />
                    {/if}
                  {/each}
                  <div class="next_btn" on:click={next}>
                    <img
                      class="img_btn"
                      src={`https://tecocdn.azureedge.net/ibill/iBill-assets/next-prev.svg`}
                    />
                  </div>
                  {#if index > 0}
                    <div class="prev_btn" id="prev" on:click={prev}>
                      <img
                        class="img_btn"
                        id="prev-img"
                        src={`https://tecocdn.azureedge.net/ibill/iBill-assets/next-prev.svg`}
                      />
                    </div>
                  {/if}
                </div>
              {:else if messages && messages[0] && messages[0].img && (!messages[1] || (messages[1] && messages[1].img == ""))}
                <img
                  class="car_img"
                  src={`data:image/png;base64,${messages[0].img}`}
                  alt=""
                />
              {/if}
              {#if $data.yearlyPercentageConsumption && $data.monthlyPercentageConsumption}
                <p>
                  You used <span>
                    <strong>{$data.yearlyPercentageConsumption}</strong>
                  </span> than the same period last year.
                </p>
                <p>
                  You used <span>
                    <strong> {$data.monthlyPercentageConsumption}</strong>
                  </span> than the same period last month.
                </p>
              {:else if $data.yearlyPercentageConsumption && !$data.monthlyPercentageConsumption}
                <p>
                  You used <span>
                    <strong> {$data.yearlyPercentageConsumption}</strong>
                  </span> than the same period last year.
                </p>
              {:else if $data.monthlyPercentageConsumption && !$data.yearlyPercentageConsumption}
                <p>
                  You used <span>
                    <strong> {$data.monthlyPercentageConsumption}</strong>
                  </span> than the same period last month.
                </p>
              {:else}
                <p />
              {/if}
            </div>

            {#each messages as message, i}
              <div class="message">
                {@html message.message}
                <div class="react">
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  {#if message.liked.toLowerCase() == "true" || message.liked.toLowerCase() == "false" || $persona == "Agent"}
                    <img
                      src={`https://tecocdn.azureedge.net/ibill/iBill-assets/disabled-feedback-button.svg`}
                      alt=""
                      style="cursor: auto;"
                    />
                  {:else}
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      id="like"
                      on:click={(e) => {
                        showPopUpHandle(i, "true");
                      }}
                    >
                      <path
                        d="M5.09181 11.0239H1.46981C1.18152 11.0239 0.905039 11.1384 0.701187 11.3422C0.497335 11.5461 0.382813 11.8226 0.382812 12.1109L0.382813 22.9809C0.382813 23.2691 0.497335 23.5456 0.701187 23.7495C0.905039 23.9533 1.18152 24.0679 1.46981 24.0679H5.09181C5.2349 24.0684 5.37668 24.0407 5.50902 23.9863C5.64136 23.9319 5.76166 23.8519 5.86302 23.7509C5.96439 23.6499 6.04481 23.5299 6.09969 23.3978C6.15457 23.2656 6.18281 23.1239 6.18281 22.9809V12.1109C6.18281 11.9678 6.15457 11.8261 6.09969 11.694C6.04481 11.5618 5.96439 11.4418 5.86302 11.3408C5.76166 11.2398 5.64136 11.1598 5.50902 11.1055C5.37668 11.0511 5.2349 11.0233 5.09181 11.0239ZM3.28281 22.2529C3.06782 22.2529 2.85766 22.1891 2.67891 22.0697C2.50015 21.9502 2.36083 21.7805 2.27856 21.5818C2.19628 21.3832 2.17476 21.1647 2.2167 20.9538C2.25864 20.7429 2.36217 20.5493 2.51419 20.3972C2.66621 20.2452 2.85989 20.1417 3.07075 20.0997C3.28161 20.0578 3.50017 20.0793 3.69879 20.1616C3.89741 20.2439 4.06718 20.3832 4.18662 20.562C4.30606 20.7407 4.36981 20.9509 4.36981 21.1659C4.36981 21.3086 4.3417 21.45 4.28707 21.5818C4.23244 21.7137 4.15237 21.8335 4.05144 21.9345C3.9505 22.0354 3.83067 22.1155 3.69879 22.1701C3.56691 22.2247 3.42556 22.2529 3.28281 22.2529ZM17.7708 4.56886C17.7708 6.48986 16.5948 7.56886 16.2638 8.84986H20.8698C21.5737 8.8509 22.2495 9.12628 22.7536 9.61754C23.2578 10.1088 23.5506 10.7772 23.5698 11.4809C23.5681 12.308 23.2537 13.1038 22.6898 13.7089C22.9267 14.2962 23.0122 14.9336 22.9387 15.5626C22.8651 16.1916 22.6348 16.792 22.2688 17.3089C22.4417 17.8898 22.4643 18.5051 22.3345 19.0971C22.2048 19.6891 21.9268 20.2385 21.5268 20.6939C21.6318 21.0305 21.6613 21.3861 21.6132 21.7354C21.5652 22.0847 21.4408 22.4191 21.2488 22.7149C20.3248 24.0429 18.0338 24.0619 16.0968 24.0619H15.9678C14.0802 23.982 12.2326 23.4916 10.5538 22.6249C9.80842 22.2423 9.00139 21.9941 8.16981 21.8919C8.02745 21.8892 7.89178 21.8309 7.79194 21.7294C7.69211 21.6279 7.63605 21.4912 7.63581 21.3489V11.6689C7.6358 11.5971 7.65002 11.526 7.67766 11.4597C7.70529 11.3935 7.74579 11.3334 7.79681 11.2829C9.58281 9.51386 10.3538 7.63786 11.8238 6.16486C12.4399 5.39537 12.8371 4.47406 12.9738 3.49786C13.1738 2.65986 13.5968 0.880859 14.5098 0.880859C15.5968 0.880859 17.7708 1.24286 17.7708 4.56886Z"
                        fill="#B1DBFD"
                      />
                    </svg>
                    <hr class="hor-line" />
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      on:click={(e) => {
                        showPopUpHandle(i, "false");
                      }}
                      alt=""
                      id="like"
                    >
                      <path
                        d="M24.1449 3.41686V14.2809C24.1453 14.4236 24.1176 14.565 24.0633 14.6971C24.0091 14.8291 23.9293 14.9491 23.8287 15.0504C23.728 15.1516 23.6084 15.232 23.4767 15.287C23.345 15.342 23.2037 15.3705 23.0609 15.3709H19.4349C19.292 15.3707 19.1505 15.3424 19.0186 15.2875C18.8866 15.2327 18.7668 15.1523 18.6659 15.0511C18.565 14.9498 18.4851 14.8297 18.4307 14.6975C18.3763 14.5654 18.3485 14.4238 18.3489 14.2809V3.41686C18.3489 3.12857 18.4635 2.85209 18.6673 2.64823C18.8712 2.44438 19.1476 2.32986 19.4359 2.32986H23.0609C23.3487 2.33065 23.6244 2.44553 23.8276 2.64929C24.0308 2.85306 24.1449 3.12909 24.1449 3.41686ZM22.3339 12.4729C22.3339 12.2579 22.2702 12.0477 22.1507 11.869C22.0313 11.6902 21.8615 11.5509 21.6629 11.4686C21.4643 11.3863 21.2457 11.3648 21.0349 11.4067C20.824 11.4487 20.6303 11.5522 20.4783 11.7042C20.3263 11.8563 20.2228 12.0499 20.1808 12.2608C20.1389 12.4717 20.1604 12.6902 20.2427 12.8888C20.325 13.0875 20.4643 13.2572 20.643 13.3767C20.8218 13.4961 21.0319 13.5599 21.2469 13.5599C21.5351 13.5596 21.8113 13.445 22.0149 13.2411C22.2186 13.0373 22.3329 12.761 22.3329 12.4729H22.3339ZM10.0169 24.0649C10.9309 24.0649 11.3519 22.2859 11.5529 21.4479C11.6896 20.4717 12.0869 19.5504 12.7029 18.7809C14.1729 17.3079 14.9449 15.4319 16.7379 13.6589C16.789 13.6084 16.8295 13.5483 16.8572 13.482C16.8848 13.4158 16.899 13.3447 16.8989 13.2729V3.59286C16.8987 3.45047 16.8426 3.31385 16.7428 3.21233C16.643 3.11081 16.5073 3.05248 16.3649 3.04986C15.5334 2.9476 14.7263 2.69946 13.9809 2.31686C12.3024 1.45062 10.4552 0.960584 8.56794 0.880859L8.43994 0.880859C6.50294 0.880859 4.21194 0.899859 3.28794 2.22786C3.09599 2.52362 2.97157 2.85805 2.92352 3.20735C2.87547 3.55665 2.90497 3.91225 3.00994 4.24886C2.60991 4.70418 2.33199 5.25359 2.20221 5.84563C2.07244 6.43766 2.09505 7.05295 2.26794 7.63386C1.90206 8.15073 1.67178 8.75118 1.59823 9.38016C1.52467 10.0091 1.61019 10.6465 1.84694 11.2339C1.28022 11.8388 0.963657 12.6359 0.960938 13.4649C0.980444 14.1684 1.27331 14.8367 1.77739 15.3279C2.28147 15.8191 2.95711 16.0946 3.66094 16.0959H8.26094C7.93294 17.3809 6.76094 18.4559 6.76094 20.3809C6.76094 23.7019 8.92994 24.0649 10.0169 24.0649Z"
                        fill="#B1DBFD"
                      />
                    </svg>
                  {/if}
                </div>
              </div>
              {#if arrOfPopUp[i] == true}
                <div class="modal-container">
                  <div class="feedback_modal">
                    <div class="feedback_modal_header">
                      <button
                        on:click={() => {
                          showPopUpHandle(i);
                          fetchAndRedirect(
                            token,
                            `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
                            null,
                            {
                              EventCode: "IN_Recommendation_Feedback_Close",
                              Outcome: `Recommendation ${message.id} Cast Closed.`,
                              Feedback: comment,
                              Persona: $persona,
                            }
                          );
                        }}>×</button
                      >
                      <h4>Lets us know what you think of the recommendation</h4>
                    </div>
                    <h6 class="feedback_label">Comment (Optional)</h6>
                    <textarea
                      placeholder="Start Typing your feedback here"
                      on:change={(e) => {
                        commentChange(e);
                      }}
                    />
                    <div class="feedback_actions">
                      <button
                        class="cancel"
                        on:click={() => {
                          showPopUpHandle(i);
                          fetchAndRedirect(
                            token,
                            `${$apiDomain}/rest/restmijourney/v1/CreateEvent`,
                            null,
                            {
                              EventCode: "IN_Recommendation_Feedback_Close",
                              Outcome: `Recommendation ${message.id} Cast Closed.`,
                              Feedback: comment,
                              Persona: $persona,
                            }
                          );
                        }}>CANCEL</button
                      >
                      <button
                        class="submit"
                        on:click={(e) => {
                          likeDislike(e, message.id, i);
                        }}>SUBMIT</button
                      >
                    </div>
                  </div>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
    {#if thankMoadalShow == true}
      <div class="modal-container">
        <div class="thanks_modal">
          <div class="feedback_modal_header">
            <button on:click={() => thankMsg()}>×</button>
          </div>
          <div class="thx_msg">
            <h4>Thank you for your feedback</h4>
            <span class="link-hypertext" style="display: none;" />
          </div>
        </div>
      </div>
    {/if}
  {/if}
{/if}

<style lang="scss">
  #like {
    path {
      cursor: pointer;
      &:hover {
        fill: #005faa;
      }
    }
  }
  .thanks_modal {
    position: fixed;
    top: 45%;
    background-color: white;
    padding: 13px;
    border-radius: 10px;
    button {
      margin: 0 !important;
      padding: 0 !important;
      font-size: 30px;
      color: #818285;
      background: none;
      border: none;
      cursor: pointer;
    }
  }
  .thx_msg {
    width: 100%;
    margin: 0 auto;
    h4 {
      font-weight: 300;
      font-size: 28px;
      line-height: 34px;
      display: flex;
      align-items: flex-end;
      text-align: center;
      color: #005faa;
      margin: 3px 25px 23px 25px;
      max-width: 254px;
    }
  }
  .feedback_modal {
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 62vw;
    max-height: 100vh;
  }
  .feedback_modal_header {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 767px) {
      align-items: start;
    }
    h4 {
      font-weight: 400;
      font-size: 24px;
      line-height: 29px;
      display: flex;
      align-items: flex-end;
      text-align: center;
      letter-spacing: -0.02em;
      color: #005faa;
      transform: rotate(-0.12deg);
      margin: 0;
    }
    button {
      margin: 0 !important;
      padding: 0 !important;
    }
  }
  .feedback_label {
    margin: 11px 0px 2px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    font-feature-settings: "salt" on;
    color: #005faa;
    transform: rotate(-0.12deg);
  }
  textarea {
    display: flex;
    align-items: center;
    padding: 56px 12px;
    gap: 12px;
    width: 100%;
    max-height: 132px;
    background: #ffffff;
    box-sizing: border-box;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    font-family: "Interstate";
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.02em;
    transform: rotate(-0.12deg);
  }
  .cancel {
    padding: 10px 24px !important;
    width: 164px !important;
    height: 40px !important;
    background: #ffffff !important;
    border: 1px solid #d1d5db !important;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05) !important;
    border-radius: 6px;
    transform: rotate(-0.12deg);
    color: #005faa !important;
    font-weight: 400 !important;
    font-size: 16px !important;
    letter-spacing: -0.02em !important;
    margin: 15px;
  }
  .submit {
    padding: 10px 24px !important;
    width: 164px !important;
    height: 40px !important;
    background: #005faa !important;
    border: 1px solid #d1d5db !important;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05) !important;
    border-radius: 6px;
    transform: rotate(-0.12deg);
    color: #ffffff !important;
    font-weight: 400 !important;
    font-size: 16px !important;
    letter-spacing: -0.02em !important;
    margin: 15px;
  }

  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
    overflow-y: auto;
  }
  .modal-content {
    position: fixed;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    background-color: white;
    /* padding: 20px; */
    border-radius: 10px;
    max-width: 100vw;
    overflow-y: auto;
    max-height: 75%;
    padding: 20px 20px 25px 20px;

    button {
      background: none;
      border: none;
      color: #6b7280;
      font-size: 36px;
      font-weight: 600;
      cursor: pointer;
    }
    img {
      cursor: pointer;
    }
  }
  .consumption-con {
    display: flex;
    flex-direction: column;
    p {
      font-weight: 300;
      margin: 5px;
      span {
        color: #005faa;
        margin: 5px;
      }
    }
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  p {
    font-weight: 300 !important;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 0 25px 0 0%;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(216, 216, 216);
    border-radius: 0 25px 0 0%;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(192, 192, 192, 0.759);
  }
  /*...........................**/
  #footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    width: 100%;
    height: 50px;
    p {
      width: 239px;
      height: 30px;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 30px;
      display: flex;
      align-items: center;
      color: #6c6c6c;
    }
    .enable {
      padding: 8px 20px;
      background: #005faa;
      border-radius: 6px;
      color: white;
      border: none;
      font-weight: 400;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        background-color: #145093;
        /* darker */
      }
      &:active {
        background-color: #004083;
        /* darker */
      }
    }
  }

  #hr-footer {
    border: 1px solid #eaecee;
    width: 100%;
  }

  .card-header {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    width: 100%;
    height: 40px;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  .card-header h6 {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: flex-end;
    text-align: center;
    color: #000000;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  .hero {
    width: 100%;
    position: relative;
    height: 400px;
  }
  .message-img {
    width: 100%;
  }
  .hero p {
    width: 487px;
    height: 30px;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    color: #000000;
    flex: none;
    order: 2;
    flex-grow: 0;
  }
  .hero p span {
    color: #005faa;
  }
  .messages-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .message {
    display: flex;
    flex-direction: column;
    padding: 16px;
    max-width: 688px;
    background: rgba(66, 190, 101, 0.05);
    p {
      font-weight: 400;
      font-size: 20px;
    }
  }
  .link-hypertext {
    font-style: normal;
    color: #005faa;
    font-weight: 300;
    word-wrap: break-word;
    &:hover {
      color: #145093;
    }
    &:active {
      color: #004083;
    }
    &:visited {
      color: #004083;
    }
  }
  .react {
    display: flex;
    flex-direction: row;
    align-self: flex-end;
    justify-content: space-evenly;
    align-items: center;
    background: #ffffff;
    border: 1px solid #e6eff7;
    border-radius: 16px;
    width: 96px;
    height: 39px;
  }
  .thmb-down {
    transform: scaleX(-1);
  }
  .hor-line {
    height: 37px;
    margin: 0;
    border: 1px solid #b0dbfd6e;
  }
  ///*this is the coursel*///
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
