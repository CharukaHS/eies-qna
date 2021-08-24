import { db } from "./firebase";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Unsubscribe,
} from "firebase/firestore";
import { GetUserDataForFirestore } from "./auth";

/**
 * Firestore question document
 *
 * @export
 * @interface QuestionType
 */
export interface QuestionType {
  docId?: string;
  userId: string;
  displayName: string;
  photoUrl?: string | null;
  question: string;
}

/**
 * Insert new question to firestore
 *
 * @param {string} question
 */
const FirestoreNewQuestion = async (question: string) => {
  const { userId, displayName, photoUrl } = GetUserDataForFirestore();

  if (!userId || !displayName) {
    throw new Error("Error occured when fetching user data, missing fields");
  }

  const data: QuestionType = {
    userId,
    displayName,
    photoUrl,
    question,
  };

  await addDoc(collection(db, "questions"), {
    ...data,
    timestamp: serverTimestamp(),
  });
};

/**
 * Listen to firestore doc inserts realtime
 *
 * @param {React.Dispatch<React.SetStateAction<QuestionType[]>>} state
 * @return {*}  {Unsubscribe} run the unsubscriber onDismount
 */
const FirestoreListenToQuestions = (
  state: React.Dispatch<React.SetStateAction<QuestionType[]>>
): Unsubscribe => {
  // order query by timestamp
  const q = query(
    collection(db, "questions"),
    orderBy("timestamp", "asc"),
    limit(50)
  );
  const unsub = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      // only dealing with newly added docs
      if (change.type !== "added") return;

      const data = change.doc.data() as QuestionType;
      data.docId = change.doc.id;
      console.log(data);
      state((s) => [data, ...s]);
    });
  });

  return unsub;
};

export { FirestoreNewQuestion, FirestoreListenToQuestions };
