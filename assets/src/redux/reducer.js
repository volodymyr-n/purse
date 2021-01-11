import {combineReducers} from "redux";
import {pursesReducer} from "./pursesReducer";
import {appReducer} from "./appReducer";
import {connectRouter} from "connected-react-router";
import {filterDateReducer} from "./filterDateReducer";

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    purses: pursesReducer,
    filterDate: filterDateReducer,
    app: appReducer
})
export default createRootReducer
