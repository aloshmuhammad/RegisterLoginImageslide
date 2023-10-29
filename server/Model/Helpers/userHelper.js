import User from "../Schemas/userSchem.js";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import  nodeMailer from 'nodemailer'
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
                console.log('adfsa')
             
                const newUser=await User.create(data)
              
                const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
                resolve({ message: "User Registered Sucessfully", newUser, token });

            }
          

        }catch (error) {
      throw new Error("Error occured during registering the user");
    }
    })
}
const validSignin=async(data)=>{
    return new Promise(async (resolve, reject) => {
        try {
          const validUser = await User.findOne({ email: data.email });
          if (validUser) {
            bcrypt.compare(data.password, validUser.password).then((status) => {
              if (status) {
                const token = jwt.sign(
                  { userId: validUser._id },
                  process.env.JWT_SECRET
                );
    
                resolve({
                  message: "User Loggedin Successfully",
                  validUser,
                  token,
                });
              } else {
                reject({
                  message: "Wrong password",
                });
              }
            });
          } else {
            reject({
              message: "User Not Found",
            });
          }
        } catch (error) {
          throw new Error("Error occured during the login");
        }
      });
}
const resetPassword=async(email)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const existingUser=await User.findOne({email:email})
            console.log(existingUser)
            if(existingUser==null){
                reject({
                    message:'User Not Found'
                })
            }else{
                const token = jwt.sign(
                    { userId: existingUser._id },
                    process.env.JWT_SECRET,{expiresIn:'1d'}
                  );
                  console.log(token,'op')
                  var transporter = nodeMailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'alosh.km@gmail.com',
                      pass: 'yrdbhkpqqkiqyuqg'
                    }
                  });
                  
                  var mailOptions = {
                    from: 'alosh.km@gmail.com',
                    to: email,
                    subject: 'Reset Password Link',
                    text: `http://localhost:5173/reset-password/${existingUser._id}/${token}`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response)
                      resolve({message:'mail successfully send',
                    status:true});
                    }
                  });
            }
        }catch (error) {
            throw new Error("Error occured during the Reset password");
          }
    })
    
}
const createNewPass=async(id,token,password)=>{
    return new Promise(async(resolve,reject)=>{
     try{
         jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                reject({
                    message:'invalid token'
                })
            }else{
            bcrypt.hash(password, 10).then(hash=>{
                 User.findByIdAndUpdate({_id:id},{password:hash}).then((u)=>{
                    resolve({
                        message:'Password Changed Successfully',
                        status:true
                    })
                 })
             })
            }
         })

     }catch (error) {
            throw new Error("Error occured during the Reset password");
          }
    })
}
export {registerUser,validSignin,resetPassword,createNewPass}