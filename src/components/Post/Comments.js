import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";
const Comments = ({ docId, comments: allComments, posted, commentInput }) => {
	const [comments, setComments] = useState(allComments);
	const [commentsSlice, setCommentsSlice] = useState(3);
	const toggleMoreComments = () => {
		setCommentsSlice((commentsSlice) => {
			if (commentsSlice === 3) return comments.length;
			else return 3;
		});
	};

	const handleAddedComment = () => {
		if (comments.length > 3) {
			if (commentsSlice === comments.length) {
				setCommentsSlice(commentsSlice + 1);
			}
		}
	};

	return (
		<>
			<div className="pl-1 lg:pl-2 pt-1 pb-2 lg:pb-3">
				{comments.length > 3 && (
					<p
						className="text-xs md:text-sm text-gray-base mb-1 cursor-pointer"
						onClick={toggleMoreComments}
					>
						{commentsSlice === 3
							? `View all ${comments.length} comments`
							: `Hide comments`}
					</p>
				)}
				{comments.slice(0, commentsSlice).map((item) => (
					<p key={`${item.comment}-${item.displayName}`} className="">
						<Link to={`/p/${item.displayName}`}>
							<span className="mr-1 font-bold text-xs md:text-sm lg:text-sm">
								{item.displayName}
							</span>
						</Link>
						<span className="text-xs md:text-sm lg:text-sm">
							{item.comment}
						</span>
					</p>
				))}
				<p className="text-xs text-gray-base uppercase mt-2">
					{formatDistance(posted, new Date())} ago
				</p>
			</div>
			<AddComment
				docId={docId}
				comments={comments}
				setComments={setComments}
				commentInput={commentInput}
				handleAddedComment={handleAddedComment}
			/>
		</>
	);
};

export default Comments;

Comments.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	posted: PropTypes.number.isRequired,
	commentInput: PropTypes.object.isRequired,
};
