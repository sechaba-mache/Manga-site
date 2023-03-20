import { useRouteError } from "react-router-dom";
import { IError } from "./models/error";

export default function ErrorPage() {
	const error: IError = useRouteError() as IError;
	console.error(error);

	return (
		<>
			<h1>OH NO! SOMETHING WENT WRONG</h1>
			<p>
				{error.status} {error.statusText || error.message || error.data}
			</p>
		</>
	);
}
