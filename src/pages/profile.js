import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { getUserByUsername } from "../services/firebase";
import UserProfile from "../components/Profile";

const Profile = ({}) => {
	const { username } = useParams();
	const [user, setUser] = useState(null);
	const history = useHistory();

	useEffect(() => {
		const checkIfUserExists = async () => {
			const response = await getUserByUsername(username);
			if (response.length > 0) {
				setUser(response[0]);
			} else {
				history.push(ROUTES.NOT_FOUND);
			}
		};

		checkIfUserExists();
	}, [username, history]);

	return user?.username ? (
		<div className="mx-auto max-w-screen-md bg-gray-background">
			<UserProfile user={user} />
		</div>
	) : null;
};

export default Profile;
