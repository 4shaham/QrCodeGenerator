import express from "express"
import router from "./Server/Routes/UserRouter.js"
import session from "express-session"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import sequelize from "./Server/Config/dbConnection.js"  
// import { poolPromise } from "./Server/Config/dbConnection.js"
dotenv.config({path:'.env'})


const app=express()
const port=process.env.PORT


app.set('view engine',"ejs")

// // connectDb()    
// export const poll=poolPromise

       
// Initialization
app.use(cookieParser());

app.use(session({
    secret: "amar",
    saveUninitialized: true,
    resave: true
}));

// For parsing application/json
app.use(express.json());


// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

    
app.use('/api',router)   




app.listen(port,()=>console.log("running in this port"))
