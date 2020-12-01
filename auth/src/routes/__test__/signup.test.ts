import request from "supertest";
import { app } from "../../../app";

it("should return 201 for user created ", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("should return 400 for bad email or password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "bhcdhbj", password: "hhbnjj" })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "bhcdhbj@test.com",
      password: "hhb",
    })
    .expect(400);
});

it("should return 400 if no email or password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "",
      password: "hhbded",
    })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "",
    })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "",
      password: "",
    })
    .expect(400);
});

it("disallows duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400); //bad request error
});

it("checks for setcookie  header if valid email and password", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined();
});
