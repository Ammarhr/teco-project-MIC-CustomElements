<svelte:options tag="mic-balancesummary" />

<script>
    // @ts-nocheck
    import mask from "../../assets/mask-bs.svg";
    import { fetchstore } from "../../js/store";

    //state
    export let token;
    var newElement;
    let color; // this change the charge color depend in the its value

    //mocking data
    const [data, loading, error, get] = fetchstore(
        "https://miportaldev.tecoenergy.com/api/ibill/webcomponents/v1/Post/BalanceSummary",
        token
    );

    // trigger token existence
    $: if (token && !$data.html_masseges) {
        get(token);
    }

    $: newElement = document.getElementById("info-container"); // trigger "info-container" mounting

    $: if (newElement && $data && $data.html_masseges) {
        // create elements fro html_masseges
        for (let i = 0; i < $data.html_masseges.length; i++) {
            let subEle = document.createElement("div");
            if (i > 0)
                // add border
                subEle.setAttribute(
                    "style",
                    "color: #015faa;border-top: solid 1px #015faa; padding-top:20px;"
                );
            subEle.innerHTML = $data.html_masseges[i].message;
            newElement.appendChild(subEle);
        }
        // dynamic totalAmmount colors
        if ($data.totalAmmount > 0) {
            color = $data.postive_color;
        } else {
            color = $data.negative_color;
        }
    }
</script>

<!--TO_DO-->
<!--Create web component for error messages & loading-->
{#if $loading && !token}
    Loading...
{:else if $error}
<!--error regarding to fetch-->
    Error: {$error} 
{:else if $data && $data.html_masseges}
    <div
        class="tecoGenericShadow roundedRadius20 tecoWhiteBG tecoCard paddingReset"
    >
        <div
            class="tecoBalanceSum roundedRadius20"
            style="background-image:url({mask});"
        >
            <div class="tecoBalanceSection">
                <span>{$data.title}</span>
                <div class="amount">
                    <span style="color: {color};">$</span>
                    <span style="color: {color};">{$data.totalAmmount}</span>
                    <span style="color: {color};">51</span>
                </div>
                <div>
                    <span class="dueLabel">Due Date: </span>
                    <span>{$data.dueDate}</span>
                </div>
                <div>
                    <button type="button" class="payBtn btn"
                        ><a
                            href={$data.pay_now_link}
                            target="_blank"
                            rel="noreferrer">PAY NOW</a
                        ></button
                    >
                </div>
            </div>
            <div
                id="info-container"
                bind:this={newElement}
                class="tecoMessagesSection"
            />
        </div>
    </div>
{:else}
    <h1>failed to load balance summary</h1>
{/if}

<style lang="scss">
    // Typography
    $teco-font-family: "Interstate";

    // Colors
    $teco-white: #ffffff;
    $teco-background-color: #f4f5f7;
    $teco-light-gray: #eaecee;
    $teco-light-blue: #e6eff7;
    $teco-baby-blue: #b1dbfd;
    $teco-midnight-blue: #00294a;
    $teco-sky-blue: #00b6f0;
    $teco-ocean-blue: #5eb0f4;
    $teco-yellow: #ffdc00;
    $teco-orange: #ff832b;
    $teco-green: #24a148;
    $teco-red: #da1e28;
    $teco-dark-grey: #6c6c6c;
    $teco-yellow-shade: rgba(255, 210, 0, 0.15);
    $teco-red-shade: rgba(218, 30, 40, 0.03);
    $screen-md-min: 991px;
    $screen-custom-md-min: 1024px;
    $screen-lg-min: 1200px;

    * {
        margin: 0;
        box-sizing: border-box;
    }

    .tecoLayout {
        font-family: $teco-font-family;
        background-color: whitesmoke;

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
    }

    .tecoPrimaryBG {
        background-color: #005faa;
    }

    .tecoYellowBG {
        background-color: $teco-yellow;
    }

    .tecoWhiteBG {
        background-color: $teco-white;
    }

    .tecoPrimaryColor {
        color: #005faa;
    }

    .tecoOceanBlue {
        color: $teco-ocean-blue;
    }

    .tecoMidnightBlue {
        color: $teco-midnight-blue;
    }

    .tecoGreenColor {
        color: $teco-green;
    }

    .tecoRedColor {
        color: $teco-red;
    }

    .tecoGrayColor {
        color: grey;
    }

    .tecoGrayedLabel {
        color: grey;
    }

    .pointer {
        cursor: pointer;
    }

    .tecoBolder {
        font-weight: 600 !important;
    }

    .marginReset {
        margin: 0 !important;
    }

    .paddingReset {
        padding: 0 !important;
    }

    .roundedTop {
        border-radius: 7px 7px 0 0;
    }

    .roundedBottom {
        border-radius: 0 0 7px 7px;
    }

    .tecoGenericShadow {
        box-shadow: 0px 0px 10px rgba(34, 34, 34, 0.24);
    }

    .roundedRadius20 {
        border-radius: 20px;
    }

    .reverseOrder {
        direction: rtl;
    }

    .m_1 {
        margin-top: 10px;
    }

    .btn {
        cursor: pointer;
    }
    .tecoCard {
        margin: 0 !important;
        margin-top: 15px;
        padding: 15px;

        container-type: inline-size;
        width: 100%;
    }

    .tecoBalanceSum {
        background-position: 98%;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-around;
        flex-direction: row-reverse;
        align-items: center;
        min-height: 275px;
        padding: 30px 15px;

        .tecoBalanceSection {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            color: #005faa;
            border-left: 2px solid #005faa;

            .amount {
                display: flex;
                & :nth-child(1),
                & :nth-child(3) {
                    font-size: 32px;
                }
                & :nth-child(2) {
                    font-size: 64px;
                }
            }

            .payBtn {
                color: $teco-white;
                background-color: #005faa;
                width: 145px;
                border: none;
                padding: 8px 18px;
                border-radius: 6px;
            }
        }

        .tecoMessagesSection {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 20px;

            .messageBox {
                padding: 15px 0;
                // quantity query to apply the style in case of 2 or more messages present
                &:nth-last-child(n + 2),
                &:nth-last-child(n + 2) ~ .messageBox {
                    border-top: 2px solid #005faa;
                }
                &:nth-last-child(n + 2),
                &:nth-last-child(n + 2) ~ .messageBox:first-child {
                    border-top: none;
                }
                // end of quantity query
                .messageLabel {
                    color: #005faa;
                    font-weight: 400;
                }
            }
        }
        a {
            text-decoration: none;
            color: $teco-white;
        }
        // small
        @media (max-width: 600px) {
            flex-direction: column;

            .tecoBalanceSection {
                width: 100%;
                border-bottom: 2px solid #005faa;
                border-left: none;
                padding-bottom: 20px;

                .amount {
                    & :nth-child(2) {
                        line-height: 1;
                    }
                }
            }

            .tecoMessagesSection {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0 20px;
            }
        }
    }
</style>
