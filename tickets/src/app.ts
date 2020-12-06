import express from "express";
import "express-async-errors";

import { json } from "body-parser";

import cookieSession from "cookie-session";

import {
  errorHandler,
  NotFoundError,
} from "@etickets/common";

import { createTicketRouter } from "./routes/new";

import { SetCurrentUser } from "@etickets/common";

const app = express();

app.set("trust-proxy", true);

app.use(json());

app.use(
  cookieSession({
    secure: process.env.NODE_ENV == "production",
    signed: false,
  })
);

app.use(SetCurrentUser);

app.use(createTicketRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
