import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { transcriptionAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Copy, FileAudio, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface Transcription {
	id: number;
	transcription: string;
	created_at: string;
	duration: number;
}

export default function TranscriptionsPage() {
	const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [copiedId, setCopiedId] = useState<number | null>(null);

	useEffect(() => {
		loadTranscriptions();
	}, []);

	const loadTranscriptions = async () => {
		try {
			const response = await transcriptionAPI.getTranscriptions();
			setTranscriptions(response.data);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
		} catch (err: any) {
			setError("Failed to load transcriptions");
		} finally {
			setLoading(false);
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const copyToClipboard = async (text: string, id: number) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedId(id);
			setTimeout(() => setCopiedId(null), 2000);
		} catch (err) {
			console.error("Failed to copy text:", err);
		}
	};

	if (loading) {
		return (
			<div>
				<div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
					<LoadingSpinner size="lg" />
					<p className="text-muted-foreground">Loading your transcriptions...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-5">
			<div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold mb-2 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
						Transcription History
					</h1>
					<p className="text-muted-foreground">
						View and manage all your transcribed audio files
					</p>
				</div>
				<Button asChild>
					<Link
						to="/app/transcribe"
						className="flex items-center space-x-2 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500">
						<Plus className="h-4 w-4" />
						<span>New Transcription</span>
					</Link>
				</Button>
			</div>

			{error && (
				<Alert
					variant="destructive"
					className="mb-6">
					<AlertCircle className="h-4 w-4" />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{transcriptions.length === 0 ? (
				<Card className="text-center py-12 border-[0.5px] border-purple-500">
					<CardContent className="space-y-6">
						<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
							<FileAudio className="h-8 w-8 text-muted-foreground" />
						</div>
						<div className="space-y-2">
							<CardTitle>No transcriptions yet</CardTitle>
							<CardDescription className="max-w-sm mx-auto">
								Start by creating your first transcription. Upload an audio file or
								record directly in your browser.
							</CardDescription>
						</div>
						<Button asChild>
							<Link
								to="/transcribe"
								className="flex items-center space-x-2">
								<Plus className="h-4 w-4" />
								<span>Create First Transcription</span>
							</Link>
						</Button>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<p className="text-sm text-muted-foreground">
							{transcriptions.length} transcription
							{transcriptions.length !== 1 ? "s" : ""} found
						</p>
					</div>

					<div className="grid gap-4 lg:grid-cols-2">
						{transcriptions.map((transcription) => (
							<Card
								key={transcription.id}
								className="glass-effect hover:bg-[#20164d] transition-colors h-50 border-[0.5px] border-[#8b7dc5]">
								<CardHeader className="pb-3">
									<div className="flex items-start justify-between">
										<div className="space-y-1">
											<div className="flex items-center space-x-2 text-sm text-muted-foreground">
												<Clock className="h-4 w-4" />
												<span>{formatDate(transcription.created_at)}</span>
												{transcription.duration && (
													<>
														<span>•</span>
														<Badge
															variant="secondary"
															className="text-xs">
															{transcription.duration}s
														</Badge>
													</>
												)}
											</div>
										</div>
										<Button
											variant="outline"
											size="sm"
											onClick={() =>
												copyToClipboard(
													transcription.transcription,
													transcription.id
												)
											}
											className="flex items-center space-x-2 bg-transparent text-foreground">
											{copiedId === transcription.id ? (
												<>
													<CheckCircle className="h-4 w-4 text-green-500" />
													<span>Copied</span>
												</>
											) : (
												<>
													<Copy className="h-4 w-4" />
													<span>Copy</span>
												</>
											)}
										</Button>
									</div>
								</CardHeader>
								<CardContent>
									<p className="text-foreground leading-relaxed overflow-scroll">
										{transcription.transcription}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
