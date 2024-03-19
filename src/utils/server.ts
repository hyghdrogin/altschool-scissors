/* eslint-disable @typescript-eslint/no-namespace */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import session from "express-session";
import config from "../config/config";
import { requestLogger, GeneralRequest } from ".";
import router from "../routes";

const server = express();

const limiter = rateLimit({
	windowMs: 0.5 * 60 * 1000,
	max: 3, 
	standardHeaders: true,
	legacyHeaders: false,
});

server.use(cors());
server.use(bodyParser.json({ limit: "50mb" }));
server.use(limiter);
server.use(requestLogger);

declare global {
	namespace Express {
		interface Request extends GeneralRequest { }
	}
  }

server.use(session({
	resave: false,
	saveUninitialized: true,
	secret: config.SECRET as string,
	cookie: { secure: true }
}));

server.use("/api", router);

server.get("/", (req, res) => {
	res.status(200).send({
		status: true,
		message: "Welcome to Scissors App"
	});
});

server.use((req, res) => res.status(404).send({
	status: false,
	message: "Invalid Route"
}));

export default server;