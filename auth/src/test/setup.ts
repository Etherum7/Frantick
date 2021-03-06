import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
  namespace NodeJS {
    interface Global {
      getCookie(): Promise<string[]>;
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
global.getCookie = async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  return response.get("Set-Cookie");
};
