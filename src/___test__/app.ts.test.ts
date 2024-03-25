import supertest from "supertest";
import { createServer } from "../utils";

const request = supertest(createServer());

describe("app.ts", () => {
	describe("homepage", () => {
		it("should return 200", async () => {
			await request.get("/").expect(200);
		});
	});

	describe("incorrect route", () => {
		it("should return 404", async() => {
			await request.get("/gughbdbbhbh").expect(404);
		});
	});
});