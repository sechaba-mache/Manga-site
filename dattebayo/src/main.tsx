import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../dist/App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import { MangaPage } from "./MangaPage";
import { ClickedCard } from "./components/Cards/ClickedCard/ClickedCard";
import { getMangaBook } from "./services/api";

const queryClient = new QueryClient();
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/info/:id/:fileName",
				element: <ClickedCard />,
			},
		],
	},
]);

// getMangaBook("418791c0-35cf-4f87-936b-acd9cddf0989")

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
	</QueryClientProvider>
);
