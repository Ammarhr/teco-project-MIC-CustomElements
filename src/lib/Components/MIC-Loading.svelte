<svelte:options tag="mic-loading" />

<div class="cardList">
    <div class="card is-loading">
        <div class="component" />
    </div>
</div>

<style lang="scss">
    .cardList {
        display: flex;
        width: 100%;
    }
    .card {
        width: calc((100% - 60px) / 4);
        margin-right: 20px;
        width: 80%;

        &:nth-child(4n) {
            margin-right: 0;
        }
        &.is-loading {
            .component,
            h2,
            p {
                background: #eee;
                background: linear-gradient(
                    110deg,
                    #ececec 8%,
                    #f5f5f5 18%,
                    #ececec 33%
                );
                border-radius: 5px;
                background-size: 200% 100%;
                animation: 1.5s loading linear infinite;
            }

            .component {
                height: 200px;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
            }

            h2 {
                height: 30px;
            }

            p {
                height: 70px;
            }
        }
    }

    @keyframes loading {
        to {
            background-position-x: -200%;
        }
    }
</style>
