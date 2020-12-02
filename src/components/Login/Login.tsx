import React from 'react'
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

type LoginFormOwnProps={
   // captchaUrl:string |null
}
const maxLenght = maxLengthCreator(30)
const LoginForm:React.FC<InjectedFormProps<LoginFormValueType,LoginFormOwnProps>& LoginFormOwnProps> =({handleSubmit, error }) =>{
return (
<form onSubmit={handleSubmit}>
<Container fluid>
    <Row align="end" style={{ height: '72px' }}>
        <Col >
        <div className={cl.centrBut}>
            {createField<LoginFormValueTypeKey>
            ("Электронная почта","login",[requiredField, maxLenght],InputControl)}
        </div>
        </Col>
        </Row >
        <Row align="end" style={{ height: '53px' }}>
         <Col >
        <div className={cl.centrBut}>
            {createField<LoginFormValueTypeKey>
            ("Пароль","pass",[requiredField, maxLenght],InputControl,{type:"password"})}
        </div>
        </Col>
        </Row>
        <Row align="end"  style={{ height: '60px' }} >
        <Col >
            <div className={cl.centrBut} >
            <button className={cl.button10}>Войти в систему</button>
            </div>
        </Col>
        </Row>
        <Row align="end" style={{ height: '37px' }} >
        <Col  >
         <div className={cl.singup}><Link to="/signup">Зарегистрироваться</Link></div>
         </Col>
         </Row>
         <Row align="end" style={{ height: '150px'}}>
        <Col  >
        {error &&<div className={cl.error}>
            Сообщение об ошибке{console.log(error)}</div>}
        </Col>
        </Row>
</Container>
</form>
)}
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
return(
    <div className={cl.wrapper} >
<Container fluid>
  <Row align="stretch">
    <Col  >
    
        <Row align="center" justify="center"  style={{ height: '112px' }}>
            <Col md={5}>
            </Col>
            <Col md={2}>
                <div className={cl.logo} >
                    <img src={logo}/>
                </div>
            </Col>
            <Col md={5}>
            </Col>
        </Row>
        <Row align="stretch" justify="center">
            <Col md={3}>
            </Col>
            <Col md={4} >
            <div className={cl.login_wr}   >
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
            </Col>
            <Col md={3}>
            </Col>
        </Row>
   
    </Col>
  </Row>
</Container> 
 </div>
)}
