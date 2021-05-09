import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const IsUserLoggedIn = ({ user, children, loggedInPath, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (!user) {
					return children;
				}
				if (user) {
					return (
						<Redirect
							to={{
								pathname: loggedInPath,
								state: { from: location },
							}}
						/>
					);
				}
				return null;
			}}
		/>
	);
};

export default IsUserLoggedIn;

IsUserLoggedIn.propTypes = {
	user: PropTypes.object,
	children: PropTypes.object.isRequired,
	loggedInPath: PropTypes.string.isRequired,
};
