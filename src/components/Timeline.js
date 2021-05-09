import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./Post";
import useUser from "../hooks/use-user";

const Timeline = () => {
	const { photos } = usePhotos();
	// we need to get user photos
	// on loading the photos we need to use react skeleton - Done
	// if we have photos, render them (create a post component)
	// if the user has no photos, tell them to create some photos

	const { user } = useUser();

	return (
		<div className="container col-span-2">
			{!photos ? (
				<Skeleton count={2} height={600} className="mb-10" />
			) : photos?.length > 0 ? (
				photos.map((content) => <Post key={content.docId} content={content} />)
			) : user?.following.length > 0 ? (
				<p className="text-center text-2xl">No Posts Yet</p>
			) : (
				<p className="text-center text-2xl">Follow users to see photos</p>
			)}
		</div>
	);
};

export default Timeline;
