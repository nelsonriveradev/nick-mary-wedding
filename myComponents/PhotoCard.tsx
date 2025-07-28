import type { Post } from "@/types";
import Image from "next/image";

export default function PhotoCard({ url, caption, author, timestamp }: Post) {
  const formatTimestamp = (ts: any): string => {
    try {
      if (ts instanceof Date) {
        return ts.toLocaleDateString();
      }
      if (ts && typeof ts === "object" && ts.toDate) {
        return ts.toDate().toLocaleDateString();
      }
      if (ts && typeof ts === "object" && ts.seconds) {
        return new Date(ts.seconds * 1000).toLocaleDateString();
      }
      return new Date().toLocaleDateString();
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return new Date().toLocaleDateString();
    }
  };
  return (
    <div className="mt-4 md:mt-6 w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <Image
        src={url}
        alt={caption}
        className="w-full h-48 sm:h-56 md:h-72 object-cover"
        width={400}
        height={288}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />
      <div className="p-3 md:p-4">
        <p className="text-gray-800 font-medium mb-1 text-sm md:text-base line-clamp-2">
          {caption}
        </p>
        <p className="text-gray-500 text-xs md:text-sm">
          Shared by {author} • {formatTimestamp(timestamp)}
        </p>
      </div>
    </div>
  );
}
