import express from "express";
import { json, urlencoded } from "body-parser";
require("dotenv").config({ path: ".env" });
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import serveIndex from "serve-index";
import { INTERNAL_LINKS } from "./src/enum";
const server = express();
//require("./myserver");

// DB connection
require("./src/config/db.config");

// Environments
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const BASE_API_URL = `http://${HOST}:${PORT}${INTERNAL_LINKS.BASE_API_URL}`;
const FILE_PATH = process.env.FILE_PATH || "uploads";

/** Middlewares */
// Parser From Req.body
server.use(urlencoded({ extended: true }));
server.use(
  json({
    // Stripe-Webhooks
    verify: function (req, res, buf) {
      var url = req.originalUrl;
      if (url.includes("/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);
// CORS
server.use(cors());
// API LOG
server.use(morgan("dev"));
// XSS Attack Security
server.use(helmet());
/* File Upload Static */
server.use(
  FILE_PATH,
  express.static(FILE_PATH),
  serveIndex(FILE_PATH, { icons: true })
);

import { regionRoute, userRoute, todoRoute, reminderRoute } from "./src/routes";

server.use(INTERNAL_LINKS.REGION.BASE_URL, regionRoute);
server.use(INTERNAL_LINKS.USER.BASE_URL, userRoute);
server.use(INTERNAL_LINKS.TODO.BASE_URL, todoRoute);
server.use(INTERNAL_LINKS.REMINDER.BASE_URL, reminderRoute);

server.get(INTERNAL_LINKS.BASE_API_URL, (req, res) => {
  res.json({ message: "GRPC REST-API" });
});
server.get("/health", (_, res) => {
  res.status(200).send("I'm OK");
});
server.listen(PORT, () => {
  console.log(`API Running at 
    Localhost: ${BASE_API_URL}`);
});
