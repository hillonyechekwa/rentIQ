"use server";


import {authFetch} from "./authFetch";
import {BACKEND_URL} from "./contants"

import {getSession} from "./session"


export const getProfile = async () => {
    const response = await authFetch(`${BACKEND_URL}/profile`)

    const result = await response.json();
    return result;
}