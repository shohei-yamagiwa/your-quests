import type { User } from "firebase/auth";
import { createContext } from "react";

type AuthState = {
	currentUser: User | null;
	userLoggedIn: boolean;
};
const defaultValue: AuthState = {
	currentUser: null,
	userLoggedIn: false,
};
const AuthContext = createContext(defaultValue);

export type { AuthState };
export { AuthContext };
