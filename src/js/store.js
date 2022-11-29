'use strict';

import { writable, derived } from 'svelte/store';


let apiKey = "55555";

export function fetchstore(url) {
    const loading = writable(false)
    const error = writable(false)
    const data = writable({})

    async function get() {
        loading.set(true)
        error.set(false)
        try {
            const response = await fetch(url)
            data.set(await response.json())
        } catch (e) {
            error.set(e)
        }
        loading.set(false)
    }

    get()

    return [data, loading, error, get]
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
