import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

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

export { LoginWithGoogle };
