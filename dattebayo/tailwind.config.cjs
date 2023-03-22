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
			colors: {
				main: "#131515",
				secondary: "rgb(249 115 22)",
				tertiary: "#B9CFD4",
			},
			gridTemplateColumns: { myGrid: "1fr", clickedCardGridCol: "35%, 1fr" },
			gridTemplateRows: {
				myGrid: "17% 40% 43%",
				clickedCardGridRow: "60%, 1fr",
			},
			gridColumn: {
				cardCols: "1/2",
				clickedCardLeft: "1/2",
				clickedCardRight: "2/3",
			},
			gridRow: {
				title: "1/2",
				image: "2/3",
				body: "3/4",
				clickedCardImage: "1/3",
				clickedCardBody: "1/2",
				clickedCardManga: "2/3",
			},
		},
	},
	plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
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
