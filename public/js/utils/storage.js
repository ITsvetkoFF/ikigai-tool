export const getValue = (key) => window.localStorage.getItem(key)

export const setValue = (key, value) => {
    window.localStorage.setItem(key, value)
}
