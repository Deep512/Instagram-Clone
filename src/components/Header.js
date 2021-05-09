import React, { useContext } from "react";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import { Link, useHistory, useLocation } from "react-router-dom";
import * as ROUTES from "../constants/routes";

const Header = () => {
	const history = useHistory();
	const { firebase } = useContext(FirebaseContext);
	const { user } = useContext(UserContext);
	const location = useLocation();
	return location.pathname !== "/login" && location.pathname !== "/signup" ? (
		<header className="h-10 md:h-12 lg:h-14 bg-white border-b border-gray-primary mb-8 sticky top-0">
			<div className="container mx-auto max-w-screen-lg h-full">
				<div className="flex sm:mx-14 md:mx-24 lg:mx-32 justify-between h-full">
					<div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
						<h1 className="flex justify-center w-full">
							<Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
								<img
									src="/images/logo.png"
									alt="Instagram"
									className="mt-2 ml-1 w-16 md:w-24 lg:w-6/12"
								/>
							</Link>
						</h1>
					</div>
					<div className="text-gray-700 text-center flex items-center align-items">
						{user ? (
							<>
								<Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
									<svg
										className={`w-6 md:w-7 lg:w-8 h-5 md:h-6 lg:h-7 mr-4 md:mr-5 lg:mr-6 text-black-light cursor-pointer`}
										// xmlns="http://www.w3.org/2000/svg"
										// fill="none"
										// viewBox="0 0 24 24"
										// stroke="currentColor"
										aria-label="Home"
										viewBox="0 0 48 48"
									>
										<path
											d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											// d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
										/>
									</svg>
								</Link>
								<button
									type="button"
									title="Log Out"
									onClick={() => {
										firebase.auth().signOut();
										history.push(ROUTES.LOGIN);
									}}
									onKeyDown={(event) => {
										if (event.key === "Enter") {
											firebase.auth().signOut();
										}
									}}
								>
									<svg
										className="w-6 md:w-7 lg:w-8 mr-4 md:mr-5 lg:mr-6 text-black-light cursor-pointer"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										/>
									</svg>
								</button>
								<div className="flex items-center cursor-pointer">
									<Link to={`/p/${user.displayName}`}>
										<img
											className="rounded-full w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 mr-4 md:mr-5 lg:mr-6 flex"
											src={`/images/avatars/${user.displayName}.jpg`}
											alt={`${user.displayName} profile`}
										/>
									</Link>
								</div>
							</>
						) : (
							<>
								<Link to={ROUTES.LOGIN}>
									<button
										type="button"
										className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
									>
										Log In
									</button>
								</Link>
								<Link to={ROUTES.SIGNUP}>
									<button
										type="button"
										className="font-bold text-sm rounded text-blue-medium w-20 h-8"
									>
										Sign Up
									</button>
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	) : null;
};
export default Header;
