import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { EyeClosed, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AxiosError, type AxiosResponse } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

function FormComponent({
	onSubmit,
	type,
}: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit: (email: string, password: string) => Promise<AxiosResponse<any, any>>;
	type: "login" | "register";
}) {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { refreshAuth } = useAuth();

	const formSchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		}
	});

	useEffect(()=>{
		localStorage.removeItem("access_token");
		refreshAuth();
	}, [refreshAuth]);

	async function submit(values: z.infer<typeof formSchema>) {
		try {
			const response = await onSubmit(values.email, values.password);
			if (response.status === 200) {
				toast.success(`Succefully ${type == "login" ? "logged in" : "registered"}`);
				refreshAuth();
				navigate("/app/transcribe");
			}
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data);
				toast.error(error.response?.data.message);
			} else {
				console.log(error);
				toast.error("Something went wrong");
			}
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(submit)}
				className="space-y-5 lg:w-lg">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-purple-400">Email</FormLabel>
							<FormControl>
								<Input
									{...field}
									className="h-10 text-white ring-purple-500 ring"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-purple-400">Password</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										{...field}
										type={showPassword ? "text" : "password"}
										className="h-10 text-white ring-purple-500 ring"
									/>
									<span className="absolute right-2 top-2">
										{showPassword ? (
											<Eye onClick={() => setShowPassword(false)} />
										) : (
											<EyeClosed onClick={() => setShowPassword(true)} />
										)}
									</span>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="px-4 py-3 w-full h-10 bg-purple-500 hover:bg-purple-600 text-white">
					Submit
				</Button>
			</form>
		</Form>
	);
}

export default FormComponent;
