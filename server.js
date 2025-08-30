import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoConnect from "./src/config/mongoConfig.js";
import config from "./src/config/config.js";
import authRouter from "./src/routes/authRouter.js";
import userRouter from "./src/routes/userRouter.js";
import bookRouter from "./src/routes/bookRouter.js";
import borrowRouter from "./src/routes/borrowRouter.js";
import reviewRouter from "./src/routes/reviewRouter.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/review", reviewRouter);
app.get("/", (req, res) => {
  res.send("I am alive");
});

mongoConnect()
  .then(() => {
    app.listen(config.port, (err) => {
      if (err) {
        console.log("SERVER COULD NOT START");
      } else {
        console.log("Server started at port", config.port);
      }
    });
  })
  .catch((err) => {
    console.log(err.message);
    console.log("MONGO DB CONNECTION ERROR");
  });
