import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/apiError.js";

const generateAccessAndRefreshToken = async function (user_id) {
  try {
    const user = await User.findById(user_id);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            201,
            "please fill all fields",
            "please fill all fields"
          )
        );
    }

    const userAlreadyExisted = await User.findOne({ email: email });
    if (userAlreadyExisted) {
      return res
        .status(400)
        .send(
          new ApiResponse(201, "User Already existed", "User Already existed")
        );
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const Options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const userResponse = user.toObject();
    delete userResponse.password;
    return res
      .status(201)
      .cookie("accessToken", accessToken, Options)
      .cookie("refreshToken", refreshToken, Options)
      .send(new ApiResponse(201, userResponse));
  } catch (e) {
    return res.status(400).send(new ApiResponse(400, e.message, "error"));
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            201,
            "please fill all fields",
            "please fill all fields"
          )
        );
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .send(
          new ApiResponse(201, "User does not exist", "User does not exist")
        );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send(new ApiResponse(400, "Invalid password", "Invalid Password"));
    }
    const Options = {
      httpOnly: true,
    };
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;
    return res
      .status(201)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", refreshToken, Options)
      .send(new ApiResponse(201, {accessToken:accessToken,userResponse}));
  } catch (e) {
    return res.status(400).send(new ApiResponse(400, e.message, "error"));
  }
});
export { registerUser, loginUser };
