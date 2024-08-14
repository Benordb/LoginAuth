require("dotenv").config();

const express = require("express")
const cors = require("cors")
const { authRouter } = require("./routes/auth.route")
const { userRouter } = require("./routes/user.route")
const { authMiddleware } = require("./middlewares/auth.middleware")

const app = express()

app.use(cors())
app.use(express.json())
app.use(authMiddleware)

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.listen(3033, () => {
    console.log("Server is running on port 3033");
});