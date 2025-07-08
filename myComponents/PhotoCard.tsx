import type { Photo } from "@/types";
import Image from "next/image";
export default function PhotoCard({
  uid,
  url,
  caption,
  author,
  timestamp,
}: Photo) {
  return (
    <div className="mt-6  bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <Image
        src={url}
        alt={caption}
        className="w-full h-72 -z-10 object-contain"
        width={400}
        height={288}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
      />
      <div className="p-4 z-10">
        <p className="text-gray-800 font-medium mb-1">{caption}</p>
        <p className="text-gray-500 text-sm">
          Shared by {author} • {timestamp.toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
