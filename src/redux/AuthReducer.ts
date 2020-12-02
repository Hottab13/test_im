import { stopSubmit } from "redux-form"
import { userAPI} from "../api/api"
import { InferActionType, BaseThunkActionType } from './ReduxStore';

type ActionType = InferActionType<typeof actions>
export type initionalStateType = typeof initionalState
type ThunkActionType = BaseThunkActionType<ActionType | ReturnType<typeof stopSubmit>>

let initionalState = {
    userId:null as number | null,
    firstName:null as string | null,
    email:null as string | null,
    secondName:null as string | null,
    isFetching:false,
    isAuth:false,
    token:null as string | null,
    updete:false
}

const authReducer=(state=initionalState,action:ActionType):initionalStateType=> {
    switch (action.type){
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload,
            }   
            default:
            return state;
    }
}

 export const actions={
    setAuthUserData:(userId:number | null, firstName:string | null,email:string | null,secondName:string | null, isAuth:boolean, token:string | null,updete:boolean)=> ({type:"SET_USER_DATA", 
        payload:{userId,firstName,email,secondName,isAuth,token,updete }} as const),
}


export const loginUser = (email:string ,password:string ):ThunkActionType=> 
    async(dispatch,getState) =>{
        let respons = await userAPI.getAuthLogin(email,password);
            if(respons.login){
                console.log(respons.login) 
                const {id,firstName,email,secondName} = respons.login.user
                const token = respons.login.token
                dispatch(actions.setAuthUserData(id,firstName,email,secondName, true,token,false ))
            } else{
                dispatch(stopSubmit('login',{_error:respons}));
            }
}
export const editUser = (firstName:string, secondName:string,email:string, password:string  ):ThunkActionType=> 
    async(dispatch,getState) =>{
        const id =getState().auth.userId
        let respons = await userAPI.getEditUserLogin(id,firstName, secondName,email, password);

            if(respons.editUser){
                console.log(respons.editUser)
                    const {id,firstName,email,secondName} = respons.editUser
                    const token = getState().auth.token
                dispatch(actions.setAuthUserData(id,firstName,email,secondName, true, token,true ))
            } else{
             
                console.log(respons)
                //dispatch(stopSubmit('login',{_error:respons.err}));
            }
}
export default authReducer
