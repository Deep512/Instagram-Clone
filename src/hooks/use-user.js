import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserID } from "../services/firebase";

const useUser = () => {
	const [activeUser, setActiveUser] = useState({});
	const { user } = useContext(UserContext);

	useEffect(() => {
		async function getUserObjByUserID() {
			const [response] = await getUserByUserID(user.uid);
			setActiveUser(response);
		}

		if (user?.uid) {
			getUserObjByUserID();
		}
	}, [user]);

	return { user: activeUser };
};

export default useUser;
