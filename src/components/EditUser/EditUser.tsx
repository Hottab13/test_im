import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { editUser,actions} from '../../redux/AuthReducer'
import {createField, InputControl} from '../common/FormControl/FormControl'
import { maxLengthCreator, requiredField } from '../utils/validators'
import style from '../common/FormControl//FormControl.module.css'
import { AppStateType } from '../../redux/ReduxStore'
import { Container, Row, Col } from 'react-grid-system'
import cnu from "./EditUser.module.css"
import menuIcon from "../../assets/icon/Union.png"
 
type UserEditFormOwnProps={}
const maxLenght = maxLengthCreator(30)
const UserEditForm:React.FC<InjectedFormProps<UserEditFormValueType,UserEditFormOwnProps>& UserEditFormOwnProps> =({handleSubmit, error }) =>{
    const [editModeButton,setEditModeButton] =  useState(false)
    const activEditModeButton=()=>{
        setEditModeButton(true)
        setTimeout(deactivEditModeButton, 3000);
    }
    const deactivEditModeButton =()=>{
        setEditModeButton(false);
    }
    const userName = useSelector((state:AppStateType)=>state.auth)

    return (<div>
<form onSubmit={handleSubmit}>
<Container fluid>
<Row style={{height:"80px"}}>
    <Col md={6} >
    <div className={cnu.name} >{userName.firstName} {userName.secondName}. Редактирование</div>
    </Col>
    <Col ></Col>
    <Col md={2} >
    <div><button  onClick={activEditModeButton} className={cnu.button}>{editModeButton?"Сохранено":"Сохранить"}</button></div>
    </Col>
</Row>
<Row className={cnu.editForm}>
    <Col >
        <Row align="end" style={{height:"60px"}}>
            <Col md={3} >
            <div>Имя</div>
            </Col>
            <Col >
            {createField<LoginFormValueTypeKey>(userName.secondName,"firstName",[requiredField, maxLenght],InputControl)}
            </Col>
        </Row>
        <Row align="end" style={{height:"48px"}}>
            <Col md={3} >
            <div>Фамилия</div>
            </Col>
            <Col >
            {createField<LoginFormValueTypeKey>(userName.firstName,"secondName",[requiredField, maxLenght],InputControl)}
            </Col>
        </Row>
        <Row align="end" style={{height:"48px"}}>
            <Col md={3} >
            <div>Электронная почта</div>
            </Col>
            <Col >
            {createField<LoginFormValueTypeKey>(userName.email ,"email",[requiredField, maxLenght],InputControl)}
            </Col>
        </Row>
        <Row align="end" style={{height:"48px"}}>
            <Col md={3} >
            <div>Новый пароль</div>
            </Col>
            <Col >
            {createField<LoginFormValueTypeKey>("Не задано","password",[requiredField, maxLenght],InputControl,{type:"password"})}
            </Col>
        </Row>
        <Row align="end" style={{height:"48px"}}>
            <Col md={3} >
            <div>Повторить пароль</div>
            </Col>
            <Col >
            {createField<LoginFormValueTypeKey>("Не задано ","password",[requiredField, maxLenght],InputControl,{type:"password"})}
            </Col>
        </Row>
        <Row>
            <Col md={3} >
            {error &&<div className={style.formSummaryError}>{error}</div>}
            </Col>
        </Row>
    </Col>
</Row>    
</Container>
</form>
</div>)
}
const EditUserReduxForm = reduxForm<UserEditFormValueType,UserEditFormOwnProps>({form:'useredit'})(UserEditForm);
type UserEditFormValueType ={
    //id:number
    firstName:string
    secondName:string
    email:string
    password:string
}
type LoginFormValueTypeKey= Extract< keyof UserEditFormValueType,string>

export const EditUser:React.FC =() =>{
const isAuth = useSelector((state:AppStateType)=>state.auth.isAuth)
const dispatch = useDispatch() 

const [editMode,setEditMode] =  useState(false)
    const activEditMode=()=>{
        setEditMode(true);
    }
    const deactivEditMode =()=>{
        setEditMode(false);
    }
const onSubmit = (value:UserEditFormValueType )=>{
    dispatch(editUser (value.firstName,value.secondName,value.email,value.password) )
}
    if(!isAuth){
        return <Redirect to={"/login"}/>
    }
return (
    <div className={cnu.wrapper} >
        {editMode &&
                <div className={cnu.menuMod} onBlur ={deactivEditMode} >
                <Container fluid>
                    <Row>
                    <Col  debug >
                    <div onClick ={deactivEditMode}> 
                    <img src={menuIcon}/>
                    </div>
                    <div><Link to={`/edituser`}>Username</Link></div>
                    <div><Link to={`/processlist`}>Список процессов</Link></div> 
                </Col>
                </Row>
                </Container>
                </div>}
<Container fluid>  
  <Row>
    <Col>
        <Row className={cnu.menu} >
            <Col md={3}  >
                <Row  style={{height:"60px"}} > 
                    <Col md={2} >
                    <div className={cnu.menuIcon}>
                    {!editMode &&
                    <div onClick ={activEditMode}> 
                    <img src={menuIcon}/>
                    </div>}
                    </div>
                    </Col>
                    <Col md={10} >
                    <div className={cnu.menuText}>Меню</div>
                    </Col>
                </Row>
            </Col>
            <Col ></Col>
        </Row>
        <Row >
            <Col  >
                <div >
                <EditUserReduxForm onSubmit={onSubmit} />
                </div>
            </Col>
        </Row>
    </Col>
  </Row>
</Container> 
</div>

)}
