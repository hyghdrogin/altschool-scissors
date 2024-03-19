import { Schema, model } from "mongoose";
import { IUser } from "../utils";

const userSchema = new Schema(
	{
		email: {
			type: String, unique: true, maxlength: 50, trim: true, lowercase: true
		},
		username: {
			type: String, unique: true, trim: true
		},
		password: { type: String },
	},
	{ timestamps: true }
);

export default model<IUser>("User", userSchema);
