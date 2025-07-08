"use client";

import Image from "next/image";
import Link from "next/link";
import { CameraIcon, ClipboardCheckIcon, ClockIcon } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Post } from "@/types";
export default function Home() {
  const floatingItemsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Animation for floating food items
    const floatingItems = floatingItemsRef.current?.children! || [];
    for (let i = 0; i < floatingItems.length; i++) {
      const item = floatingItems[i] as HTMLElement;
      const randomDelay = Math.random() * 2;
      const randomDuration = 3 + Math.random() * 2;
      item.style.animationDelay = `${randomDelay}s`;
      item.style.animationDuration = `${randomDuration}s`;
    }
  }, []);
  // fetch photos

  const [latestPosts, setLatestPosts] = useState<DocumentData[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "posts")
      // Optionally, order by a timestamp field, e.g. "createdAt"
      // orderBy("createdAt", "desc"),
      // limit(12)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postLists: DocumentData[] = [];
      snapshot.docs.slice(0, 12).forEach((doc) => {
        const postInfo = doc.data();
        postLists.push(postInfo);
        setLatestPosts(postLists);
      });
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-pink-100 to-white flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auhref=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Nick & Mariel
          </h1>
          <p className="text-xl md:text-2xl text-[#8e1537] mb-6">
            September 27, 2025
          </p>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Welcome to our wedding celebration. We're excited to share this
            special day with you.
          </p>
        </div>
        {/* Floating Food Items */}
        <div
          ref={floatingItemsRef}
          className="absolute inset-0 z-0 mx-auto overflow-hidden"
        >
          {latestPosts.map((p, index) => {
            // Generate random positions
            const randomLeft = Math.random() * 80 + 10; // 10% to 90%
            const randomTop = Math.random() * 60 + 20; // 20% to 80%
            const randomDelay = Math.random() * 3; // 0 to 3 seconds
            const randomDuration = 3 + Math.random() * 2; // 3 to 5 seconds

            return (
              <div
                key={p.id || index}
                className="absolute w-16 h-16 rounded-lg shadow-lg animate-bounce"
                style={{
                  left: `${randomLeft}%`,
                  top: `${randomTop}%`,
                  animationDelay: `${randomDelay}s`,
                  animationDuration: `${randomDuration}s`,
                }}
              >
                <img
                  src={p.url}
                  alt={`${p.author} took a photo in Nick & mariel wedding`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Feature Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Photos Feature */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-pink-100 flex flex-col items-center text-center">
            <div className="bg-pink-50 p-3 rounded-full mb-4">
              <CameraIcon className="h-8 w-8 text-pink-500" />
            </div>
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Share Photos
            </h2>
            <p className="text-gray-600 mb-4">
              Capture beautiful moments and share them with everyone in
              real-time.
            </p>
            <Link
              href="/photos"
              className="mt-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600"
            >
              View Photos
            </Link>
          </div>
          {/* Check-in Feature */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-pink-100 flex flex-col items-center text-center">
            <div className="bg-pink-50 p-3 rounded-full mb-4">
              <ClipboardCheckIcon className="h-8 w-8 text-pink-500" />
            </div>
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Guest Check-in
            </h2>
            <p className="text-gray-600 mb-4">
              Leave your name and a special message for the happy couple.
            </p>
            <Link
              href="/check-in"
              className="mt-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600"
            >
              Check In
            </Link>
          </div>
          {/* Schedule Feature */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-pink-100 flex flex-col items-center text-center">
            <div className="bg-pink-50 p-3 rounded-full mb-4">
              <ClockIcon className="h-8 w-8 text-pink-500" />
            </div>
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Wedding Schedule
            </h2>
            <p className="text-gray-600 mb-4">
              View the timeline of events for our special day.
            </p>
            <Link
              href="/schedule"
              className="mt-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600"
            >
              See Schedule
            </Link>
          </div>
        </div>
      </section>
      {/* Quote Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-pink-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="italic text-lg text-gray-600">
            "Love is patient, love is kind. It always protects, always trusts,
            always hopes, always perseveres."
          </p>
        </div>
      </section>
    </div>
  );
}
