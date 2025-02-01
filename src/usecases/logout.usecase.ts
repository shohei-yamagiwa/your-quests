import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export async function invoke() {
	return signOut(auth);
}
