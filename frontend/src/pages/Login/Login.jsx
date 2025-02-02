import { motionHoverAndTap } from "../../utils/helperFunctions/helperFunctions";
import * as Constants from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import { memo, useState, useRef } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  // State for login status
  const [loginStatus, setLoginStatus] = useState({
    loading: false,
    error: null,
  });

  // Form references
  const formRef = useRef({
    email: null,
    password: null,
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginStatus({ ...loginStatus, loading: true, error: null });

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
        console.log("Login successful:", response.data);

        // Store token in localStorage
        localStorage.setItem("token", response.data.token);

        // Decode token to get user info
        const userInfo = jwtDecode(response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        console.log("User Info:", userInfo);

        setLoginStatus({ ...loginStatus, loading: false });
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (err) {
      console.error("Error during login:", err);
      setLoginStatus({
        ...loginStatus,
        error: err.response?.data?.message || "Login failed. Please try again.",
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

        {loginStatus.loading ? (
          <div className="flex justify-center items-center py-4">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
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
                  className={`px-32 sm:px-56 py-2 w-auto font-bold text-dark-primaryTextColor ${loginStatus.loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-dark-cardBgColor hover:bg-light-backgroundColor hover:text-dark-backgroundColor"
                    } border border-y-dark-secondaryTextColor rounded-lg transition duration-300 ease-in-out`}
                  disabled={loginStatus.loading}
                >
                  Log In
                </button>
              )}
            </div>
          </form>
        )}

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
