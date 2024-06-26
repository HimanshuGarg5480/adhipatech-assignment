import React from "react";
import Signup from "../components/Signup";
const SignupPage = () => {
  const handleSignup=async(name,email,password)=>{
    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('User registered successfully:', data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
  return (
    <>
      <Signup handleSignup={handleSignup}/>
    </>
  );
};

export default SignupPage;
