import React, { createContext, useContext, useState } from "react";

interface SelectedQuestionContextProps {
  selectedQuestionId: string | null;
  setSelectedQuestionId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedQuestions: string[];
  setSelectedQuestions: React.Dispatch<React.SetStateAction<string[]>>;
  data: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
}

const QuizModalContext = createContext<SelectedQuestionContextProps>({
  selectedQuestionId: null,
  setSelectedQuestionId: () => {},
  selectedQuestions: [],
  setSelectedQuestions: () => {},
  data: [],
  setData: () => {},
});

export const useQuizModalContext = () => useContext(QuizModalContext);

export const QuizModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null
  );
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [data, setData] = useState<string[]>([]);

  return (
    <QuizModalContext.Provider
      value={{
        selectedQuestionId,
        setSelectedQuestionId,
        selectedQuestions,
        setSelectedQuestions,
        data, setData
      }}
    >
      {children}
    </QuizModalContext.Provider>
  );
};
