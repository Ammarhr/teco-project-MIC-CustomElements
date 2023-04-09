let fetchBody = {
    modle: {
        target: "https://miportaldev.tecoenergy.com/api/ibill/webcomponents/v1/Post/BalanceSummary",
        method: "POST",
        headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE2ODA4MDY3NTksImlzcyI6IjExMDA1NDI1MTMtMjExMDA1NTg1NTUyLTY3ODU0MzI2NjczMy02Nzg1NDMyNjY3MzMiLCJleHAiOjE2ODEyMzg3NTksImlhdCI6MTY4MDgwNjc1OX0.msjrGgrfHT0NgkC9DawfWzgVQLBcpO09LmGQ78tvGJk`
        },
        body: false,
    }
}

const Publishresponse = await fetch("/InteractiveBill/GetWebComponentData", {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE2ODA4MDY3NTksImlzcyI6IjExMDA1NDI1MTMtMjExMDA1NTg1NTUyLTY3ODU0MzI2NjczMy02Nzg1NDMyNjY3MzMiLCJleHAiOjE2ODEyMzg3NTksImlhdCI6MTY4MDgwNjc1OX0.msjrGgrfHT0NgkC9DawfWzgVQLBcpO09LmGQ78tvGJk`
    },
    body: window.AddAntiForgeryToken({ model: fetchBody.modle })
});
// console.log("response: ",await Publishresponse.json());
let stringResponse = await Publishresponse.text();
console.log("this is text res: ", stringResponse);
// console.log("this is the string response:", stringResponse);
let parseResponse = JSON.parse(stringResponse);
let secondParser = JSON.parse(parseResponse);
