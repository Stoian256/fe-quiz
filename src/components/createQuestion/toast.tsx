import { useState, useEffect } from "react";

interface ToastProps {
  type: string;
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      {isVisible && (
        <div
          className={`${
            type === "success" ? "bg-green-500" : "bg-red-500"
          } fixed bottom-10 right-10 p-4 rounded-md text-white`}
        >
          {message}
        </div>
      )}
    </>
  );
};

export default Toast;
