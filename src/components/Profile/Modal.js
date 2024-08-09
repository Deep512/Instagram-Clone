import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import useUser from "../../hooks/use-user"
import Skeleton from "react-loading-skeleton"
import { ModalType } from "./constants"
import { Modal, Typography, Box } from "@material-ui/core"

const CustomModal = ({ modalType, setOpen, open }) => {
	const { user } = useUser()
	const [listData, setListData] = useState(["deep"])

	useEffect(() => {
		if (modalType === ModalType.FOLLOWERS) {
		} else if (modalType === ModalType.FOLLOWING) {
		}
	}, [])

	const handleClose = () => setOpen(false)

	return listData.length === 0 ? (
		<></>
	) : (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box className="absolute top-1/2 left-1/2 w-1/4 text-white bg-black-light transform -translate-x-1/2 -translate-y-1/2 border-2 border-solid border-black-light shadow-xl p-4">
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Text in a modal
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
				</Typography>
			</Box>
		</Modal>
	)
}

export default CustomModal

CustomModal.propTypes = {
	modalType: PropTypes.string.isRequired,
	profile: PropTypes.shape({
		docId: PropTypes.string,
		dateCreated: PropTypes.number,
		emailAddress: PropTypes.string,
		username: PropTypes.string,
		followers: PropTypes.array,
		following: PropTypes.array,
		userId: PropTypes.string,
		fullName: PropTypes.string,
	}).isRequired,
	setOpen: PropTypes.func.isRequired,
}
