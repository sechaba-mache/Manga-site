import { useRouteError } from "react-router-dom";
import { IError } from "./models/error";

export default function ErrorPage() {
	const error: IError = useRouteError() as IError;
	console.error(error);

	return (
		<>
			<div className='flex h-screen justify-center content-center text-center center'>
				<h1>NANI!!! OH NO! SOMETHING WENT WRONG </h1>

				<p>
					{error.status} {error.statusText || error.message || error.data}
				</p>
			</div>
		</>
	);
}
