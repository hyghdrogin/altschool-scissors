import { Request, Response, NextFunction } from "express";
import { validateUserToken } from "../utils";
import models from "../models";

export const verifyUserToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		let token;

		if (req.headers && req.headers.authorization) {
			const parts = req.headers.authorization.split(" ");
			if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
				token = parts[1];
				console.log("header token", token);
			} else {
				return res.status(401).send({
					status: false,
					message: "Invalid authorization format"
				});
			}
		} else if (req.headers && req.headers.cookie) {
			const cookies = req.headers.cookie.split("; ");
			const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
		
			if (tokenCookie) {
				token = tokenCookie.split("=")[1];
			} else {
				return res.status(401).send({
					status: false,
					message: "Token cookie not found"
				});
			}
		}

		if (!token) {
			return res.status(403).send({
				status: false,
				message: "Authorization not found"
			});
		}
		const decoded = await validateUserToken(token);
		const user = await models.user.findById(decoded!.id);

		if (!user) {
			return res.status(404).send({
				status: false,
				message: "User account not found"
			});
		}

		req.user = user;
		return next();
	} catch (error) {
		console.error(error as Error);
		return res.status(500).send({
			status: false,
			message: "Internal server error"
		});
	}
};
