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
    } from "../../js/store";
    // import thumbsUp from "../../assets/un-filled-awesome-thumbs-up.svg";
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
            token &&
            token !== "" &&
            billcontractnumber &&
            !$data.messages
        ) {
            // let devUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/RecomendationMessages?BillContractNo=${billcontractnumber}`;
            let devUrl = `${$apiDomain}/api/ibill/webcomponents/v1/Post/RecomendationMessages_New`;
            // let devUrl = "../../../data/recomendationMessages.json";
            get(token, devUrl, body);
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
        setFeedback(token, feedbackURL);

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
        get(token, devUrl, body);
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
            class=""
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
                                        <div
                                            class="prev_btn"
                                            id="prev"
                                            on:click={prev}
                                        >
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
                                        {$data.yearlyPercentageConsumption}
                                    </span> than the same period last year.
                                </p>
                                <p>
                                    You used <span>
                                        {$data.monthlyPercentageConsumption}
                                    </span> than the same period last month.
                                </p>
                            {:else if $data.yearlyPercentageConsumption && !$data.monthlyPercentageConsumption}
                                <p>
                                    You used <span>
                                        {$data.yearlyPercentageConsumption}
                                    </span> than the same period last year.
                                </p>
                            {:else if $data.monthlyPercentageConsumption && !$data.yearlyPercentageConsumption}
                                <p>
                                    You used <span>
                                        {$data.monthlyPercentageConsumption}
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
                                        <img
                                            src={`https://tecocdn.azureedge.net/ibill/iBill-assets/un-filled-awesome-thumbs-up.svg`}
                                            on:click={(e) => {
                                                showPopUpHandle(i, "true");
                                            }}
                                            alt=""
                                            id="like"
                                        />
                                        <hr class="hor-line" />
                                        <img
                                            src={`https://tecocdn.azureedge.net/ibill/iBill-assets/un-filled-awesome-thumbs-down.svg`}
                                            on:click={(e) => {
                                                showPopUpHandle(i, "false");
                                            }}
                                            alt=""
                                            id="dis-like"
                                        />
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
                                                            EventCode:
                                                                "IN_Recommendation_Feedback_Close",
                                                            Outcome: `Recommendation ${message.id} Cast Closed.`,
                                                            Feedback: comment,
                                                            Persona: $persona,
                                                        }
                                                    );
                                                }}>×</button
                                            >
                                            <h4>
                                                Lets us know what you think of
                                                the recommendation
                                            </h4>
                                        </div>
                                        <h6 class="feedback_label">
                                            Comment (Optional)
                                        </h6>
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
                                                            EventCode:
                                                                "IN_Recommendation_Feedback_Close",
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
                                                    likeDislike(
                                                        e,
                                                        message.id,
                                                        i
                                                    );
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
                    </div>
                </div>
            </div>
        {/if}
    {/if}
{/if}

<style lang="scss">
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
    }
    #footer p {
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
    #footer button {
        padding: 8px 20px;
        background: #005faa;
        border-radius: 6px;
        color: white;
        border: none;
        font-weight: 400;
        font-size: 18px;
        cursor: pointer;
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
            a {
                overflow-wrap: anywhere !important;
            }
        }
        a {
            overflow-wrap: anywhere !important;
        }
    }
    a {
        overflow-wrap: anywhere !important;
    }
    .react {
        display: flex;
        flex-direction: row;
        align-self: flex-end;
        justify-content: space-evenly;
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
