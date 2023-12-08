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
import { useQuizContext } from "@shadcn/context/quizContext";
import { IdObject } from "@shadcn/utils/interfaces/typescript";
import { useAuth } from "@shadcn/context/authContext";
import { getQuizData } from "@shadcn/services/solveQuiz.service";

type StartQuizProps = {
  idQuiz: IdObject;
};

const StartQuiz: React.FC<StartQuizProps> = ({ idQuiz }) => {
  
  const navigate = useNavigate();
  const { quiz, setUserAnswers, setIsFinished,  setMinutes, setSeconds } =
    useQuizContext();
  const { accessToken } = useAuth();

  const { setQuizData } = useQuizContext();

  const handleStartQuiz = async () => {
    try {
      if (accessToken && idQuiz) {
        const data = await getQuizData(accessToken, idQuiz);
        setQuizData(data);
        console.log("Fetched quiz data START:", data);
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const takeTheQuiz = (attemptId: string) => {
    setIsFinished(false);
    setUserAnswers(Array(20).fill([]));
    setMinutes(quiz.timeLimit);
    setSeconds(0);

    //TODO delete after demo
    // navigate(`/quizes/solve/${attemptId}`, { state: quiz });
    navigate(`/quizes/solve/${attemptId}`, { state: { quiz, idQuiz } });
  };

  return (
    <div className="self-end">
      <Dialog>
        <DialogTrigger
          className="bg-yellow-400 text-white rounded-none hover:bg-yellow-500 p-2 px-10 shadow-lg self-end"
          // className="text-lg text-center bg-dorange text-dblue hover:bg-dyellow rounded-md p-2 shadow-md"
          onClick={handleStartQuiz}
        >
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
              This quiz is a timed exercise, you have limited{" "}
              <strong className="font-bold">{quiz.timeLimit}</strong> minutes to
              solve it!
            </span>
            <span>
              Containes{" "}
              <span className="font-bold">{quiz.questions.length}</span>{" "}
              questions with multiple responses.
            </span>
            <span className="font-bold mt-2 ">Good luck! </span>
          </DialogDescription>
          <DialogFooter className="flex justify-between sm:justify-between">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-none flex-end  text-dblue bg-dorange hover:bg-dyellow shadow-md"
                onClick={() => takeTheQuiz(quiz.attemptId)}
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
