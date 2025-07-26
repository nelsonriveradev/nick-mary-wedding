"use client";
import MessageCard from "@/myComponents/MessageCard";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "sonner";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  limit,
  DocumentData,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import type { GuestMessage } from "@/types";

export default function CheckIn() {
  const [message, setMessage] = useState("");
  const [recentMessages, setRecentMessages] = useState<DocumentData[]>([]);
  const [user, setUser] = useState<User>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  //get User Data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        router.push("/sign-up");
      }
    });
    return () => unsubscribe();
  }, [router]);

  //get live check-ins

  useEffect(() => {
    const q = query(
      collection(db, "check-in"),
      orderBy("timestamp", "desc"),
      limit(3)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setRecentMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const dataMessage: GuestMessage = {
      uid: user?.uid,
      name: formData.get("name") as string,
      message: formData.get("message") as string,
      timestamp: new Date(),
    };

    try {
      setIsSubmitting(true);
      const docRef = await addDoc(collection(db, "check-in"), dataMessage);
      console.log("New message for the check-in", docRef.id);
      toast.success("Your check in message has been posted!");
    } catch (error) {
      console.log(`Error uploading check-in: ${error}`);
      toast.error("There was an error while posting your message.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-light text-gray-800 mb-8 text-center">
        Guest Check-in
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-pink-100">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Leave a Message
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={`${user?.displayName}`}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Your name or names"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Share your wishes for the couple..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className={`${
                  isSubmitting ? "animate-pulse" : ""
                }  w-full px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:bg-pink-600`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Message"}
              </button>
            </form>
          </div>
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl font-medium text-gray-800 mb-4">
            Guest Messages
          </h2>
          {recentMessages.length === 0 ? (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-pink-100 text-center">
              <p className="text-gray-500">
                No messages yet. Be the first to leave a message!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentMessages.map((msg, index) => (
                <MessageCard
                  key={index}
                  name={msg.name}
                  message={msg.message}
                  timestamp={msg.timestamp}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
