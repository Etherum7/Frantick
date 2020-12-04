import request from "supertest";
import { app } from "../../app";

it("responds about the detail of the current user ", async () => {
  const cookie = await global.getCookie();
  //cookie do not get automatically send
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual(
    "test@test.com"
  );
});
