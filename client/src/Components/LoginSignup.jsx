import React, { useState } from "react";
import "./LoginSignup.css";
import email_icon from "./Assets/email.png";
import user_icon from "./Assets/person.png";
import password_icon from "./Assets/password.png";
import instance from "../Axios/instance";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../Redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const [action, setAction] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  });
  const handleClick = () => {
    setAction(action === "Sign Up" ? "Login" : "Sign Up");
    setErrors("");
  };

  const handleFormSubmit = () => {
    let valid = true;
    const newErrors = { email: "", password: "", name: "", phoneNumber: "" };

    // Email validation
    if (!email || !email.includes("@")) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    // Password validation
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!password.match(passwordRegex)) {
      newErrors.password =
        "Password must contain at least one letter, one number, and one special character";
      valid = false;
    }

    // Name validation
    if (!name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Phone number validation

    if (!phoneNumber || !phoneNumber.match(/^\d{10}$/)) {
      newErrors.phoneNumber = "Phone number must contain 10 digits";
      valid = false;
    }

    if (valid && action === "Sign Up") {
      const formData = {
        email: email,
        password: password,
        name: name,
        phoneNumber: phoneNumber,
      };

      instance
        .post("/user/sign-up", { formData }, { withCredentials: true })
        .then((response) => {
          const { data } = response;
          dispatch(setUser(data?.newUser));
          navigate("/home");
        })
        .catch((err) => {
          if (err.response) {
            setErrors({ ...newErrors, serverError: err.response.data.error });
          }
        });
    } else if (action == "Login") {
      const formData = { email: email, password: password };
      instance
        .post("/user/sign-in", { formData })
        .then((response) => {
          const { data } = response;
          dispatch(setUser(data?.validUser));
          dispatch(setToken(data?.token));
          navigate("/home");
        })
        .catch((err) => {
          if (err.response) {
            setErrors({ ...newErrors, serverError: err.response.data.error });
          }
        });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <>
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email Id"
              />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
            </div>
          </>
        ) : (
          <>
            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email Id"
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Name"
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="Phone Number"
              />
              {errors.phoneNumber && (
                <div className="error">{errors.phoneNumber}</div>
              )}
            </div>
          </>
        )}
      </div>

      {action === "Login" ? (
        <div className="forgot-password">
          Forgot Password?{" "}
          <Link to="/forgot-password">
            <span>Click here</span>
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="submit-container">
        <div className="submit" onClick={handleFormSubmit}>
          {action === "Sign Up" ? "Sign Up" : "Login"}
        </div>
        <div
          className="submit gray"
          onClick={handleClick}
          // onClick={() => setAction(action === 'Sign Up' ? 'Login' : 'Sign Up')}
        >
          {action === "Sign Up" ? "Login" : "Sign Up"}
        </div>
      </div>
      {errors.serverError && <div className="error">{errors.serverError}</div>}
    </div>
  );
};

export default LoginSignup;
