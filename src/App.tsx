import React, { useEffect } from "react"
//import "./App.css"
import 'antd/dist/antd.css';
import { BrowserRouter, Link, Route, Switch, withRouter} from "react-router-dom"
import { connect, Provider, useDispatch, useSelector } from "react-redux"
import { compose } from "redux"
import { initiolizeApp } from "./redux/AppReducer"
import Loader from "./components/Loader"
import store, { AppStateType } from "./redux/ReduxStore"
import { Login } from "./components/Login/Login"
import {ApolloClient,createHttpLink,InMemoryCache,ApolloProvider} from "@apollo/client"
import { Signup } from "./components/Signup/Signup"
import { setContext } from "apollo-link-context"
import { EditUser } from "./components/EditUser/EditUser";
import { ProcessList } from "./components/ProcessList/ProcessList";


const authLink = setContext((_, { headers }) => {
  const token = store.getState().auth.token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  //@ts-ignore
  link:authLink.concat(createHttpLink({ uri: "http://localhost:4000/api" })) ,
});

const App:React.FC = (props)=>{
  const initionalized = useSelector((state:AppStateType)=>state.app.initionalized)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(initiolizeApp())
  },[])

  if(!initionalized){
    return <Loader/>
  }
  return (
      <Switch>
        <Route exact path='/' render={()=><Login/>}/>
        <Route path='/login'  render={ ()=> <Login /> } />
        <Route path='/processlist'  render={ ()=> <ProcessList /> } />
        <Route path='/edituser' render={ ()=> <EditUser/> } />
        <Route path='/signup' render={ ()=> <Signup /> } />
        <Route path='*' render={ ()=> <div><h1>404</h1></div> } />
      </Switch> 
)}

const AppConteiner= compose<React.ComponentType>(
  withRouter,
  connect(null,null))(App)
export const MainApp:React.FC=()=>{  
  return (
    <ApolloProvider client={client}>
      <BrowserRouter >
        <Provider store={store}>
          <AppConteiner />
        </Provider>
      </BrowserRouter>
    </ApolloProvider>
)}

export default MainApp