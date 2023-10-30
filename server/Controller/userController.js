import bcrypt from "bcrypt";
import temp from "temp";
import fs from "fs";

import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import {
  registerUser,
  positionChange,
  imageDelete,
  changeImage,
  validSignin,
  resetPassword,
  createNewPass,
  addImageTodb,
  getAllImages,
} from "../Model/Helpers/userHelper.js";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const signUpController = async (req, res) => {
  try {
    const { formData } = req.body;
    formData.password = await bcrypt.hash(formData.password, 10);
    registerUser(formData)
      .then((response) => {
        res.cookie("token", response.token).status(201).json(response);
      })
      .catch((error) => {
        res.status(401).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};
const signinController = async (req, res) => {
  try {
    const { formData } = req.body;
    validSignin(formData)
      .then((response) => {
        res.cookie("token", response.token).status(200).json(response);
      })
      .catch((error) => {
        res.status(401).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    resetPassword(email)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(401).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};
const changeNewPass = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;
  createNewPass(id, token, password).then((response) => {
    res.status(200).json(response);
  });
};
const uploadImageController = async (req, res) => {
  const { userId } = req.params;

  const files = req.files;
  const titles = req.body.titles;

  try {
    const uploadedImages = await Promise.all(
      files.map(async (file, index) => {
        const tempFilePath = temp.path({
          suffix: `.${file.originalname.split(".").pop()}`,
        });

        fs.writeFileSync(tempFilePath, file.buffer);

        try {
          const timestamp = Math.floor(new Date().getTime() / 1000);

          const result = await cloudinary.uploader.upload(tempFilePath, {
            folder: "test-images",
            public_id: `image_${index + 1}`,
            timestamp,
          });

          temp.cleanupSync();

          return { url: result.secure_url, title: titles[index] };
        } catch (uploadError) {
          throw uploadError;
        }
      })
    );

    addImageTodb(uploadedImages, userId).then((response) => {
      res.status(201).json(response);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const fetchImages = async (req, res) => {
  try {
    const { userId } = req.params;
    getAllImages(userId).then((response) => {
      res.status(200).json(response);
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};
const editImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const { newTitle } = req.body;
    changeImage(imageId, newTitle).then((response) => {
      res.status(200).json(response);
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};
const deleteImage = async (req, res) => {
  const { imageId } = req.params;
  imageDelete(imageId).then((response) => {
    res.status(202).json(response);
  });
};
const changePosition = async (req, res) => {
  const { reImages } = req.body;
  const { userId } = req.body;
  try {
    positionChange(reImages, userId).then((response) => {
      res.status(201).json(response);
    });
  } catch (error) {
    res.status(500).json({ message: "An error occured", error: error.message });
  }
};
export {
  signUpController,
  changePosition,
  deleteImage,
  signinController,
  editImage,
  forgotPassword,
  changeNewPass,
  uploadImageController,
  fetchImages,
};
