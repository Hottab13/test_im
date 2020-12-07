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
    renewalEditUser:false
}

const authReducer=(state=initionalState,action:ActionType):initionalStateType=> {
    switch (action.type){
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload,
            }  
        case "SET_RENEWAL_EDIT_USER":
            return {
                ...state,
                ...action.renewalEditUser,
            }   
            default:
            return state;
    }
}

 export const actions={
    setAuthUserData:(userId:number | null, firstName:string | null,email:string | null,secondName:string | null, isAuth:boolean, token:string | null )=> ({type:"SET_USER_DATA", 
        payload:{userId,firstName,email,secondName,isAuth,token }} as const),
    setRenewalEditUser:( renewalEditUser:boolean)=> ({type:"SET_RENEWAL_EDIT_USER", 
        renewalEditUser:{renewalEditUser }} as const)
}


export const loginUser = (email:string ,password:string ):ThunkActionType=> 
    async(dispatch,getState) =>{
        const respons = await userAPI.getAuthLogin(email,password)
            if(respons.login){
                
                const {id,firstName,email,secondName} = respons.login.user
                const token = respons.login.token
                dispatch(actions.setAuthUserData(id,firstName,email,secondName, true,token ))
            } else{
                console.log(respons.message) 
                dispatch(stopSubmit('login',{_error:respons.graphQLErrors[0].message}));
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
                dispatch(actions.setAuthUserData(id,firstName,email,secondName, true, token ))
                dispatch(actions.setRenewalEditUser( true ))
            } else{
                console.log(respons.message) 
                dispatch(stopSubmit('useredit',{_error:respons.graphQLErrors[0].message}));
            }
}
export default authReducer
