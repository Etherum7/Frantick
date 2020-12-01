import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  BadRequestError,
  ValidateRequest,
} from "@etickets/common";

import { User } from "../models/user";

import { Password } from "../services/password";

import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid Email"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Supply A Password !"),
  ],
  ValidateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    // user with same email as supplied
    if (existingUser) {
      if (
        await Password.compare(
          existingUser.password,
          password
        )
      ) {
        try {
          var userJwt = jwt.sign(
            {
              id: existingUser.id,
              email: existingUser.email,
            },
            process.env.JWT_KEY!
          );
          req.session = { jwt: userJwt };

          return res.status(200).send(existingUser);
        } catch (err) {
          throw new Error(err.message);
        }
      } else {
        throw new BadRequestError(
          "Invalid Login Credetials"
        );
      }
    } else {
      throw new BadRequestError(
        "Invalid Login Credentials"
      );
    }
  }
);

export { router as signInRouter };
