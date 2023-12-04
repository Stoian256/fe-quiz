import { useToast } from "@shadcn/context/ToastContext";
import { useEffect, useCallback } from "react";

interface ToastProps {
  type: string;
  message: string;
}

const Toast: React.FC<ToastProps> = ({ type, message }) => {
  const { showToast } = useToast();

  const showToastCallback = useCallback(showToast, []);

  useEffect(() => {
    showToastCallback(type, message);
  }, [type, message, showToastCallback]);

  return (
    <div
      className={`${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } fixed bottom-10 right-10 p-4 rounded-md text-white`}
    >
      {message}
    </div>
  );
};

export default Toast;
