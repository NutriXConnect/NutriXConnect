import { Loader2 } from "lucide-react";

const LoadingOverlay = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl flex flex-col items-center gap-4 w-full max-w-sm sm:max-w-md md:max-w-lg p-4 sm:p-6 md:p-8">
        <Loader2
          className="animate-spin text-blue-600
            w-8 h-8 
            sm:w-10 sm:h-10 
            md:w-12 md:h-12"
        />
        <p className="text-gray-700 font-medium text-sm sm:text-base md:text-lg text-center">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
