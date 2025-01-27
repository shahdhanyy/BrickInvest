import { renderInput } from "../../utils/helperFunctions/helperFunctions";
import * as Constants from "../../utils/Constants";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  // Using useRef to handle form input values directly
  const formRef = useRef({
    name: null,
    email: null,
    password: null,
    code: null,
  });

  // State to handle loading, success, and error messages
  const [register, setRegister] = useState({
    loading: false,
    success: "",
    error: null,
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, error: null, success: "" });

    // Ensure all refs are correctly assigned
    if (
      !formRef.current.name?.value.trim() ||
      !formRef.current.email?.value.trim() ||
      !formRef.current.password?.value.trim() ||
      !formRef.current.code?.value.trim()
    ) {
      setRegister({ ...register, error: "Please fill all required fields.", loading: false });
      return;
    }

    // Form validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formRef.current.email.value)) {
      setRegister({ ...register, error: "Invalid email address.", loading: false });
      return;
    }

    if (formRef.current.password.value.length < 6) {
      setRegister({ ...register, error: "Password must be at least 6 characters.", loading: false });
      return;
    }

    // Creating the payload with default values for userTypeId and gender
    const payload = {
      name: formRef.current.name.value.trim(),
      email: formRef.current.email.value.trim().toLowerCase(),
      password: formRef.current.password.value.trim(),
      code: formRef.current.code.value.trim(),
      userTypeId: 0, // Default value
      gender: 0, // Default value (0 for Male, 1 for Female)
    };

    console.log("Submitting payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await axios.post("https://localhost:7183/api/Auth/register", payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Success response:", response.data);

      if (response.status === 200) {
        setRegister({ ...register, success: "Registration successful!", loading: false });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error("Error response:", err.response);

      if (err.response?.data?.errors) {
        const errorMessages = Object.entries(err.response.data.errors)
          .map(([key, value]) => `${key}: ${value.join(", ")}`)
          .join(" | ");
        setRegister({ ...register, error: errorMessages, loading: false });
      } else {
        setRegister({
          ...register,
          error: err.response?.data?.message || "An error occurred. Please try again.",
          loading: false,
        });
      }
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 shadow-custom p-8 m-8 bg-white rounded-lg">
        <div className="font-bold text-2xl sm:text-3xl text-center">
          {Constants.COMPANY_NAME}
        </div>
        <div className="text-sm sm:text-xl text-center">
          Sign up with your details.
        </div>

        {register.error && (
          <div className="text-red-500 text-center">
            {register.error.split(" | ").map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        )}

        {register.success && <div className="text-green-500 text-center">{register.success}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-wrap py-2 gap-4 sm:w-128">
            <input
              type="text"
              placeholder="Enter Full Name"
              ref={(el) => (formRef.current.name = el)}
              className="p-2 border rounded w-full"
            />
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
            <input
              type="text"
              placeholder="Enter Code"
              ref={(el) => (formRef.current.code = el)}
              className="p-2 border rounded w-full"
            />
          </div>

          <div className="flex justify-center items-center">
            <motion.button
              type="submit"
              disabled={register.loading}
              whileHover={!register.loading ? { scale: 1.1 } : {}}
              whileTap={!register.loading ? { scale: 0.9 } : {}}
              className={`px-32 sm:px-56 py-2 w-auto font-bold text-dark-primaryTextColor ${
                register.loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-dark-cardBgColor hover:bg-light-backgroundColor hover:text-dark-backgroundColor"
              } border border-y-dark-secondaryTextColor rounded-lg transition duration-300 ease-in-out`}
            >
              {register.loading ? "Processing..." : "Sign Up"}
            </motion.button>
          </div>
        </form>

        <div className="text-sm sm:text-xl text-center">
          Already have an account? &nbsp;
          <b className="cursor-pointer text-blue-500" onClick={() => navigate("/login")}>
            Login
          </b>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
