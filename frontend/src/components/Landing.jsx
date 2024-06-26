import React, { useState } from "react";
import ProductCard from "./ProductCard";
import PopUpProductDetails from "./PopUpProductDetails";
import { Link } from "react-router-dom";

const Landing = ({ productList }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [productDetails, setProductDeltails] = useState({});
  const handleProductClick = (product) => {
    setProductDeltails(product);
  };
  return (
    <>
      <div className="min-h-screen bg-slate-600">
        {showPopUp && (
          <PopUpProductDetails
            product={productDetails}
            showPopUp={showPopUp}
            setShowPopUp={setShowPopUp}
          />
        )}
        <div className="h-[10%] bg-slate-700 flex items-center justify-between shadow-xl">
          <div className="text-lg sm:text-3xl font-bold text-slate-300">
            Product Listing
          </div>
          <Link to="/cart">
            <div className="flex justify-evenly items-center m-1 sm:m-3">
              <button className="text-lg sm:text-2xl font-bold text-slate-300 hover:text-slate-400 p-2 sm:p-3 bg-neutral-800  hover:bg-neutral-600 transition duration-150 rounded-lg">
                Show My Cart
              </button>
            </div>
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 py-3 justify-center">
          {productList?.map((product, index) => (
            <ProductCard
              product={product}
              showPopUp={showPopUp}
              setShowPopUp={setShowPopUp}
              key={product._id}
              handleProductClick={handleProductClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Landing;
