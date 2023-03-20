/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./*.{html, ts, tsx}",
		"./src/*.tsx",
		"./src/**/*.{ts, tsx}",
		"./src/components/**/*.{tsx, ts}",
	],
	theme: {
		extend: {
			gridTemplateColumns: { myGrid: "1fr" },
			gridTemplateRows: { myGrid: "17% 40% 43%" },
			gridColumn: { cardCols: "1/2" },
			gridRow: { title: "1/2", image: "2/3", body: "3/4" },
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		styled: true,
		themes: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "",
		darkTheme: "dark",
	},
};
