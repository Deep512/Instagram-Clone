import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
	toggleLoggedInUserFollowing,
	toggleFollowedUserFollowers,
} from "../../services/firebase";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

const SuggestedProfile = ({
	username,
	profileDocId,
	profileId,
	loggedInUserId,
	loggedInUserDocId,
}) => {
	const [followed, setFollowed] = useState(false);
	const history = useHistory();
	const handleFollowUser = async () => {
		// update the following array of logged in user
		setFollowed(!followed);
		await toggleLoggedInUserFollowing(loggedInUserDocId, profileId, followed);

		// update the follower array of user who's been followed
		await toggleFollowedUserFollowers(profileDocId, loggedInUserId, followed);
	};

	return !followed ? (
		<div className="flex flex-row items-center align-items justify-between mx-24 sm:mx-0 sm:ml-2">
			<div className="flex items-center justify-between">
				<img
					className="rounded-full h-5 md:h-7 lg:h-8 w-5 md:w-7 lg:w-8 flex mr-1 md:mr-2 lg:mr-3"
					src={`/images/avatars/${username}.jpg`}
					alt=""
				/>
				<Link to={`/p/${username}`}>
					<p className="font-bold text-xs md:text-sm">{username}</p>
				</Link>
			</div>
			<button
				className="text-xs font-bold text-blue-light"
				type="button"
				onClick={async () => {
					await handleFollowUser();
					history.push(ROUTES.LOGIN);
				}}
			>
				Follow
			</button>
		</div>
	) : null;
};

export default SuggestedProfile;

SuggestedProfile.propTypes = {
	profileDocId: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	profileId: PropTypes.string.isRequired,
	loggedInUserId: PropTypes.string.isRequired,
	loggedInUserDocId: PropTypes.string.isRequired,
};
