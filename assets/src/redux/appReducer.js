import {
    HIDE_ALERT,
    HIDE_LOADER,
    SHOW_ALERT,
    SHOW_LOADER
} from "./types";

const initialState = {
    loading:  false,
    alert:  {
        show: false,
        type: '',
        text: ''
    }
}

export const appReducer = (state= initialState, action) =>{
    switch (action.type){
        case SHOW_ALERT:
            setTimeout(function (){
                return { ...state, alert:{show: false, type: action.payload.type, text: ''}}
            }, 5000)
            return { ...state, alert:{show: true, type: action.payload.type, text: action.payload.text}}
        case HIDE_ALERT:
            return { ...state, alert:{show: false, type: '', text: ''}}
        case SHOW_LOADER:
            return { ...state, loading: true  }
        case HIDE_LOADER:
            return { ...state, loading: false }
        default: return state
    }

}