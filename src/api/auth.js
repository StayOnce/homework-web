import request from '../utils/request'

export function setToken(token) {
    localStorage.setItem(
        'token',
        token
    )
}

export function getToken() {
    return localStorage.getItem(
        'token'
    )
}

export function removeToken() {

    localStorage.removeItem(
        'token'
    )

    localStorage.removeItem(
        'role'
    )

}

export function setRole(role){

    localStorage.setItem(
        'role',
        role
    )

}

export function getRole(){

    return localStorage.getItem(
        'role'
    )

}

export function login(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data
    })
}

export function getUserInfo() {
    return request({
        url: '/auth/info',
        method: 'get'
    })
}