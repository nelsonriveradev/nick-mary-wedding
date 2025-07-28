"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { HeartIcon, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/photos", label: "Photos" },
    { href: "/check-in", label: "Check In" },
    { href: "/schedule", label: "Schedule" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <HeartIcon className="h-8 w-8 text-pink-500" />
              <span className="ml-2 text-xl font-semibold text-gray-800">
                Nick & Mariel
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathName === item.href
                    ? "text-[#8e1537] border-b-2 border-[#d1325d]"
                    : "text-gray-600 hover:text-pink-500"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-pink-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 z-50">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathName === item.href
                      ? "text-[#8e1537] bg-pink-50"
                      : "text-gray-600 hover:text-pink-500 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
