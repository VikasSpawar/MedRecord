import { ADD_NEW_TASK, ADD_NEW_TASK_REQ, DELETE_TASK, DELETE_TASK_REQ, GET_ALL_TASK, GET_ALL_TASK_REQ, TOGGLE_TASK_STATUS, TOGGLE_TASK_STATUS_REQ, UPDATE_TASK_STATUS_REQ } from "./ActionType"
import axios from "axios"

const InitialData={
    AllTasks:[],
    LoadingType:"",
    isError:""
}

const reducer=(store=InitialData,action)=>{

    switch(action.type){

        case GET_ALL_TASK_REQ:{
            return {
                ...store,
                LoadingType:GET_ALL_TASK_REQ
            }
        }
        case ADD_NEW_TASK_REQ:{
            return{
                ...store,
                LoadingType:ADD_NEW_TASK_REQ
            }
        }
        case DELETE_TASK_REQ:{
             return{
                ...store,
                LoadingType:DELETE_TASK_REQ
             }
        }
        case TOGGLE_TASK_STATUS_REQ:{
            return{
                ...store,
                LoadingType:TOGGLE_TASK_STATUS_REQ
            }
        }
        case UPDATE_TASK_STATUS_REQ:{
            return{
               ...store,
               LoadingType:UPDATE_TASK_STATUS_REQ 
            }
        }
        case GET_ALL_TASK:{

            return{
                ...store,
                AllTasks:action.payload,
                LoadingType:"",
                isError:""
            }
        }
        case ADD_NEW_TASK :{

            
                let data=action.payload

                // console.log(data)
             
                
      
               return {
                ...store,
                AllTasks:[...store.AllTasks,action.payload], LoadingType:"",isError:""
            }
        }
         
        case DELETE_TASK:{

            let UpdatedTasks=store.AllTasks.filter((el)=>el._id!==action.payload)
            

            return {
                ...store,
                AllTasks:UpdatedTasks,
                LoadingType:"",
                isError:""
            }
        }
        case TOGGLE_TASK_STATUS:{

            return {
                ...store,
                AllTasks:action.payload,
                LoadingType:"",
                isError:""
            }

        }
        case TOGGLE_TASK_STATUS_REQ:{

            return {

                ...store,
                LoadingType:"",
                isError:""            }
        }
        default : 
        return store
    }

}

export default reducer
