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
			<div className="text-xs md:text-sm flex items-center align-items justify-between mb-2">
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

// return (
// 	<Link
// 		key={idx}
// 		to={`/p/${user.username}`}
// 		className="grid grid-cols-4 gap-4 mb-6 items-center"
// 	>
// 		<div className="flex items-center justify-between col-span-1">
// 			<img
// 				className="rounded-full w-16 flex mr-3"
// 				src={`/images/avatars/${user.username}.jpg`}
// 				alt="DP"
// 			/>
// 		</div>
// 		<div className="col-span-3">
// 			<p className="font-bold text-sm">{user.username}</p>
// 			<p className="text-sm">{user.fullName}</p>
// 		</div>
// 	</Link>
// );
