import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux'
import authReducer from './AuthReducer'
import thunk from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import appReducer from './AppReducer'
import { ThunkAction } from 'redux-thunk'
import signupReducer from './SignupReducer'
import processListReducer from './ProcessListReducer'

let reducers = combineReducers({
    processList: processListReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    signup: signupReducer
})

type RootReducersType = typeof reducers
export type AppStateType = ReturnType<RootReducersType>

type PropertiesType<T> = T extends {[key:string]:infer U}? U:never
export type InferActionType<T extends {[key:string]:(...args:any[])=>any}>= ReturnType<PropertiesType<T>>

export type BaseThunkActionType<AT extends Action ,R= Promise<void> > = ThunkAction<R,AppStateType,unknown,AT>
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose//crome dev
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)))

//let store = createStore(reducers,applyMiddleware(thunk));

//@ts-ignore
window._store_= store

export default store
