import {
  renderInput,
} from "../../utils/helperFunctions/helperFunctions";
import * as Constants from "../../utils/Constants";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  // State to hold form input values
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // State to handle errors
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(""); // Reset error

    try {
      // Replace this URL with your actual backend endpoint
      const response = await axios.post("https://run.mocky.io/v3/036ce2e3-4a96-4dea-935e-6f89750bea4f", formData);
      console.log(response.data); // Logs the response from the mock API

      if (response.status === 200) {
        // Navigate to the login page upon successful signup
        navigate("/login");
      }
    } catch (err) {
      // Handle errors (e.g., user already exists, invalid input)
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 shadow-custom p-8 m-8">
        <div className="font-bold text-2xl sm:text-3xl text-center">
          {Constants.COMPANY_NAME}
        </div>
        <div className="text-sm sm:text-xl text-center">
          Sign up with your details.
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-wrap py-2 gap-4 sm:w-128">
            {renderInput("Enter Full Name", "text", "fullName", handleChange, formData.fullName)}
            {renderInput("Enter Email", "email", "email", handleChange, formData.email)}
            {renderInput("Enter Password", "password", "password", handleChange, formData.password)}
          </div>
          <div className="flex justify-center items-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-32 sm:px-56 py-2 w-auto font-bold text-dark-primaryTextColor bg-dark-cardBgColor border border-y-dark-secondaryTextColor rounded-lg cursor-pointer hover:bg-light-backgroundColor hover:text-dark-backgroundColor transition duration-300 ease-in-out"
            >
              SignUp
            </motion.button>
          </div>
        </form>
        <div className="text-sm sm:text-xl text-center">
          Already have an account? &nbsp;
          <b className="cursor-pointer" onClick={() => navigate("/login")}>
            Login
          </b>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
