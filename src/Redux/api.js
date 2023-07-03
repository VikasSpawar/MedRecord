import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
  defaults:{
    headers:{
      common:{
        Authorization:`Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
      }
    }
  }
});

// Set the default headers for all requests
 const setAuthToken=(token)=>{
    

    sessionStorage.setItem("token",JSON.stringify(token))

    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} 

export  {API , setAuthToken};

