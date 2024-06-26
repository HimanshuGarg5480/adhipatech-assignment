import React from "react";

const CartItem = ({ item ,cartItems,setCartItems}) => {
  const handleRemoveCartItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/remove/${item.productId._id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("123")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("fetched products successfully:", data);
      const unauthorized = data.data.unauthorized;
      if (unauthorized) {
        navigate("/login");
      }
      const filteredItems = cartItems.filter((i)=>i.productId._id.toString() !== item.productId._id.toString());
      console.log(filteredItems)
      setCartItems([...filteredItems]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex items-center hover:bg-slate-400 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="flex flex-col gap-2 justify-between ml-4 flex-grow">
          <span className="font-bold text-sm">{item.productId.name}</span>
          <span className="text-lime-400 text-xs">
            {item.productId.category}
          </span>
          <div onClick={handleRemoveCartItems} className="font-semibold hover:text-red-500 text-red-400 text-xs cursor-pointer">
            Remove
          </div>
        </div>
      </div>
      <div className="flex justify-center w-1/5">{item.quantity} KG</div>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${item.productId.price}
      </span>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${item.quantity * item.productId.price}
      </span>
    </div>
  );
};

export default CartItem;
