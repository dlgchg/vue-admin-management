import Cookie from 'js-cookie'

const USER_TOKEN = 'user_token'

export function getToken(){
    return Cookie.get(USER_TOKEN)
}

export function setToken(val) {
    Cookie.set(USER_TOKEN, val)
}

export function clearToken() {
    Cookie.remove(USER_TOKEN)
}