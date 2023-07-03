import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import reducer from "./reducer"
import thunk from "redux-thunk"
import authReducer from "./authReducer/authReducer";


const rootReducer = combineReducers({
    tasks: reducer,
    auth: authReducer, // Include the authReducer
  });



const store=legacy_createStore(rootReducer,applyMiddleware(thunk))

export default store