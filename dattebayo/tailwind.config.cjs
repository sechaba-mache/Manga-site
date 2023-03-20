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
			gridTemplateColumns: { myGrid: "1fr", clickedCardGridCol: "35%, 1fr" },
			gridTemplateRows: {
				myGrid: "17% 40% 43%",
				clickedCardGridRow: "67%, 1fr",
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
