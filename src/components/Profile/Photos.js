import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const Photos = ({ photos }) => {
	return (
		<div className="h-full border-t border-gray-primary mt-12 pt-4 mx-5 lg:mx-0">
			<div className="grid grid-cols-3 gap-1 sm:gap-4 md:gap-6 lg:gap-8 mt-4">
				{!photos ? (
					new Array(12)
						.fill(0)
						.map((_, i) => <Skeleton key={i} width={320} height={400} />)
				) : photos.length > 0 ? (
					photos.map((photo) => (
						<div key={photo.docId} className="relative group">
							<img src={photo.imageSrc} alt={photo.caption} />

							<div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex hidden">
								<p className="flex items-center text-sm sm:text-base text-white font-bold">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="w-6 sm:w-7 md:w-8 mr-2 sm:mr-3 md:mr-4"
									>
										<path
											fillRule="evenodd"
											d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
											clipRule="evenodd"
										/>
									</svg>
									{photo.likes.length}
								</p>

								<p className="flex items-center text-sm sm:text-base text-white font-bold">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										className="w-6 sm:w-7 md:w-8 mr-2 sm:mr-3 md:mr-4"
									>
										<path
											fillRule="evenodd"
											d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
											clipRule="evenodd"
										/>
									</svg>
									{photo.comments.length}
								</p>
							</div>
						</div>
					))
				) : (
					<p className="col-span-3 text-center text-base sm:text-lg md:text-xl lg:text-2xl">
						No Posts Yet
					</p>
				)}
			</div>
		</div>
	);
};

export default Photos;

Photos.propTypes = {
	photos: PropTypes.array,
};
