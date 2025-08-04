import { Mic, Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
	return (
		<footer className="border-t border-gray-200 bg-background">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="space-y-4">
						<a
							href="/"
							className="flex items-center space-x-3 group cursor-pointer">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 group-hover:scale-110 transition-transform duration-300 shadow-lg">
								<Mic className="h-4 w-4 text-white" />
							</div>
							<span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
								TranscribeAI
							</span>
						</a>
						<p className="text-sm max-w-xs bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent font-medium">
							Transform your audio recordings into accurate text transcriptions using
							cutting-edge AI technology.
						</p>
					</div>

					<div>
						<h3 className="font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
							Product
						</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<a
									href="/app/transcribe"
									className="text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:translate-y-[-2px] relative inline-block cursor-pointer group">
									Transcribe Audio
									<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
								</a>
							</li>
							<li>
								<a
									href="/app/transcriptions"
									className="text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:translate-y-[-2px] relative inline-block cursor-pointer group">
									View History
									<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
							Company
						</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<a
									href="#"
									className="text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:translate-y-[-2px] relative inline-block cursor-pointer group">
									About Us
									<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:translate-y-[-2px] relative inline-block cursor-pointer group">
									Privacy Policy
									<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:translate-y-[-2px] relative inline-block cursor-pointer group">
									Terms of Service
									<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:translate-y-[-2px] relative inline-block cursor-pointer group">
									Contact
									<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
							Connect
						</h3>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-gray-500 hover:text-purple-600 transition-all duration-300 hover:translate-y-[-2px] hover:scale-110 cursor-pointer"
								aria-label="GitHub"
								onClick={() => window.open("https://github.com/0x456665", "_blank")}
								style={{
									filter: "drop-shadow(0 0 0 transparent)",
									transition: "all 0.3s ease",
								}}>
								<Github className="h-5 w-5" />
							</a>
							<a
								href="#"
								className="text-gray-500 hover:text-purple-600 transition-all duration-300 hover:translate-y-[-2px] hover:scale-110 cursor-pointer"
								aria-label="Twitter"
								style={{
									filter: "drop-shadow(0 0 0 transparent)",
									transition: "all 0.3s ease",
								}}>
								<Twitter className="h-5 w-5" />
							</a>
							<a
								href="#"
								className="text-gray-500 hover:text-purple-600 transition-all duration-300 hover:translate-y-[-2px] hover:scale-110 cursor-pointer"
								aria-label="Email"
								style={{
									filter: "drop-shadow(0 0 0 transparent)",
									transition: "all 0.3s ease",
								}}>
								<Mail className="h-5 w-5" />
							</a>
						</div>
					</div>
				</div>

				<div className="mt-8 pt-8 border-t border-gray-200">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-sm bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent font-medium">
							© {new Date().getFullYear()} TranscribeAI. All rights reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
