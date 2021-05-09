import useUser from "../../hooks/use-user";
import User from "./User";
import Suggestions from "./Suggestions";

const Sidebar = (props) => {
	const { user } = useUser();
	const { fullName, username, userId, following, docId } = user;
	return (
		<div className="p-2 md:p-3 lg:p-4">
			<User username={username} fullName={fullName} />
			<Suggestions
				userId={userId}
				following={following}
				loggedInUserDocId={docId}
			/>
		</div>
	);
};

Sidebar.whyDidYouRender = true;

export default Sidebar;
