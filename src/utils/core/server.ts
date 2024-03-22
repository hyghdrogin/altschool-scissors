/* eslint-disable @typescript-eslint/no-namespace */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import rateLimit from "express-rate-limit";
import session from "express-session";
import config from "../../config/config";
import { requestLogger, CustomRequest } from "..";
import router from "../../routes";
import path from "path";

declare global {
	namespace Express {
		interface Request extends CustomRequest { }
	}
  }

const createServer = () => {
	const server = express();

	// const limiter = rateLimit({
	// 	windowMs: 0.5 * 60 * 1000,
	// 	max: 3, 
	// 	standardHeaders: true,
	// 	legacyHeaders: false,
	// });

	server.use(cors());
	server.use(bodyParser.urlencoded({ extended: true }));
	server.use(bodyParser.json());
	server.use(express.json());
	// server.use(limiter);
	server.use(requestLogger);

	server.set("views", path.join(__dirname, "../../../public/views"));
	server.set("view engine", "ejs");


	server.use(session({
		resave: false,
		saveUninitialized: true,
		secret: config.SECRET as string,
		cookie: { secure: true }
	}));

	server.use("/", router);

	server.get("/", (req, res) => {
		return res.status(200).render("homepage");
	});

	server.use((req, res) => res.status(404).send({
		status: false,
		message: "Invalid Route"
	}));	

	return server;
};


export { createServer };