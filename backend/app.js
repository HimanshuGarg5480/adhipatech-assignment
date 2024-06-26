import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173/',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


import userRouter from './routes/auth.routes.js';
import productRouter from './routes/produts.routes.js'
import cartRouter from './routes/cart.routes.js'
import verifyJWT from "./middleware/verify-jwt.js";

// // //routes declaration
app.use("/api/auth", userRouter);
app.use("/api/products",verifyJWT,productRouter);
app.use("/api/cart",verifyJWT,cartRouter);

export { app }