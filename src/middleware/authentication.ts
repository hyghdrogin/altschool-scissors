import { Request, Response, NextFunction } from "express";
import { validateUserToken } from "../utils";
import models from "../models";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.headers && req.headers.authorization) {
			const parts = req.headers.authorization.split(" ");
			if (parts.length === 2) {
				const scheme = parts[0];
				const credentials = parts[1];
				if (/^Bearer$/i.test(scheme)) {
					const decodeToken = await validateUserToken(credentials);
					const user = await models.user.findById(decodeToken!.id);
					if (!user) return res.status(404).send({
						status: false,
						message: "User account not found"
					});
					req.user = user;
					return next();
				}
			} else {
				return res.status(401).send({
					status: false,
					message: "Invalid authorization format"
				});
			}
		} else {
			return res.status(401).send({
				status: false,
				message: "Authorization not found"
			});
		}
	} catch (error) {
		console.error(error as Error);
		return res.status(500).send({
			status: false,
			message: "Internal server error"
		});
	}
};
