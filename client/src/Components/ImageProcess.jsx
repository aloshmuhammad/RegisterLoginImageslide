import React, { useState } from 'react';
import instance from '../Axios/instance';
import { useSelector } from 'react-redux';
import './ImageProcess.css'


const ImageProcess=()=> {
    const userDetail=useSelector((state)=>state.userSlice.user)

  const [images, setImages] = useState([]);
  const [titles, setTitles] = useState([]);

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleTitleChange = (e, index) => {
    const newTitles = [...titles];
    newTitles[index] = e.target.value;
    setTitles(newTitles);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
      formData.append('titles', titles[i]);
    }

    
       instance.post(`/user/image-upload/${userDetail._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response)=>{
        console.log(response)
      }).catch((err)=>{
        console.log(err.response)
      })
     
   
  };

  return (
    <div className="container">
      <h1>Upload Image with title</h1>
      <div className="input-group">
        <input type="file" onChange={handleFileChange} multiple />
        {Array.from(images).map((_, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Title for Image ${index + 1}`}
            onChange={(e) => handleTitleChange(e, index)}
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Upload Images</button>
    </div>
  );
}

export default ImageProcess;

