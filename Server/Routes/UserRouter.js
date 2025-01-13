import { Router} from "express";
import authenticationController from "../Controller/AuthenticationController.js";
import service from "../Service/UserSide.js";
import { createQrGeneratorController } from "../Controller/QrGeneratorController.js";
import { pdfPage } from "../Controller/QrGeneratorController.js";



const router=Router()

const {userHomePage,userLoginPage,settingsPage}=service



// getRoutes 

router.get("/",userHomePage)
router.get("/login",userLoginPage)
router.get("/settings",settingsPage)
router.get("/generate-pdf",pdfPage) 


//post Routes
router.post("/login",authenticationController)
router.post("/createQR",createQrGeneratorController)




export default router
