import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { PayloadInterface } from "../types";
import config from "../../config/config";

dotenv.config();
const secretKey = config.JWT_KEY;

export const generateToken = async (
	payload: JwtPayload,
	secret = secretKey
) => {
	const token = jwt.sign(payload, secret as string, { expiresIn: "24h" });
	return token;
};

export const validateUserToken = async (token: string) => {
	try {
		const key = config.JWT_KEY || "secret";
		const data = jwt.verify(token, key) as PayloadInterface;
		if (!data) return;
		return data;
	} catch (e) {
		console.error(e);
	}
};
