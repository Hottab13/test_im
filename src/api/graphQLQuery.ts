import {  gql } from '@apollo/client';

export const GET_ALL_USERS_QUERY = gql`
query{
  allUsers{
    id
    firstName
    secondName
    email
  }
}
`
export const GET_PROCESS_LIST = gql`
query {
  processList{
    id
    name
    numberOfExecutions
    averageLeadTime
    averageActiveTime
    employeesInvolvedProcess
    numberOfScenarios
    start
    end
    loading
  }
}
`
export const GET_CURRENT_USER = gql`
query {
  currentUser{
    id
    firstName
    secondName
    email
  }
}
`