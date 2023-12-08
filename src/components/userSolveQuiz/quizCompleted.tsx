import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "../ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import { useQuizContext } from "@shadcn/context/quizContext";
import Confetti from "react-confetti";
import { useAuth } from "@shadcn/context/authContext";
import {
  addQuestionAnswers,
  endQuiz
} from "@shadcn/services/solveQuiz.service";
import { useEffect } from "react";

interface QuizCompletedProps {
  attemptId: string;
  currentQuestionId: string;
  selectedAnswerIds: string[];
}

const QuizCompleted: React.FC<QuizCompletedProps> = ({
  attemptId,
  currentQuestionId,
  selectedAnswerIds
}: QuizCompletedProps) => {
  const { accessToken } = useAuth();
  const {
    score,
    setScore,
    isFinished,
    setIsFinished,
    handleFinishQuiz,
    userAnswers
  } = useQuizContext();

  const idQuiz = { attemptId: attemptId };

  const sendAnswer = async () => {
    try {
      if (accessToken) {
        const response = await addQuestionAnswers(
          accessToken,
          attemptId,
          currentQuestionId,
          selectedAnswerIds
        );
        if (response.status === 200) {
          console.log("Successfully added question answers");
        } else {
          console.error("Failed to add question answers");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleFinishButtonClick = async () => {
    setIsFinished(true);
    handleFinishQuiz();
    sendAnswer();
    try {
      if (accessToken && idQuiz) {
        const data = await endQuiz(accessToken, idQuiz);
        setScore(data.toFixed(2));
      }
    } catch (error) {
      console.log("Error fetching score: ", error);
    }
  };

  useEffect(() => {}, [score]);
  const navigate = useNavigate();

  const showUserAnswersInConsole = () => {
    console.log(
      "after complete",
      userAnswers,
      "isFinished",
      isFinished,
      "score: ",
      score
    );
  };

  const handleCloseClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          {!isFinished && (
            <Button
              onClick={handleFinishButtonClick}
              className="bg-dorange hover:bg-dyellow text-white shadow-orange-200 shadow-md font-bold py-4 px-4 rounded b-2 ml-auto h-12"
            >
              Finish
            </Button>
          )}
        </DialogTrigger>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogContent
          className="w-screen h-auto max-w-3xl"
          onClick={() => showUserAnswersInConsole()}
          onInteractOutside={() => handleCloseClick()}
        >
          <div className="flex  justify-center items-center max-h-screen">
            {score >= 50 && <Confetti width={750} height={500} gravity={0.02} />}
            <div className="bg-dorange hover:bg-dorange text-white rounded-full w-96 h-96 p-4 text-center items-center flex flex-col">
              <div className="text-6xl mb-4 mt-20">Your score</div>
              <div className="text-6xl font-bold ">{score}%</div>
              {score >= 50 ? (
                <span className="text-2xl mt-4">Congratulations!</span>
              ) : (
                <span>Keep trying!</span>
              )}
            </div>
          </div>
          <DialogFooter className="flex justify-end  sm:justify-end">
            <DialogClose
              asChild
              className="items-center"
              onClick={handleCloseClick}
            >
              <Link
                to={"/"}
                className="border-none flex-end  text-dblue bg-dorange hover:bg-dyellow shadow-md p-4 rounded-lg"
              >
                Complete
              </Link>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizCompleted;
