import SolveQ from "@shadcn/components/userSolveQuiz/solve";
import { QuizProvider } from "@shadcn/context/quizContext";

const UserSolveQuiz = () => {

  return (
    <>
      <QuizProvider>
        <SolveQ />
      </QuizProvider>
    </>
  );
};

export default UserSolveQuiz;
