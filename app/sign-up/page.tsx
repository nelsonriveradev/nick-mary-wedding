"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  async function handleSignUp() {
    try {
      await signInWithPopup(auth, googleProvider).then((result) => {
        const user = result.user;
        if (user) {
          router.push("/photos");
        }
      });
    } catch (error) {
      console.log(`Error signing in: ${error}`);
    }
  }
  toast.promise(handleSignUp, {
    loading: "Signing Up...",
    success: "Account created",
    error: "Error creating an account",
  });
  return (
    <div className="">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-3xl">Sign Up</CardTitle>
          <CardDescription className="text-md">
            Make an account to share your beatiful photos with us!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignUp} className="text-lg">
            Sign up with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
