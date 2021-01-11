import {
    CHECKED_PURSE, CLEAR_PURSE,
    CREATE_PURSE,
    DELETE_PURSE,
    FETCH_PURSE, HIDE_ALERT, HIDE_LOADER,
    SHOW_ALERT,
    SHOW_LOADER,
    UPDATE_FILTER_DATE
} from "./types";

const API_APP = '/api/'
const PURSES = 'purses'

export function createPurse(purse) {
    return async dispatch => {
        try {
            const response = await fetch(API_APP + PURSES, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(purse)
            })
            const json = await response.json()
            if (response.status !== 201) {
                dispatch(showAlert('danger', 'Problem create code: ' + response.status))
            } else {
                dispatch({type: CREATE_PURSE, payload: json})
                dispatch(showAlert('success', 'Create ok'))
            }
        } catch (e) {
            dispatch(showAlert('danger', 'Problem create purse: ' + e.message))
        }
        dispatch(fetchPurse())
    }
}

export function filterDateUpdate(data) {
    let before, after, from_page, url_string
    if (data.indexOf('/to/') === -1) {
        before = new Date(data)
        after = new Date(data)
        from_page = `${before.getDate()} ${before.toLocaleString('en-EN', {month: 'short'})}  ${before.getFullYear()} `
        url_string = `${before.getFullYear()}-${before.getMonth() + 1}-${before.getDate()}`
    } else {
        const currentPath = data.split('/')
        before = new Date(currentPath[0])
        after = new Date(currentPath[2])
        from_page = `${before.getDate()} ${before.toLocaleString('en-EN', {month: 'short'})}  ${before.getFullYear()}  - ${after.getDate()} ${after.toLocaleString('en-EN', {month: 'short'})}  ${after.getFullYear()}`
        url_string = `${before.getFullYear()}-${before.getMonth() + 1}-${before.getDate()}/to/${after.getFullYear()}-${after.getMonth() + 1}-${after.getDate()}`
    }
    before.setDate(before.getDate())
    after.setDate(after.getDate() + 1)
    return dispatch => {
        dispatch({
            type: UPDATE_FILTER_DATE, payload: {
                api: `?created_at[before]=${after.getFullYear()}-${after.getMonth() + 1}-${after.getDate()}&created_at[after]=${before.getFullYear()}-${before.getMonth() + 1}-${before.getDate()}`,
                from_page: from_page,
                url: `/filter/date/${url_string}`
            }
        })
    }
}

export function deletePurses(array) {
    return async dispatch => {
        let r = 0
        dispatch({type: SHOW_LOADER, payload: ''})
        let del = setInterval(function () {
            dispatch(deletePurse(array[r].id));
            if (array[r] === array[array.length - 1]) {
                dispatch(fetchPurse())
                clearInterval(del)
                console.log('---'+r)
            }
            r++
        }, 1000)
    }
}

export function deletePurse(id) {
    return async dispatch => {
        try {
            const response = await fetch(`${API_APP + PURSES}/${id}`, {
                method: 'DELETE',
                headers: {
                    'accept': '*/*'
                }
            })
            if (response.status !== 204) {
                dispatch(showAlert('danger', 'Problem delete code: ' + response.status))
            } else {
                dispatch({type: DELETE_PURSE, payload: ''})
                dispatch(fetchPurse())
            }
        } catch (e) {
            dispatch(showAlert('danger', 'Problem delete id: ' + id))
        }
    }
}

export function changeElementChecked(element) {
    return {
        type: CHECKED_PURSE,
        payload: element
    }
}

export function fetchPurse() {
    return async (dispatch, getState) => {
        const state = getState()
        dispatch({type: CLEAR_PURSE})
        dispatch({type: SHOW_LOADER})
        try {
            const response = await fetch(API_APP + PURSES + state.filterDate.date.api, {
                headers: {
                    'accept': 'application/json'
                }
            })
            const json = await response.json()
            if (json.detail) {
                dispatch({
                    type: SHOW_ALERT,
                    payload: {type: 'danger', text: "Something went wrong. Error: " + json.detail}
                })
            } else {
                dispatch({type: FETCH_PURSE, payload: json})
            }
        } catch (e) {
            dispatch({type: SHOW_ALERT, payload: {type: 'danger', text: "Something went. Error: " + e.message}})
        }
        dispatch({type: HIDE_LOADER})
    }
}

export function showAlert(type, text) {
    const json = {type: type, text: text}
    return async (dispatch) => {
        dispatch( {type: SHOW_ALERT, payload: json} )
        setTimeout(function (){
            dispatch({type: HIDE_ALERT, payload: ''})
    }, 6000)
}
}

