import axios from "axios";
import jwt from 'jwt-decode'


const API_URL = "/auth";


const login = (username, password) => {

  return axios
    .post(`http://localhost:4250/api/login`, {
      username,
      password
    })
    .then((response) => {
      if (response.data) {
        var token=JSON.stringify(response.data)
        localStorage.setItem('token', token);
       // console.log(response.data)
        var decoded = jwt(token);
        var role=decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        var email=decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        //console.log(decoded)
        localStorage.setItem('userRole', role);
        localStorage.setItem('userEmail', email);
      /*  console.log(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
        console.log(email)
        console.log(localStorage.getItem('userEmail')) */
        
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUserToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

const authService = {
  login,
  logout,
  getCurrentUserToken,
};

export default authService;