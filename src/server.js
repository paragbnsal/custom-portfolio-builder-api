import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./utils/logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms :res[content-length] bytes";

// Import Controller
import healthCheckRouter from "./routes/health.routes.js";

const app = express();

// Init Middlewares
app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: `${message.split(" ")[3]} ms`,
          responseSize: `${message.split(" ")[5]} bytes`,
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Init Controllers
app.use("/health", healthCheckRouter);

export default app;
