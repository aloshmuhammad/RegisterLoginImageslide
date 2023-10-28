import express from "express"
import { signUpController } from "../Controller/userController.js";






var router = express.Router();


router.post('/sign-up',signUpController)








export default router;