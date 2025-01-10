import express from "express"
import router from "./Server/Routes/UserRouter.js"


const app=express()
const port=4005


app.set('view engine',"ejs")
    
app.use('/api',router)




app.listen(port,()=>console.log("running in this port"))
