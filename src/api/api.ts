import { GET_PROCESS_LIST } from './graphQLQuery';
import { getLoginMutation, getSignupMutation, GET_EDIT_USER } from './graphQLMutations';
import { client } from '../App';

export const userAPI= {
    getProcessList() {
        return client.query({
            query: GET_PROCESS_LIST,
             variables: { },
           })
           .then((response) =>(response.data))
           .catch((err) => (err))
     },
    getEditUserLogin (id:number | null,firstName:string, secondName:string,email:string, password:string ) {
        return client.mutate({
             mutation: GET_EDIT_USER,
             variables: {id, firstName, secondName,email, password},
           })
           .then((response) =>(response.data))
           .catch((err) => (err))
     },
    getSignupLogin (firstName:string, secondName:string,email:string, password:string ) {
       return client.mutate({
            mutation: getSignupMutation,
            variables: { firstName, secondName,email, password},
          })
          .then((response) =>(response.data))
          .catch((err) => (err))
    },
    getAuthLogin (email:string,password:string ) {
       return client.mutate({
            mutation: getLoginMutation,
            variables: { email, password },
          })
          .then((response) =>(response.data))
          .catch((err) => (err))
    }
}