import FormComponent from "@/components/Auth/Form";
import DotGrid from "@/components/backgrounds/DotGrid/DotGrid";
import { authAPI } from "@/services/api";

function LoginPage() {

	return (
		<div className="relative h-[70dvh] bg-background lg:min-h-screen flex items-center justify-center">
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
			<div className="relative z-10 p-5 lg:p-10 rounded-lg  backdrop-blur-sm flex flex-col  gap-5">
				<div className="flex flex-col gap-2">
					<div className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 bg-clip-text text-transparent group-hover:from-purple-500">
						Login
					</div>
					<div className="text-gray-500">Login to start transcribing.</div>
				</div>
				<div>
					<FormComponent
						onSubmit={authAPI.login}
						type="login"
					/>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
