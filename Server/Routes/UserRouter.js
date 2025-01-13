import { Router} from "express";
import authenticationController from "../Controller/AuthenticationController.js";
import service from "../Service/UserSide.js";
import { createQrGeneratorController, findAllVouchers } from "../Controller/QrGeneratorController.js";
import { pdfPage } from "../Controller/QrGeneratorController.js";
import { logOut } from "../Controller/AuthenticationController.js";
import { qrGetData } from "../Controller/QrGeneratorController.js";

import userAuthMiddleware from "../../Middleware/UserAuthMiddleware.js";



const router=Router()


const {userHomePage,userLoginPage,settingsPage,QrResultPage}=service


// render routers
router.get("/",userAuthMiddleware,userHomePage)
router.get("/login",userLoginPage)
router.get("/settings",userAuthMiddleware,settingsPage)
router.get("/Qr",QrResultPage)

// getRoutes 



router.get("/generate-pdf",pdfPage) 
router.get("/logout",logOut)
router.get("/findAllVoucher",findAllVouchers)
router.get("/findQrNumber",qrGetData)

router.post("/login",authenticationController)
router.post("/createQR",createQrGeneratorController)
  



export default router
