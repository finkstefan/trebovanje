import axios from "axios";

const API_URL = "/auth";

const login = (username, password) => {

  return axios
    .post(`http://localhost:4250/api/login`, {
      username,
      password
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("token", JSON.stringify(response.data));
        console.log(response.data)
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  login,
  logout,
  getCurrentUser,
};

export default authService;