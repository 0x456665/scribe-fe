import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className="min-h-screen w-full flex flex-col">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
}
