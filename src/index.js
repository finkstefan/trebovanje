/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


import React from 'react';  
import ReactDOM from 'react-dom';  
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'  
import './index.css';  
import App from './App';  
import Login from './components/Login'  

  
const routing = (  
  <Router>  
    <div>  
    
     <Route path="/" component={App} />  
      <Route path="/login" component={Login} />  
    
    
      
    </div>  
  </Router>  
)  
ReactDOM.render(routing, document.getElementById('root'));  
*/
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      
    </Routes>
  </BrowserRouter>,
  rootElement
);