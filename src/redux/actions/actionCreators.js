import * as actionTypes from '../actions/actionTypes';

export function beginRequest() {
    return {type: actionTypes.BEGIN_REQUEST}
}

export function errorHandler(error) {
    return {type: actionTypes.ERROR, error}
}

export function clearError() {
    return {type: actionTypes.CLEAR_ERROR}
}


export function getUser(data) {
    return {type: actionTypes.USER_DATA, data}
}

export function getUsers(data) {
    return {type: actionTypes.USERS_DATA, data}
}

export function getUserChirps(data) {
    return {type: actionTypes.USER_CHIRPS, data}
}

export function getSubsChirps(data) {
    return {type: actionTypes.SUBSCRIPTION_CHIRPS, data}
}

export function getNumOfFollowers(data) {
    return {type: actionTypes.NUMBER_OF_FOLLOWERS, data}
}

export function getUserDetails(data) {
    return {type: actionTypes.USER_DETAILS, data}
}

export function logout() {
    return {type: actionTypes.USER_LOGOUT}
}