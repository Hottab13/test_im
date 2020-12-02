import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import {createField, InputControl} from '../common/FormControl/FormControl'
import { maxLengthCreator, requiredField } from '../utils/validators'
import { AppStateType } from '../../redux/ReduxStore'
import { signupUser } from '../../redux/SignupReducer'
import { Container, Row, Col } from 'react-grid-system'; 
import cl from "../Login/Login.module.css"
import logo from "../../assets/logo/logo.svg"

type LoginFormOwnProps={}
const maxLenght = maxLengthCreator(30)
const LoginForm:React.FC<InjectedFormProps<LoginFormValueType,LoginFormOwnProps>& LoginFormOwnProps> =({handleSubmit, error }) =>{
    return (
        <form onSubmit={handleSubmit}>
        <Container fluid>
        <Row align="end" style={{ height: '60px', paddingLeft:"33px" }}>
        <Col >
        <div className={cl.signText}>
        Регистрация
        </div>
        </Col>
        </Row >
        <Row align="end" style={{ height: '56px' }}>
        <Col >
        <div className={cl.centrBut}>
        {createField<LoginFormValueTypeKey>("Имя","firstName",[requiredField, maxLenght],InputControl)}
        </div>
        </Col>
        </Row >
        <Row align="end" style={{ height: '50px' }}>
        <Col >
        <div className={cl.centrBut}>
        {createField<LoginFormValueTypeKey>("Фамилия","secondName",[requiredField, maxLenght],InputControl)}
        </div>
        </Col>
        </Row >
        <Row align="end" style={{ height: '50px' }}>
        <Col >
        <div className={cl.centrBut}>
        {createField<LoginFormValueTypeKey>("Электронная почта","email",[requiredField, maxLenght],InputControl)}
        </div>
        </Col>
        </Row >
        <Row align="end" style={{ height: '50px' }}>
         <Col >
        <div className={cl.centrBut}>
        {createField<LoginFormValueTypeKey>("Введите пароль","pass",[requiredField, maxLenght],InputControl,{type:"password"})}
        </div>
        </Col>
        </Row>
        <Row align="end" style={{ height: '50px' }}>
         <Col >
        <div className={cl.centrBut}>
        {createField<LoginFormValueTypeKey>("Повторите пароль","pass",[requiredField, maxLenght],InputControl,{type:"password"})}
        </div>
        </Col>
        </Row>
        <Row align="end"  style={{ height: '60px' }} >
        <Col >
            <div className={cl.centrBut} >
            <button className={cl.button10}>Применить и войти</button>
            </div>
        </Col>
        </Row>
        <Row align="end" style={{ height: '37px' }} >
        <Col  >
         </Col>
         </Row>
         <div className={cl.sing}>Уже зарегистрированы? <Link to="/login"> Вход</Link></div>
         <Row align="end" style={{ height: '120px'}}>
        <Col  >
        {error &&<div className={cl.error}>
            Сообщение об ошибке{console.log(error)}</div>}
        </Col>
        </Row>
</Container>
</form>
)}
const LoginReduxForm = reduxForm<LoginFormValueType,LoginFormOwnProps>({form:'signup'})(LoginForm);
type LoginFormValueType ={
    firstName:string
    secondName:string 
    email:string 
    pass:string
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
    <Row align="stretch">
        <Col  >
            <Row align="center" justify="center"  style={{ height: '112px' }}>
                <Col md={5}></Col>
                <Col md={2}>
                <div className={cl.logo} >
                    <img src={logo}/>
                </div>
                </Col>
                <Col md={5}></Col>
            </Row>
            <Row align="stretch" justify="center">
                <Col md={4}></Col>
                <Col md={4}>
                    <div className={cl.login_wr}   >
                    <LoginReduxForm onSubmit={onSubmit} />
                    </div>
                </Col>
                <Col md={4}></Col>
            </Row>
        </Col>
    </Row>
</Container>
</div>
}