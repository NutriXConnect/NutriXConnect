import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useEffect, useState } from "react";
const FloatingBar = ({
  message = "",
  type = "info", // "success", "error", "info"
  duration = 5000, // Duration in ms, 0 for persistent
  onClose = () => {},
  isVisible = false,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const variants = {
    success: {
      icon: CheckCircle,
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-800",
      iconColor: "text-green-500",
    },
    error: {
      icon: AlertCircle,
      bg: "bg-red-100",
      border: "border-red-500",
      text: "text-red-800",
      iconColor: "text-red-500",
    },
    info: {
      icon: Info,
      bg: "bg-blue-100",
      border: "border-blue-500",
      text: "text-blue-800",
      iconColor: "text-blue-500",
    },
  };

  const variant = variants[type];
  const Icon = variant.icon;

  return (
    <div
      className={`fixed left-0 right-0 bottom-0 transition-transform duration-300 ease-in-out transform ${
        show ? "translate-y-0" : "translate-y-full"
      } z-50`}
    >
      <div className="mx-auto max-w-screen-lg px-4 pb-6">
        <div
          className={`${variant.bg} ${variant.text} ${variant.border} border rounded-lg shadow-lg`}
        >
          <div className="flex items-center justify-between p-3 sm:p-4">
            <div className="flex items-center space-x-3 flex-1">
              <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${variant.iconColor}`} />
              <p className="text-sm sm:text-base font-medium">{message}</p>
            </div>
            <button
              onClick={handleClose}
              className={`${variant.text} hover:opacity-75 transition-opacity p-1`}
              aria-label="Close"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingBar;
