import React, { useState, useEffect, useContext } from "react";

import Timeline from "../components/Timeline";
import Sidebar from "../components/Sidebar";

const Dashboard = (props) => {
	useEffect(() => {
		document.title = "Instagram";
	}, []);

	return (
		<div className="bg-gray-background">
			<div className={`${window.innerWidth > 640?"grid grid-cols-3":""} overflow-x-hidden gap-4 justify-between mx-auto max-w-screen-lg`}>
				<Timeline />
				<Sidebar />
			</div>
		</div>
	);
};

export default Dashboard;
