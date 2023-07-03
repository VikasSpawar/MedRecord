import axios from 'axios';
import * as actionTypes from './authActionTypes';
import { setAuthToken,API } from '../api';

export const loginSuccess = token => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: token,
  };
};

export const loginFailure = error => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};



export const userLogin=(userData)=>(dispatch)=>{

    // console.log(API)
    API.post(`/login`,userData).then((res)=>{

        console.log("response from action",res)
        dispatch(loginSuccess(res.data.token))
        setAuthToken(res.data.token)
        return res.data.token
    })
    .catch((err)=>{
      console.log(err)
        dispatch(loginFailure(err))
    })


}
