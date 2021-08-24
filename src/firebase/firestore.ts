import { db } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { GetUserDataForFirestore } from "./auth";

interface QuestionType {
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

export { FirestoreNewQuestion };
