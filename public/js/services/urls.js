export const API_URL = '/api/v1/'

const USERS_URL = 'users/'

export const user = `${API_URL}${USERS_URL}`
export const userById = (id) => `${user}${id}`
