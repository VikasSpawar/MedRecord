import axios from "axios";
import * as actionTypes from "./authActionTypes";
import { setAuthToken, API } from "../api";

export const loginSuccess = (token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: token,
  };
};
export const signUpSuccess = (token) => {
  return {
    type: actionTypes.SIGN_SUCCESS,
    payload: token,
  };
};

export const loginFailure = (error) => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    payload: error,
  };
};
export const signUpFailure = (error) => {
  return {
    type: actionTypes.SIGN_FAILURE,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};
export const loginReq = (payload) => {
  return {
    type: actionTypes.LOGIN_REQ,
    payload,
  };
};
export const signUpReq = (payload) => {
  return {
    type: actionTypes.SIGN_REQ,
    payload,
  };
};

export const userLogin = (userData) => (dispatch) => {
  // console.log(API)
  dispatch(loginReq(actionTypes.LOGIN_REQ))
  API.post(`/login`, userData)
    .then((res) => {
      console.log("response from action", res);
      dispatch(loginSuccess(res.data.token));
      setAuthToken(res.data.token);
      return res.data.token;
    })
    .catch((err) => {
      console.log(err);
      dispatch(loginFailure(err.response.data));
    });
};

export const userSignUp=(userData)=>(dispatch)=>{
 dispatch(signUpReq(actionTypes.SIGN_REQ))
  API.post(`/signup`,userData).then((res)=>{
    console.log(res)
    dispatch(signUpSuccess(res.data))
  })
  .catch((err)=>{
    console.log(err.response.data)
    dispatch(signUpFailure(err.response.data))
  })


}
