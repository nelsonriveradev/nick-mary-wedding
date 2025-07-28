"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhotoCard from "@/myComponents/PhotoCard";
import MessageCard from "@/myComponents/MessageCard";
import type { Post, GuestMessage } from "@/types";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
export default function LiveView() {
  const router = useRouter();
  const [snapPosts, setSnapPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User>();

  const [messages, setMessages] = useState<GuestMessage[]>([]);
  //protect this page

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        console.log(`User logged in: ${user?.displayName}`);
      } else {
        router.push("/sign-up");
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArr: Post[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        postsArr.push({
          ...data,
          // Optionally add doc.id if needed: id: doc.id,
        } as Post);
      });
      setSnapPosts(postsArr);
    });
    return () => unsubscribe();
  }, []);

  //fetch check-ins
  useEffect(() => {
    const q = query(collection(db, "check-in"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const checkInArr: GuestMessage[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        checkInArr.push({
          ...data,
          // Optionally add doc.id if needed: id: doc.id,
        } as GuestMessage);
      });
      setMessages(checkInArr);
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="px-4 py-2">
      <div className="text-3xl text-center font-bold text-black mb-2.5">
        Live View
      </div>
      <Tabs defaultValue="feed">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="greetings">Greetings</TabsTrigger>
        </TabsList>
        <TabsContent value="feed" className="mt-4">
          <div className="">
            <div className="">
              <h1 className="text-3xl font-semibold">Posts</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full h-4/5 overflow-y-scroll">
              {snapPosts.map((p, index) => (
                <PhotoCard
                  id={p.id}
                  key={index}
                  url={p.url}
                  uid={p.uid}
                  caption={p.caption}
                  author={p.author}
                  timestamp={p.timestamp}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="greetings">
          <div className="">
            <div className="">
              <h1 className="text-3xl font-semibold">Greetings</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full h-4/5 overflow-y-scroll">
              {messages.map((p, index) => (
                <MessageCard
                  message={p.message}
                  name={p.name}
                  key={index}
                  timestamp={p.timestamp}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
