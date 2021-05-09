import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
const AddComment = ({
	docId,
	comments,
	setComments,
	commentInput,
	handleAddedComment,
}) => {
	const [comment, setComment] = useState("");
	const { firebase, FieldValue } = useContext(FirebaseContext);
	const {
		user: { displayName },
	} = useContext(UserContext);

	const handleSubmitComment = (e) => {
		e.preventDefault();

		setComments([{ displayName, comment }, ...comments]);
		handleAddedComment();
		setComment("");

		return firebase
			.firestore()
			.collection("photos")
			.doc(docId)
			.update({
				comments: FieldValue.arrayUnion({ displayName, comment }),
			});
	};

	return (
		<div className="border-t border-gray-primary">
			<form
				className="flex justify-between pl-0 pr-5"
				method="POST"
				onSubmit={(event) =>
					comment.length >= 1
						? handleSubmitComment(event)
						: event.preventDefault()
				}
			>
				<input
					aria-label="Add a comment"
					autoComplete="off"
					className="text-xs md:text-sm lg:text-sm text-gray-base w-full mr-3 py-2 md:py-3 lg:py-3 px-4"
					type="text"
					name="add-comment"
					placeholder="Add a comment..."
					value={comment}
					onChange={({ target }) => setComment(target.value)}
					ref={commentInput}
				/>
				<button
					className={`text-xs md:text-sm lg:text-sm font-bold text-blue-medium ${
						!comment && "opacity-25"
					}`}
					type="button"
					disabled={comment.length < 1}
					onClick={handleSubmitComment}
				>
					Post
				</button>
			</form>
		</div>
	);
};

export default AddComment;

AddComment.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	setComments: PropTypes.func.isRequired,
	commentInput: PropTypes.object.isRequired,
	handleAddedComment: PropTypes.func.isRequired,
};
