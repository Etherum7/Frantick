import express, { Response, Request } from "express";

import {
  ValidateRequest,
  BadRequestError,
} from "@etickets/common";

import { User } from "../models/user";

import jwt from "jsonwebtoken";

import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Suppy a valid email"),
    body("password")
      .trim() //remove  starting and ending spaces
      .isLength({ min: 6, max: 20 })
      .withMessage("Length should be greater than 6"), // is added to body
  ],
  ValidateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    // retiurns a doncument if exists else returns null
    if (existingUser) {
      throw new BadRequestError(
        "Email Already In Use 🧐"
      );
    }
    // const hashedPassword = await
    const newUser = User.build({
      email,
      password,
    });

    await newUser.save();
    //Create a jwt token
    try {
      var userJwt = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_KEY!
      ); //tells ts to not worry about
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
    //Set-cookie with jwt
    //cookie session library
    req.session = { jwt: userJwt }; //if altered session automaticallly setcookie on response

    return res.status(201).send(newUser); //created
  }
);

export { router as signUpRouter };
