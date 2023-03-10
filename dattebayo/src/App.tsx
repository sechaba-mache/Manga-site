import React from "react";
import "./App.css";
import { FeaturedCard } from "./components/Cards/FeaturedCards/FeaturedCard";
import { NormalCard } from "./components/Cards/NormalCards/NormalCard";

function App() {
	return (
		<>
			<FeaturedCard />
			<NormalCard />
		</>
	);
}

export default App;
