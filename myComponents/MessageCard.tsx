type MessageCardProps = {
  name: string;
  message: string;
  timestamp: Date | any; // Allow Firestore Timestamp or other formats
};
const MessageCard = ({ name, message, timestamp }: MessageCardProps) => {
  function formatTimestamp(timestamp: any): string {
    let date: Date;

    // Handle different timestamp formats
    if (timestamp instanceof Date) {
      date = timestamp;
    } else if (timestamp && typeof timestamp.toDate === "function") {
      // Firestore Timestamp object
      date = timestamp.toDate();
    } else if (timestamp && typeof timestamp === "string") {
      date = new Date(timestamp);
    } else if (timestamp && typeof timestamp === "number") {
      date = new Date(timestamp);
    } else {
      // Fallback to current date if timestamp is invalid
      date = new Date();
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} - ${hour}:${minute}`;
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-pink-100">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-800">{name}</h3>
        <span className="text-xs text-gray-500">
          {formatTimestamp(timestamp)}
        </span>
      </div>
      <p className="mt-2 text-gray-600">{message}</p>
    </div>
  );
};
export default MessageCard;
