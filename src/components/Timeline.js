import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./Post";
import useUser from "../hooks/use-user";

const Timeline = () => {
	const { photos } = usePhotos();

	const { user } = useUser();
	return (
		<div className="container col-span-2">
			{!photos ? (
				<Skeleton count={2} height={600} className="mb-10" />
			) : photos?.length > 0 ? (
				photos.map((content) => <Post key={content.docId} content={content} />)
			) : user.following !== undefined && user.following?.length > 0 ? (
				<p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl">
					No Posts Yet
				</p>
			) : (
				<p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl">
					Follow users to see photos
				</p>
			)}
		</div>
	);
};

export default Timeline;
