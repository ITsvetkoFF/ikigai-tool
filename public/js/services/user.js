import {getValue, setValue} from "../utils/storage.js";
import {user as userUrl, userById as userByIdUrl} from "./urls.js";

const USER_UUID_KEY = 'USER_UUID'

export const defineUser = async () => {
    let userId = getValue(USER_UUID_KEY);

    if (!userId) {
        const resp = await fetch(userUrl, {
            method: "POST"
        })
        if (resp.ok) {
            userId = await resp.text()
            setValue(USER_UUID_KEY, userId)
        }
    }

    const resp = await fetch(userByIdUrl(userId))
    const user = await resp.json()

    return user
}

export const patchUser = async (body) => {
    let userId = getValue(USER_UUID_KEY);

    const resp = await fetch(userByIdUrl(userId), {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}