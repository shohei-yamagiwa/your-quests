import { firestore } from "@/lib/firebase";
import type { User } from "firebase/auth";
import { type DocumentData, type QueryDocumentSnapshot, collection, getDocs } from "firebase/firestore";

export async function getAllQuests(user: User) {
	const result: QueryDocumentSnapshot<DocumentData, DocumentData>[] = [];
	const querySnapshot = await getDocs(collection(firestore, "quests"));
	for (const doc of querySnapshot.docs) {
		if (doc.data().uid === user.uid) {
			result.push(doc);
		}
	}
	return result;
}
