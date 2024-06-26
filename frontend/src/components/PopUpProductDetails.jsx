import React, { useState } from "react";

const PopUpProductDetails = ({ showPopUp, setShowPopUp, product }) => {
  const [quantity, setQuantity] = useState(1);
  const handleAddCartItems = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/cart/add", {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({productId:product._id,quantity:quantity})
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
      setShowPopUp(!showPopUp)
    //   setCartItems([...data.data.items])
    //   setProductList([...data.data]);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <>
      <div
        className="fixed z-10 overflow-y-auto top-0 w-full left-0"
        id="modal"
      >
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>
          <div
            className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white pb-4 sm:p-6 sm:pb-4">
              <img
                src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="Product"
                className="h-40 w-full object-cover rounded-t-xl"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 border-b-2">
                  <span>category:</span>
                  <div className=" mr-3 uppercase text-xs my-3">
                    {product.category}
                  </div>
                </div>
                <div className="flex items-center gap-2 border-b-2">
                  <span>name: </span>
                  <div className="text-lg font-bold text-black truncate block capitalize my-3">
                    {product.name}
                  </div>
                </div>
                <div className="flex items-center gap-2 border-b-2">
                  <span>description: </span>
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 border-b-2">
                  <span>price: </span>
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    ${product.price}
                  </p>
                </div>
                <div className="flex items-center gap-2 border-b-2">
                  <span>season: </span>
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                    {product.season}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 px-4 py-3 text-right flex items-end justify-end">
              <button
                type="button"
                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                onClick={() => {
                  setShowPopUp(!showPopUp);
                }}
              >
                <i className="fas fa-times"></i> Close
              </button>
              <div
                type="button"
                className=" px-4 bg-slate-400 text-white rounded font-medium mr-2 flex flex-col items-center"
              >
                <label
                  htmlFor="quantity-input"
                  class="block mb-2 text-xs sm:text-lg font-medium text-gray-900 dark:text-white"
                >
                  Choose quantity (in KG):
                </label>
                <div class="relative flex items-center max-w-[8rem]">
                  <button
                    type="button"
                    id="decrement-button"
                    onClick={()=>{
                        if(quantity > 1){
                            setQuantity(quantity - 1);
                        }
                    }}
                    data-input-counter-decrement="quantity-input"
                    class="flex items-center bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-7 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      class="w-3 h-3 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    id="quantity-input"
                    data-input-counter
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border-x-0 border-gray-300 h-7 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={quantity}
                    required
                  />
                  <button
                    type="button"
                    id="increment-button"
                    onClick={()=>{
                        
                            setQuantity(quantity +1);
                        
                    }}
                    data-input-counter-increment="quantity-input"
                    class="flex items-center bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-7 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      class="w-3 h-3 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
                <button onClick={handleAddCartItems} className="fas fa-plus bg-gray-700 hover:bg-gray-500 transition duration-0.5 my-1 p-1 rounded-lg">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpProductDetails;
