<svelte:options tag="mic-recomendation" />

<script>
    // @ts-nocheck
    import { fetchstore, fetchAndRedirect, feedbackCall } from "../../js/store";
    import setting from "../../js/setting";
    import thumbsUp from "../../assets/un-filled-awesome-thumbs-up.svg";
    import thumbsDown from "../../assets/un-filled-awesome-thumbs-down.svg";
    import disabledButtons from "../../assets/disabled-feedback-button.svg";
    import MicCoursel from "./MIC-Coursel.svelte";

    export let token;
    export let url;
    export let billcontractnumber;
    let fillColor = "#005FAA";
    let unFillColor = "#b1dbfd";
    let messages = [];

    //mocking data
    const [data, loading, error, get] = fetchstore();
    const [feedbackData, feedbackLoading, feedbackError, setFeedback] =
        feedbackCall();

    $: if ( url && token && billcontractnumber && !$data.messages) {

        // let devUrl = `${
        //     url.split("Post")[0]
        // }Post/RecomendationMessages?BillContractNo=${billcontractnumber}`;
        let devUrl = "../../../data/recomendationMessages.json";
        get(token, devUrl);
    }
    // getting the data ready
    $: if ($data && $data.messages) {
        messages = $data.messages;
    }

    let showModal = false;
    function toggleModal() {
        showModal = !showModal;
    }

    const likeDislike = (e, feedBack, id) => {
        let feedbackResponse;
        let feedbackURL;

        if (feedBack == "true") {
            feedbackResponse = "true";
            // e.target.setAttribute(
            //     "style",
            //     "filter: invert(150%) sepia(63%) saturate(6280%) hue-rotate(246deg) brightness(250%) contrast(109%);"
            // );
            // let likeDislikeDiv = document.getElementById("dis-like");
            // likeDislikeDiv.setAttribute("style", "pointer-events: none;");

            feedbackURL = `${setting.feedBack}rest/recommendationsfeedback/v1/Feedback?MessageId=${id}&Liked=${feedbackResponse}`;
            setFeedback(token, feedbackURL);
        } else {
            feedbackResponse = "false";
            // e.target.setAttribute(
            //     "style",
            //     "filter: invert(150%) sepia(63%) saturate(6280%) hue-rotate(246deg) brightness(250%) contrast(109%);"
            // );
            // let likeDislikeDiv = document.getElementById("like");
            // likeDislikeDiv.setAttribute("style", "pointer-events: none;");

            feedbackURL = `${setting.feedBack}rest/recommendationsfeedback/v1/Feedback?MessageId=${id}&Liked=${feedbackResponse}`;
            setFeedback(token, feedbackURL);
        }
        // let devUrl = `${
        //     url.split("Post")[0]
        // }Post/RecomendationMessages?BillContractNo=${billcontractnumber}`;
        let devUrl = "../../../data/recomendationMessages.json";

        get(token, devUrl);
    };
</script>

{#if $data && $data.messages}
    <hr id="hr-footer" />
    <div id="footer">
        <p>Recommendations</p>
        <button
            class=""
            on:click={() => {
                toggleModal();
                fetchAndRedirect(
                    token,
                    `${setting.event_URL}/api/admin/MiJourney/v1/Create/Event?Event=View_Recommendations`
                );
            }}
        >
            VIEW</button
        >
        <div />
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
                                    `${setting.event_URL}/api/admin/MiJourney/v1/Create/Event?Event=Close_Recommendations`
                                );
                            }}>×</button
                        >
                    </div>
                    <div class="messages-container">
                        {#if messages && messages[0].img}
                        <div class="hero">
                            <MicCoursel carouselelements={messages} />
                            <!-- <img
                                src={message.img}
                                alt=""
                                class="message-img"
                                style="cursor: auto;"
                                /> -->
                            </div>
                            {/if}
                            <div class="consumption-con">
                                {#if $data.yearlyPercentageConsumption && $data.monthlyPercentageConsumption}
                                    <p>
                                        You used <span>
                                            {$data.yearlyPercentageConsumption}
                                        </span> than the same period last year.
                                    </p>
                                    <p>
                                        You used <span>
                                            {$data.monthlyPercentageConsumption}
                                        </span> than the same period last year.
                                    </p>
                                {:else if $data.yearlyPercentageConsumption}
                                    <p>
                                        You used <span>
                                            {$data.yearlyPercentageConsumption}
                                        </span> than the same period last year.
                                    </p>
                                {:else if $data.monthlyPercentageConsumption}
                                    <p>
                                        You used <span>
                                            {$data.monthlyPercentageConsumption}
                                        </span> than the same period last year.
                                    </p>
                                {:else}
                                    <p />
                                {/if}
                            </div>
                        {#each messages as message}
                            <div class="message">
                                {@html message.message}
                                <div class="react">
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    {#if message.liked.toLowerCase() == "true" || message.liked.toLowerCase() == "false"}
                                        <!-- style="filter: invert(150%) sepia(63%) saturate(6280%) hue-rotate(246deg) brightness(250%) contrast(109%);" -->
                                        <img
                                            src={disabledButtons}
                                            alt=""
                                            style="cursor: auto;"
                                        />
                                        <!-- <img src={thumbsDown} alt="" /> -->
                                    {:else}
                                        <img
                                            src={thumbsUp}
                                            on:click|once={(e) => {
                                                likeDislike(
                                                    e,
                                                    "true",
                                                    message.id
                                                );
                                            }}
                                            alt=""
                                            id="like"
                                        />
                                        <hr class="hor-line" />
                                        <img
                                            src={thumbsDown}
                                            on:click|once={(e) => {
                                                likeDislike(
                                                    e,
                                                    "false",
                                                    message.id
                                                );
                                            }}
                                            alt=""
                                            id="dis-like"
                                        />
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    {/if}
{/if}

<style lang="scss">
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
        z-index: 3;
    }
    .modal-content {
        position: fixed;
        top: 25px;
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        max-width: 100vw;
        overflow-y: auto;

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
        margin: 5%;
        border: 1px solid #eaecee;
        width: 100%;
    }

    .card {
        // overflow-y: auto;
        max-height: 800px;
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
            line-height: 30px;
            a {
                word-wrap: break-word !important;
            }
        }
        a {
            word-wrap: break-word !important;
        }
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
</style>