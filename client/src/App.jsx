import LoginSignup from './Components/LoginSignup';
import React from 'react';
import './App.css'
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {


  return (
    <>
     <Router>
        <Routes>
          <Route
            path="/"
            element={
              
                <LoginSignup/>
             
            }
          />
            <Route
            path="/forgot-password"
            element={
              
                <ForgotPassword/>
             
            }
          />
           <Route
            path="/reset-password/:id/:token"
            element={
              
                <ResetPassword/>
             
            }
          />
          </Routes>
          </Router>
    </>
  )
}

export default App
