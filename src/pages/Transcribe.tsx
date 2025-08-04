import { useState } from "react";
import AudioRecorder from "@/components/AudioRecorder";
import { transcriptionAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Upload, Copy, FileAudio, AlertCircle, CheckCircle } from "lucide-react";
import DotGrid from "@/components/backgrounds/DotGrid/DotGrid";
import { toast } from "sonner";

function TranscribePage() {
	const [audioFile, setAudioFile] = useState<File | null>(null);
	const [transcription, setTranscription] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [copied, setCopied] = useState(false);

	const handleRecordingComplete = (blob: Blob, mimeType: string) => {
		// Convert Blob to File for consistent handling
		const file = new File([blob], `recording.${mimeType.split("/")[1].split(";")[0]}`, {
			type: mimeType,
		});
		setAudioFile(file);
		setTranscription("");
		setError("");

		toast.success("Recording Complete", {
			description: "Your audio is ready for transcription",
		});
	};

	const handleTranscribe = async () => {
		if (!audioFile) return;

		setLoading(true);
		setError("");

		try {
			const response = await transcriptionAPI.transcribe(audioFile);
			setTranscription(response.data.transcription);

			// Save to local storage
			const savedTranscriptions = JSON.parse(localStorage.getItem("transcriptions") || "[]");
			savedTranscriptions.unshift({
				id: Date.now(),
				filename: audioFile.name,
				transcription: response.data.transcription,
				timestamp: new Date().toISOString(),
			});
			localStorage.setItem("transcriptions", JSON.stringify(savedTranscriptions));

			toast("Transcription Complete", {
				description: "Audio has been successfully transcribed",
			});
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			setError("Transcription failed. Please try again.");
			toast.error("Transcription Error", {
				description: "Failed to transcribe audio",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && file.type.startsWith("audio/")) {
			setAudioFile(file);
			setTranscription("");
			setError("");
			toast("File Uploaded", {
				description: `${file.name} is ready for transcription`,
			});
		} else {
			setError("Please select a valid audio file.");
			toast.error("Invalid File", {
				description: "Please select an audio file (MP3, WAV, etc.)",
			});
		}
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(transcription);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
			toast.success("Copied to Clipboard", {
				description: "Transcription copied successfully",
			});
		} catch (err) {
			console.error("Failed to copy text:", err);
			toast.error("Copy Failed", {
				description: "Failed to copy to clipboard",
			});
		}
	};

	return (
		<div className="relative py-5 flex items-center justify-center flex-col min-h-screen">
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
			<div className="relative z-5 backdrop-blur-sm p-5 rounded-md w-full max-w-6xl">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
						Audio Transcription
					</h1>
					<p className="text-foreground">
						Record audio or upload a file to get started with AI-powered transcription
					</p>
				</div>
				<div className="flex items-center justify-center py-5">
					<div className="grid lg:grid-cols-2 gap-8 w-full">
						{/* Recording Section */}
						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<FileAudio className="h-5 w-5" color="white"/>
										<span className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
											Record Audio
										</span>
									</CardTitle>
									<CardDescription>
										Click the microphone to start recording your audio
									</CardDescription>
								</CardHeader>
								<CardContent>
									<AudioRecorder onRecordingComplete={handleRecordingComplete} />
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<Upload className="h-5 w-5" color="white"/>
										<span className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
											Upload Audio File
										</span>
									</CardTitle>
									<CardDescription className="text-foreground">
										Or choose an existing audio file from your device
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="audio-upload">Audio File</Label>
										<Input
											id="audio-upload"
											type="file"
											accept="audio/*"
											onChange={handleFileUpload}
											className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-foreground hover:file:bg-primary/90"
										/>
									</div>
									<p className="text-xs text-foreground">
										Supported formats: MP3, WAV, M4A, FLAC, WEBM
									</p>
									{audioFile && (
										<div className="pt-2">
											<p className="text-sm text-foreground truncate">
												Selected: {audioFile.name}
											</p>
											<p className="text-xs text-muted-foreground">
												{(audioFile.size / 1024 / 1024).toFixed(2)} MB
											</p>
										</div>
									)}
								</CardContent>
							</Card>
							{audioFile && (
								<Button
									onClick={handleTranscribe}
									disabled={loading}
									size="lg"
									className="w-full bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 hover:from-purple-700 hover:to-blue-600">
									{loading ? (
										<LoadingSpinner
											size="sm"
											text="Transcribing..."
											className="bg-white text-white"
										/>
									) : (
										"Transcribe Audio"
									)}
								</Button>
							)}
						</div>
						{/* Results Section */}
						<div>
							<Card className="h-full">
								<CardHeader>
									<CardTitle className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
										Transcription Result
									</CardTitle>
									<CardDescription>
										Your transcribed text will appear here
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									{loading && (
										<div className="flex flex-col items-center justify-center py-12 space-y-4">
											<LoadingSpinner size="lg" />
											<p className="text-foreground">
												Processing your audio...
											</p>
											<p className="text-sm text-foreground">
												This may take a few moments
											</p>
										</div>
									)}
									{error && (
										<Alert variant="destructive">
											<AlertCircle className="h-4 w-4" />
											<AlertDescription>{error}</AlertDescription>
										</Alert>
									)}
									{transcription && !loading && (
										<div className="space-y-4">
											<div className="p-4 bg-muted rounded-lg max-h-96 overflow-y-auto">
												<p className="text-background leading-relaxed whitespace-pre-wrap">
													{transcription}
												</p>
											</div>
											<Separator />
											<div className="flex items-center justify-between">
												<div>
													<p className="text-sm text-foreground">
														{transcription.split(" ").length} words
														transcribed
													</p>
													{audioFile && (
														<p className="text-xs text-muted-foreground">
															From: {audioFile.name}
														</p>
													)}
												</div>
												<Button
													variant="outline"
													size="sm"
													onClick={copyToClipboard}
													className="flex items-center space-x-2 bg-transparent text-white">
													{copied ? (
														<>
															<CheckCircle className="h-4 w-4 text-green-500" />
															<span>Copied!</span>
														</>
													) : (
														<>
															<Copy className="h-4 w-4" />
															<span>Copy</span>
														</>
													)}
												</Button>
											</div>
										</div>
									)}
									{!transcription && !loading && !error && (
										<div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
											<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
												<FileAudio className="h-8 w-8 text-foreground" />
											</div>
											<div className="space-y-2">
												<h3 className="font-medium text-foreground">
													Ready to transcribe
												</h3>
												<p className="text-sm text-foreground">
													Record or upload an audio file to get started
												</p>
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TranscribePage;
