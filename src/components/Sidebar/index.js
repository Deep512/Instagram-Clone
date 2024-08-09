import useUser from "../../hooks/use-user"
import User from "./User"
import Suggestions from "./Suggestions"
import { Skeleton } from "react-loading-skeleton"
const Sidebar = () => {
	const { user } = useUser()
	if (!user) return <Skeleton count={3} height={300} className="mb-10" />
	const { fullName, username, userId, following, docId } = user
	return window.innerWidth > 400 ? (
		<div className="p-2 md:p-3 lg:p-4 max-w-md md:max-w-lg lg:max-w-full mx-auto">
			<User username={username} fullName={fullName} />
			<Suggestions
				userId={userId}
				following={following}
				loggedInUserDocId={docId}
			/>
		</div>
	) : (
		<div className="p-2 mx-auto md:p-3 lg:p-4">
			<Suggestions
				userId={userId}
				following={following}
				loggedInUserDocId={docId}
			/>
		</div>
	)
}

Sidebar.whyDidYouRender = true

export default Sidebar
