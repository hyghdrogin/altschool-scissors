import supertest from "supertest";
import { createServer } from "../utils";
import mongoose from "mongoose";
import config from "../config/config";
import { loginAndSetToken } from "./setup";
import { url, url1, url2, url3, url4, url5, url6, url7 } from "./testData/url";

const request = supertest(createServer());

describe("Url Endpoint", () => {
	beforeAll( async() => {
		await mongoose.connect(config.MONGO_URL);
	}, 10000);

	afterAll(async() => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	}, 10000);

	describe("Shorten URL", () => {
		it("Should shorten a long url", async() => {
			const token = await loginAndSetToken();
			const { status } = await request.post("/url/").send(url).set("Cookie", `token=${token}`);

			expect(status).toBe(201);
		});
	});

	describe("Unauthenticated Route", () => {
		it("Return unauthorized user", async() => {
			const { status } = await request.post("/url/").send(url);

			expect(status).toBe(403);
		});
	});

	describe("Incorect URL to shorten", () => {
		it("should return invalid long url", async() => {
			const token = await loginAndSetToken();
			const { status } = await request.post("/url/").send(url1).set("Cookie", `token=${token}`);

			expect(status).toBe(400);
		});
	});

	describe("Unshorten URL", () => {
		it("Should unshorten a short url", async() => {
			const { status } = await request.post("/url/unshorten").send(url2);

			expect(status).toBe(200);
		});
	});
    
	describe("Incorrect URL to unshorten URL", () => {
		it("should return invalid short url", async() => {
			const token = await loginAndSetToken();
			const { status } = await request.post("/url/unshorten").send(url3).set("Cookie", `token=${token}`);

			expect(status).toBe(409);
		});
	});
    
	describe("Incorrect inputed data", () => {
		it("should return 400 error", async() => {
			const token = await loginAndSetToken();
			const { status } = await request.post("/url/unshorten").send(url4).set("Cookie", `token=${token}`);

			expect(status).toBe(400);
		});
	});

	describe("Customize URL", () => {
		it("Should customize and shorten a long url", async() => {
			const token = await loginAndSetToken();
			const { status } = await request.post("/url/custom").send(url7).set("Cookie", `token=${token}`);

			expect(status).toBe(201);
		});
	});

	describe("Unauthenticated Route", () => {
		it("Return unauthorized user", async() => {
			const { status } = await request.post("/url/custom").send(url7);

			expect(status).toBe(403);
		});
	});
    
	describe("Already in use shortCode", () => {
		it("should return shortCode in use", async() => {
			const token = await loginAndSetToken();
			const { status } = await request.post("/url/custom").send(url6).set("Cookie", `token=${token}`);

			expect(status).toBe(409);
		});
	});
    
	describe("Incorrect inputed data", () => {
		it("should return 400 error", async() => {
			const token = await loginAndSetToken();
			const { status } = await request.post("/url/custom").send(url5).set("Cookie", `token=${token}`);

			expect(status).toBe(400);
		});
	});

	describe("View all links shortened", () => {
		it("should view all shorten links", async() => {
			const token = await loginAndSetToken();
			const { status } = await request.get("/url/links").set("Cookie", `token=${token}`);

			expect(status).toBe(200);
		});
	});

	describe("View a shortened link", () => {
		it("should redirect", async() => {
			const token = await loginAndSetToken();
			const { status } = await request.get(`/url/${url7.shortCode}`).set("Cookie", `token=${token}`);

			expect(status).toBe(302);
		});
	});

	describe("Analytics", () => {
		it("Should get analytics of a shortened link", async() => {
			const token = await loginAndSetToken();
			const { status } = await request.get(`/url/analytics/${url7.shortCode}`).set("Cookie", `token=${token}`);

			expect(status).toBe(200);
		});
	});
});