import express from "express"
import dotenv from "dotenv"
import dbConnection from "./config/db.js";
import userRouter from "./router/user.route.js"
import appRouter from "./router/get.route.js"

const app = express();

//env congig
dotenv.config();

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//db conceection
dbConnection();

//routes
app.get('/',(req,res)=>{
    res.json({
        message: "Welcome to the auth server",
        error:false
    })
} )
app.use("/api/user",userRouter)
app.use("/api/",appRouter)


//server
app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})