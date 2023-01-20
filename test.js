var obj = this.mxcontext;
var token = document.querySelector('div.mic-token input').value;
var accountDetails_Url= document.querySelector('div.mic-account-details-url input').value;
var billSelector_Url= document.querySelector('div.mic-bill-selector-url input').value;
var balanceSummary_Url= document.querySelector('div.mic-balance-summary-url input').value;
var bulckDownload_Url= document.querySelector('div.mic-bulk-download-url input').value;

console.info('#this#',accountDetails_Url)
console.info(token,"this is the token")

var accountDeltails= document.querySelector("mic-headerinformation");
var balancSummary= document.querySelector("mic-balancesummary");
var billSelector= document.querySelector("mic-billselector");
var bullkDownload= document.querySelector("mic-bulkdownload");


accountDeltails.setAttribute("token",token );
accountDeltails.setAttribute("url",accountDetails_Url);
billSelector.setAttribute("token",token );
billSelector.setAttribute("url",billSelector_Url);
balancSummary.setAttribute("token",token );
balancSummary.setAttribute("url",balanceSummary_Url);
bullkDownload.setAttribute("token",token );
bullkDownload.setAttribute("url",bulckDownload_Url);