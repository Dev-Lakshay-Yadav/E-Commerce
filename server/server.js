import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"

import authRouter from './routes/auth/auth-routes.js'

import adminProductsRouter from './routes/admin/products-routes.js'
import adminOrderRouter from "./routes/admin/order-routes.js"

import shopProductsRouter from "./routes/shop/products-routes.js"
import shopCartRouter from "./routes/shop/cart-routes.js"
import shopAddressRouter from "./routes/shop/address-routes.js"
import shopOrderRouter from "./routes/shop/order-routes.js"
import shopSearchRouter from "./routes/shop/search-routes.js"
import shopReviewRouter from "./routes/shop/review-routes.js"

import commonFeatureRouter from "./routes/common/feature-routes.js"

// create a database connection -> u can create a separate file for this and then import/use that file here
// mongodb+srv://lakshay8219:<db_password>@ecommerce.btdhu.mongodb.net/
// Lakshay09 password

dotenv.config()

mongoose
    .connect(
        process.env.MONGO_URL
    ).then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error))

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: process.env.CLIENT_BASE_URL,      //hamara frontend kha run karega
        methods: ["GET", "POST", "DELETE", "PUT"],   // fontend kon kon se methods use karega
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true
    })
)


app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authRouter)    // when i go to this /api/auth/register route we need to run registerUser controller 

app.use('/api/admin/products',adminProductsRouter)
app.use("/api/admin/orders", adminOrderRouter);

app.use('/api/shop/products',shopProductsRouter)
app.use('/api/shop/cart',shopCartRouter)
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);


app.listen(PORT, (() => console.log(`Server is now running on port : ${PORT}`)))

// app.use((err,req,res,next)=>{

//     console.log(err.message,'asd')
//     res.json({
//         message : "intrernal error",
//         error : err.message
//     })
// })