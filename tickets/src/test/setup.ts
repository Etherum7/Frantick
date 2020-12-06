import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      getCookie(): string[];
    }
  }
}
//hook functions
let mongo: MongoMemoryServer; //mycode

beforeAll(async () => {
  process.env.JWT_KEY = "jkjk";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri(); // url running
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    collection.deleteMany({}); //no filter
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
global.getCookie = () => {
  const payload = {
    id: "5fc9d837dfa35a001809eaea",
    email: "regisjnseu@alanci.tk",
  };

  const MY_JWT = jwt.sign(
    payload,
    process.env.JWT_KEY!
  );

  const jsonSessionObject = JSON.stringify({
    jwt: MY_JWT,
  });

  const cookie = Buffer.from(
    jsonSessionObject
  ).toString("base64");

  return [`express:sess=${cookie}`];
};
