import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { getUserPhotosByUserId } from "../../services/firebase";
import Header from "./Header";
import Photos from "./Photos";

const reducer = (state, newState) => ({
	...state,
	...newState,
});

const initialState = {
	profile: {},
	photosCollection: null,
	followersCnt: 0,
};

const Profile = ({ user }) => {
	const [{ profile, photosCollection, followersCnt }, dispatch] = useReducer(
		reducer,
		initialState
	);

	useEffect(() => {
		async function getProfilePhotos() {
			const photos = await getUserPhotosByUserId(user.userId);
			dispatch({
				profile: user,
				photosCollection: photos,
				followersCnt: user.followers.length,
			});
		}

		if (user?.userId) {
			getProfilePhotos();
		}
	}, [user.userId]);

	return (
		<>
			<Header
				profile={profile}
				photosCnt={photosCollection ? photosCollection.length : 0}
				followersCnt={followersCnt}
				setFollowersCnt={dispatch}
			/>
			<Photos photos={photosCollection} />
		</>
	);
};

export default Profile;

Profile.propTypes = {
	user: PropTypes.shape({
		dateCreated: PropTypes.number.isRequired,
		emailAddress: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		followers: PropTypes.array.isRequired,
		following: PropTypes.array.isRequired,
		userId: PropTypes.string.isRequired,
		fullName: PropTypes.string.isRequired,
	}).isRequired,
};
