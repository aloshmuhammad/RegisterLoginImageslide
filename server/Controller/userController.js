import bcrypt from 'bcrypt'
import { registerUser } from '../Model/Helpers/userHelper.js';

const signUpController=async(req,res)=>{
    try{
        const {formData}=req.body
        formData.password = await bcrypt.hash(formData.password, 10);
        registerUser(formData).then((response)=>{
            res.cookie("token", response.token).status(201).json(response);
        }).catch((error) => {
            
            res.status(401).json({ error: error.message });
          });
    } catch (error) {
        res.status(500).json({ message: "An error occured", error: error.message });
      }
 
}

export {signUpController}