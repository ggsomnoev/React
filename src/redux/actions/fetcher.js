import { appKey, appSecret } from '../../utils/kinveyData';
import { beginRequest, errorHandler, getUser, getUserChirps, getSubsChirps, getNumOfFollowers, getUsers, getUserDetails, logout } from '../actions/actionCreators';

export function fetchUser(formName, data, dispatch) {
    function request(formName, data) {
        let url = "https://baas.kinvey.com/user/" + appKey;
        let headers = {
            method: "POST",
            headers: {
                Authorization: "Basic " + btoa(appKey + ":" + appSecret),
                "Content-Type": "application/json"
            }
        }
        if (formName === 'login') {
            url += "/login";
            headers.body = JSON.stringify(data);
        } else if (formName === 'register') {
            headers.body = JSON.stringify({
                username: data.username,
                password: data.password,
                subscriptions: []
            });
        }

        return { url, headers }
    }
    return () => {
        let { url, headers } = request(formName, data);
        dispatch(beginRequest());
        return fetch(url, headers)
            .then(res => res.json())
            .then(json => {
                const USER = {
                    id: json._id,
                    username: json.username,
                    authtoken: json._kmd.authtoken,
                    subs: json.subscriptions
                }
                dispatch(getUser(USER));
            })
            .catch(e => dispatch(errorHandler(e)));
    }
}

export function fetchUserChirps(id, authtoken, dispatch) {
    return () => {
        let url = "https://baas.kinvey.com/appdata/" + appKey + '/chirps?query={"_acl.creator":"' + id + '"}&sort={"_kmd.ect": 1}';
        let headers = {
            method: "GET",
            headers: {
                Authorization: "Kinvey " + authtoken,
                "Content-Type": "application/json"
            }
        }
        dispatch(beginRequest());
        return fetch(url, headers)
            .then(res => res.json())
            .then(json => {
                dispatch(getUserChirps(json));
            })
            .catch(e => dispatch(errorHandler(e)))
    }
}

export function fetchNumOfFollower(username, authtoken, dispatch) {
    return () => {
        let url = "https://baas.kinvey.com/user/" + appKey + '/?query={"subscriptions":"' + username + '"}';
        let headers = {
            method: "GET",
            headers: {
                Authorization: "Kinvey " + authtoken,
                "Content-Type": "application/json"
            }
        }
        dispatch(beginRequest());
        return fetch(url, headers)
            .then(res => { return res.json() })
            .then(json => {
                dispatch(getNumOfFollowers(json.length));
            })
            .catch(e => dispatch(errorHandler(e)))
    }
}

export function createChirp(username, authtoken, data, dispatch) {
    return () => {
        let url = "https://baas.kinvey.com/appdata/" + appKey + '/chirps';
        let headers = {
            method: "POST",
            headers: {
                Authorization: "Kinvey " + authtoken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        return fetch(url, headers)
            .then(res => res.json())
            .then(json => {
                dispatch(fetchUserChirps(username, authtoken, dispatch));
            })
            .catch(e => dispatch(errorHandler(e)))
    }
}

export function fetchUsers(authtoken, dispatch) {
    return () => {
        let url = "https://baas.kinvey.com/user/" + appKey;
        let headers = {
            method: "GET",
            headers: {
                Authorization: "Kinvey " + authtoken,
                "Content-Type": "application/json"
            }
        }
        dispatch(beginRequest());
        return fetch(url, headers)
            .then(res => res.json())
            .then(async (json) => {
                let users = json;
                for (let i = 0; i < users.length; i++) {
                    let url = "https://baas.kinvey.com/user/" + appKey + '/?query={"subscriptions":"' + users[i].username + '"}';
                    let headers = {
                        method: "GET",
                        headers: {
                            Authorization: "Kinvey " + authtoken,
                            "Content-Type": "application/json"
                        }
                    }
                    users[i].numOfFollowers = await fetch(url, headers)
                        .then(res => res.json())
                        .then(json => {
                            return json.length
                        })
                        .catch(e => dispatch(errorHandler(e)))
                }
                dispatch(getUsers(users));
            })
            .catch(e => dispatch(errorHandler(e)))
    }
}

export function followUnfollowUser(authtoken, userId, data, dispatch) {
    return () => {
        let url = "https://baas.kinvey.com/user/" + appKey + '/' + userId;
        let headers = {
            method: "PUT",
            headers: {
                Authorization: "Kinvey " + authtoken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        dispatch(beginRequest());
        return fetch(url, headers)
            .then(res => res.json())
            .then(json => {
                const USER = {
                    id: json._id,
                    username: json.username,
                    authtoken: json._kmd.authtoken,
                    subs: json.subscriptions
                }
                dispatch(getUser(USER));
            })
            .catch(e => dispatch(errorHandler(e)))
    }
}

export function fetchSubsChirps(authtoken, subs, dispatch) {
    return () => {
        let url = "https://baas.kinvey.com/appdata/" + appKey + '/chirps?query={"author":{"$in": ' + JSON.stringify(subs) + '}}&sort={"_kmd.ect": 1}';
        let headers = {
            method: "GET",
            headers: {
                Authorization: "Kinvey " + authtoken,
                "Content-Type": "application/json"
            }
        }
        dispatch(beginRequest());
        return fetch(url, headers)
            .then(res => res.json())
            .then(json => {
                dispatch(getSubsChirps(json));
            })
            .catch(e => dispatch(errorHandler(e)))
    }
}

export function fetchUserDetails(id, authtoken, dispatch) {
    return () => {
        let url = "https://baas.kinvey.com/user/" + appKey + '/?query={"_id":"' + id + '"}';
        let headers = {
            method: "GET",
            headers: {
                Authorization: "Kinvey " + authtoken,
                "Content-Type": "application/json"
            }
        }
        dispatch(beginRequest());
        return fetch(url, headers)
            .then(async (res) => await res.json())
            .then(json => {
                const USER = {
                    id: json[0]._id,
                    username: json[0].username,
                    authtoken: json[0]._kmd.authtoken,
                    subs: json[0].subscriptions
                }
                dispatch(getUserDetails(USER));
            })
            .catch(e => dispatch(errorHandler(e)))
    }
}

export function fetchLogout(authtoken, dispatch) {
    return () => {
        let url = "https://baas.kinvey.com/user/" + appKey + '/_logout';
        let headers = {
            method: "POST",
            headers: {
                Authorization: "Kinvey " + authtoken
            }
        }
        dispatch(logout());
        return fetch(url, headers);
    }
}





