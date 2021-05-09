import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useUser from "../../hooks/use-user";
import { toggleFollow } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";

const Header = ({ profile, photosCnt, followersCnt, setFollowersCnt }) => {
	const { user } = useUser();
	const [isFollowing, setIsFollowing] = useState(false);
	const followButton = user.username && profile.username !== user.username;

	const toggleFollowButton = async () => {
		await toggleFollow(
			user.docId,
			profile.docId,
			user.userId,
			profile.userId,
			isFollowing
		);
		setFollowersCnt({
			followersCnt: isFollowing ? followersCnt - 1 : followersCnt + 1,
		});
		setIsFollowing((isFollowing) => !isFollowing);
	};

	useEffect(() => {
		function checkIfFollowing() {
			if (profile.followers?.includes(user.userId)) {
				setIsFollowing(true);
			}
		}
		if (user.userId) checkIfFollowing();
	}, [user.userId, profile.userId, profile.followers]);

	return (
		<div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
			<div className="container flex justify-center">
				{profile.username && (
					<img
						className="rounded-full h-40 w-40 flex"
						src={`/images/avatars/${profile.username}.jpg`}
						alt={`${profile.username} profile picture`}
					/>
				)}
			</div>
			<div className="flex items-center justify-center flex-col col-span-2">
				<div className="container flex items-center">
					<p className="text-2xl mr-4">{profile.username}</p>
					{followButton && isFollowing === null ? (
						<Skeleton count={1} width={80} height={32} />
					) : (
						followButton && (
							<button
								className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
								type="button"
								onClick={toggleFollowButton}
								onKeyDown={(event) => {
									if (event.key === "Enter") {
										toggleFollowButton();
									}
								}}
							>
								{isFollowing ? "Unfollow" : "Follow"}
							</button>
						)
					)}
				</div>
				<div className="container flex mt-4">
					{!profile.followers || !profile.following ? (
						<Skeleton count={1} width={677} height={24} />
					) : (
						<>
							<p className="mr-10">
								<span className="font-bold">{photosCnt}</span> photos
							</p>
							<p className="mr-10">
								<span className="font-bold">{followersCnt}</span>
								{` `}
								{followersCnt === 1 ? `follower` : `followers`}
							</p>
							<p className="mr-10">
								<span className="font-bold">{profile.following?.length}</span>{" "}
								following
							</p>
						</>
					)}
				</div>
				<div className="container mt-4">
					<p className="font-medium">
						{!profile.fullName ? (
							<Skeleton count={1} height={24} />
						) : (
							profile.fullName
						)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Header;

Header.propTypes = {
	profile: PropTypes.shape({
		docId: PropTypes.string,
		dateCreated: PropTypes.number,
		emailAddress: PropTypes.string,
		username: PropTypes.string,
		followers: PropTypes.array,
		following: PropTypes.array,
		userId: PropTypes.string,
		fullName: PropTypes.string,
	}).isRequired,
	photosCnt: PropTypes.number.isRequired,
	followersCnt: PropTypes.number.isRequired,
	setFollowersCnt: PropTypes.func.isRequired,
};
