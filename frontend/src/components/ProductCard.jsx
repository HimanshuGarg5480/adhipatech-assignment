import React from "react";

const ProductCard = ({ product,showPopUp,setShowPopUp,handleProductClick}) => {
  return (
    <div onClick={()=>{setShowPopUp(!showPopUp); handleProductClick(product)}} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="Product"
          className="h-40 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {product.category}
          </span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {product.name}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              ${product.price}
            </p>

            <p className="text-sm text-gray-600 cursor-auto ml-2">season: {product.season}</p>

           
          </div>
        </div>
    </div>
  );
};

export default ProductCard;
