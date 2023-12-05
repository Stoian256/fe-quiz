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
import { Checkbox } from "../ui/checkbox";
import { Question } from "@shadcn/utils/interfaces/typescriptGeneral";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useQuizModalContext } from "@shadcn/context/quizModalContext";
import { useFilterAndPagination } from "@shadcn/context/filterAndPaginationContext";

const headerData = ["QUESTION TITLE", "DIFFICULTY LEVEL", "TAGS", "SELECT"];

const DisplayQuizModalTable = () => {
  const { setSelectedQuestionId } = useQuizModalContext();
  const { questions } = useFilterAndPagination();
  const { data, setData  } = useQuizModalContext();

  const handleRowClick: React.MouseEventHandler<HTMLTableRowElement> = (
    event
  ) => {
    const questionId = event.currentTarget.getAttribute("data-question-id");
    if (questionId) {
      setSelectedQuestionId(questionId);
    }
  };

  const handleCheckboxChange = (checked: CheckedState, question: Question) => {
    const updatedQuestions = checked
      ? [...data, question.id]
      : data.filter((id) => id !== question.id);
    setData(updatedQuestions);
  };

  return (
    <div className="w-full ">
      <Table className="w-full">
        <TableHeader className="bg-gray-200 text-black border-b-2 border-black">
          <TableRow>
            {headerData.map((head, index) => (
              <TableHead key={index} className="text-black">
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((eachQuestion, index) => {
            const { id, questionTitle, tags, difficulty } = eachQuestion;
            return (
              <TableRow
                key={index}
                className="h-[10px] text-left hover:bg-green-100"
                onClick={handleRowClick}
                data-question-id={id}
              >
                <TableCell className="font-medium  w-[400px] p-2 ">
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
                <TableCell className="p-2">
                  <Badge
                    className={
                      difficulty.toLowerCase() === "easy"
                        ? "bg-green-600"
                        : difficulty.toLowerCase() === "medium"
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }
                  >
                    {difficulty}
                  </Badge>
                </TableCell>
                <TableCell className="p-2">
                  {tags.length > 1 ? (
                    <TooltipProvider delayDuration={200} key={index}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge key={index} className="mr-1 ">
                            {tags[0].tagTitle}
                          </Badge>
                          {`...`}
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          {tags.map((tag) => tag.tagTitle).join(", ")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <Badge key={index} className="mr-1 mb-1">
                      {tags[0].tagTitle}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="p-2">
                  <Checkbox
                    className="data-[state=checked]:bg-white data-[state=checked]:text-green-400 data-[state=checked]:font-bold data-[state=checked]:border-none"
                    checked={data.includes(eachQuestion.id)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked, eachQuestion)
                    }
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DisplayQuizModalTable;
