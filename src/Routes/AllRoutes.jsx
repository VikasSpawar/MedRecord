import {Route,Routes} from "react-router-dom"
import Home from "../Pages/Home"
import LoginPage from "../Pages/Login"
import SignUpPage from "../Pages/SignUp"
import PrivateRoute from "../components/PrivateRoute"


const AllRoutes=()=>{

    return(
       <Routes>
        <Route path="/" element={
            <PrivateRoute>
                <Home/>
            </PrivateRoute>
    }
        /> 
        <Route path="/login" element={<LoginPage/>}/> 
        <Route path="/signup" element={<SignUpPage/>}/> 

        <Route path="/add_task" element={<h1>Add Task Page</h1>}/>
       </Routes>
    )
}

export default AllRoutes