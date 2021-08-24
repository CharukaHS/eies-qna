import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";

/**
 * Login user with google
 *
 */
const LoginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("profile");

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error occured while signin with google");
    console.error(error);
    throw error;
  }
};

/**
 * Returns user's display name from firebase auth
 *
 * @return {*}
 */
const AuthGetUsername = () => {
  return auth.currentUser?.displayName;
};

/**
 * Returns necessary user data for firestore saves
 *
 * @return {*}
 */
const GetUserDataForFirestore = () => {
  const displayName = auth.currentUser?.displayName;
  const userId = auth.currentUser?.uid;
  const photoUrl = auth.currentUser?.photoURL;

  return { displayName, userId, photoUrl };
};

/**
 * Logout firebase auth
 */
const LogOut = async () => {
  await signOut(auth);
};

export { AuthGetUsername, LoginWithGoogle, GetUserDataForFirestore, LogOut };
