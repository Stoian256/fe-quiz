import { createContext, useContext, useState } from "react";

interface TitleContextType {
  mainTitle: string;
  title: string;
  setMainTitle: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

interface TitleProviderProps {
  children: React.ReactNode;
}

const initialTitleContext: TitleContextType = {
  mainTitle: "Default Main Title",
  title: "Default Title",
  setMainTitle: () => {},
  setTitle: () => {},
};

const TitleContext = createContext<TitleContextType>(initialTitleContext);

export const useTitleContext = () => useContext(TitleContext);

export const TitleProvider: React.FC<TitleProviderProps> = ({ children }) => {
  const [mainTitle, setMainTitle] = useState(initialTitleContext.mainTitle);
  const [title, setTitle] = useState(initialTitleContext.title);

  return (
    <TitleContext.Provider value={{ mainTitle, setMainTitle, title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};
