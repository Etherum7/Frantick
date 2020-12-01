import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  req.session = null; //flush all cookies
  res.send({});
});

export { router as signOutRouter };
