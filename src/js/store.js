'use strict';

import { writable, derived } from 'svelte/store';

export const showMessagesModal = writable(false);
export function showmodal() {
    showMessagesModal.set(!showMessagesModal)
}
export const apiToken = writable('')
export function fetchstore(url, token) {
    const loading = writable(false)
    const error = writable(false)
    const data = writable({})

    async function get(token) {
        loading.set(true)
        error.set(false)
        try {
            if (!token) {
                throw new Error( "No Token provided!" )
                // data.set({ errrorMessage: "No Token provided!" })
            } else if (token) {
                const response = await fetch(url)
                //* real api hit with jwt token:
                const Publishresponse = await fetch(url,{
                    method: 'POST', 
                    cache: 'no-cache', 
                    credentials: 'same-origin', 
                    headers: {
                      'Content-Type': 'application/json',
                      "AuthenticationToken" : token
                    },
                      body: {}.json()
                })
                data.set(await Publishresponse.json())
            } else {
                data.set({ errrorMessage: "Invalid Token" })

            }
        } catch (e) {
            error.set(e)
        }
        loading.set(false)
    }

    get(token)

    return [data, loading, error, get]
}

// grtting the token:
export function getToken(url, user) {
    const loading = writable(false)
    const error = writable(false)
    const token = writable({})
    async function get() {
        loading.set(true)
        error.set(false)
        try {
            if (!user) {
                token.set({ errrorMessage: "No user provided!" })
            } else if (user && user == 'Ammar') {
                const response = await fetch(url)
                // token.set(await response.json())
                // console.log('hello from token thing', await response.json());
                apiToken.set(await response.json())
            } else {
                token.set({ errrorMessage: "Invalid user" })
            }
        } catch (e) {
            error.set(e)
        }
        loading.set(false)
    }

    get()

    return [token, loading, error, get]
}


let newDate = new Date();
let year = newDate.getFullYear();
let month = newDate.getMonth();


export const date = writable(month + 1 + ' ' + year);
export const CopmarsionDate = writable(month + 1 + ' ' + (year - 1));
export const billNumber = writable('4646868477');

export const getDate = derived(
    date,
    $date => $date
);
