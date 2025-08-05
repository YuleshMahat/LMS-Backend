import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoConnect from "./src/config/mongoConfig.js";
import config from "./src/config/config.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
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
