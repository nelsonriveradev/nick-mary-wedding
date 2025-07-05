"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import { HeartIcon } from "lucide-react";

export default function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <HeartIcon className="h-8 w-8 text-pink-500" />
              <span className="ml-2 text-xl font-semibold text-gray-800">
                Nick & Mariel
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathName === "/"
                  ? "text-[#8e1537] border-b-2 border-[#d1325d]"
                  : "text-gray-600 hover:text-pink-500"
              }`}
            >
              Home
            </Link>
            <Link
              href="/photos"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathName === "/photos"
                  ? "text-[#8e1537] border-b-2 border-[#d1325d]"
                  : "text-gray-600 hover:text-pink-500"
              }`}
            >
              Photos
            </Link>
            <Link
              href="/check-in"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathName === "/check-in"
                  ? "text-[#8e1537] border-b-2 border-[#d1325d]"
                  : "text-gray-600 hover:text-pink-500"
              }`}
            >
              Check In
            </Link>
            <Link
              href="/schedule"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathName === "/schedule"
                  ? "text-[#8e1537] border-b-2 border-[#d1325d]"
                  : "text-gray-600 hover:text-pink-500"
              }`}
            >
              Schedule
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
