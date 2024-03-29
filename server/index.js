import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectdb from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use(
  "/api/v1/dalle",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://pic-ease.vercel.app");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  },
  dalleRoutes
);

app.get("/", async (req, res) => {
  res.send("Hello");
});

const startServer = async () => {
  try {
    connectdb(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("server has started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
