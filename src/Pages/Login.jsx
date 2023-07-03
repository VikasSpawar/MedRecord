import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginSuccess, userLogin } from "../Redux/authReducer/authActions";
import "./Login.css";
import { setAuthToken } from "../Redux/api";
import { LOGIN_REQ } from "../Redux/authReducer/authActionTypes";

const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
  const LoggedData = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData)
    try {
      await dispatch(userLogin(formData));
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(isLoggedIn)

  useEffect(() => {
    let token = JSON.parse(sessionStorage.getItem("token"));

    if (token) {
      dispatch(loginSuccess(token));
      setAuthToken(token);
    }

    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  console.log(LoggedData)

  return (
    <div id="container">
      <h2>Login Page</h2>
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
          
        {LoggedData.error&& <div className="error_div">

          <p>{LoggedData.error}</p>
        </div>
        }
        <br />
        <input type="submit" value={ LoggedData.LoadingType==LOGIN_REQ ? "Loggin In...":"Login"} />
      </form>

      <Link to={"/signup"}> Not Registerd ? SignUp Here </Link>
    </div>
  );
};

export default LoginPage;
