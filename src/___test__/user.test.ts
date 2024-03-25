import supertest from "supertest";
import { createServer } from "../utils";
import mongoose from "mongoose";
import { user, user1, user2, user3, user4, user5 } from "./testData/user";
import config from "../config/config";
import { loginAndSetToken } from "./setup";

const request = supertest(createServer());

describe("User Endpoint", () => {
	beforeAll( async() => {
		await mongoose.connect(config.MONGO_URL);
	}, 10000);

	afterAll(async() => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	}, 10000);

	describe("User Registration", () => {
		it("should create user", async() => {
			const { status } = await request.post("/user/").send(user);

			expect(status).toBe(201);
		});
	});

	describe("User Registration with incorrect details", () => {
		it("should return 400", async() => {
			await request.post("/user/").send(user1).expect(400);
		});
	});

	describe("User Registration with incomplete details", () => {
		it("should return 400", async() => {
			await request.post("/user/").send(user2).expect(400);
		});
	});

	describe("User Registration with existing details", () => {
		it("should return 409", async() => {
			await request.post("/user/").send(user).expect(409);
		});
	});

	describe("User Login", () => {
		it("should login user", async() => {
			const { status } = await request.post("/user/login").send(user3);

			expect(status).toBe(200);

		});
	});

	describe("User login with incomplete details", () => {
		it("should return 400", async() => {
			const { status} = await request.post("/user/login").send(user4);

			expect(status).toBe(400);
		});
	});

	describe("User login with incorrect details", () => {
		it("should return 404", async() => {
			const { status} = await request.post("/user/login").send(user5);

			expect(status).toBe(409);
		});
	});

	describe("User Logout", () => {
		it("should log user out with response 440", async () => {
			const token = await loginAndSetToken();
			const { status } = await request.get("/user/logout").set("Cookie", `token=${token}`);
      
			expect(status).toBe(440);
		});
	});
});