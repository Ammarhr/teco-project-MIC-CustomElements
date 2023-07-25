// @ts-nocheck
'use strict';

import { writable, derived, get } from 'svelte/store';
import axios from "axios";
// modal hide/show
export const showMessagesModal = writable(false);
export function showmodal() {
    showMessagesModal.set(!showMessagesModal);
}
export const showToolTipDetails = writable(false);
// date for bill selector
let newDate = new Date();
let year = newDate.getFullYear();
let month = newDate.getMonth();
export const date = writable(month + 1 + ' ' + year);
export const CopmarsionDate = writable(month + 1 + ' ' + (year - 1));

//* close all tooltip
export const tooltipShow = writable(false);
export const resetToolTip = (show) => {
    tooltipShow.set(show)
}
//* bill nubmer
export const billNumber = writable(''); // billNimber
export const changeBillNumber = (num) => {
    billNumber.set(num);
}
//* Domain changing
export const apiDomain = writable('')
export const setDomain = (domain) => {
    apiDomain.set(domain);
}
//* api token
export const apiToken = writable({});
export const setToken = (token) => {
    apiToken.set(token);
}
export const eventsDomain = writable('')
export const setEventDomain = (domain) => {
    eventsDomain.set(domain)
}
export const SAPToken = writable("");
export const setSAPTpken = (token) => {
    SAPToken.set(token)
}
export const assetsUrl = writable('')
export const setAssetsUrl = (domain) => {
    assetsUrl.set(domain)
}
//children account flag:
export const isSummaryAccountFlag = writable("false");
export const setSummaryAccountFlag = (flag) => {
    isSummaryAccountFlag.set(flag);
}

// parent account flag
export const isParentAccount = writable("");
export const setIsParentAccount = (flag) => {
    isParentAccount.set(flag);
}
// no charge flage
export const isChargeAmmount = writable("");
export const setIsChargeAmmount = (flag) => {
    isChargeAmmount.set(flag);
}

export const getDate = derived(
    date,
    $date => $date
);
export const generatedFromTable = writable(false);
//* Sunselect array;
export const sunSelectServicesArray = writable([]);
//*geral error flag;
export const generalErr = writable(false);

//* Agint persona:
export const persona = writable('')

let isCollectiveAccount = "";
let parentAccount = ""

