import axios from "axios"
import { ADD_NEW_TASK, ADD_NEW_TASK_REQ, DELETE_TASK, DELETE_TASK_REQ, GET_ALL_TASK, GET_ALL_TASK_REQ, TOGGLE_TASK_STATUS, TOGGLE_TASK_STATUS_REQ, UPDATE_TASK_STATUS_REQ } from "./ActionType"
import { API } from "./api"

// const API.baseURL=`http://localhost:8080/`


export const getAllTaskReq=()=>{
    return {
        type:GET_ALL_TASK_REQ
    }
}
export const updateTaskStatusReq=()=>{

    return{
        type:UPDATE_TASK_STATUS_REQ
    }
}

export const addNewTaskSuccess=(payload)=>{
    return {
        type:ADD_NEW_TASK,
        payload
    }
}
export const addNewTaskReq=()=>{
    return{
        type:ADD_NEW_TASK_REQ
    }
}

export const setAllTask=(payload)=>{
    return {
        type:GET_ALL_TASK,
        payload
    }
}
export const DeleteTaskReq=()=>{
    return{
        type:DELETE_TASK_REQ
    }
}
export const ToggleTaskReq=()=>{
    return{
        type:TOGGLE_TASK_STATUS_REQ
    }
}
export const deleteTaskSuccess=(payload)=>{

    return {
        type:DELETE_TASK
        ,
        payload
    }
}

export const toggleStatus=(payload)=>{

    return{
           type:TOGGLE_TASK_STATUS,
    payload
    }
 
}


export const getAllTask=()=>async(dispatch)=>{
        dispatch(getAllTaskReq())
    try {
        const res = await API.get(`${`/all_tasks`}`);

        dispatch(setAllTask(res.data))
      } catch (error) {
      
        throw new Error('Error fetching tasks');
      }
}


export const addNewTask=(token,data)=>async(dispatch)=>{

    dispatch(addNewTaskReq())
    console.log("token from action",token,data)

    if(data.title==" "||data.title==""){

        alert("Title can't be empty")

    }

    else{
       try {
    const response = await API.post(`/add_task`, { ...data });

    console.log("Response from action" , response)

  } catch (error) {
    console.error(error);
    throw new Error('Error adding task');
  }
    }
  
}

export const deleteTask=(id)=>(dispatch)=>{

    dispatch(DeleteTaskReq())
    console.log("id in deleteTask",id)
API.delete(`/deleteTask/${id}`).then((res)=>{

    console.log(res)
    dispatch( deleteTaskSuccess(id) )
    // dispatch(getAllTask())
})

}

export const updateTaskStatus=(data)=>(dispatch)=>{
    // console.log(data)

    dispatch(updateTaskStatusReq())
    if(data.title==""||data.title==""){
        alert("Title can't be empty")
    }


    else{
           API.patch(`/update/${data._id}`,data).then((res)=>{
        
        // console.log(res)
        dispatch(toggleStatus(res.data))
        return true


    })
    .catch((err)=>{

        console.log(err)
    })
    }
 
}

export const  addUser=(userData)=>{


    API.post("\signup",userData).then((res)=>{

        alert("Userdata has been saved ")
        // console.log(res)

    })



}




