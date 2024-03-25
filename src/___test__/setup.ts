import supertest from "supertest";
import { createServer } from "../utils";
import database from "../config/database";
import { user6 } from "./testData/user";

const request = supertest(createServer());


export const loginAndSetToken = async () => {
	try {
		await database.connectToCluster();
		const response = await request.post("/user/login").send(user6);
		const token = response.headers["set-cookie"][0].split("=")[1].split(";")[0];
		return token;
	} catch (error) {
		console.error("Error logging in user:", error);
	}
};