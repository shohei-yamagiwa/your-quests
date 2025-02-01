import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function invoke(email: string, password: string) {
	return createUserWithEmailAndPassword(auth, email, password);
}
