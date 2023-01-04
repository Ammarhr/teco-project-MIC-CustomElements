<script>
    // @ts-nocheck
    import backgroundPattern from "../../assets/background-pattern.svg";
    import { fetchstore } from "../../js/store";
    export let token;

    //mocking data
    const [data, loading, error, get] = fetchstore(
        "../../../data/ChargeDetails.json",
        token
    );
</script>

<div class="card">
    <img src={backgroundPattern} alt="" />
    <div class="content">
        <p>
            Looking to download more than one bill? Click here to download
            multiple bills
        </p>
        <div class="download">
            <a href="#as">Download BILLS ></a>
        </div>
    </div>
</div>

<style>
    @font-face {
        font-family: "Interstate";
        src: url("../../assets/fonts/Interstate.ttf");
    }
    * {
        font-family: "Interstate";
    }
    .card {
        max-width: 463px;
        height: 192px;
        filter: drop-shadow(0px 0px 10px rgba(34, 34, 34, 0.25));
        border-radius: 16px;
        background-color: #0073cd;
        position: relative;
        margin-top: 10px;
    }
    .card img {
        border-radius: 16px;
    }
    .content {
        position: absolute;
        top: 0;
        padding: 13px;
    }
    .content p {
        font-style: normal;
        font-weight: 400;
        font-size: 25px;
        line-height: 30px;
        color: #ffffff;
    }
    a {
        font-style: normal;
        text-decoration: none;
        font-weight: 400;
        font-size: 18px;
        line-height: 28px;
        text-transform: uppercase;
        color: #ffffff;
    }
</style>
