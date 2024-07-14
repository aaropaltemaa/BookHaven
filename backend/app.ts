import config from "./utils/config";
import express from "express";
import mongoose from "mongoose";
import logger from "./utils/logger";
import cors from "cors";
import bookRouter from "./routes/books";
import userRouter from "./routes/users";
const app = express();

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

if (typeof config.MONGODB_URI === "undefined") {
  logger.error("MONGODB_URI is not defined");
} else {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      logger.info("connected to MongoDB");
    })
    .catch((error) => {
      logger.error("error connecting to MongoDB:", error.message);
    });
}

app.use(express.json());
app.use(cors());
app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);

export default app;
