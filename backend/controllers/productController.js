import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Product } from "../models/Product.model.js";
import { ApiError } from "../utils/apiError.js";


const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find().exec();
        return res.status(200).json(new ApiResponse(200,products));
    } catch (error) {
        throw new ApiError(500,error.message);
    }
});

const fetchProductById = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).exec();
        if (!product) {
            return res.status(404).json(new ApiResponse(400,{},"no data found"));
        }
        return res.status(200).json(new ApiResponse(200,product));
    } catch (error) {
        throw new ApiError(500,error.message);
    }
});
export { fetchAllProducts, fetchProductById };
