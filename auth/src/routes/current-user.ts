import express, { Request, Response } from "express";

import { SetCurrentUser } from "@etickets/common";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  SetCurrentUser,
  (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
