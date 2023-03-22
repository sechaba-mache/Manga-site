import React, { useState } from "react";
import "./App.css";
import { FeaturedCard } from "./components/Cards/FeaturedCards/FeaturedCard";
import { useQuery } from "@tanstack/react-query";
import { getAllManga } from "./services/api";
import { NormalCard } from "./components/Cards/NormalCards/NormalCard";
import { Link, Outlet } from "react-router-dom";
import { HorizontalScroll } from "./components/HorizontalScroll";

function App() {
	const [filter, setFilter] = useState<string>("unordered");

	return (
		<>
			<div className='navbar bg-base-100'>
				<div className='navbar-start'>
					<div className='dropdown'>
						<label
							tabIndex={0}
							className='btn btn-ghost btn-circle'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16M4 18h7'
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
							<li>
								<p onClick={() => setFilter("unordered")}>Unordered</p>
							</li>
							<li>
								<p onClick={() => setFilter("year")}>Release Year</p>
							</li>
							<li>
								<p onClick={() => setFilter("rating")}>Rating</p>
							</li>
						</ul>
					</div>
				</div>

				<h1 className='ml-[-3rem] text-xl font-semibold'>Dattebayo</h1>
			</div>
			<Outlet context={filter} />
		</>
	);
}

export default App;
