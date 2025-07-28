"use client";

import PhotoUpload from "@/myComponents/PhotoUpload";
import { Post } from "@/types";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import PhotoCard from "@/myComponents/PhotoCard";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
export default function PhotoPage() {
  const router = useRouter();
  const [user, setUser] = useState<User>();

  const [posts, setPosts] = useState<Post[]>([]);
  //protect page

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
    async function getAllPost() {
      try {
        console.log("getting posts");
        const q = query(collection(db, "posts"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const postsArr: Post[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            postsArr.push({
              id: doc.id,
              ...data,
              // Convert Firestore Timestamp to Date
              timestamp: data.timestamp?.toDate() || new Date(),
            } as Post);
          });
          setPosts(postsArr);
        });
        return unsubscribe;
      } catch (error) {
        console.log(`error getting all posts: ${error}`);
      }
    }
    getAllPost();
  }, []);
  return (
    <div className="">
      <PhotoUpload />
      <div className="px-14 grid grid-cols-1 md:grid-cols-3 gap-3">
        {posts.map((p) => (
          <PhotoCard
            id={p.id}
            uid={p.uid}
            url={p.url}
            caption={p.caption}
            key={p.id}
            author={p.author}
            timestamp={p.timestamp as Date}
          />
        ))}
      </div>
    </div>
  );
}
