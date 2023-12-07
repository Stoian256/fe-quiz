import { dummyQuiz } from "@shadcn/data/dummyData";
import React, { createContext, useContext, useState } from "react";

interface QuizContextProps {
  minutes: number;
  seconds: number;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  userAnswers: string[][];
  setUserAnswers: React.Dispatch<React.SetStateAction<string[][]>>;
  isFinished: boolean;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
  handleFinishQuiz: () => void;
}

const QuizContext = createContext<QuizContextProps>({
  minutes: 0,
  seconds: 0,
  setMinutes: () => {},
  setSeconds: () => {},
  userAnswers: [],
  setUserAnswers: () => {},
  isFinished: false,
  setIsFinished: () => {},
  handleFinishQuiz: () => {}
});

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [quiz] = useState(dummyQuiz);
  const { questions } = quiz;
  const [userAnswers, setUserAnswers] = useState<string[][]>(
    Array(questions.length).fill([])
  );
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(parseInt(quiz.timeLimit, 10));
  const [seconds, setSeconds] = useState<number>(0);

  const resetTimer = () => {
    setMinutes(0);
    setSeconds(0);
  };
  const handleFinishQuiz = () => {
    resetTimer();
  };

  const contextValue: QuizContextProps = {
    userAnswers,
    setUserAnswers,
    isFinished,
    setIsFinished,
    minutes,
    seconds,
    setMinutes,
    setSeconds,
    handleFinishQuiz
  };

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};
