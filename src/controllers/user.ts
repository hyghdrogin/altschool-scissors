/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import {
	validateUserSignup, validateUserSignin, hashPassword, comparePassword, generateToken
} from "../utils";
import models from "../models";

export const signupUser = async (req: Request, res: Response) => {
	try {
		const { error, value } = validateUserSignup(req.body);
		if(error) {
			return res.status(400).send({
				status: false,
				message: error.message
			});
		}
		const { email, username, password } = value;
		const userExist = await models.user.findOne({ email, username });
		if(userExist) {
			return res.status(409).send({
				status: false,
				message: "User this details already exist"
			});
		}
		const hashedPassword = await hashPassword(password);
		await models.user.create({
			email,
			username,
			password: hashedPassword
		});
		return res.status(200).send({
			status: true,
			message: "User account created successfully"
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			status: false,
			message: "Internal server error"
		});
	}
};

export const signinUser = async (req: Request, res: Response) => {
	try {
		const { error, value } = validateUserSignin(req.body);
		if(error) {
			return res.status(400).send({
				status: false,
				message: error.message
			});
		}
		const { emailUsername, password } = value;
		const user = await models.user.findOne({
			$or: [{
				email: emailUsername
			}, {
				username: emailUsername
			}]
		});
		if(!user) {
			return res.status(409).send({
				status: false,
				message: "Invalid User details"
			});
		}
		const passwordCheck = await comparePassword(password, user.password);
		if(!passwordCheck) {
			return res.status(409).send({
				status: false,
				message: "Invalid user details"
			});
		}
		const token = await generateToken({
			id: user._id,
			email: user.email
		});
		const { password: removedPassword, ...userData } = user.toObject();
		return res.status(200).send({
			status: true,
			message: "User signin successful",
			data: { token, userData}
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			status: false,
			message: "Internal server error"
		});
	}
};
