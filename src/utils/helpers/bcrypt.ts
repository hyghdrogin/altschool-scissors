import { hash, compare, genSalt } from "bcrypt";

export const hashPassword = async (password: string) => {
	const salt = await genSalt(Number(10));
	const hashedPassword = await hash(password, salt);
	return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string) => {
	const boolean = await compare(password, hashedPassword);
	return boolean;
};
