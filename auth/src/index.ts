import { app } from "./app";

import mongoose from "mongoose";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Define your JWT_KEY man");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("Define your MONG0 URI man");
  }
  try {
    await mongoose.connect(
      process.env.MONGO_URI, // url/dbname
      {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("Connected To Mongodb");
    app.listen(3000, () => {
      console.log("-------------------------");
      console.log("Auth-Application");
      console.log("Listening On Port 3000!!");
      console.log("-------------------------");
    });
  } catch (err) {
    console.error(err);
  }
};
start();
