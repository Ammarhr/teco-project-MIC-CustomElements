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

//* fetch function
export function fetchstore() {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});
    // generalErr.set(false)
    const get = async (token, url) => {
        loading.set(true);
        error.set(false);
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                //* test data
                // const Publishresponse = await fetch(url)
                //* real api hit with jwt token:
                const Publishresponse = await fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
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
            generalErr.set(true);
        }
        loading.set(false);
    }

    return [data, loading, error, get]
}
export const fetchDailyUsageChart = () => {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});
    // generalErr.set(false)
    const get = async (token, url, body) => {
        loading.set(true);
        error.set(false);
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                //* test data
                // const Publishresponse = await fetch(url)
                //* real api hit with jwt token:
                const Publishresponse = await fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
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
    const get = async (token, url) => {
        loading.set(true);
        error.set(false);
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                //* test data
                // const Publishresponse = await fetch(url)
                //* real api hit with jwt token:
                const Publishresponse = await fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
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
    const get = async (token, url, body) => {
        loading.set(true);
        error.set(false);
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                //* test data
                //* real api hit with jwt token:
                const Publishresponse = await fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
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
            console.log(error);
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

    async function setFeedback(token, url) {
        loading.set(true)
        error.set(false);
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                //* test data
                // const Publishresponse = await fetch(url)
                //* real api hit with jwt token:
                const Publishresponse = await fetch(url, {
                    method: 'POST',
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
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

    async function errorHandler(token, url) {
        loading.set(true)
        error.set(false);
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                //* test data
                // const Publishresponse = await fetch(url)
                //* real api hit with jwt token:
                const Publishresponse = await fetch(url, {
                    method: 'GET',
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
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

    async function getToken(oldToken, url) {
        loading.set(true);
        error.set(false);
        try {
            if (!oldToken) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (oldToken) {
                //* test data
                //* real api hit with jwt token:
                const Publishresponse = await fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${oldToken}`
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
    // generalErr.set(false)
    const get = async (token, url) => {

        // console.log("here start fetch");
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
                        // console.log("this is the string response:", stringResponse);
                        // let secondParser = JSON.parse(parseResponse);
                        // console.log("this is the parsed response:", parseResponse);
                        data.set(parseResponse);
                    }
                });
            } else {
                data.set({ errrorMessage: "Invalid Token" });
                // console.log("we have error regarding to parse!!!!");
            }
        } catch (e) {
            error.set(e);
            // console.log("hello from error");
        }
        loading.set(false);
    }

    return [data, loading, error, get]
}