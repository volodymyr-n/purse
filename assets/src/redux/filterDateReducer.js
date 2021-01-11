import {UPDATE_FILTER_DATE} from "./types";

const getParamUrl = () => {
    const currentPathString = window.location.pathname
    let before = new Date
    let after = new Date
    let from_page = `${before.getDate()} ${before.toLocaleString('en-EN', {month: 'short'})}  ${before.getFullYear()} `
    if (currentPathString.indexOf('/filter/date/') !== -1) {
        const currentPath = currentPathString.split('/')
        for (let i = 0; currentPath.length > i; i++) {
            if (currentPath[i] === 'filter') {
                for (let k = i + 1; currentPath.length > i; i++) {
                    if (currentPath[k] === 'date') {
                        before = new Date(currentPath[k + 1])
                        if (currentPath[k + 2] === 'to') {
                            after = new Date(currentPath[k + 3])
                            from_page = `${before.getDate()} ${before.toLocaleString('en-EN', {month: 'short'})}  ${before.getFullYear()}  - ${after.getDate()} ${after.toLocaleString('en-EN', {month: 'short'})}  ${after.getFullYear()}`
                            break
                        }
                        after = new Date(currentPath[k + 1])
                        before = new Date(currentPath[k + 1])
                        break
                    }
                }
            }
        }
    }
    before.setDate(before.getDate())
    after.setDate(after.getDate() + 1)
    return {
        api: `?created_at[before]=${after.getFullYear()}-${after.getMonth() + 1}-${after.getDate()}&created_at[after]=${before.getFullYear()}-${before.getMonth() + 1}-${before.getDate()}`,
        from_page: from_page,
        url: currentPathString
    }
}

const initialState = {
    date: getParamUrl()
}

export const filterDateReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FILTER_DATE:
            return {...state, date: action.payload}
        default:
            return state
    }

}


