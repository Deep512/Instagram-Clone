import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const User = ({ username, fullName }) => {
	return !username || !fullName ? (
		<Skeleton count={1} height={61} />
	) : (
		<Link
			to={`/p/${username}`}
			className="grid grid-cols-4 gap-4 mb-4 md:mb-6 items-center"
		>
			<div className="flex items-center justify-between col-span-1">
				<img
					className="rounded-full w-12 md:w-14 lg:w-16 flex mr-1 md:mr-2 lg:mr-3"
					src={`/images/avatars/${username}.jpg`}
					alt="DP"
				/>
			</div>
			<div className="col-span-3">
				<p className="font-bold text-xs md:text-sm">{username}</p>
				<p className="text-xs md:text-sm text-gray-base">{fullName}</p>
			</div>
		</Link>
	);
};

User.propTypes = {
	username: PropTypes.string,
	fullName: PropTypes.string,
};

export default User;

User.whyDidYouRender = true;
