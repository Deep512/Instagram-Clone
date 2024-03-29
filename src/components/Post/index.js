import { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Image from "./Image";
import Actions from "./Actions";
import Footer from "./Footer";
import Comments from "./Comments";
const Post = ({ content }) => {
	const commentInput = useRef(null);
	const handleFocus = () => commentInput.current.focus();

	return (
		<div className="rounded col-span-4 border w-4/5 object-contain mx-auto sm:float-right bg-white border-gray-primary mb-7">
			<Header username={content.username} />
			<Image src={content.imageSrc} caption={content.caption} />
			<Actions
				docId={content.docId}
				totalLikes={content.likes.length}
				likedByUser={content.likedByUser}
				handleFocus={handleFocus}
			/>
			<Footer caption={content.caption} username={content.username} />
			<Comments
				docId={content.docId}
				comments={content.comments}
				posted={content.dateCreated}
				commentInput={commentInput}
			/>
		</div>
	);
};

export default Post;

Post.propTypes = {
	content: PropTypes.shape({
		username: PropTypes.string.isRequired,
		imageSrc: PropTypes.string.isRequired,
		caption: PropTypes.string.isRequired,
		docId: PropTypes.string.isRequired,
		likedByUser: PropTypes.bool.isRequired,
		likes: PropTypes.array.isRequired,
		comments: PropTypes.array.isRequired,
		dateCreated: PropTypes.number.isRequired,
	}),
};
