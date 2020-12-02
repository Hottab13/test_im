import { AppStateType } from '../../redux/ReduxStore';
import { Redirect } from "react-router-dom"
import React from "react"
import { connect } from "react-redux"

let mapStateToPropsForRedirect =(state:AppStateType) =>({
    isAuth: state.auth.isAuth
} as MapPropsType )
type MapPropsType={
    isAuth:boolean
}
type DispatchPropsType={
}
export function withAuthRedirectComponents<WCP>(WrapperComponent:React.ComponentType<WCP>){ 
    
    const RedirectComponent:React.FC<DispatchPropsType & MapPropsType>=(props)=> {
        let {isAuth,...resProps}=props
        
        if(!isAuth) return <Redirect to='/login'/>//редирект на логин, пр  оут логине
            return <WrapperComponent {...resProps as WCP}/>
        }

let ConnectRedirectComponent = connect<MapPropsType,DispatchPropsType,WCP,AppStateType>(
    mapStateToPropsForRedirect,{})(RedirectComponent)
return ConnectRedirectComponent;
}