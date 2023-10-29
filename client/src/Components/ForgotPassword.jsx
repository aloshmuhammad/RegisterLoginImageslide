import React, { useState } from 'react';
import './LoginSignup.css';
import email_icon from './Assets/email.png';

import instance from '../Axios/instance';
import { toast } from "react-toastify"


const ForgotPassword= () => {
    const [errors, setErrors] = useState('')

  
    const [email, setEmail] = useState('');

    const handleFormSubmit = () => {
       
        instance.post('/user/forgot-password',{email}).then((response)=>{
        console.log(response,'po')
        const {data}=response
        if(data?.status){
            setErrors('')

            toast.success("Reset Link send to email successfully")
            

        }
        }).catch((err)=>{
            if (err.response) {
                    
                       
                       
                setErrors( err.response.data.error );
            } 
        })
      

         
                   
                }
      
                

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>Forgot Password</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
             
                 
                 <div className='input'>
                    <img src={email_icon} alt='' />
                    <input
                        type='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder='Email Id'
                    />
                  
                </div>
             
                 
              
                 
               

               
            
                
                
               
              
               
               
            </div>
            
      
            <div className='submit-container'>
                <div className='submit' onClick={handleFormSubmit}>
                   Submit
                </div>
               
          
            </div>
            {errors && <div className='error'>{errors}</div>}
           
        </div>
    );
};

export default ForgotPassword;
