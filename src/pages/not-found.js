import React, { useState, useEffect, useContext } from "react";

export default function NotFound() {
	useEffect(() => {
		document.title = "Not Found! • Instagram";
	}, []);

	return (
		<div className="bg-gray-background">
			<div className="mx-auth max-w-screen-2xl">
				<p className="text-center mr-100px text-2xl">Not Found!</p>
			</div>
		</div>
	);
}
