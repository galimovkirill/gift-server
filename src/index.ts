import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
import postRoutes from "./routes/postRoutes";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/**
 * Uploading
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require("multer");
const storage = multer.diskStorage({
  // @ts-ignore
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  // @ts-ignore
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/upload/single", upload.single("image"), (req, res) => {
  res.json({ message: "Successfully uploaded files" });
});
/**
 * Router
 */
const router = express.Router();
router.use("/post", postRoutes);
app.use("/api", router);

/**
 * Start
 */
const start = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO_URL || "");

    app.listen(PORT, () => {
      console.log(`Server started on port - ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
