import dotenv from "dotenv";

dotenv.config(); // Calling dotenv configuration method

// Initializing details of env file to config constant
const config = {
	PORT: process.env.PORT,
	APP_NAME: process.env.APP_NAME,
	MONGO_URL: process.env.DATABASE_URL  as string,
	JWT_KEY: process.env.JWT_KEY as string,
	SECRET: process.env.SECRET,
	URL: process.env.URL,
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
