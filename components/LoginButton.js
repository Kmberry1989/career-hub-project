// LoginButton.js – Handles Google sign-in and sign-out
import { Button } from "@/components/ui/button";
import { signInWithGoogle, auth } from "@/lib/firebase";
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
      <Button onClick={() => signOut(auth)} variant="outline">Logout</Button>
    </div>
  ) : (
    <Button onClick={signInWithGoogle}>Login with Google</Button>
  );
}
