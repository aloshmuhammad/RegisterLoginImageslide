import bcrypt from 'bcrypt'
import { registerUser,validSignin,resetPassword,createNewPass } from '../Model/Helpers/userHelper.js';

const signUpController=async(req,res)=>{
    try{
        console.log(req.body)
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
const signinController=async(req,res)=>{
    try{
        const {formData}=req.body
        validSignin(formData).then((response)=>{
            res.cookie("token", response.token).status(200).json(response);
        }).catch((error) => {
            console.log(error, "er");
            res.status(401).json({ error: error.message });
          });
    }catch (error) {
        res.status(500).json({ message: "An error occured", error: error.message });
      }
 
}
const forgotPassword=async(req,res)=>{
    try{
        const {email}=req.body
        resetPassword(email).then((response)=>{
          res.status(200).json(response)
        }).catch((error)=>{
            res.status(401).json({ error: error.message }); 
        })
    }catch (error) {
        res.status(500).json({ message: "An error occured", error: error.message });
      }
   

}
const changeNewPass=async(req,res,next)=>{
    const {id,token}=req.params
    const {password}=req.body
    createNewPass(id,token,password).then((response)=>{
        console.log(response)
    })
}

export {signUpController,signinController,forgotPassword,changeNewPass}