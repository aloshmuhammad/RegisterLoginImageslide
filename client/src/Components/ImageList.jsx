import React, { useEffect, useState } from 'react';
import EditModal from './EditModal';
import instance from '../Axios/instance';
import { useSelector } from 'react-redux';
import './ImageList.css';
import { toast } from "react-toastify"

const ImageList = () => {
  const userDetail = useSelector((state) => state.userSlice.user);
  const [images, setImages] = useState([]);
  const [editImageId, setEditImageId] = useState(null);
  const [defaultTitle, setDefaultTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (id, title) => {
    setEditImageId(id);
    setDefaultTitle(title);
    setIsModalOpen(true);
  };
  const handleDelete=(id)=>{
    const newOnes=images.filter((item)=>{
        return item._id!=id
    })
    setImages(newOnes)
    instance.delete(`/user/delete-image/${id}`).then((response)=>{
        if(response?.data?.status){
            toast.success('Item Deleted Sucessfully')
        }
    })
  }
  const fetchImages=()=>{
    instance
    .get(`/user/images/${userDetail._id}`)
    .then((response) => {
      console.log(response, 'po');
      setImages(response.data);
    })
    .catch((error) => {
      console.error('Error fetching images:', error);
    });
}

  useEffect(() => {
   fetchImages()
   
  }, []);

  const handleEditSave = (newTitle, newImage) => {
    instance.patch(`/user/edit-title/${editImageId}`, { newTitle }).then((response) => {
      
      console.log( response);
      if(response?.data?.status){
        toast.success('Image Edited Successfully')
        fetchImages()
        

      }
    });
  };

  return (
    <div className="image-list-container">
      {images.map((image) => (
        <div key={image._id} className="image-item">
          <img src={image.url} alt={image.title} className="image" />
          <p className="image-title">{image.title}</p> 
          <button onClick={() => handleEditClick(image._id, image.title)} className="edit-button">
            Edit
          </button>
          <button onClick={() => handleDelete(image._id)} className="delete-button">
            Delete
          </button>
        </div>
      ))}
      {isModalOpen && (
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          defaultTitle={defaultTitle}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default ImageList;
