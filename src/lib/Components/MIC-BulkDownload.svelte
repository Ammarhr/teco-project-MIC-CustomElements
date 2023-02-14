<svelte:options tag="mic-bulkdownload" />

<script>
    // @ts-nocheck
    import backgroundPattern from "../../assets/mask-bd.svg";
    import {
        fetchstore,
        apiDomain,
        apiToken,
        generalErr,
    } from "../../js/store";
    import setting from "../../js/setting";
    //mocking data
    const [data, loading, error, get] = fetchstore();

    $: if ($apiDomain && $apiToken && !$data.BlkDownload) {
        get(
            $apiToken,
            // "../../data/bulkDownload.json"
            `${
                $apiDomain || setting.env_URL
            }/api/ibill/webcomponents/v1/Post/BulkDownload``https://cdn.${$apiDomain}/gh/Ammarhr/teco-project-MIC-CustomElements@main/data/bulkDownload.json`
        );
    }
    $: if ($error) {
        if ($generalErr == false) generalErr.set(true);
    }
</script>

{#if $loading}
    <mic-loading />
{:else if $error}
    <!--error regarding to fetch-->
{:else if $generalErr == true}
    <div />
{:else if $data.BlkDownload}
    <div
        class="tecoGenericShadow roundedRadius20 tecoCard tecoBillBanner"
        style="background-image:url({`${
            $apiDomain || setting.env_URL
        }/micwc-external/assets/mask-bd.78a6b58f.svg`});"
    >
        <div class="tecoBillBannerBody">
            <p>
                Looking to download more than one bill? Click here to download
                multiple bills
            </p>
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a class="reverseOrder m_1" href={$data.BlkDownload} role="button"
                ><span
                    class="glyphicon glyphicon-chevron-right"
                    aria-hidden="true"
                /> DOWNLOAD BILLS</a
            >
        </div>
    </div>
{:else if $generalErr == true}
    <!--error regarding to fetch-->
{:else}
    <h1 />
{/if}

<style lang="scss">
    // Typography
    $teco-font-family: "Interstate";
    // Colors
    $teco-white: #ffffff;
    $teco-midnight-blue: #00294a;
    $teco-ocean-blue: #5eb0f4;
    $teco-yellow: #ffdc00;
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
        padding: 15px;
        container-type: inline-size;
        width: 100%;
    }
    .tecoBillBanner {
        // image and color
        background-size: cover;
        background-color: #005faa;
        color: white;
        .tecoBillBannerBody {
            min-height: 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            > a {
                text-align: left;
                color: white;
            }
        }
    }
</style>
