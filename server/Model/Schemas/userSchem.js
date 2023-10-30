import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    unique: true,
  },
  password: String,
});

const User = model("user", userSchema);

export default User;
