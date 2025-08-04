import { Link } from "react-router-dom";
import DecryptedText from "@/components/ui/DecryptedText";
import TextType from "@/components/ui/TextType/TextType";
import DotGrid from "@/components/backgrounds/DotGrid/DotGrid";

function HomePage() {
	return (
		<section className="min-h-screen bg-background flex items-center justify-center px-4">
			<div
				style={{
					width: "100%",
					height: "100%",
					overflow: "hidden",
					position: "absolute",
					backgroundColor: "#0b0524",
				}}>
				<DotGrid
					dotSize={5}
					gap={15}
					baseColor="#3A2394"
					activeColor="#5227FF"
					proximity={150}
					shockRadius={250}
					shockStrength={5}
					resistance={750}
					returnDuration={1.5}
				/>
			</div>
			<div className="max-w-3xl text-center relative z-5 backdrop-blur-sm p-8 rounded-xl">
				<h1 className="text-4xl font-bold text-white mb-4">
					<TextType
						text={["AI Scribe: Effortless Transcription Powered by AI"]}
						textColors={["white"]}
						typingSpeed={60}
						pauseDuration={1500}
						showCursor={true}
						cursorCharacter="_"
					/>
				</h1>
				<p className="text-lg text-gray-600 mb-6">
					<DecryptedText
						text="Upload your audio files and get fast, accurate transcriptions with the power of AI. Designed for podcasters, journalists, students, and everyone in between."
						animateOn="view"
						speed={200}
						revealDirection="center"
					/>
				</p>
				<Link
					to="/register"
					className="inline-block bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
					Get Started
				</Link>
			</div>
		</section>
	);
}

export default HomePage;
