import { HeartIcon } from "lucide-react";

export default function Footer() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center text-gray-500">
          <HeartIcon className="h-5 w-5 text-pink-500 mr-2" />
          <p>Nick & Mariel - June 27, 2025</p>
        </div>
        <p className="mt-2 text-sm text-gray-400">
          Share your special moments with us
        </p>
      </div>
    </div>
  );
}
