import express from "express"
import router from "./Server/Routes/UserRouter.js"
import session from "express-session"
import cookieParser from "cookie-parser"
import { poolPromise } from "./Server/Database/dbConnection.js"



const app=express()
const port=4005


app.set('view engine',"ejs")

// connectDb()
poolPromise

  
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
