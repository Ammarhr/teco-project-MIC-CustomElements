// @ts-nocheck
'use strict';

import { writable, derived } from 'svelte/store';

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
export const apiToken = writable('');
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

export const getDate = derived(
    date,
    $date => $date
);
//* Sunselect array;
export const sunSelectServicesArray = writable([]);
//*geral error flag;
export const generalErr = writable(false);

//* Agint persona:
export const persona = writable('')

//* helper functions
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
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const mijCookie = "MIC-IBLL-MIJ";

if (!getCookie(mijCookie)) {
    const uuid = crypto.randomUUID();
    setCookie(mijCookie, uuid, 365);
}
//* fetch function
export function fetchstore() {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});
    // generalErr.set(false)
    const get = async (token, url, saptoken) => {
        loading.set(true);
        error.set(false);
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                //* test data
                const Publishresponse = await fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                        "UserCredentials": saptoken
                    },
                    body: JSON.stringify({}),
                });
                // if (Publishresponse.status !== 204)  
                data.set(await Publishresponse.json());
                loading.set(false);
            } else {
                data.set({ errrorMessage: "Invalid Token" });
            }
        } catch (e) {
            error.set(e);
            generalErr.set(true);
            loading.set(false);
        }
    }

    return [data, loading, error, get]
}
export const fetchDailyUsageChart = () => {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});
    // generalErr.set(false)
    const get = async (token, url, body, saptoken) => {
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
                        "UserCredentials": saptoken
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

    return [data, loading, error, get]
}
export const fetchMonthlyUsageChart = () => {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});
    // generalErr.set(false)
    const get = async (token, url, saptoken) => {
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
                        "UserCredentials": saptoken
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
        }
        loading.set(false);
    }

    return [data, loading, error, get]
}
export const fetchRecommendations = () => {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});
    // generalErr.set(false)
    const get = async (token, url, body, saptoken) => {
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
                        "UserCredentials": saptoken
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

    return [data, loading, error, get]
}
export const fetchAndRedirect = (token, fetchUrl, redirectUrl, fetchBody) => {
    // if (window.mx === undefined || window.mx === "undefined") {

    fetch(fetchUrl, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(fetchBody || {}),
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
        }
        loading.set(false);
    }

    return [data, loading, error, getToken]
}


export function passThroughServiceFetch() {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});
    const get = async (token, url) => {
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

    return [data, loading, error, get]
}