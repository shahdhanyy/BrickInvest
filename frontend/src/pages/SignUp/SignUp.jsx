import {
  motionHoverAndTap,
  renderInput,
} from "../../utils/helperFunctions/helperFunctions";
import * as Constants from "../../utils/Constants";
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
    gender: "",
  });

  // State to handle errors for each field
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.password.trim())
      newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";
    if (!formData.gender)
      newErrors.gender = "Please select your gender.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setErrors({}); // Reset errors

    // Validate form
    if (!validateForm()) return;

    try {
      // Replace this URL with your actual backend endpoint
      const response = await axios.post(
        "https://run.mocky.io/v3/036ce2e3-4a96-4dea-935e-6f89750bea4f",
        formData
      );
      console.log(response.data); // Logs the response from the mock API

      if (response.status === 200) {
        // Navigate to the login page upon successful signup
        navigate("/login");
      }
    } catch (err) {
      // Handle errors (e.g., user already exists, invalid input)
      setErrors({
        general:
          err.response?.data?.message || "An error occurred. Please try again.",
      });
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
        {errors.general && (
          <div className="text-red-500 text-center">{errors.general}</div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-wrap py-2 gap-4 sm:w-128">
            {renderInput(
              "Enter Full Name",
              "text",
              "fullName",
              handleChange,
              formData.fullName
            )}
            {errors.fullName && (
              <span className="text-red-500 text-sm">{errors.fullName}</span>
            )}

            {renderInput(
              "Enter Email",
              "email",
              "email",
              handleChange,
              formData.email
            )}
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}

            {renderInput(
              "Enter Password",
              "password",
              "password",
              handleChange,
              formData.password
            )}
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Gender</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
            {errors.gender && (
              <span className="text-red-500 text-sm">{errors.gender}</span>
            )}
          </div>

          <div className="flex justify-center items-center">
            {motionHoverAndTap(
              <button
                type="submit"
                className="px-32 sm:px-56 py-2 w-auto font-bold text-dark-primaryTextColor bg-dark-cardBgColor border border-y-dark-secondaryTextColor rounded-lg cursor-pointer hover:bg-light-backgroundColor hover:text-dark-backgroundColor transition duration-300 ease-in-out"
              >
                SignUp
              </button>
            )}
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
