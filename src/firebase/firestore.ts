import { db } from "./firebase";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
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
  timestamp?: {
    seconds: number;
    nanoseconds: number;
  };
  localtime?: string;
}

/**
 * Convert firestore timestamp to local time string
 *
 * @param {{
 *   seconds: number;
 *   nanoseconds: number;
 * }} [t] firestore timestamp
 * @return {string}  Locale timestring
 */
const FirestoreTimestampToLocale = (t?: {
  seconds: number;
  nanoseconds: number;
}): string => {
  if (!t) {
    // if no timestamp is saved in firestore
    // return current timestamp as a fail safe
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  let x = new Timestamp(t.seconds, t.nanoseconds).toMillis();
  // add 5.30h of milliseconds to convert into UTC +5.30
  x += 19080000;

  return new Date(x).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

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
 * @param {React.Dispatch<React.SetStateAction<boolean>>} isLoading
 * @return {*}  {Unsubscribe} run the unsubscriber onDismount
 */
const FirestoreListenToQuestions = (
  state: React.Dispatch<React.SetStateAction<QuestionType[]>>,
  isLoading: React.Dispatch<React.SetStateAction<boolean>>
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
      data.localtime = FirestoreTimestampToLocale(data.timestamp);
      state((s) => [data, ...s]);
    });
    isLoading(false);
  });

  return unsub;
};

export { FirestoreNewQuestion, FirestoreListenToQuestions };
