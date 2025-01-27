//import jwtDecode from "jwt-decode"; // Correct import statement
import * as jwtDecode from "jwt-decode";


export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};

export const getAuthToken = () => {
  if (localStorage.getItem("token")) {
    const user = jwtDecode(localStorage.getItem("token")); // Use jwtDecode
    if (Date.now() >= user.exp * 1000) {
      // remove token
      removeAuthToken();
      return {};
    }
    return { token: localStorage.getItem("token"), user: user };
  } else {
    return {};
  }
};

export const removeAuthToken = () => {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
  }
};
