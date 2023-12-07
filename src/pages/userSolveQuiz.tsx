import SolveQuiz from "@shadcn/components/userSolveQuiz/SolveQuiz";
import { QuizProvider } from "@shadcn/context/quizContext";

const UserSolveQuiz = () => {

  return (
    <>
      <QuizProvider>
        <SolveQuiz />
      </QuizProvider>
    </>
  );
};

export default UserSolveQuiz;
