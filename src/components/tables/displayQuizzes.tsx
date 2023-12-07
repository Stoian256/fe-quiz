import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from "../ui/dialog";
import { Link } from "react-router-dom";
import { useAuth } from "@shadcn/context/authContext";
import { useToast } from "@shadcn/context/ToastContext";
import { useFilterAndPaginationQuizz } from "@shadcn/context/filterAndPaginationContextQuizz";
import {
  Difficulty,
  difficultyMap
} from "@shadcn/utils/functions/mapDifficultyColors";

const tableHeadData = [
  "QUIZZ TITLE",
  "DIFFICULTY LEVEL",
  "TAGS",
  "NUMBER OF QUESTIONS",
  "TIME LIMIT",
  "ACTIONS"
];

const QuizzesTable = () => {
  const BE_URL = import.meta.env.VITE_API_SERVER_URL;
  const { accessToken } = useAuth();
  const { quizzes, setQuizzes } = useFilterAndPaginationQuizz();

  const { showToast } = useToast();

  const removeQuiz = async (quizIndex: string) => {
    try {
      const response = await fetch(`${BE_URL}quiz/delete/${quizIndex}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to remove question");
      }
      setQuizzes((prevQuizes) =>
        prevQuizes.filter((quiz) => quiz.id !== quizIndex)
      );
      showToast("success", "Quiz removed successfully!");
    } catch (error) {
      console.error("Error removing quiz:", error);
      showToast("error", "Failed to remove the quiz.");
    }
  };

  return (
    <div className="p-4 pt-0">
      <div className="pb-5 w-full">
        <Table>
          <TableHeader className="bg-gray-200 text-black border-b-2 border-black">
            <TableRow>
              {tableHeadData.map((headerText, index) => (
                <TableHead key={index} className="text-black">
                  {headerText}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizzes.map((eachQuizz) => {
              const {
                difficultyLevel,
                id,
                numberOfQuestions,
                quizTags,
                quizTitle,
                timeLimitMinutes
              } = eachQuizz;

              const formattedDifficulty =
                difficultyLevel.charAt(0).toUpperCase() +
                difficultyLevel.slice(1).toLowerCase();

              return (
                <TableRow key={id} className="h-[30px] text-left">
                  <TableCell className="font-medium  w-[480px]">
                    {quizTitle.length > 60 ? (
                      <TooltipProvider delayDuration={200} key={id}>
                        <Tooltip>
                          <TooltipTrigger>
                            {`${quizTitle.slice(0, 60)}...`}
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="w-5/12 ml-10"
                          >
                            {quizTitle}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      quizTitle
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={difficultyMap[formattedDifficulty as Difficulty]}
                    >
                      {formattedDifficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {quizTags.length < 3
                      ? quizTags.map((tag, index) => (
                          <Badge key={index} className="mr-1 mb-1">
                            {tag.tagTitle}
                          </Badge>
                        ))
                      : quizTags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} className="mr-1 mb-1">
                            {tag.tagTitle}
                          </Badge>
                        ))}
                    {quizTags.length > 3 && (
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="text-xs pl-2">{`see +${
                              quizTags.length - 2
                            } more ${
                              quizTags.length - 2 === 1 ? "tag" : "tags"
                            }`}</span>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            {quizTags.slice(2).map((tagss, index) => (
                              <Badge key={index} className="mr-1 mb-1">
                                {tagss.tagTitle}
                              </Badge>
                            ))}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </TableCell>
                  <TableCell>{numberOfQuestions}</TableCell>
                  <TableCell>{timeLimitMinutes} minutes</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Link to={`/admin/quizes/edit/${id}`}>
                        <Button
                          variant="outline"
                          className="border-black hover:bg-black hover:text-white"
                        >
                          Edit
                        </Button>
                      </Link>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                            value={id}
                          >
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <p className="mt-4 text-xl">
                            Are you sure you want to delete this quizz?
                          </p>
                          <p className="text-m">
                            This item will be deleted immediatlely. You can't
                            undo this action.
                          </p>
                          <DialogFooter className="flex gap-2 items-ce">
                            <DialogClose asChild>
                              <Button
                                variant="secondary"
                                className="border-none"
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <DialogClose
                              className="bg-red-600 text-white hover:bg-red-900 p-2 rounded-md px-3"
                              onClick={() => removeQuiz(id)}
                            >
                              Yes, delete it
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QuizzesTable;
