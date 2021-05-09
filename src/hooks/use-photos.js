import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getPhotos, getUserByUserID } from "../services/firebase";

const usePhotos = (props) => {
	const [photos, setPhotos] = useState(null);
	const { user } = useContext(UserContext);
	useEffect(() => {
		async function getTimelinePhotos() {
			const [{ following }] = await getUserByUserID(user.uid);
			let timelinePhotos = [];
			console.log(following);
			if (following.length > 0) {
				timelinePhotos = await getPhotos(user.uid, following);
				timelinePhotos.sort((a, b) => b.dateCreated - a.dateCreated);
			}

			setPhotos(timelinePhotos);
		}
		if (user?.uid) {
			getTimelinePhotos();
		}
	}, [user?.uid]);

	return { photos };
};

export default usePhotos;
