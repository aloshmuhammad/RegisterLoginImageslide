import React, { useEffect, useState } from "react";
import EditModal from "./EditModal";
import instance from "../Axios/instance";
import { useSelector } from "react-redux";
import "./ImageList.css";
import { toast } from "react-toastify";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import HomePage from "./HomePage";
const ImageList = () => {
  const userDetail = useSelector((state) => state.userSlice.user);
  const [images, setImages] = useState([]);
  const [editImageId, setEditImageId] = useState(null);
  const [defaultTitle, setDefaultTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (id, title) => {
    setEditImageId(id);
    setDefaultTitle(title);
    setIsModalOpen(true);
  };
  const handleDelete = (id) => {
    const newOnes = images.filter((item) => {
      return item._id != id;
    });
    setImages(newOnes);
    instance.delete(`/user/delete-image/${id}`).then((response) => {
      if (response?.data?.status) {
        toast.success("Item Deleted Sucessfully");
      }
    });
  };
  const fetchImages = () => {
    instance
      .get(`/user/images/${userDetail._id}`)
      .then((response) => {
        console.log(response, "po");
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleEditSave = (newTitle, newImage) => {
    instance
      .patch(`/user/edit-title/${editImageId}`, { newTitle })
      .then((response) => {
        console.log(response);
        if (response?.data?.status) {
          toast.success("Image Edited Successfully");
          fetchImages();
        }
      });
  };
  const onDragEnd = (result) => {
    // Destructure the result object
    const { source, destination } = result;
    console.log(source, destination);

    // If there is no destination, do nothing (dropped outside the list)
    if (!destination) {
      return;
    }

    const reImages = [...images];
    const [removed] = reImages.splice(source.index, 1);
    reImages.splice(destination.index, 0, removed);

    setImages(reImages);
    console.log(reImages, "pokk");

    const userId = userDetail._id;
    instance
      .post("/user/change-position", { reImages, userId })
      .then((response) => {
        console.log(response, "rsp");
      });
  };

  return (
    <>
      <HomePage />

      <div
        className="image-list-container "
        style={{ marginTop: "64px", marginLeft: "200px" }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="images" direction="horizontal">
            {(provided) => (
              <div
                className="img1"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {images.map((image, index) => (
                  <Draggable
                    key={image._id}
                    draggableId={image._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="image-item"
                      >
                        <img
                          src={image.url}
                          alt={image.title}
                          className="image"
                        />
                        <p className="image-title">{image.title}</p>
                        <button
                          onClick={() =>
                            handleEditClick(image._id, image.title)
                          }
                          className="edit-button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(image._id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {isModalOpen && (
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          defaultTitle={defaultTitle}
          onSave={handleEditSave}
        />
      )}
    </>
  );
};

export default ImageList;
