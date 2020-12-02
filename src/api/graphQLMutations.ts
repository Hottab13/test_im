import {  gql } from '@apollo/client';

export const getLoginMutation = gql`
mutation login($email: String!, $password: String!){
	login(email: $email, password: $password){
    token
    user{
      id
      firstName
      secondName
      email
    }
  }
}
`
export const getSignupMutation = gql`
mutation getSignup ($firstName:String!,$secondName:String!,$email:String!,$password:String!){
  signup(firstName:$firstName,secondName:$secondName,email:$email,password:$password)
}
`
export const GET_EDIT_USER = gql`
mutation getEditUser ($id:Int!,$firstName:String!,$secondName:String!,$email:String!,$password:String){
  editUser(id:$id,firstName:$firstName,secondName:$secondName,email:$email,password:$password){
    id
    firstName
    secondName
    email
  }
}
`