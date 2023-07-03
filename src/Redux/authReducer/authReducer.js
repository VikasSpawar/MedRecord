import { LOGIN_REQ, SIGN_FAILURE, SIGN_REQ, SIGN_SUCCESS } from "./authActionTypes";

const initialState = {
    isLoggedIn: false,
    token: null,
    error: null,
    LoadingType:"",
    signUpError:"",
    signUpSuccess:""
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          token: action.payload,
          error: null,
          LoadingType:""
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isLoggedIn: false,
          token: null,
          error: action.payload,
          LoadingType:""
        };
      case 'LOGOUT':
        {
          sessionStorage.removeItem("token")
           return {
          ...state,
          isLoggedIn: false,
          token: null,
          error: null,
          LoadingType:""
        };

        }
      case LOGIN_REQ :{
        
        return {
          ...state,
          LoadingType:action.payload

        }
      }
      case SIGN_REQ :{
        
        return {
          ...state,
          LoadingType:action.payload

        }
      }
      case SIGN_SUCCESS:
        {

          return{
            ...state,
            signUpSuccess:action.payload,
            signUpError:"",
            LoadingType:""
          }

        }
      case SIGN_FAILURE:{

        return{
          ...state,
          signUpSuccess:"",
          signUpError:action.payload,
          LoadingType:""
        }
      }
       
      default:
        return state;
    }
  };
  
  export default authReducer;
  