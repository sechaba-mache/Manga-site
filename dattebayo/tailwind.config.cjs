/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./*.{html, ts, tsx}",
		"./src/**/*.{ts, tsx}",
		"./src/components/**/*.{tsx, ts}",
	],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		styled: false,
		themes: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "",
		darkTheme: "dark",
	},
};
