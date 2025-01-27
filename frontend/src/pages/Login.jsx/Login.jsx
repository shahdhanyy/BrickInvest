import { motionHoverAndTap } from "../../utils/helperFunctions/helperFunctions";
import * as Constants from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogIn } from "../../store/userSlice";
import { memo, useState, useRef } from "react";
import axios from "axios";
//import jwt from "jwt-decode";
//import jwtDecode from "jwt-decode";
import * as jwtDecode from "jwt-decode";


import { setAuthToken } from "../../services/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to handle loading and error messages
  const [loginStatus, setLoginStatus] = useState({
    loading: false,
    error: null,
    success: "",
  });

  // Form inputs using useRef
  const formRef = useRef({
    email: null,
    password: null,
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginStatus({ ...loginStatus, loading: true, error: null });

    // Ensure all fields are correctly assigned
    if (!formRef.current.email?.value.trim() || !formRef.current.password?.value.trim()) {
      setLoginStatus({ ...loginStatus, error: "Email and password are required.", loading: false });
      return;
    }

    const payload = {
      email: formRef.current.email.value.trim().toLowerCase(),
      password: formRef.current.password.value,
    };

    try {
      const response = await axios.post("https://localhost:7183/api/Auth/login", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        // Decode token and set auth state
        const user = jwtDecode(response.data.token);  // Use the function correctly
        setAuthToken(response.data.token);
        dispatch(userLogIn());

        if (user.role === "Admin") {
          navigate("/admin-home");
        } else if (user.role === "Professor") {
          navigate("/professor-home");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error("Full Error Object:", err);
      console.error("Error Response:", err.response);
      console.error("Error Data:", err.response?.data);
      setLoginStatus({
        ...loginStatus,
        error: err.response?.data?.message || "Invalid email or password.",
        loading: false,
      });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 shadow-custom p-8 m-8 bg-white rounded-lg">
        <div
          className="font-bold text-2xl sm:text-3xl text-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          {Constants.COMPANY_NAME}
        </div>
        <div className="text-sm sm:text-xl text-center">Log in with your credentials.</div>

        {loginStatus.error && <div className="text-red-500 text-center">{loginStatus.error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-wrap py-2 gap-4 sm:w-128">
            <input
              type="email"
              placeholder="Enter Email"
              ref={(el) => (formRef.current.email = el)}
              className="p-2 border rounded w-full"
            />
            <input
              type="password"
              placeholder="Enter Password"
              ref={(el) => (formRef.current.password = el)}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="flex justify-center items-center">
            {motionHoverAndTap(
              <button
                type="submit"
                className={`px-32 sm:px-56 py-2 w-auto font-bold text-dark-primaryTextColor ${
                  loginStatus.loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-dark-cardBgColor hover:bg-light-backgroundColor hover:text-dark-backgroundColor"
                } border border-y-dark-secondaryTextColor rounded-lg transition duration-300 ease-in-out`}
                disabled={loginStatus.loading}
              >
                {loginStatus.loading ? "Processing..." : "Log In"}
              </button>
            )}
          </div>
        </form>

        <div className="text-sm sm:text-xl text-center">
          No account yet? &nbsp;
          <b className="cursor-pointer text-blue-500" onClick={() => navigate("/signup")}>
            Sign up
          </b>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
