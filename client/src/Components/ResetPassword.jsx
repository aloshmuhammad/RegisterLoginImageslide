import React, { useState } from 'react';
import './LoginSignup.css';
import password_icon from './Assets/password.png'

import instance from '../Axios/instance';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const ResetPassword= () => {
    const {id,token}=useParams()
    const [errors, setErrors] = useState('')
   

  
    const [password, setPassword] = useState('');

    const handleFormSubmit = () => {
       
        instance.post(`/user/change-password/${id}/${token}`,{password}).then((response)=>{
           const {data}=response
           if(data?.status){
            toast.success('Password Changed Successfully')
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
                <div className='text'>New Password</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
             
                 
                 <div className='input'>
                    <img src={password_icon} alt='' />
                    <input
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder='Enter new Password'
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

export default ResetPassword;
