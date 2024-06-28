import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Init Middlewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

export default app;
