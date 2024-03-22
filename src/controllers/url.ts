import { Request, Response } from "express";
import { validateURL, validateCustomUrl, generateUniqueShortCode } from "../utils";
import models from "../models";
import config from "../config/config";
import qrCode from "qrcode";

export const createURL = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user;
		const { error, value } = validateURL(req.body);
		if(error) {
			return res.status(400).send({
				status: false,
				message: error.message
			});
		}
		const { longURL } = value;
		const shortCode = await generateUniqueShortCode();
		const shortURL = `${config.URL}/${shortCode}`;
		const qrCodeDataURL = await qrCode.toDataURL(shortURL);
		const user = await models.user.findById(_id);
		if(!user) {
			return res.status(401).send({
				status: false,
				message: "Kindly Login"
			});
		}
		const newURL = await models.url.create({
			username: user.username,
			shortCode,
			longURL,
			shortURL,
			QRCode: qrCodeDataURL
		});
		return res.status(201).send({
			status: true,
			message: "Your shortened link is ready",
			data: newURL
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			status: false,
			message: "Failed to create shortened URL"
		});
	}
};

export const customURL = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user;
		const { error, value } = validateCustomUrl(req.body);
		if(error) {
			return res.status(400).send({
				status: false,
				message: error.message
			});
		}
		const { shortCode, longURL } = value;
		const existingURL = await models.url.findOne({ shortCode });
		if (existingURL) {
			return res.status(409).send({
				status: false,
				message: "Short code already in use, please try another"
			});
		}
		const shortURL = `${config.URL}/${shortCode}`;
		const qrCodeDataURL = await qrCode.toDataURL(shortURL);
		const user = await models.user.findById(_id);
		if(!user) {
			return res.status(401).send({
				status: false,
				message: "Kindly Login"
			});
		}
		const newURL = await models.url.create({
			username: user.username,
			shortCode,
			longURL,
			shortURL,
			QRCode: qrCodeDataURL
		});
		return res.status(201).send({
			status: true,
			message: "Your Customized shortened link is ready",
			data: newURL
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			status: false,
			message: "Failed to create custom shortened URL"
		});
	}
};

export const viewLinks = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user;
		const user = await models.user.findById(_id);
		if(!user) {
			return res.status(401).send({
				status: false,
				message: "Kindly Login"
			});
		}
		const URLs = await models.url.find({ username: user.username });
		const shortURLs = URLs.map(url => ({ shortURL: url.shortURL, longURL: url.longURL }));
		return res.status(200).send({
			status: true,
			message: "List of all shortened URLs is generated successfully",
			data: shortURLs
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			status: false,
			message: "Failed to fetch shortened URLs"
		});
	}
};

export const viewLink = async (req: Request, res: Response) => {
	try {
		const { shortCode } = req.params;
		const shortCodeCheck = await models.url.findOne({ shortCode });
		if (!shortCodeCheck) {
			return res.status(409).send({
				status: false,
				message: "Invalid shortened URL"
			});
		}
		shortCodeCheck.clickCount += 1;
		const ipAddress = req.ip || "Unknown";
		const newClick = {
			timestamp: new Date(),
			ipAddress: ipAddress,
			userAgent: req.headers["user-agent"] || "Unknown"
		};
		shortCodeCheck.clicks.push(newClick);
		await shortCodeCheck.save();

		res.status(302).redirect(shortCodeCheck.longURL);
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			status: false,
			message: "Failed to redirect to the original URL"
		});
	}
};

export const getURLAnalytics = async (req: Request, res: Response) => {
	try {
		const { shortCode } = req.params;
		const shortCodeCheck = await models.url.findOne({ shortCode }).select("-QRCode");
		if (!shortCodeCheck) {
			return res.status(409).send({
				status: false,
				message: "Invalid shortened URL"
			});
		}
		return res.status(200).send({
			status: true,
			message: "URL analytics fetched successfully",
			data: shortCodeCheck
		});
	} catch (error) {
		return res.status(500).send({
			status: false,
			message: "Failed to fetch URL analytics"
		});
	}
};