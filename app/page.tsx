"use client";

import Image from "next/image";
import Link from "next/link";
import { CameraIcon, ClipboardCheckIcon, ClockIcon } from "lucide-react";
import { useRef, useEffect } from "react";

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
        <div ref={floatingItemsRef} className="absolute inset-0 z-0 mx-auto">
          <div className="animate-bounce absolute w-16 h-16 left-[10%] top-[20%] rounded-lg shadow-lg animate-float">
            <img
              src="https://images.unsplash.com/photo-1513442542250-854d436a73f2"
              alt="Ingredient"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className=" animate-bounce absolute w-20 h-20 left-[20%] bottom-[15%] rounded-lg shadow-lg animate-float">
            <img
              src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"
              alt="Ingredient"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="animate-bounce absolute w-14 h-14 left-[75%] top-[25%] rounded-lg shadow-lg animate-float">
            <img
              src="https://images.unsplash.com/photo-1518977676601-b53f82aba655"
              alt="Ingredient"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="animate-bounce absolute w-16 h-16 right-[15%] bottom-[30%] rounded-lg shadow-lg animate-float">
            <img
              src="https://images.unsplash.com/photo-1615485500704-8e990f9719f4"
              alt="Ingredient"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="animate-bounce absolute w-12 h-12 right-[30%] top-[15%] rounded-lg shadow-lg animate-float">
            <img
              src="https://images.unsplash.com/photo-1618897996318-5a901fa6ca71"
              alt="Ingredient"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
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
