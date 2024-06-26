import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const CartPage = () => {
    const [cartItems,setCartItems]=useState([]);
    const getCartItems = async () => {
        try {
          const response = await fetch("http://localhost:8000/api/cart/", {
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
          const unauthorized=data.data.unauthorized
          if(unauthorized){
            navigate("/login");
          }
          setCartItems([...data.data.items])
        //   setProductList([...data.data]);
        } catch (error) {
          console.error("Error registering user:", error);
        }
      };
      useEffect(()=>{
        getCartItems();
      },[])
  return (
    <div className="min-h-screen bg-slate-500 px-10 py-10">
      <div className="flex justify-between border-b pb-8 text-slate-300">
        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
        <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
      </div>
      <div className="flex mt-10 mb-5 text-slate-300">
        <h3 className="font-semibold text-xs uppercase w-2/5">
          Product Details
        </h3>
        <h3 className="font-semibold text-center text-xs uppercase w-1/5">
          Quantity
        </h3>
        <h3 className="font-semibold text-center text-xs uppercase w-1/5">
          Price
        </h3>
        <h3 className="font-semibold text-center text-xs uppercase w-1/5">
          Total
        </h3>
      </div>
      <div className="h-[70%] overflow-y-scroll ">
        {
            cartItems.map((item)=>(
                <CartItem item={item} key={item._id} cartItems={cartItems} setCartItems={setCartItems}/>
            ))
        }
      </div>

      <Link to="/" className="flex font-semibold text-gray-300 text-sm mt-10">
        <svg className="fill-current mr-2 w-4" viewBox="0 0 448 512">
          <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
        </svg>
        Continue Shopping
      </Link>
    </div>
  );
};

export default CartPage;
