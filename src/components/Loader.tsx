import React from 'react'
import loading from './../assets/images/2.gif'
import { Alert, Col, Row, Spin } from 'antd';

let Loader:React.FC = ()=>{
   return  (
      <Row justify="space-around" align="middle">
         <Col span={3}>
         <div  className="example">
    <Spin />
  </div>,
 </Col>
 </Row>
   )
}

export default Loader
//<img src={loading}/>