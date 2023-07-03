import { useEffect, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { userSignUp } from "../Redux/authReducer/authActions";
import { SIGN_REQ } from "../Redux/authReducer/authActionTypes";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { LoadingType, signUpSuccess, signUpError } = useSelector(
    (store) => store.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const LoggedData = useSelector((store) => store.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(formData)

    dispatch(userSignUp(formData));
  };

  // useEffect(()=>{

  // console.log(formData)

  // },[])
//   console.log(LoadingType, signUpError, signUpSuccess);

  return (
    <div id="container">
      <h2>SignUp Page</h2>
      <form onSubmit={(e) => handleSubmit(e)} action="">
        <input
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          name="email"
          type="text"
          placeholder="email"
        />
        <input
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          type="text"
          name="password"
          placeholder="password"
        />{" "}
        <br />
        {LoggedData.signUpError && (
          <div className="error_div">
            <p>{LoggedData.signUpError}</p>
          </div>
        )}
        {LoggedData.signUpSuccess && (
          <div className="success_div">
            <p>{LoggedData.signUpSuccess}</p>
          </div>
        )}
        <input type="submit" value={ LoadingType==SIGN_REQ? "Signing..." : "SignUp"} />
      </form>
      <Link to={"/login"}>Already Registered ? Login Here</Link>
    </div>
  );
};


export default SignUpPage;
