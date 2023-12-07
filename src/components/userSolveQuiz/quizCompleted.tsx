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

const QuizCompleted = () => {
  const { isFinished, setIsFinished, handleFinishQuiz, userAnswers } =
    useQuizContext();
  const handleFinishButtonClick = () => {
    setIsFinished(true);
    handleFinishQuiz();
  };
  const navigate = useNavigate();

  //TODO manage after API integration
  const showUserAnswersInConsole = () => {
    console.log("after complete", userAnswers, "isFinished", isFinished);
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
            <Confetti width={750} height={500} gravity={0.02} />
            <div className="bg-dorange hover:bg-dorange text-white rounded-full w-96 h-96 p-4 text-center items-center flex flex-col">
              <div className="text-6xl mb-4 mt-20">Your score</div>
              <div className="text-6xl font-bold ">10</div>
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