function setIsCollectiveAccountFlagHeader() {
    isCollectiveAccount = get(isSummaryAccountFlag);
    parentAccount = get(isParentAccount);
    if (isCollectiveAccount.toLowerCase() == "true") {
        return true;
    } else {
        return false;
    }
}
let headerFlag
//* fetch function
let arrOfRequests = [];
export const pendingRequest = writable([])
export function fetchstore() {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});
    // generalErr.set(false)
    headerFlag = setIsCollectiveAccountFlagHeader()
    const getData = async (token, url, saptoken) => {
        loading.set(true);
        error.set(false);
        try {
            arrOfRequests.push("1s")
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                //* test data
                const Publishresponse = await axios.post(url, JSON.stringify({}), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'UserCredentials': saptoken,
                        'IsCollectiveAccount': headerFlag
                    },
                    withCredentials: true,
                });
                // if (Publishresponse.status !== 204)  
                data.set(await Publishresponse.data);
                // console.log(await Publishresponse);
                loading.set(false);
            } else {
                data.set({ errrorMessage: "Invalid Token" });
            }
        } catch (e) {
            error.set(e);
            generalErr.set(true);
            loading.set(false);
        } finally {
            arrOfRequests.pop()
            pendingRequest.set(arrOfRequests);
        }
    }

    return [data, loading, error, getData]
}
export const fetchDailyUsageChart = () => {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});
    headerFlag = setIsCollectiveAccountFlagHeader()

    const getData = async (token, url, body, saptoken) => {
        loading.set(true);
        error.set(false);
        try {
            arrOfRequests.push("1s")
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                const Publishresponse = await fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                        "UserCredentials": saptoken,
                        "IsCollectiveAccount": headerFlag
                    },
                    body: JSON.stringify(body),
                });
                data.set(await Publishresponse.json());

            } else {
                data.set({ errrorMessage: "Invalid Token" });
            }
        } catch (e) {
            error.set(e);
        } finally {
            arrOfRequests.pop()
            pendingRequest.set(arrOfRequests);
        }
        loading.set(false);
    }

    return [data, loading, error, getData]
}
export const fetchMonthlyUsageChart = () => {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});
    headerFlag = setIsCollectiveAccountFlagHeader()

    const getData = async (token, url, saptoken) => {
        loading.set(true);
        error.set(false);
        try {
            arrOfRequests.push("1s")
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                const Publishresponse = await fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                        "UserCredentials": saptoken,
                        "IsCollectiveAccount": headerFlag
                    },
                    body: JSON.stringify({}),
                });
                // if (Publishresponse.status !== 204)  
                data.set(await Publishresponse.json());
            } else {
                data.set({ errrorMessage: "Invalid Token" });
            }
        } catch (e) {
            error.set(e);
            // generalErr.set(true);
        } finally {
            arrOfRequests.pop()
            pendingRequest.set(arrOfRequests);
        }
        loading.set(false);
    }

    return [data, loading, error, getData]
}
export const fetchRecommendations = () => {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});
    headerFlag = setIsCollectiveAccountFlagHeader();

    const getData = async (token, url, body, saptoken) => {
        loading.set(true);
        error.set(false);
        try {

            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                const Publishresponse = await fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                        "UserCredentials": saptoken,
                        "IsCollectiveAccount": headerFlag
                    },
                    body: JSON.stringify(body),
                });
                // if (Publishresponse.status !== 204)  
                data.set(await Publishresponse.json());
            } else {
                data.set({ errrorMessage: "Invalid Token" });
            }
        } catch (e) {
            error.set(e);
            // generalErr.set(true);
        }
        loading.set(false);
    }

    return [data, loading, error, getData]
}
//* MiJurney helper functions
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
export function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//* MiJureny call
const mijCookie = "MIC-IBLL-MIJ";
export const start = writable('')
let sessionDate = new Date();
let ipify;
const userAgent = navigator.userAgent;
const isMobile = /Mobile/i.test(navigator.userAgent);
let sessionAddress = {
    Country: "",
    State: "",
    City: "",
    County: "",
};
if (!getCookie(mijCookie)) {
    const uuid = crypto.randomUUID();
    setCookie(mijCookie, uuid, 365);
}
//? goelocation:
//* allow location access after user permission.
function getSessionLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            getSessionLocationsuccessCallback,
            getSessionLocationerrorCallback
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
getSessionLocation();
//?

function getSessionLocationsuccessCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    let apikey = "AIzaSyCUpCrEx5Gs1_p6dSgUlCscX2fWZHusWMA";
    fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apikey}`,
        requestOptions
    )
        .then((response) => response.json())
        .then((result) => {

            sessionAddress = {
                City: result.results[0].address_components.find(
                    (el) => el.types[0] == "locality"
                )
                    ? result.results[0].address_components.find(
                        (el) => el.types[0] == "locality"
                    ).short_name
                    : "",
                State: result.results[0].address_components.find(
                    (el) => el.types[0] == "administrative_area_level_1"
                )
                    ? result.results[0].address_components.find(
                        (el) =>
                            el.types[0] == "administrative_area_level_1"
                    ).short_name
                    : "",
                Country: result.results[0].address_components.find(
                    (el) => el.types[0] == "country"
                )
                    ? result.results[0].address_components.find(
                        (el) => el.types[0] == "country"
                    ).short_name
                    : "",
                County: result.results[0].address_components.find(
                    (el) => el.types[0] == "administrative_area_level_2"
                )
                    ? result.results[0].address_components.find(
                        (el) =>
                            el.types[0] == "administrative_area_level_2"
                    ).short_name
                    : "",
            };
        })
        .catch((error) => console.log());
}

function getSessionLocationerrorCallback(error) {
    // console.log(`Error occurred: ${error.message}`);
}

//* get browser name 
let browserName;

if (userAgent.indexOf("Edg") > -1) {
    browserName = "Microsoft Edge";
} else if (userAgent.indexOf("OPR") > -1) {
    browserName = "Opera";
} else if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Firefox";
} else if (userAgent.indexOf("MSIE") > -1) {
    browserName = "Internet Explorer";
} else if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Chrome";
} else if (userAgent.indexOf("Safari") > -1) {
    browserName = "Safari";
}
//*
const ipAdress = async () => {
    const response = await fetch("https://api.ipify.org?format=json", {
        // keepalive: true,
    });
    return await response.json();
}
//*
ipAdress().then((ip) => ipify = ip.ip)
//*

export const fetchAndRedirect = (token, fetchUrl, redirectUrl, fetchBody) => {
    var startTime;

    start.subscribe(value => {
        startTime = value;
    });
    const end = new Date().getTime();
    const totalTime = (end - startTime) / 1000;
    const uuid = getCookie(mijCookie);
    fetch(fetchUrl, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            ...fetchBody,
            EventName: "",
            EventLevel: "",
            timestamp: "",
            AgentId: "",
            SessionDetail: {
                IBillSession: uuid,
                Durationtime: totalTime,
                "Date&Time": sessionDate,
                Browser: browserName,
            },
            DeviceDetails: {
                Device: isMobile ? "Mobile" : "Desktop",
                OriginIP: ipify,
                Country: sessionAddress.Country,
                State: sessionAddress.State,
                City: sessionAddress.City,
                County: sessionAddress.County,
            },
        } || {}),
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            // console.log(error);
        })

    if (redirectUrl) {
        window.open(
            redirectUrl,
            "_blank" // <- This is what makes it open in a new window.
        );
    }
};

export function feedbackCall() {
    const error = writable(false);
    const data = writable({});
    const loading = writable(false);;

    async function setFeedback(token, url, saptoken) {
        loading.set(true)
        error.set(false);
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                const Publishresponse = await fetch(url, {
                    method: 'POST',
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                        "UserCredentials": saptoken
                    },
                    body: JSON.stringify({}),
                });
                data.set(await Publishresponse.json());
            } else {
                data.set({ errrorMessage: "Invalid Token" });

            }
        } catch (e) {
            error.set(e);
        }
        loading.set(false)

    }

    return [data, loading, error, setFeedback]
}

export function errorCallback() {
    const error = writable(false);
    const data = writable({});
    const loading = writable(false);;

    async function errorHandler(token, url, saptoken) {
        loading.set(true)
        error.set(false);
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                const Publishresponse = await fetch(url, {
                    method: 'GET',
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                        "UserCredentials": saptoken
                    },
                });
                data.set(await Publishresponse.json());
            } else {
                data.set({ errrorMessage: "Invalid Token" });
            }
        } catch (e) {
            error.set(e);
        }
    }
    loading.set(false)

    return [data, loading, error, errorHandler]
}

export const latestBill = writable('');
export const newToken = writable('');
export function reGenerateToken() {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});

    async function getToken(oldToken, url, saptoken) {
        loading.set(true);
        error.set(false);
        try {
            arrOfRequests.push("1s");
            pendingRequest.set(arrOfRequests);
            if (!oldToken) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (oldToken) {

                const Publishresponse = await fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${oldToken}`,
                        "UserCredentials": saptoken
                    },
                    body: JSON.stringify({}),
                });
                newToken.set(await Publishresponse.json());
            } else {
                data.set({ errrorMessage: "Invalid Token" });
            }
        } catch (e) {
            error.set(e);
        } finally {
            arrOfRequests.pop()
            pendingRequest.set(arrOfRequests);

        }
        loading.set(false);
    }

    return [data, loading, error, getToken]
}

export function passThroughServiceFetch() {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});
    const getData = async (token, url) => {
        loading.set(true);
        error.set(false);
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                let fetchBody = {
                    modle: {
                        target: url,
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        body: false,
                    }
                }
                window.$.ajax({
                    url: "/InteractiveBill/GetWebComponentData",
                    type: "POST",
                    datatype: "json",
                    data: window.AddAntiForgeryToken({ model: fetchBody.modle }),
                    success: async function (responseData) {
                        let stringResponse = responseData;
                        let parseResponse = JSON.parse(stringResponse);
                        data.set(parseResponse);
                    }
                });
            } else {
                data.set({ errrorMessage: "Invalid Token" });
            }
        } catch (e) {
            error.set(e);
        }
        loading.set(false);
    }

    return [data, loading, error, getData]
}