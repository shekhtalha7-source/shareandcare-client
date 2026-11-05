"use client";
import { authClient } from "@/lib/auth-client";

export default function GoogleButton() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/",
    });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full rounded-md border border-neutral-700 bg-transparent py-2 text-white hover:bg-neutral-800"
    >
      Continue with Google
    </button>
  );
}