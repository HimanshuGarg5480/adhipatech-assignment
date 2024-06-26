import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Cart } from "../models/Cart.model.js";
import { ApiError } from "../utils/apiError.js";

const fetchAllCartItems = asyncHandler(async (req, res) => {
  try {
    const userId = await req.user._id;
    const cart = await Cart.findOne({userId:userId}).populate('items.productId').exec();
    console.log(cart)
    if (!cart) {
      return res.status(200).json(200,{
        data:{items:[]}
      })
    }
    res
      .status(200)
      .json(new ApiResponse(200, cart, "Cart items fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const addItemInCart = asyncHandler(async (req, res) => {
  try {
    const userId = await req.user.id;
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      const newCart = new Cart({ userId, items: [{ productId, quantity }] });
      await newCart.save();
    }
    cart.items=[...cart.items,{ productId, quantity }];
    await cart.save();
    res
      .status(200)
      .json(
        new ApiResponse(200, { productId, quantity }, "item add successfully")
      );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const deleteItemFromCart = asyncHandler(async (req, res) => {
  try {
    const userId = await req.user._id;
    const productId = req.params.id;
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      throw new ApiError(404,"No cart found");
    }
    const filterItems = cart.items.filter((item) => item.productId != productId);
    console.log(filterItems)
    // if (index === -1) {
    //   throw new ApiError(404,"Item not found in cart");
    // }
    cart.items=filterItems;
    await cart.save();
    res.status(200).json(new ApiResponse(200, {}, "item deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});
export { fetchAllCartItems, addItemInCart, deleteItemFromCart };
