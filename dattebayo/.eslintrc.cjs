module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["airbnb-base", "airbnb-typescript"],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: "./tsconfig.json",
	},
	rules: {
		"@typescript-eslint/quotes": "off",
		"no-tabs": "off",
		"@typescript-eslint/indent": "off",
	},
};
