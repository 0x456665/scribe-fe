import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, Square, Play, Pause } from "lucide-react";

interface AudioRecorderProps {
	onRecordingComplete: (blob: Blob, mimeType: string) => void;
}

export default function AudioRecorder({ onRecordingComplete }: AudioRecorderProps) {
	const [isRecording, setIsRecording] = useState(false);
	const [recordingTime, setRecordingTime] = useState(0);
	const [audioURL, setAudioURL] = useState("");
	const [isPlaying, setIsPlaying] = useState(false);
	const [audioReady, setAudioReady] = useState(false);

	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const mediaStreamRef = useRef<MediaStream | null>(null);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
			if (mediaStreamRef.current) {
				mediaStreamRef.current.getTracks().forEach((track) => track.stop());
			}
			if (audioURL) URL.revokeObjectURL(audioURL);
		};
	}, [audioURL]);

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaStreamRef.current = stream;

			// Use browser's default format (usually webm)
			const options = { mimeType: "audio/webm;codecs=opus" };
			mediaRecorderRef.current = new MediaRecorder(stream, options);
			audioChunksRef.current = [];

			mediaRecorderRef.current.ondataavailable = (event) => {
				if (event.data.size > 0) {
					audioChunksRef.current.push(event.data);
				}
			};

			mediaRecorderRef.current.onstop = () => {
				const mimeType = mediaRecorderRef.current?.mimeType || "audio/webm";
				const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });

				const url = URL.createObjectURL(audioBlob);
				setAudioURL(url);
				setAudioReady(true);
				onRecordingComplete(audioBlob, mimeType);
			};

			mediaRecorderRef.current.start();
			setIsRecording(true);
			setRecordingTime(0);

			timerRef.current = setInterval(() => {
				setRecordingTime((prev) => prev + 1);
			}, 1000);
		} catch (error) {
			console.error("Error accessing microphone:", error);
			alert("Microphone access denied. Please check permissions.");
		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current && isRecording) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
		}
	};

	const togglePlayback = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play().catch((e) => console.error("Playback failed:", e));
			}
			setIsPlaying(!isPlaying);
		}
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	return (
		<Card className="glass-effect">
			<CardContent className="p-6 text-center space-y-6">
				<div className="flex justify-center">
					<div
						className={`w-24 h-24 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
							isRecording
								? "bg-destructive border-destructive recording-pulse"
								: "bg-muted border-border hover:border-primary"
						}`}>
						<Mic
							className={`h-12 w-12 ${
								isRecording ? "text-destructive-foreground" : "text-foreground"
							}`}
						/>
					</div>
				</div>

				{isRecording && (
					<div className="space-y-2">
						<Badge
							variant="destructive"
							className="text-lg px-4 py-2">
							{formatTime(recordingTime)}
						</Badge>
						<p className="text-sm text-foreground">Recording in progress...</p>
					</div>
				)}

				<div className="space-y-4">
					{!isRecording ? (
						<Button
							onClick={startRecording}
							size="lg"
							className="bg-purple-500 hover:bg-purple-600">
							<Mic className="mr-2 h-5 w-5" />
							Start Recording
						</Button>
					) : (
						<Button
							onClick={stopRecording}
							variant="destructive"
							size="lg">
							<Square className="mr-2 h-4 w-4" />
							Stop Recording
						</Button>
					)}

					{audioReady && (
						<div className="space-y-4 pt-4 border-t">
							<div className="flex items-center justify-center space-x-4">
								<Button
									variant="outline"
									size="sm"
									onClick={togglePlayback}
									className="bg-primary hover:bg-primary/90 text-primary-foreground">
									{isPlaying ? (
										<Pause className="h-4 w-4" />
									) : (
										<Play className="h-4 w-4" />
									)}
								</Button>
								<span className="text-sm text-foreground">
									{isPlaying ? "Playing recording..." : "Ready for transcription"}
								</span>
							</div>
							<audio
								ref={audioRef}
								src={audioURL}
								onEnded={() => setIsPlaying(false)}
								className="hidden"
							/>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
