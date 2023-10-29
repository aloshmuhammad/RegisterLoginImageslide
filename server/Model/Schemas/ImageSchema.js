

import { Schema, model } from 'mongoose';

const imageSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  images: [
    {
      url: String,
      title: String, 
    },
  ],
});

const Image = model('Image', imageSchema);
export default Image;