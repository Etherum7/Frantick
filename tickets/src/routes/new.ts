import express, { Request, Response } from "express";

import { body } from "express-validator";

import {
  RequireAuth,
  ValidateRequest,
} from "@etickets/common";
const router = express.Router();

router.post(
  "/api/tickets",
  RequireAuth,
  [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Supply a title for tickets"),
    body("price")
      .not()
      .isEmpty()
      .withMessage("Supply a price for tickets"),
  ],
  ValidateRequest,
  async (req: Request, res: Response) => {
    const ticketData = req.body;

    res.status(201).send({});
  }
);

export { router as createTicketRouter };
