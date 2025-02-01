import { firestore } from "@/lib/firebase";
import { type DocumentData, type QueryDocumentSnapshot, collection, getDocs, updateDoc } from "firebase/firestore";

export async function doneQuest(uid: string) {
	const querySnapshot = await getDocs(collection(firestore, "quests"));
	let questDoc: QueryDocumentSnapshot<DocumentData, DocumentData> | null = null;
	for (const doc of querySnapshot.docs) {
		if (doc.id === uid) {
			questDoc = doc;
			break;
		}
	}
	if (questDoc === null) {
		return;
	}
	await updateDoc(questDoc.ref, {
		isDone: true,
	});
}
