import Joi from "joi";
import { signUpInterface, signInInterface } from "../types";

const options = {
	stripUnknown: true,
	abortEarly: false,
	errors: {
		wrap: {
			label: "",
		},
	},
};

export const validateUserSignup = (userDetails: signUpInterface) => {
	const userSignUp = Joi.object({
		email: Joi.string().email().required(),
		username: Joi.string().required(),
		password: Joi.string().min(6).max(36).required(),
	});
	return userSignUp.validate(userDetails, options);
};

export const validateUserSignin = (userDetails: signInInterface) => {
	const userSignUp = Joi.object({
		emailUsername: Joi.string().required(),
		password: Joi.string().min(6).max(36).required(),
	});
	return userSignUp.validate(userDetails, options);
};
