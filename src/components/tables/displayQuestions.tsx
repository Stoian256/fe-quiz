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

const tableHeadData = [
  "QUESTION TITLE",
  "DIFFICULTY LEVEL",
  "TAGS",
  "USED IN QUIZZES",
  "CORECTNESS ACCURACY",
  "ACTIONS"
];

const DisplayQuestions = () => {
  const { questions } = useFilterAndPagination();

  return (
    <div className="pb-5 w-full">
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
            const { questionTitle, tags, difficulty } = eachQuestion;
            return (
              <TableRow key={index} className="h-[30px] text-left">
                <TableCell className="font-medium  w-[480px]">
                  {questionTitle.length > 60 ? (
                    <TooltipProvider delayDuration={200} key={index}>
                      <Tooltip>
                        <TooltipTrigger>
                          {`${questionTitle.slice(0, 60)}...`}
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="w-5/12 ml-10">
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
                  {tags.map((tag, index) => (
                    <Badge key={index} className="mr-1 mb-1">
                      {tag.tagTitle}
                    </Badge>
                  ))}
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
                    <Button
                      variant="outline"
                      className="border-black hover:bg-black hover:text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                      // onClick={(e) => handleDelete(e)}
                      value={index}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DisplayQuestions;
