import React, { createContext, useContext, useState } from "react";

interface SelectedQuestionContextProps {
  selectedQuestionId: string | null;
  setSelectedQuestionId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedQuestions: string[];
  setSelectedQuestions: React.Dispatch<React.SetStateAction<string[]>>;
  data: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
  removeQuestion: (questionIdToRemove: string) => void;
  selectedQuestionsInModal: string[];
  setSelectedQuestionsInModal: React.Dispatch<React.SetStateAction<string[]>>;
  removeQuestionFromModal: (questionIdToRemove: string) => void;
}

const QuizModalContext = createContext<SelectedQuestionContextProps>({
  selectedQuestionId: null,
  setSelectedQuestionId: () => {},
  selectedQuestions: [],
  setSelectedQuestions: () => {},
  data: [],
  setData: () => { },
  removeQuestion: () => { },
  selectedQuestionsInModal: [],
  setSelectedQuestionsInModal: () => {},
  removeQuestionFromModal: () => {},
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
  const [selectedQuestionsInModal, setSelectedQuestionsInModal] = useState<string[]>([]);

  const removeQuestion = (questionIdToRemove: string) => {
    setSelectedQuestions((prevQuestions) =>
      prevQuestions.filter((questionId) => questionId !== questionIdToRemove)
    );
  };

  const removeQuestionFromModal = (questionIdToRemove: string) => {
    setSelectedQuestionsInModal((prevQuestions) =>
      prevQuestions.filter((questionId) => questionId !== questionIdToRemove)
    );
  };

  return (
    <QuizModalContext.Provider
      value={{
        selectedQuestionId,
        setSelectedQuestionId,
        selectedQuestions,
        setSelectedQuestions,
        data,
        setData,
        removeQuestion,
        selectedQuestionsInModal,
        setSelectedQuestionsInModal,
        removeQuestionFromModal,
      }}
    >
      {children}
    </QuizModalContext.Provider>
  );
};
