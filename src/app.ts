import database from "./config/database";
import config from "./config/config";
import { createServer } from "./utils";

const port = config.PORT || 3000;

const app = createServer();

app.listen(port, async () => {
	console.log("Awaiting Database Connection...");
	await database.connectToCluster();
	console.log("Database connected successfully!!!");
	console.log(
		`${config.APP_NAME} API listening on port: ${port}`
	);
});

export { app };