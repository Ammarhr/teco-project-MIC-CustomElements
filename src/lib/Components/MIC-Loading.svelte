<svelte:options tag="mic-loading" />

<div class="cardList">
    <div class="preloader" />
</div>

<style lang="scss">
    $blue: #005faa;
    $yellow: #ffc600;
    $white: #ffffff;
    body {
        background-color: $white;
    }
    .cardList {
        padding: 20px;
        width: 100%;
        .preloader {
            width: 48px;
            height: 48px;
            position: relative;
            left: 50%;
            top: 50%;
            background-color: $blue;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            box-sizing: border-box;
            border-style: dotted;
            border-color: $yellow;
            border-width: 1px;
            animation: border1 1.5s infinite ease-in-out;
            &::before {
                content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzciIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAzNyAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMTMuNzg5M0gxNC4zQzE4LjcxNyA2LjgzNjMyIDI0LjkyNSAxLjY3NDMxIDM2LjAyNyAxLjQxMjMxQzIwLjc5MiAtMi41NTI2OSA0Ljk0Mzk5IDMuMDU4MzIgMC4wMDA5OTE4MjEgMTMuNzg5MyIgZmlsbD0iI0ZGQzYwMCIvPgo8L3N2Zz4K");
                position: absolute;
                left: 1px;
                top: 53%;
                transform: translate(0%, -50%) scale(0.9);
                animation: fade1 1.5s infinite ease-in-out;
            }
            &::after {
                content: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgiIGhlaWdodD0iMzciIHZpZXdCb3g9IjAgMCAzOCAzNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjYxNTYgMC4wMTMzMzc4QzkuMTQzNjIgMC4yODEzMzggMy40NjI2MyA1LjcyMDM0IDAuNTE1NjI1IDEyLjIxMzNDMTEuODAxNiA4LjY5NjMzIDI4LjQ3ODYgOS4wMDIzNCAzNy4xMDY2IDE0LjY3MDNDMzQuOTU3NiA2Ljk3NTM0IDI5LjIyNjYgMC45MjEzMzMgMjAuMzE4NiAwLjA5MjMzMjVDMTkuNDIxMiAwLjAwODcyMzYyIDE4LjUxOTUgLTAuMDE4NjYzOSAxNy42MTg2IDAuMDEwMzMxOEwxNy42MTU2IDAuMDEzMzM3OFpNMzYuMTE1NiAxNi44NDIzQzI4LjM2OTYgMTYuODQyMyAyMC4xOTk2IDE5LjY2NjMgMTcuODYxNiAyNS4xMjIzQzE1LjM2NzYgMzAuOTM2MyAxOS4wOTg2IDM3LjA4MDMgMjUuODMyNiAzNi4xMjgzQzMzLjUwODYgMzUuMDQwMyAzOC4zNTA2IDI2LjAyODMgMzcuNjQzNiAxNi44ODMzQzM3LjEzMjYgMTYuODU4MyAzNi42MzE2IDE2Ljg0MjMgMzYuMTE1NiAxNi44NDIzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==");
                position: absolute;
                right: 1px;
                top: 50%;
                transform: translate(0%, -50%) scale(0.9);
                animation: fade2 1.5s infinite ease-in-out;
                animation-delay: 0.3s;
            }
        }
    }

    @keyframes fade1 {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fade2 {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes border1 {
        0% {
            border-style: dotted;
            border-width: 1px;
        }
        50% {
            border-style: solid;
            border-width: 2px;
        }
        100% {
            border-style: dotted;
            border-width: 1px;
        }
    }
    // .card {
    //     width: calc((100% - 60px) / 4);
    //     margin-right: 20px;
    //     width: 80%;

    //     &:nth-child(4n) {
    //         margin-right: 0;
    //     }
    //     &.is-loading {
    //         .component,
    //         h2,
    //         p {
    //             background: #eee;
    //             background: linear-gradient(
    //                 110deg,
    //                 #ececec 8%,
    //                 #f5f5f5 18%,
    //                 #ececec 33%
    //             );
    //             border-radius: 5px;
    //             background-size: 200% 100%;
    //             animation: 1.5s loading linear infinite;
    //         }

    //         .component {
    //             height: 200px;
    //             border-bottom-left-radius: 0;
    //             border-bottom-right-radius: 0;
    //         }

    //         h2 {
    //             height: 30px;
    //         }

    //         p {
    //             height: 70px;
    //         }
    //     }
    // }

    // @keyframes loading {
    //     to {
    //         background-position-x: -200%;
    //     }
    // }
</style>
