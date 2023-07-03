import { useEffect, useState } from "react"
import "./Login.css"
import {Link} from "react-router-dom"
import { addUser } from "../Redux/Action"

const SignUpPage=()=>{


    const [formData,setFormData]=useState({
        email:"",
        password:""
    })

    const handleSubmit=(e)=>{

        e.preventDefault()

        // console.log(formData)

        addUser(formData)

    }

    // useEffect(()=>{

        // console.log(formData)

    // },[])

    return(
        <div id="container">

            <h2>SignUp Page</h2>
            <form onSubmit={(e)=>handleSubmit(e)} action="">

            <input onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})} name="email" type="text" placeholder="email" />
            <input onChange={(e)=>setFormData({...formData,[e.target.name]:e.target.value})} type="text" name="password" placeholder="password" /> <br />
            <input  type="submit" value={"SignUp"} />



            </form>
           <Link to={"/login"}>Already Registered ? Login Here</Link>
        </div>
    )
}

export default SignUpPage