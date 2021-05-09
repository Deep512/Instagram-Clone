import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../../context/firebase";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getSuggestedProfiles } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./SuggestedProfile";
const Suggestions = ({ userId, following, loggedInUserDocId }) => {
	const [profiles, setProfiles] = useState(null);
	const { firebase } = useContext(FirebaseContext);

	useEffect(() => {
		async function suggestedProfiles() {
			const response = await getSuggestedProfiles(userId, following);
			setProfiles(response);
		}

		if (userId) suggestedProfiles();
	}, [userId]);

	return !userId || !profiles ? (
		<Skeleton count={1} height={150} className="mt-5" />
	) : profiles.length > 0 ? (
		<div className="rounded flex flex-col">
			<div className="text-xs md:text-sm flex items-center mx-auto sm:mx-0 align-items justify-between mb-4 sm:mb-2 mt-5 sm:mt-0">
				<p className="font-bold text-gray-base">Suggestions for you</p>
			</div>
			<div className="mt-1 md:mt-2 lg:mt-3 grid gap-5">
				{profiles?.map((profile) => (
					<SuggestedProfile
						key={profile.docId}
						username={profile.username}
						profileDocId={profile.docId}
						profileId={profile.userId}
						loggedInUserId={userId}
						loggedInUserDocId={loggedInUserDocId}
					/>
				))}{" "}
			</div>
		</div>
	) : null;
};

export default Suggestions;

Suggestions.propTypes = {
	userId: PropTypes.string,
	following: PropTypes.array,
};
