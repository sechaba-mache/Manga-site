import React from "react";
import "./App.css";
import { FeaturedCard } from "./components/Cards/FeaturedCards/FeaturedCard";
import { NormalCard } from "./components/Cards/NormalCards/NormalCard";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<FeaturedCard />
			{/* <NormalCard /> */}
		</QueryClientProvider>
	);
}

export default App;
