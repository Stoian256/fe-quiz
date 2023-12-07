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
import { Question } from "@shadcn/utils/interfaces/typescript";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useQuizModalContext } from "@shadcn/context/quizModalContext";
import { useFilterAndPagination } from "@shadcn/context/filterAndPaginationContext";
import { useEffect } from "react";

const headerData = ["QUESTION TITLE", "DIFFICULTY LEVEL", "TAGS", "SELECT"];

const DisplayQuizModalTable = () => {
  const {
    selectedQuestions,
    setSelectedQuestionId,
    setSelectedQuestions,
    selectedQuestionsInModal,
    removeQuestionFromModal
  } = useQuizModalContext();
  const { questions } = useFilterAndPagination();
  const { data, setData } = useQuizModalContext();

  const handleRowClick: React.MouseEventHandler<HTMLTableRowElement> = (
    event
  ) => {
    const questionId = event.currentTarget.getAttribute("data-question-id");
    if (questionId) {
      setSelectedQuestionId(questionId);
    }
  };

  useEffect(() => {
    selectedQuestionsInModal.forEach((questionId) => {
      if (!selectedQuestions.includes(questionId)) {
        removeQuestionFromModal(questionId);
      }
    });
  }, [selectedQuestions, selectedQuestionsInModal, removeQuestionFromModal]);

  const handleCheckboxChange = (checked: CheckedState, question: Question) => {
    const updatedQuestions = checked
      ? [...data, question.id]
      : data.filter((id) => id !== question.id);
    setData(updatedQuestions);
    setSelectedQuestions(updatedQuestions);
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
                key={id}
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
                    className="appearance-none checked:bg-blue-600 checked:border-transparent checked:ring-2 checked:ring-blue-500 checked:text-blue-600 checked:checked:bg-blue-600 checked:checked:border-transparent checked:checked:ring-2 checked:checked:ring-blue-500 checked:checked:text-blue-600 h-5 w-5 rounded border-gray-300 cursor-pointer focus:outline-none"
                    checked={selectedQuestions.includes(eachQuestion.id)}
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
