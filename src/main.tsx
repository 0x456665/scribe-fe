import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/components/Auth/AuthProvider.tsx';

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<App />
			<Toaster
				richColors={true}
				position="bottom-right"
				closeButton={true}
			/>
		</AuthProvider>
	</StrictMode>
);
