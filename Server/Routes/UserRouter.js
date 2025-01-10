import { Router} from "express";
import authenticationController from "../Controller/AuthenticationController.js";
const router=Router()



router.post("/userLogin",authenticationController)


export default router
