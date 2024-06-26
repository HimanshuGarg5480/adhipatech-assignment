import React from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate=useNavigate();
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      window.localStorage.setItem('accessToken', data.data.accessToken);
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <>
      <Login handleLogin={handleLogin}/>
    </>
  );
};

export default LoginPage;
