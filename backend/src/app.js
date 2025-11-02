import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import cors from "cors";

dotenv.config(); // ✅ load .env

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req, res) => res.send("API is running"));

export default app;
