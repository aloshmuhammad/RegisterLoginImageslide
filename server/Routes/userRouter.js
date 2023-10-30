import express from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import {
  signUpController,
  changePosition,
  deleteImage,
  editImage,
  signinController,
  forgotPassword,
  changeNewPass,
  uploadImageController,
  fetchImages,
} from "../Controller/userController.js";

var router = express.Router();

router.post("/sign-up", signUpController);
router.post("/sign-in", signinController);

router.post("/forgot-password", forgotPassword);
router.post("/change-password/:id/:token", changeNewPass);

router.post(
  "/image-upload/:userId",
  upload.array("images"),
  uploadImageController
);
router.get("/images/:userId", fetchImages);

router.patch("/edit-title/:imageId", editImage);
router.delete("/delete-image/:imageId", deleteImage);

router.post("/change-position", changePosition);

export default router;
