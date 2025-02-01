import { AlertTriangle } from "lucide-react";

const ErrorComponent = ({ message = "An unexpected error occurred" }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 bg-white shadow-md rounded-lg">
        <AlertTriangle className="mx-auto mb-4 text-red-500" size={64} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
