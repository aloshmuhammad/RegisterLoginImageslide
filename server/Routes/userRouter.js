import express from "express"
import { signUpController,signinController } from "../Controller/userController.js";






var router = express.Router();


router.post('/sign-up',signUpController)
router.post('/sign-in',signinController)








export default router;