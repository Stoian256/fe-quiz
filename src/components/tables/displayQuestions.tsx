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
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { useFilterAndPagination } from "@shadcn/context/filterAndPaginationContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from "../ui/dialog";
import { useAuth } from "@shadcn/context/authContext";
import { useToast } from "@shadcn/context/ToastContext";
import { Link } from "react-router-dom";

const tableHeadData = [
  "QUESTION TITLE",
  "DIFFICULTY LEVEL",
  "TAGS",
  "USED IN QUIZZES",
  "CORRECTNESS ACCURACY",
  "ACTIONS"
];

const DisplayQuestions = () => {
  const { questions, setQuestions } = useFilterAndPagination();
  const BE_URL = import.meta.env.VITE_API_SERVER_URL;
  const { accessToken } = useAuth();

  const { showToast } = useToast();

  const removeQuestion = async (questionIndex: string) => {
    console.log(questionIndex);
    try {
      const response = await fetch(
        `${BE_URL}questions/delete/${questionIndex}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove question");
      }
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== questionIndex)
      );
      showToast("success", "Question removed successfully!");
    } catch (error) {
      console.error("Error removing question:", error);
      showToast("error", "Failed to remove the question. Please try again.");
    }
  };

  return (
    <div className="pb-5 w-full">
      {questions.length === 0 ? (
        <p className="ml-5 mt-10">
          No data matches your search! Try adjusting your filters or expanding
          your search criteria.
        </p>
      ) : (
        <Table>
          <TableHeader className="bg-gray-200 text-black border-b-2 border-black">
            <TableRow>
              {tableHeadData.map((head, index) => (
                <TableHead key={index} className="text-black">
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((eachQuestion, index) => {
              const { questionTitle, tags, difficulty, id } = eachQuestion;
              return (
                <TableRow key={index} className="h-[30px] text-left">
                  <TableCell className="font-medium  w-[480px]">
                    {questionTitle.length > 60 ? (
                      <TooltipProvider delayDuration={200} key={index}>
                        <Tooltip>
                          <TooltipTrigger>
                            {`${questionTitle.slice(0, 60)}...`}
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="w-5/12 ml-10"
                          >
                            {questionTitle}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      questionTitle
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        difficulty === "EASY"
                          ? "bg-green-600"
                          : difficulty === "MEDIUM"
                          ? "bg-yellow-500"
                          : "bg-red-600"
                      }
                    >
                      {difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {tags.length < 3
                      ? tags.map((tag, index) => (
                          <Badge key={index} className="mr-1 mb-1">
                            {tag.tagTitle}
                          </Badge>
                        ))
                      : tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} className="mr-1 mb-1">
                            {tag.tagTitle}
                          </Badge>
                        ))}
                    {tags.length > 3 && (
                      <TooltipProvider delayDuration={200} key={index}>
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="text-xs pl-2">{`see +${
                              tags.length - 2
                            } more ${
                              tags.length - 2 === 1 ? "tag" : "tags"
                            }`}</span>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            {tags.slice(2).map((tagss, index) => (
                              <Badge key={index} className="mr-1 mb-1">
                                {tagss.tagTitle}
                              </Badge>
                            ))}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>
                    10%
                    <Progress
                      value={10}
                      className="h-1 w-6/12 ml-2 mb-0.5 inline-block"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Link to={`/admin/questions/edit/${id}`}>
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
                            // onClick={(e) => handleDelete(e)}
                            value={index}
                          >
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <p className="mt-4 text-xl">
                            Are you sure you want to delete this question?
                          </p>
                          <p className="text-m">
                            This item will be deleted immediately. You can't
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
                              onClick={() => removeQuestion(id)}
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
      )}
    </div>
  );
};

export default DisplayQuestions;
