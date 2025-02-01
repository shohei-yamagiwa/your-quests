import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./contexts/auth.provider";
import "./index.css";
import { Dashboard } from "./routes/dashboard.page";
import { Login } from "./routes/login.page";
import { Quests } from "./routes/quests.page";
import { Register } from "./routes/register.page";

// biome-ignore lint/style/noNonNullAssertion: Root element always exists
const root = document.getElementById("root")!;

createRoot(root).render(
	<StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/quests" element={<Quests />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</StrictMode>,
);
