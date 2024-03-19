import dotenv from "dotenv";

dotenv.config();

const databaseURL = process.env.DATABASE_URL as string;
const NODE_ENV = process.env.NODE_ENV as string;
const port = process.env.PORT ? Number(process.env.PORT) : 5000;
const localDB = process.env.LOCAL_DATABASE as string;

const configuration = {
	mongo: {
		url: databaseURL,
	},
	server: {
		port
	}
};

if (NODE_ENV === "production") {
	configuration.mongo.url = databaseURL;
	configuration.server.port = port;
} else if (NODE_ENV === "local") {
	configuration.mongo.url = localDB;
	configuration.server.port = port;
}

export default configuration;