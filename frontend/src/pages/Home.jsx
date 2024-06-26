import React, { useEffect, useState } from "react";
import Landing from "../components/Landing";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [productList,setProductList]=useState([]);
  const handleGetProductList = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/products/", {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("fetched products successfully:", data);
      if(data.data.unauthorized){
        navigate("/login");
      }
      setProductList([...data.data]);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  useEffect(()=>{
    handleGetProductList();
  },[])
  return (
    <>
      <Landing productList={productList}/>
    </>
  );
};

export default Home;
