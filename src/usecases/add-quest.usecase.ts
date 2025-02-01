import { firestore } from "@/lib/firebase";
import type { User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export async function invoke(user: User, type: "strength" | "vitality" | "intelligence" | "wealth", title: string) {
	try {
		await addDoc(collection(firestore, "quests"), {
			uid: user.uid,
			title: title,
			type: type,
			isDone: false,
		});
	} catch (e) {
		console.error(e);
	}
}
