import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../dist/App.css";
import { getAllManga } from "./services/api";

getAllManga();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
