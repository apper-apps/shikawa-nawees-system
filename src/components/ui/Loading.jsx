import ApperIcon from "@/components/ApperIcon";

const Loading = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mx-auto"></div>
        </div>
        <p className="text-gray-600 mt-4 text-sm">لوڈ ہو رہا ہے...</p>
      </div>
    </div>
  );
};

export default Loading;