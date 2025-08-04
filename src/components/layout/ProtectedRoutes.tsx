import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute: React.FC = () => {
	const { isLoggedIn } = useAuth();
	console.log("protected route: ", isLoggedIn);
	return isLoggedIn ? (
		<Outlet />
	) : (
		<Navigate
			to="/login"
			replace
		/>
	);
};

export default ProtectedRoute;