import mongoose from 'mongoose'
const Connection = async () => {
    await mongoose
      .connect(
        "mongodb+srv://aloshkm:aloshy@cluster0.6cpwhx1.mongodb.net/NexovaTask"
      )
      .then(() => {
        console.log("MongoDB CONNECTED...");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  export default Connection;