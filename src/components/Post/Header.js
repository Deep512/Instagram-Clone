import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ username }) => {
	return (
		<div className="flex border-b border-gray-primary h-2 md:h-3 lg:h-4 p-4 md:py-5 lg:py-6">
			<div className="flex items-center">
				<Link to={`/p/${username}`} className="flex items-center">
					<img
						className="rounded-full h-5 md:h-7 lg:h-8 w-5 md:w-7 lg:w-8 flex mr-3"
						src={`/images/avatars/${username}.jpg`}
						alt={`${username} profile`}
					/>
					<p className="font-bold text-xs md:text-sm lg:text-sm">{username}</p>
				</Link>
			</div>
		</div>
	);
};

export default Header;

Header.propTypes = {
	username: PropTypes.string.isRequired,
};
