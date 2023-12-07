import StartQuiz from "@shadcn/components/userSolveQuiz/startQuiz";
import { QuizProvider } from "@shadcn/context/quizContext";
import { dummyQuiz } from "@shadcn/data/dummyData";
import { useState } from "react";

const UserQuizes = () => {
  const [quiz] = useState(dummyQuiz);
  return (
    <div>
      <QuizProvider>
        <StartQuiz id={quiz.attemptId} quiz={quiz} />
      </QuizProvider>
    </div>
  );
};

export default UserQuizes;
