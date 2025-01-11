import { Router} from "express";
import authenticationController from "../Controller/AuthenticationController.js";
import service from "../Service/UserSide.js";




const router=Router()

const {userHomePage,userLoginPage,settingsPage}=service



// getRoutes 

router.get("/",userHomePage)
router.get("/login",userLoginPage)
router.get("/settings",settingsPage)


//post Routes
router.post("/login",authenticationController)



export default router
