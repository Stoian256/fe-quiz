import { dummyQuiz } from "@shadcn/data/dummyData";
import { UserQuiz } from "@shadcn/utils/interfaces/typescript";
import React, { createContext, useContext, useEffect, useState } from "react";

interface QuizContextProps {
  quiz: UserQuiz;
  score: number,
  setScore: React.Dispatch<React.SetStateAction<number>>;
  minutes: number;
  seconds: number;
  setMinutes: React.Dispatch<React.SetStateAction<number>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  userAnswers: string[][];
  setUserAnswers: React.Dispatch<React.SetStateAction<string[][]>>;
  isFinished: boolean;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
  handleFinishQuiz: () => void;
  setQuizData: (data: UserQuiz ) => void;

}

const QuizContext = createContext<QuizContextProps>({
  score: 0.0,
  setScore: () => {},
  quiz: {
    attemptId: "",
    startedAt: new Date(),
    timeLimit: 0,
    questions: []
  },  
  minutes: 0,
  seconds: 0,
  setMinutes: () => {},
  setSeconds: () => {},
  userAnswers: [],
  setUserAnswers: () => {},
  isFinished: false,
  setIsFinished: () => {},
  handleFinishQuiz: () => {},
  setQuizData: ()=> {}

});

export const useQuizContext = () => useContext(QuizContext);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [quiz, setQuiz] = useState(dummyQuiz);
  const [score, setScore] = useState(0.0)
  const [userAnswers, setUserAnswers] = useState<string[][]>(
    Array(20).fill([])
  );
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

useEffect(()=> {
  // setUserAnswers(Array(quiz.questions.length).fill([]))
  setMinutes(quiz.timeLimit)
},[quiz])

console.log("user answers length",userAnswers.length)

  const setQuizData = (data: UserQuiz)=>{
    setQuiz(data)
    console.log("in context: ",quiz)
  }

    const resetTimer = () => {
    setMinutes(0);
    setSeconds(0);
  };
  const handleFinishQuiz = () => {
    resetTimer();
  };

  const contextValue: QuizContextProps = {
    quiz,
    score, setScore,
    userAnswers,
    setUserAnswers,
    isFinished,
    setIsFinished,
    minutes,
    seconds,
    setMinutes,
    setSeconds,
    handleFinishQuiz,
    setQuizData
  };

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};
