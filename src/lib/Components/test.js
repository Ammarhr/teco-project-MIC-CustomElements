setTimeout(() => {



    var element = document.querySelector(".iframe-apple-pay");

    var listener = function (event, iframe) {
        console.log(event);
        console.log(showPopup);

        var cpmessage = event.data.split(':');
        var cpvar = cpmessage[0];
        if (cpvar == "frameHeight") {

        } else if (cpvar == "formError") { $(document).scrollTop(0); }

    }

    function onmessage(msg) {
        var cpvar = msg;
        console.log(msg);
        alert(msg);
    }
    if (window.addEventListener) { addEventListener("message", listener, false); } else { attachEvent("onmessage", listener); }

    function showPopup() {
        // apple pay iframe token URL
        var url = "https://secure1.paymentus.com/xotp/pm/cham?authToken=2D62869B79584B04AE65E514C924BAB8C0AF704B60DD321FA49490BAE8A3C895C70E4518E8A558F36982B2E97A1B845F941DF81A933D66D2F6A8038386685492A96A205A72BD28490F1C10C0779AD5B3B072EA64FFF53E0D55700E5A8BA6810DBC6EE0DCDFDC49CD3B8D7FF33557CC4E5DF7AABC720FA79A406D0E4374FC65A5D9CA0C7E02652B5430CC825CCEDBF703F65BB46B800423576189ACCCA7969D650AA3DD5989A00C3B46B890FD6BE3CF3B4AA14F77A94620941C8F876891056D1FF09D09A4FCDA51B54CFE9851B6998F94B3FA99E06C028BFE3E2E312FA831FC9A8D9D091F746284458BDADB0E946641520211DB1ED410A1FD364186804F3BAE12";
        window.open(url, "iframeTab", "popup");
    }

    let applePayEle = document.createElement("button");


    applePayEle.addEventListener("click", showPopup)
    applePayEle.innerHTML = "Pay Now"

    if (element) {
        element.appendChild(applePayEle)
    }
}, 2000)