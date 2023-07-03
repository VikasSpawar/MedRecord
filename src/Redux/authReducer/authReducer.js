const initialState = {
    isLoggedIn: false,
    token: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          token: action.payload,
          error: null,
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isLoggedIn: false,
          token: null,
          error: action.payload,
        };
      case 'LOGOUT':
        {
          sessionStorage.removeItem("token")
           return {
          ...state,
          isLoggedIn: false,
          token: null,
          error: null,
        };
        }
       
      default:
        return state;
    }
  };
  
  export default authReducer;
  