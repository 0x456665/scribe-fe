import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Replace with your actual API URL

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
	// const user = JSON.parse(localStorage.getItem("user") || "{}");
	// if (user.token) {
	// 	config.headers.Authorization = `Bearer ${user.token}`;
	// }
	const token = localStorage.getItem("access_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

let store: { refreshAuth: () => void } | null = null;
export const setAuthStore = (auth: { refreshAuth: () => void }) => {
	store = auth;
};

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response?.status === 401 &&
			!originalRequest._retry &&
			!originalRequest.url?.includes("/auth/refresh")
		) {
			originalRequest._retry = true;

			try {
				const res = await api.get("/api/v1/auth/refresh");
				if (res.status === 200) {
					const token = res.data.access_token;
					localStorage.setItem("access_token", token);

					store?.refreshAuth();

					originalRequest.headers.Authorization = `Bearer ${token}`;
					return api(originalRequest);
				}
			} catch (refreshError) {
				localStorage.removeItem("access_token");
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

export const authAPI = {
	login: async (email: string, password: string) => {
		const response = await api.post("/api/v1/auth/login", { email, password });
		if (response.status === 200) {
			localStorage.setItem("access_token", response.data.access_token);
		}
		return response;
	},

	register: async (email: string, password: string) => {
		const response = await api.post("/api/v1/auth/register", { email, password });
		if (response.status === 200) {
			localStorage.setItem("access_token", response.data.access_token);
		}
		return response;
	},
};

export const transcriptionAPI = {
	transcribe: async (audioFile: File) => {
		const formData = new FormData();
		formData.append("file", audioFile, audioFile.name); // Include filename
    console.log(audioFile);
		const response = await api.post("/api/v1/transcriptions/", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		return response;
	},

	getTranscriptions: async () => {
		const response = await api.get("/api/v1/transcriptions/");
		return response;
	},

	deleteTranscription: async (id: number) => {
		const response = await api.delete(`/api/v1/transcriptions/${id}/`);
		return response;
	},

	getOneTranscription: async (id: number) => {
		const response = await api.get(`/api/v1/transcriptions/${id}/`);
		return response;
	},
};

export default api;
