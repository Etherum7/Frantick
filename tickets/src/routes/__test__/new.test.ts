import request from "supertest";

import { app } from "../../app";

it("has a route handle listeng for /api/tickets for post request", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .send({ title: "Bon Jovi", price: "30" });
  expect(response.status).not.toEqual(404);
});

it("can only be accessed by an authenticated person", async () => {
  await request(app)
    .post("/api/tickets")
    .send({})
    .expect(401);
});

it("authenticated person can create tickets", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.getCookie())
    .send({title: "HEllo", price: 10 })
    .expect(201);
});
it("returns an error if invalid title", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.getCookie())
    .send({ title: "", price: 10 })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.getCookie())
    .send({ price: 10 })
    .expect(400);
});

it("returns an error if invalid price", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.getCookie())
    .send({ title: "Hello", price: "" })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.getCookie())
    .send({ title: "Hello" })
    .expect(400);
});
