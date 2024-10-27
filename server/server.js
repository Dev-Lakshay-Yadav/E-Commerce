import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from './routes/auth/auth-routes.js'

// create a database connection -> u can create a separate file for this and then import/use that file here
// mongodb+srv://lakshay8219:<db_password>@ecommerce.btdhu.mongodb.net/
// Lakshay09 password

mongoose
    .connect(
        'mongodb+srv://lakshay8219:Lakshay09@ecommerce.btdhu.mongodb.net/'
    ).then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error))

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: "http://localhost:5173",      //hamara frontend kha run karega
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

app.listen(PORT, (() => console.log(`Server is now running on port : ${PORT}`)))