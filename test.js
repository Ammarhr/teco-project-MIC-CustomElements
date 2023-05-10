var browserName = "";
var browserVersion = "";

// Get the user agent string
var userAgentString = navigator.userAgent;

// Detect Chrome
if (userAgentString.indexOf("Edg") > -1) {
    browserName = "Microsoft Edge";
}

// Detect Firefox
else if (userAgentString.indexOf("Firefox") > -1) {
    browserName = "Firefox";
}

// Detect Internet Explorer
else if (userAgentString.indexOf("MSIE") > -1) {
    browserName = "Internet Explorer";
}

// Detect Microsoft Edge
else if(userAgentString.indexOf("Chrome") > -1) {
    browserName = "Chrome";
}
// Detect Safari
else if (userAgentString.indexOf("Safari") > -1) {
    browserName = "Safari";
}

console.log("Browser name: " + browserName);
console.log("Browser version: " + browserVersion);