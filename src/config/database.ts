import mongoose from "mongoose";
import config from "./config";

// Setting up database
const connectToCluster = async () => {
	try {
		mongoose.set("strictQuery", false);
		const connection = await mongoose.connect(config.MONGO_URL);
		console.info("Connecting to Database...");

		return connection;
	} catch (error) {
		console.error("Connection to Database failed!", error);
		process.emit("SIGTERM");
		process.exit(1);
	}
};

export default { connectToCluster };
