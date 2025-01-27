const { Loader2 } = require("lucide-react");

const ComponentLoader = ({
  size = "medium",
  text = "Loading",
  className = "",
}) => {
  const sizeClasses = {
    small: "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6",
    medium: "h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8",
    large: "h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12",
  };

  const textSizeClasses = {
    small: "text-xs sm:text-sm",
    medium: "text-sm sm:text-base",
    large: "text-base sm:text-lg",
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-2 sm:p-3 md:p-4 ${className}`}
    >
      <Loader2 className={`animate-spin text-blue-600 ${sizeClasses[size]}`} />
      {text && (
        <span className={`text-gray-600 font-medium ${textSizeClasses[size]}`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default ComponentLoader;
