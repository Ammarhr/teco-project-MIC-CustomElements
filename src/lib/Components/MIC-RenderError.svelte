<svelte:options tag="mic-render-error" />

<script>
    export let err =
        "something happend while trying to render the web component";
</script>

<div class="container">
    <div>
        <p>{err}</p>
    </div>
</div>

<style lang="scss">
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

    .container {
        width: 100%;


        div {
            box-sizing: border-box;

            /* Auto layout */
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 16px 32px;
            max-width: 1256px;
            left: calc(50% - 1256px / 2 + 2549.5px);
            top: 32.58%;
            bottom: 67.08%;
            background: rgba(218, 30, 40, 0.12);
            border: 1px solid $teco-red;

            p {
                min-width: 693px;
                min-height: 30px;
                font-family: "Interstate";
                font-style: normal;
                font-weight: 300;
                font-size: 20px;
                line-height: 30px;
                color: #000000;
                flex: none;
                order: 0;
                flex-grow: 0;
            }
        }
    }
</style>
