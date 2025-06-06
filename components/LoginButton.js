import { signInWithGoogle, auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export default function LoginButton({ onUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        onUser(firebaseUser);
      } else {
        setUser(null);
        onUser(null);
      }
    });
    return () => unsubscribe();
  }, [onUser]);

  return user ? (
    <div className="flex items-center gap-2">
      <span className="text-sm">Hello, {user.displayName}</span>
      <button
        onClick={() => signOut(auth)}
        className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
      >
        Logout
      </button>
    </div>
  ) : (
    <button
      onClick={signInWithGoogle}
      className="px-3 py-1 text-sm rounded bg-teal-500 text-white hover:bg-teal-600"
    >
      Login with Google
    </button>
  );
}
