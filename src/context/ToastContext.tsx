import Toast from "@shadcn/components/toast";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef
} from "react";

export interface ToastContextType {
  showToast: (type: string, message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<{
    type: string;
    message: string;
  } | null>(null);

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (type: string, message: string) => {
    setToast({ type, message });

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
        />
      )}
    </ToastContext.Provider>
  );
};


export default ToastContext;
