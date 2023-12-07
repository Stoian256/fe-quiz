import { DialogClose } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { UserQuiz } from "@shadcn/utils/interfaces/typescript";
import { useQuizContext } from "@shadcn/context/quizContext";

type StartQuizProps = {
  id: string;
  quiz: UserQuiz;
};

const StartQuiz: React.FC<StartQuizProps> = ({ id, quiz }) => {
  const navigate = useNavigate();
  const { setIsFinished, setUserAnswers, setMinutes, setSeconds } =
    useQuizContext();
  const takeTheQuiz = (id: string) => {
    setIsFinished(false);
    setUserAnswers(Array(quiz.questions.length).fill([]));
    setMinutes(parseInt(quiz.timeLimit, 10));
    setSeconds(0);
    navigate(`/quizes/solve/${id}`);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger className="text-lg text-center bg-dorange text-dblue hover:bg-dyellow rounded-md p-2 shadow-md">
          <span>Start Quiz</span>
        </DialogTrigger>
        <DialogContent className="w-screen max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-lg mb-2">
              Quiz Info
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-col gap-2">
            <span>
              This quiz is a timed exercise, you have{" "}
              <strong className="font-bold">{quiz.timeLimit}</strong> minutes to
              solve it!
            </span>
            <span>
              Containes{" "}
              <span className="font-bold">{quiz.questions.length}</span>{" "}
              questions with multiple responses.
            </span>
            <span className="font-bold mt-2 ">Good luck!</span>
          </DialogDescription>
          <DialogFooter className="flex justify-between sm:justify-between">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-none flex-end  text-dblue bg-dorange hover:bg-dyellow shadow-md"
                onClick={() => takeTheQuiz(id)}
              >
                Start Quiz
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="outline" className="border-none">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartQuiz;
