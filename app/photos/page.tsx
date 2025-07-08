"use client";

import PhotoUpload from "@/myComponents/PhotoUpload";
import { Photo, Post } from "@/types";
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PhotoCard from "@/myComponents/PhotoCard";

export default function PhotoPage() {
  const [posts, setPosts] = useState<Post[]>([]);

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
