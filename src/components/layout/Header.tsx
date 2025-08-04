import { Link } from "react-router-dom";
import { MenuIcon, Mic, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

function Header() {
	const [menuOpen, setMenuOpen] = useState(false);
	const { isLoggedIn } = useAuth();
	console.log("header: ", isLoggedIn);

	return (
		<>
			<header className="flex flex-row justify-between items-center w-full h-16 px-5 lg:px-10 py-5 lg:py-10 backdrop-blur-xl  shadow-sm">
				<div>
					<Link
						to="/"
						className="group flex items-center space-x-3 hover:scale-105 transition-all duration-200 ease-out">
						<div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 shadow-lg group-hover:shadow-purple-500/25 transition-all duration-200">
							<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
							<Mic className="h-5 w-5 text-white relative z-10" />
						</div>
						<div className="flex flex-col">
							<span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-blue-400 transition-all duration-200">
								TranscribeAI
							</span>
							<span className="text-xs text-muted-foreground/80 font-medium tracking-wide">
								AI-Powered Transcription
							</span>
						</div>
					</Link>
				</div>
				<div className="hidden lg:flex items-center flex-row justify-center gap-10">
					{!isLoggedIn ? (
						<>
							<Link
								to="/login"
								className="text-gray-300 hover:text-white px-4 py-3 rounded-md text-sm font-medium transition-colors bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500">
								Sign In
							</Link>
							<Link
								to="/register"
								className="text-gray-300 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 hover:text-white px-4 py-3 rounded-md text-sm font-medium transition-colors">
								Get started
							</Link>
						</>
					) : (
						<>
							<Link
								to="/app/transcribe"
								className="text-gray-300 hover:text-white px-4 py-3 rounded-md text-sm font-medium transition-colors bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500">
								Transcribe Audio
							</Link>
							<Link
								to="/app/transcriptions"
								className="text-gray-300 bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 hover:text-white px-4 py-3 rounded-md text-sm font-medium transition-colors">
								View Transcription History
							</Link>
						</>
					)}
				</div>
				<div className="flex lg:hidden items-center flex-row justify-center">
					<MenuIcon
						size={30}
						color="purple"
						onClick={() => setMenuOpen(!menuOpen)}
						className="text-gray-300 hover:text-white  rounded-md text-sm font-medium transition-colors"
					/>
				</div>
			</header>
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className="flex flex-col items-center justify-center absolute inset-0 bg-white/95">
						<XIcon
							onClick={() => setMenuOpen(!menuOpen)}
							size={30}
							color="black"
							className="absolute top-5 right-5"
						/>
						<Link
							to="/login"
							className="text-gray-600 hover:text-blue-400 hover:scale-110 px-3 py-2 rounded-md text-sm lg:text-xl font-medium transition-colors">
							Sign In
						</Link>
						<Link
							to="/register"
							className="text-gray-600 hover:text-blue-400 hover:sclae-110 px-3 py-2 rounded-md text-sm lg:text-xl font-medium transition-colors">
							Sign Up
						</Link>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

export default Header;
