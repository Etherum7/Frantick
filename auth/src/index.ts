import {app} from '../app';

import mongoose from "mongoose";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Define your JWT_KEY man");
  }
  try {
    await mongoose.connect(
      "mongodb://auth-mongo-srv:27017/auth", // url/dbname
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
