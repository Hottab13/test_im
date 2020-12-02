import { stopSubmit } from "redux-form"
import { userAPI } from "../api/api"
import { InferActionType, BaseThunkActionType } from './ReduxStore';

type ActionType = InferActionType<typeof actions>
export type initionalStateType = typeof initionalState
type ThunkActionType = BaseThunkActionType<ActionType | ReturnType<typeof stopSubmit>>

let initionalState = {
    isSignup:false,
}
const signupReducer=(state=initionalState,action:ActionType):initionalStateType=> {
    switch (action.type){
        case "ON_SIGNUP":
            return {
                ...state,
                ...action.payload,
            }   
            default:
            return state;
    }
}

 export const actions={
    onSignup:( isSignup:boolean)=> ({type:"ON_SIGNUP", 
        payload:{isSignup}} as const)
}

export const signupUser = (firstName:string, secondName:string,email:string, password:string  ):ThunkActionType=> 
    async(dispatch,getState) =>{
        let respons = await userAPI.getSignupLogin(firstName, secondName,email, password);
        console.log(respons)
            if(respons.signup){
                console.log(respons.signup)
                dispatch(actions.onSignup(true))
            } else{
                console.log(respons)
                dispatch(stopSubmit('signup',{_error:respons}));
            }
}

export default signupReducer
