import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { loginUser} from '../../redux/AuthReducer'
import {createField, InputControl} from '../common/FormControl/FormControl'
import { maxLengthCreator, requiredField } from '../utils/validators'
import cl from "./Login.module.css"
import { AppStateType } from '../../redux/ReduxStore'
import logo from "../../assets/logo/logo.svg"
import { Container, Row, Col } from 'react-grid-system'; 
import errorIcon from "../../assets/icon/error.svg"

type LoginFormOwnProps={}
const maxLenght = maxLengthCreator(30)
const LoginForm:React.FC<InjectedFormProps<LoginFormValueType,LoginFormOwnProps>& LoginFormOwnProps> =({handleSubmit, error,...props }) =>{
    const [checkModeButton,setCheckModeButton] =  useState (true)
//@ts-ignore
const soldCheckbox = ({ target: { checked } }) => {
    setCheckModeButton(checked);
}
return <form onSubmit={handleSubmit}>
<Container fluid>
    <Row align="end" style={{ height: '72px' }}>
        <div className={cl.centrBut}>
            {createField<LoginFormValueTypeKey>
            ("Электронная почта","login",[requiredField, maxLenght],InputControl)}
        </div>
    </Row >
    <Row align="end" style={{ height: '53px' }}>
        <div className={cl.centrBut}>
        {createField<LoginFormValueTypeKey>
            ("Пароль","pass",[requiredField, maxLenght],InputControl,checkModeButton?
            {type:"password",checkModeButton,soldCheckbox}:{checkModeButton,soldCheckbox})}
        </div>
    </Row>
    <Row align="end"  style={{ height: '60px' }} >
        <div className={cl.centrBut} >
        <button disabled={!props.valid } className={cl.button}>Войти в систему</button>
        </div>
    </Row>
    <Row align="end" style={{ height: '37px' }} >
         <Link to="/signup" className={cl.singup}>Зарегистрироваться</Link>
    </Row>
        <Row align="end" style={{ height: '150px'}}>
        {error &&<div className={cl.error}>
            <img src={errorIcon} style={{paddingLeft:"48px",top:"50%",
            transform: "translate(0,50%)"}}/>
            <div className={cl.errorText}>{error}</div></div>}
        </Row>
</Container>
</form>
}
const LoginReduxForm = reduxForm<LoginFormValueType,LoginFormOwnProps>({form:'login'})(LoginForm);
type LoginFormValueType ={
    remember_me:boolean
    pass:string 
    login:string 
}
type LoginFormValueTypeKey= Extract< keyof LoginFormValueType,string>

export const Login:React.FC =() =>{
const isAuth = useSelector((state:AppStateType)=>state.auth.isAuth)
const dispatch = useDispatch() 
const onSubmit = (value:LoginFormValueType)=>{
    dispatch(loginUser(value.login,value.pass))
}
if(isAuth){
    return <Redirect to={"/processlist"}/>
}
return <div className={cl.wrapper} >
<Container fluid>
    <Row align="center" justify="center"  style={{ height: '112px' }}>
        <Col >
        <div className={cl.logo} >
            <img src={logo}/>
        </div>
        </Col>
    </Row>
    <Row align="stretch" justify="center">
        <Col>
            <div className={cl.login_wr}>
            <LoginReduxForm onSubmit={onSubmit} />
            </div>
        </Col>
    </Row>
</Container>
</div>
}
