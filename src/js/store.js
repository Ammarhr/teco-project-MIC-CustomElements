'use strict';

import { writable, derived } from 'svelte/store';

// modal hide/show
export const showMessagesModal = writable(false);
export function showmodal() {
    showMessagesModal.set(!showMessagesModal);
}



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

export const getDate = derived(
    date,
    $date => $date
);

//* fetch function
export function fetchstore() {
    const loading = writable(false);
    const error = writable(false);
    const data = writable({});

    async function get(token, url) {
        loading.set(true);
        error.set(false);
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" });
                throw new Error("No Token provided!");
            } else if (token) {
                //* real api hit with jwt token:
                // const Publishresponse = await fetch(url)
                const Publishresponse = await fetch(url, {
                    method: 'POST',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({}),
                })
                data.set(await Publishresponse.json());
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

export const fetchAndRedirect = (token, fetchUrl, redirectUrl) => {
    fetch(fetchUrl, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        // credentials: "include",
        headers: {
            Authorization: `Bearer ${token}`,
        },
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
