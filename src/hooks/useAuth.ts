import { useContext } from "react";
import type { AuthContextType } from "@/components/Auth/AuthProvider";
import { AuthContext } from "@/components/Auth/AuthContext";

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
