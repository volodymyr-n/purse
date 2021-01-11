import {CHECKED_PURSE, CLEAR_PURSE, CREATE_PURSE, DELETE_PURSE, FETCH_PURSE} from "./types";

const initialState = {
    purses:  [],
    pursesDelete:  [],
    total: function(items){
        return items.reduce( function(a, b){
            return a + b['price'];
        }, 0);
    }
}

export const pursesReducer = (state= initialState, action) =>{
    switch (action.type){
        case CREATE_PURSE:
            return state
        case DELETE_PURSE:
            let purses_delete = state.purses
            return { ...state, purses: purses_delete  }
        case CHECKED_PURSE:
            let purse_checked = state.purses
            for(let i=0; purse_checked.length > i; i++){
                if(parseInt(purse_checked[i].id) === parseInt(action.payload.id)){
                    purse_checked[i].checked = !purse_checked[i].checked
                    break
                }
            }
            return { ...state, purses: purse_checked  }
        case FETCH_PURSE:
            return { ...state, purses: action.payload }
        case CLEAR_PURSE:
            return { ...state, initialState }
        default: return state
    }

}