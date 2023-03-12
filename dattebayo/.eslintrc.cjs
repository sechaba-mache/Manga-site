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
		"react/jsx-filename-extension": "off",
		"@typescript-eslint/comma-dangle": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"padded-blocks": "off",
		"no-unneeded-ternary": "off",
		"arrow-body-style": "off",
		"@typescript-eslint/no-explicit-any": "error",
	},
};
