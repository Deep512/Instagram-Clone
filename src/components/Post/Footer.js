import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Footer = ({ caption, username }) => {
	return (
		<div className="pl-1 md:pl-2">
			<Link to={`/p/${username}`}>
				<span className="mr-1 font-bold text-xs md:text-sm lg:text-sm">
					{username}
				</span>
			</Link>
			<span className="italic text-xs md:text-sm lg:text-sm">{caption}</span>
		</div>
	);
};

export default Footer;

Footer.propTypes = {
	caption: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
};
