import SearchQuizzes from "@shadcn/components/searchQuizz/searchQuizzes";
// import StartQuiz from "@shadcn/components/userSolveQuiz/startQuiz";
import { QuizProvider } from "@shadcn/context/quizContext";

const UserQuizes = () => {
  return (
    <div>
      <QuizProvider>
        <SearchQuizzes/>
        {/* <StartQuiz idQuiz={{ quizId: "81548664-29b4-46a0-86b2-cb6c8f812763" }} /> */}
      </QuizProvider>
    </div>
  );
};

export default UserQuizes;
