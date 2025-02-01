import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./auth.context";

export function AuthProvider({ children }: { children: ReactNode }) {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, initUser);
		return unsubscribe;
	}, []);

	async function initUser(user: User | null) {
		if (user) {
			setCurrentUser({ ...user });
			setUserLoggedIn(true);
		} else {
			setCurrentUser(null);
			setUserLoggedIn(false);
		}
	}
	return <AuthContext value={{ currentUser, userLoggedIn }}>{children}</AuthContext>;
}
