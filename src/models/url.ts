import { Schema, model } from "mongoose";
import { IURL } from "../utils";

const urlSchema = new Schema(
	{
		username: {
			type: String, trim: true
		},
		shortCode: { 
			type: String, unique: true 
		},
		longURL: {
			type: String
		},
		shortURL: {
			type: String, unique: true
		},
		QRCode: {
			type: String
		},
		clickCount: {
			type: Number, default: 0
		},
		clicks: [{
			timestamp: {
				type: Date,
				default: Date.now
			},
			ipAddress: {
				type: String
			},
			userAgent: {
				type: String
			}
		}]
	},
	{ timestamps: true }
);

export default model<IURL>("Url", urlSchema);
