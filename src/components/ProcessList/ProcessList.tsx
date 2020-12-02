import React, { useEffect, useState } from 'react'
import classes from './processlist.module.css'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProcessListThunkCreator } from '../../redux/ProcessListReducer'
import { AppStateType } from '../../redux/ReduxStore'
import Moment from 'react-moment'
import { Container, Row, Col } from 'react-grid-system'
import cnu from "../EditUser/EditUser.module.css"
import menuIcon from "../../assets/icon/Union.png"
import averageActiveTime from "../../assets/icon/averageActiveTime.svg"
import averageLeadTime from "../../assets/icon/averageLeadTime.svg"
import employeesInvolvedProcess from "../../assets/icon/employeesInvolvedProcess.svg"
import numberOfExecutions from "../../assets/icon/numberOfExecutions.svg"
import numberOfScenarios from "../../assets/icon/numberOfScenarios.svg"
import Stroke from "../../assets/icon/Stroke.svg"
import 'moment/locale/ru'

export const ProcessList: React.FC =(props)=>{   
const processList =useSelector((state:AppStateType)=>state.processList.processList)
const isAuth = useSelector((state:AppStateType)=>state.auth.isAuth)
const [editMode,setEditMode] =  useState(false)
const activEditMode=()=>{
    setEditMode(true);
}
const deactivEditMode =()=>{
    setEditMode(false)
}
const dispatch =useDispatch()
useEffect(()=>{
    dispatch(getProcessListThunkCreator())
},[])
if(!isAuth){
    return <Redirect to={"/login"}/>
}
    return <div>
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
                    <div className={cnu.menuText}><b>Меню</b></div>
                    </Col>
                </Row>
            </Col>
            <Col ></Col>
        </Row>
        <Row >
            <Col style={{paddingTop:"22px"}} >
                {processList.map(u=> 
<div className={classes.pla} key={u.id} >
    <Row  >
        <Col   >
            <Row style={{height:"60px"}} > 
                <Col md={6} >
                <div  className={classes.textName}><b>{u.name} </b></div>
                </Col>
                <Col ></Col>
                <Col md={2}  >
                    <div className={classes.textProcess}>
                На карту процесса<img src={Stroke}/></div>
                </Col>
            </Row>
            <div style={{border: "none",height: "1px"}}><hr color="#D6DCE9" /></div>
            <Row >
               <Col md={2}  >
                    <Row>
                        <Col md={1} style={{top:"50%",
                        transform: "translate(0,150%)"}} ><img src={numberOfScenarios}/>
                        </Col>
                        <Col>
                        <div className={classes.numberOfScenarios}>
                        {u.employeesInvolvedProcess}</div>
                        <div className={classes.miniText} style={{top:"50%",
                        transform: "translate(0,400%)"}}  ><b>выполнено раз</b></div>
                        </Col>
                   </Row>
               </Col>
               <Col md={2} >
                   <Row align="end" style={{height:"84px"}} >
                        <Col >
                        <Row>
                        <Col md={1}><img src={averageActiveTime}/></Col>
                        <Col>
                        <div className={classes.textScripts}>
                        <Moment format={'LT'} unix>{u.averageLeadTime}</Moment>   
                        </div>
                        <div className={classes.miniText}>среднее время выполнения</div> 
                        </Col>
                        </Row>
                        </Col>
                    </Row>
                    <Row style={{height:"84px", marginTop:"24px"}}>
                        <Col >
                        <Row>
                            <Col md={1}><img src={averageLeadTime}/></Col>
                            <Col>
                            <div className={classes.textScripts}>
                            <Moment  format={'LT'} unix>{u.averageActiveTime}</Moment>
                            </div>
                            <div className={classes.miniText}>среднее активное время</div>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
               </Col>
                <Col md={2} >
                    <Row style={{height:"84px"}} align="end" >
                        <Col >
                        <Row>
                            <Col md={1}><img src={employeesInvolvedProcess}/></Col>
                            <Col>
                            <div className={classes.textScripts}>
                            {u.numberOfExecutions } сотрудников</div>
                            <div className={classes.miniText}>участвует в процессе</div>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                    <Row style={{height:"84px", marginTop:"24px" }} >
                        <Col >
                        <Row>
                            <Col md={1}><img src={numberOfExecutions}/></Col>
                            <Col>
                            <div className={classes.textScripts}>
                            {u.numberOfScenarios} сценариев
                            </div>
                            <div className={classes.miniText}>в процессе</div>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
               </Col>
               <Col md={1} >
                    <Row align="end" style={{height:"62px"}} >
                    <Col >
                    <div className={classes.miniText}>Начало</div>
                    </Col>
                    </Row>
                    <Row align="end" style={{height:"36px"}}>
                    <Col >
                    <div className={classes.miniText}>Окончание</div>
                    </Col>
                    </Row>
                    <Row align="end" style={{height:"36px"}}>
                    <Col >
                    <div className={classes.miniText}>Загрузка</div>
                    </Col>
                    </Row>
               </Col>
               <Col md={2}  >
                    <Row style={{height:"62px"}} align="end" >
                    <Col >
                    <div className={classes.textMoment}>
                        <Moment format={'LL'} unix>{u.start}</Moment></div>
                    </Col>
                    </Row>
                    <Row style={{height:"36px"}} align="end">
                    <Col >
                    <div className={classes.textMoment}>
                        <Moment format={'LL'} unix>{u.end}</Moment></div>
                    </Col>
                    </Row>
                    <Row style={{height:"36px"}} align="end">
                    <Col className={classes.textMoment} >
                        <Moment format={'LL'} unix>{u.loading}</Moment>
                    </Col>
                    </Row>
               </Col> 
            </Row>
            <Container fluid>
            <Row >
                <Col style={{height:"12px", }} className={cnu.wrapper} >
                </Col>
            </Row>
            </Container>
        </Col>
    </Row>
    </div>   
        )}  
            </Col>
        </Row>
    </Col>
  </Row>
</Container> 
</div>
</div>  
}