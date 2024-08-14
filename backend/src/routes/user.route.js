const { Router } = require("express");
const { getMe } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/me", getMe);

module.exports = { userRouter };