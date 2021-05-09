import { firebase, FieldValue } from "../lib/firebase";

export default async function doesUsernameExist(username) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	return result.docs.length === 1;
}

export async function getUserByUsername(username) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	return result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));
}

export async function getUserByUserID(userId) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("userId", "==", userId)
		.get();

	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));
	return user;
}

export async function getSuggestedProfiles(userId, following) {
	const result = await firebase.firestore().collection("users").limit(10).get();

	const suggestedProfiles = result.docs
		.map((item) => ({
			...item.data(),
			docId: item.id,
		}))
		.filter(
			(item) => item.userId !== userId && !following.includes(item.userId)
		);

	return suggestedProfiles;
}

export async function toggleLoggedInUserFollowing(
	loggedInUserDocId,
	profileId,
	isFollowing
) {
	return firebase
		.firestore()
		.collection("users")
		.doc(loggedInUserDocId)
		.update({
			following: isFollowing
				? FieldValue.arrayRemove(profileId)
				: FieldValue.arrayUnion(profileId),
		});
}

export async function toggleFollowedUserFollowers(
	profileDocId,
	loggedInUserId,
	wasFollowing
) {
	return firebase
		.firestore()
		.collection("users")
		.doc(profileDocId)
		.update({
			followers: wasFollowing
				? FieldValue.arrayRemove(loggedInUserId)
				: FieldValue.arrayUnion(loggedInUserId),
		});
}

export async function toggleFollow(
	loggedInUserDocId,
	profileDocId,
	loggedInUserId,
	profileId,
	isFollowing
) {
	await toggleLoggedInUserFollowing(loggedInUserDocId, profileId, isFollowing);
	await toggleFollowedUserFollowers(profileDocId, loggedInUserId, isFollowing);
}

export async function getPhotos(userId, following) {
	const result = await firebase
		.firestore()
		.collection("photos")
		.where("userId", "in", following)
		.get();

	const userFollowedPhotos = result.docs.map((photo) => ({
		...photo.data(),
		docId: photo.id,
	}));

	const photosWithUserDetails = await Promise.all(
		userFollowedPhotos.map(async (photo) => {
			let likedByUser = false;
			if (photo.likes.includes(userId)) {
				likedByUser = true;
			}
			const user = await getUserByUserID(photo.userId);
			const { username } = user[0];
			return { username, ...photo, likedByUser };
		})
	);

	return photosWithUserDetails;
}

export async function getUserPhotosByUserId(userId) {
	const result = await firebase
		.firestore()
		.collection("photos")
		.where("userId", "==", userId)
		.get();

	const photos = result.docs.map((photo) => ({
		...photo.data(),
		docId: photo.id,
	}));

	return photos;
}
