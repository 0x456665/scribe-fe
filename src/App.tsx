import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import TranscribePage from "./pages/Transcribe";
import ProtectedRoute from "./components/layout/ProtectedRoutes";
import TranscriptionsPage from "./pages/Transcriptions";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Layout />}>
					{/* ADD MY ROUTES HERE */}
					<Route
						path=""
						element={<HomePage />}
					/>
					<Route
						path="login"
						element={<LoginPage />}
					/>
					<Route
						path="register"
						element={<RegisterPage />}
					/>
					<Route
						path="/app"
						element={<ProtectedRoute />}>
						<Route
							path="transcribe"
							element={<TranscribePage />}
						/>
						<Route
							path="transcriptions"
							element={<TranscriptionsPage />}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
