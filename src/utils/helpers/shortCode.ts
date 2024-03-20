/* eslint-disable no-constant-condition */
import models from "../../models";

export function generateRandomString(length: number): string {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}
	return result;
}

export const generateUniqueShortCode = async () => {
	while (true) {
		const shortCode = generateRandomString(5);
		const existingURL = await models.url.findOne({ shortCode });
		if (!existingURL) {
			return shortCode;
		}
	}
};

