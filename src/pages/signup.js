import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import doesUsernameExist from "../services/firebase";

const Signup = (props) => {
	const history = useHistory();
	const { firebase } = useContext(FirebaseContext);

	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const isInvalid =
		username === "" ||
		fullName === "" ||
		password === "" ||
		emailAddress === "";

	useEffect(() => {
		document.title = "Sign up • Instagram";
	}, []);

	const handleSignup = async (event) => {
		event.preventDefault();

		const usernameExists = await doesUsernameExist(username);

		if (!usernameExists) {
			try {
				const createdUserResult = await firebase
					.auth()
					.createUserWithEmailAndPassword(emailAddress, password);

				await createdUserResult.user.updateProfile({
					displayName: username,
				});

				await firebase.firestore().collection("users").add({
					userId: createdUserResult.user.uid,
					username: username.toLowerCase(),
					fullName,
					emailAddress: emailAddress.toLowerCase(),
					followers: [],
					following: [],
					dateCreated: Date.now(),
				});

				history.push(ROUTES.DASHBOARD);
			} catch (error) {
				setUsername("");
				setFullName("");
				setEmailAddress("");
				setPassword("");
				setError(error.message);
			}
		} else {
			setError("This username is already taken");
		}

		// try {

		// 	await firebase.auth().createUserWithEmailAndPassword(email, password);
		// 	history.push(ROUTES.DASHBOARD);
		// } catch (error) {
		// 	setEmail("");
		// 	setPassword("");
		// 	setError(error.message);
		// }
	};

	return (
		<div className="container flex mx-auto max-w-screen-md items-center h-screen bg-gray-background">
			<div className="flex w-0 md:w-3/5">
				<img
					src="/images/iphone-with-profile.jpg"
					alt="IPhone with Instagram app"
				/>
			</div>
			<div className="flex flex-col mx-auto w-72 md:w-2/5">
				<div className="flex flex-col items-center bg-white p-4 rounded border border-gray-primary mb-4">
					<h1 className="flex justify-center w-full">
						<img
							src="/images/logo.png"
							alt="Instagram"
							className="mt-2 w-6/12 mb-4"
						/>
					</h1>

					{error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

					<form onSubmit={handleSignup} method="POST">
						<input
							aria-label="Enter your username"
							type="text"
							placeholder="Username"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={({ target }) => {
								setUsername(target.value);
							}}
							value={username}
						/>
						<input
							aria-label="Enter your Full Name"
							type="text"
							placeholder="Full Name"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={({ target }) => {
								setFullName(target.value);
							}}
							value={fullName}
						/>
						<input
							aria-label="Enter your email-address"
							type="text"
							placeholder="Email Address"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={({ target }) => {
								setEmailAddress(target.value);
							}}
							value={emailAddress}
						/>

						<input
							aria-label="Enter your password"
							type="password"
							placeholder="Password"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
							onChange={({ target }) => {
								setPassword(target.value);
							}}
							value={password}
						/>
						<button
							disabled={isInvalid}
							type="submit"
							className={`bg-blue-medium text-white w-full rounded h-8 font-bold 
						${isInvalid && " opacity-50"}`}
						>
							Sign up
						</button>
					</form>
					<p className="text-sm text-gray-base text-center mt-4">
						By signing up, you agree to our <strong>Terms</strong> ,{" "}
						<strong>Data Policy</strong> and <strong>Cookies Policy</strong> .
					</p>
				</div>
				<div className="flex flex-col justify-center items-center w-full bg-white p-4 rounded border border-gray-primary">
					<p className="text-sm justify-center">
						Have an account?{` `}
						<Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
							Log in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
