import database from "./config/database";
import config from "./config/config";
import server from "./utils/server";

const port = config.PORT || 3000;

(async () => {
	console.log("Awaiting Database Connection...");
	await database.connectToCluster();
	console.log("Database connected successfully!!!");
	server.listen(port, async () => {
		console.log(
			`${config.APP_NAME} API listening on port: ${port}`
		);
	});
})();
