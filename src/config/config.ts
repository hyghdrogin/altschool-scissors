import dotenv from "dotenv";
import configuration from "./index";

dotenv.config(); // Calling dotenv configuration method

// Initializing details of env file to config constant
const config = {
	PORT: configuration.server.port,
	APP_NAME: process.env.APP_NAME,
	MONGO_URL: configuration.mongo.url,
	JWT_KEY: process.env.JWT_KEY as string,
	SECRET: process.env.SECRET,
	URL: process.env.URL,
	// CLIENT_SECRET: process.env.CLIENT_SECRET as string,
	// CALLBACK_URL: process.env.CALLBACK_URL,
	// SENDGRID_API_KEY: process.env.SENDGRID_API_KEY as string,
	// SENDGRID_EMAIL: process.env.SENDGRID_EMAIL
};

// Check if a key or value is missing in the configuration file
const incompleteEntry = Object.entries(config)
	.map(([key, value]) => [key, !!value])
	.filter(([, value]) => !value)
	.map(([key]) => key);

if (incompleteEntry.length > 0) {
	throw new Error(`Missing Configuration: ${incompleteEntry.join(", ")}`);
}

export default config;
