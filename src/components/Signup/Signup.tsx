import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import {createField, InputControl} from '../common/FormControl/FormControl'
import { maxLengthCreator, requiredField, matchPass } from '../utils/validators'
import { AppStateType } from '../../redux/ReduxStore'
import { signupUser } from '../../redux/SignupReducer'
import { Container, Row, Col } from 'react-grid-system'; 
import cl from "../Login/Login.module.css"
import logo from "../../assets/logo/logo.svg"
import errorIcon from "../../assets/icon/error.svg"

type LoginFormOwnProps={}
const maxLenght = maxLengthCreator(10)
const LoginForm:React.FC<InjectedFormProps<LoginFormValueType,LoginFormOwnProps>& LoginFormOwnProps> =({handleSubmit, error,...props }) =>{
const [checkModeButton,setCheckModeButton] =  useState (true)
//@ts-ignore
const soldCheckbox = ({ target: { checked } }) => {
    setCheckModeButton(checked);
}
return <form onSubmit={handleSubmit}>
    <Container fluid>
        <Row align="end" style={{ height: '60px', paddingLeft:"33px" }}>
            <Col >
            <div className={cl.signText}>
            Регистрация
            </div>
            </Col>
        </Row >
        <Row align="end" style={{ height: '56px' }}>
            <div className={cl.centrBut}>
            {createField<LoginFormValueTypeKey>
            ("Имя","firstName",[requiredField, maxLenght],InputControl)}
            </div>
        </Row >
        <Row align="end" style={{ height: '50px' }}>
            <div className={cl.centrBut}>
            {createField<LoginFormValueTypeKey>
            ("Фамилия","secondName",[requiredField, maxLenght],InputControl)}
            </div>
        </Row >
        <Row align="end" style={{ height: '50px' }}>
            <div className={cl.centrBut}>
            {createField<LoginFormValueTypeKey>
            ("Электронная почта","email",[requiredField, maxLenght],InputControl)}
            </div>
        </Row >
        <Row align="end" style={{ height: '50px' }}>
            <div className={cl.centrBut}>
            {createField<LoginFormValueTypeKey>
            ("Введите пароль","pass",[requiredField, maxLenght],InputControl,checkModeButton?
            {type:"password",checkModeButton,soldCheckbox}:{checkModeButton,soldCheckbox})}
            </div>
        </Row>
        <Row align="end" style={{ height: '50px' }}>
            <div className={cl.centrBut}>
            {createField<LoginFormValueTypeKey>
            ("Повторите пароль","confirmPassword",[requiredField, matchPass],InputControl,checkModeButton?
            {type:"password",checkModeButton,soldCheckbox}:{checkModeButton,soldCheckbox})}
            </div>
        </Row>
        <Row align="end"  style={{ height: '60px' }} >
            <div className={cl.centrBut} >
            <button disabled={!props.valid }  className={cl.button}>Применить и войти</button>
            </div>
        </Row>
        <Row align="end" style={{ height: '42px' }} >
            <Col className={cl.singPlank}  offset={{ md: 1 }} > 
           Уже зарегистрированы? <Link to="/login" className={cl.sing} >Вход</Link>
            </Col>
        </Row>
        {/*<span> 
            <input type="checkbox" checked={checkModeButton} onChange={soldCheckbox} id="checkbox-id" />
            <label htmlFor="checkbox-id"/>
        </span>*/}
        <Row align="end" style={{ height: '120px'}}>
        {error &&<div className={cl.error}>
            <img src={errorIcon} style={{paddingLeft:"48px",top:"50%",
            transform: "translate(0,50%)"}}/>
            <div className={cl.errorText}>{error}</div></div>}
        </Row>
</Container>
</form>
}
const LoginReduxForm = reduxForm<LoginFormValueType,LoginFormOwnProps>({form:'signup'})(LoginForm);
type LoginFormValueType ={
    firstName:string
    secondName:string 
    email:string 
    pass:string 
    confirmPassword:string | undefined
}
type LoginFormValueTypeKey= Extract< keyof LoginFormValueType,string>
export const Signup:React.FC =() =>{
const isSignup = useSelector((state:AppStateType)=>state.signup.isSignup)
const dispatch = useDispatch() 
const onSubmit = (value:LoginFormValueType )=>{
    dispatch(signupUser(value.firstName,value.secondName,value.email, value.pass) )
}
if(isSignup){
    return <Redirect to={"/login"}/>
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