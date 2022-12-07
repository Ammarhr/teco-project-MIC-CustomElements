'use strict';

import { writable, derived } from 'svelte/store';


let token = "55555";

export function fetchstore(url, token) {
    const loading = writable(false)
    const error = writable(false)
    const data = writable({})

    async function get() {
        loading.set(true)
        error.set(false)
        try {
            if (!token) {
                data.set({ errrorMessage: "No Token provided!" })
            } else if (token && token == 'token 2022') {
                const response = await fetch(url)
                data.set(await response.json())
            } else {
                data.set({ errrorMessage: "Invalid Token" })

            }
        } catch (e) {
            error.set(e)
        }
        loading.set(false)
    }

    get()

    return [data, loading, error, get]
}

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
                token.set(await response.json())
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

// console.log('month', month)
export const date = writable(month + 1 + ' ' + year);
export const getDate = derived(
    date,
    $date => $date
);
