import React, { useReducer, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { getUserPhotosByUserId } from "../../services/firebase"
import Header from "./Header"
import Photos from "./Photos"
import Modal from "./Modal"

const reducer = (state, newState) => ({
	...state,
	...newState,
})

const initialState = {
	profile: {},
	photosCollection: null,
	followersCnt: 0,
}

const Profile = ({ user }) => {
	const [{ profile, photosCollection, followersCnt }, dispatch] = useReducer(
		reducer,
		initialState
	)

	const [showModal, setShowModal] = useState(false)
	const [modalType, setModalType] = useState("")

	useEffect(() => {
		async function getProfilePhotos() {
			const photos = await getUserPhotosByUserId(user.userId)
			dispatch({
				profile: user,
				photosCollection: photos,
				followersCnt: user.followers.length,
			})
		}

		if (user?.userId) {
			getProfilePhotos()
		}
	}, [user.userId])

	return (
		<>
			<Header
				profile={profile}
				photosCnt={photosCollection ? photosCollection.length : 0}
				followersCnt={followersCnt}
				setFollowersCnt={dispatch}
				setModalType={setModalType}
				setShowModal={setShowModal}
			/>
			<Photos photos={photosCollection} />
			{/* {showModal && <Modal profile={profile} modalType={modalType} />} */}
		</>
	)
}

export default Profile

Profile.propTypes = {
	user: PropTypes.shape({
		dateCreated: PropTypes.number.isRequired,
		emailAddress: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		followers: PropTypes.array.isRequired,
		following: PropTypes.array.isRequired,
		userId: PropTypes.string.isRequired,
		fullName: PropTypes.string.isRequired,
	}).isRequired,
}
