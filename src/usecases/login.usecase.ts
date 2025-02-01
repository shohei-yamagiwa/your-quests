import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function invoke(email: string, password: string) {
	return signInWithEmailAndPassword(auth, email, password);
}
