import express from "express"
import { signUpController,signinController,forgotPassword,changeNewPass } from "../Controller/userController.js";







var router = express.Router();


router.post('/sign-up',signUpController)
router.post('/sign-in',signinController)

router.post('/forgot-password',forgotPassword)
router.post('/change-password/:id/:token',changeNewPass)








export default router;