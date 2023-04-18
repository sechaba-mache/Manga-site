import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../dist/App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { MangaPage } from "./MangaPage";
import { ClickedCard } from "./components/Cards/ClickedCard/ClickedCard";
import { getMangaBook } from "./services/api";
import { Homepage } from "./Homepage";
import { LoadingPage } from "./LoadingPage";
import { ReadManga } from "./components/ReadManga/ReadManga"

const queryClient = new QueryClient();
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Homepage />,
				errorElement: <ErrorPage />,
				children: [
					{
						path: "/info/:id/:fileName",
						element: <ClickedCard />,
						errorElement: <ErrorPage />,
					},
				],
			},
			{
				path: "/:id/:mangaIndex",
				element: <ReadManga />,
				errorElement: <ErrorPage />
			}
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<RouterProvider router={router} />
	</QueryClientProvider>
);
