import React from "react";
import { HeartIcon } from "lucide-react";
type LoadingSpinnerProps = {
  size?: "small" | "medium" | "large";
  message?: string;
};
const LoadingSpinner = ({
  size = "medium",
  message = "Loading...",
}: LoadingSpinnerProps) => {
  // Determine size classes
  const sizeClasses = {
    small: {
      container: "h-16",
      icon: "h-4 w-4",
      spacing: "space-x-2",
    },
    medium: {
      container: "h-24",
      icon: "h-6 w-6",
      spacing: "space-x-3",
    },
    large: {
      container: "h-32",
      icon: "h-8 w-8",
      spacing: "space-x-4",
    },
  };
  const { container, icon, spacing } = sizeClasses[size];
  return (
    <div
      className={`flex flex-col items-center justify-center ${container} w-full`}
    >
      <div className={`flex items-center justify-center ${spacing}`}>
        <HeartIcon className={`${icon} text-pink-300 animate-pulse`} />
        <HeartIcon
          className={`${icon} text-pink-500 animate-pulse animation-delay-300`}
        />
        <HeartIcon
          className={`${icon} text-burgundy-500 animate-pulse animation-delay-600`}
        />
        <HeartIcon
          className={`${icon} text-burgundy-700 animate-pulse animation-delay-900`}
        />
        <HeartIcon
          className={`${icon} text-pink-300 animate-pulse animation-delay-1200`}
        />
      </div>
      {message && (
        <p className="mt-4 text-gray-600 text-sm font-light italic">
          {message}
        </p>
      )}
    </div>
  );
};
export default LoadingSpinner;
