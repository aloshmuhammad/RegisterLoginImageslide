import LoginSignup from "./Components/LoginSignup";
import React from "react";
import "./App.css";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import HomePage from "./Components/HomePage";
import ImageProcess from "./Components/ImageProcess";
import ImageList from "./Components/ImageList";
import LazyLoad from "./Components/LazyLoad";
import { Suspense, fallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.userSlice.token);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LazyLoad />}>
                <LoginSignup />{" "}
              </Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<LazyLoad />}>
                <ForgotPassword />{" "}
              </Suspense>
            }
          />

          <Route
            path="/reset-password/:id/:token"
            element={
              <Suspense fallback={<LazyLoad />}>
                <ResetPassword />{" "}
              </Suspense>
            }
          />
          <Route
            path="/home"
            element={
              token ? (
                <Suspense fallback={<LazyLoad />}>
                  <HomePage />{" "}
                </Suspense>
              ) : (
                <Suspense fallback={<LazyLoad />}>
                  <LoginSignup />{" "}
                </Suspense>
              )
            }
          />
          <Route
            path="/image-upload"
            element={
              token ? (
                <Suspense fallback={<LazyLoad />}>
                  <ImageProcess />{" "}
                </Suspense>
              ) : (
                <Suspense fallback={<LazyLoad />}>
                  <LoginSignup />{" "}
                </Suspense>
              )
            }
          />
          <Route
            path="/image-list"
            element={
              token ? (
                <Suspense fallback={<LazyLoad />}>
                  <ImageList />{" "}
                </Suspense>
              ) : (
                <Suspense fallback={<LazyLoad />}>
                  <LoginSignup />{" "}
                </Suspense>
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
