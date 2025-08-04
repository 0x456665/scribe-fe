import React, { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

interface JWTPayload {
	exp: number;
	sub: string;
	email: string;
	type: string;
}

export interface AuthContextType {
	user: JWTPayload | null;
	isLoggedIn: boolean;
	logout: () => void;
	refreshAuth: () => void; // Manual refresh function
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<JWTPayload | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const checkAuthStatus = useCallback(() => {
		const token = localStorage.getItem("access_token");
		console.log(token);

		if (!token) {
			setUser(null);
			setIsLoggedIn(false);
			return;
		}

		try {
			const decoded: JWTPayload = jwtDecode(token);
			if (decoded.exp * 1000 < Date.now()) {
				throw new Error("Token expired");
			}
			setUser(decoded);
			setIsLoggedIn(true);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			localStorage.removeItem("access_token");
			setUser(null);
			setIsLoggedIn(false);
		}
	}, []);

	useEffect(() => {
		checkAuthStatus();

		// Listen for changes to localStorage
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === "access_token") {
				checkAuthStatus();
			}
		};

		// Custom event for same-tab updates (since storage events don't fire in the same tab)
		const handleAuthChange = () => {
			checkAuthStatus();
		};

		window.addEventListener("storage", handleStorageChange);
		window.addEventListener("auth-change", handleAuthChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
			window.removeEventListener("auth-change", handleAuthChange);
		};
	}, [checkAuthStatus]);

	const logout = useCallback(() => {
		localStorage.removeItem("access_token");
		setUser(null);
		setIsLoggedIn(false);
		// Dispatch custom event to notify other components
		window.dispatchEvent(new CustomEvent("auth-change"));
	}, []);

	const refreshAuth = useCallback(() => {
		checkAuthStatus();
	}, [checkAuthStatus]);

	return (
		<AuthContext.Provider value={{ user, isLoggedIn, logout, refreshAuth }}>
			{children}
		</AuthContext.Provider>
	);
};
