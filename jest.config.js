module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	testMatch: [
		"**/__tests__/**/*.test.[jt]s?(x)",
		"**/?(*.)+(spec|test).[tj]s?(x)",
	],
	verbose: true,
	forceExit: true,
	testTimeout: 10000
};



