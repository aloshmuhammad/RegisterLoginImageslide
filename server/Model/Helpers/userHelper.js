import User from "../Schemas/userSchem.js";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

const registerUser=async(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const existingUser = await User.findOne({ email:data.email });
            if (existingUser) {
              reject({
                message: "User Already Found",
              });
            }else{
                const newUser=await User.create(data)
                const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
                resolve({ message: "User Registered Sucessfully", newUser, token });

            }
          

        }catch (error) {
      throw new Error("Error occured during registering the user");
    }
    })
}
export {registerUser}