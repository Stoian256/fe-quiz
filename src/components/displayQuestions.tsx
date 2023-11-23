import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./ui/tooltip";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { SetStateAction, useEffect, useState } from "react";
import { Filters } from "../utils/interfaces/Filters";
import questionsData from "../data/questionsData.json";
import Pagination from "./displayQuestions/pagination";

const tableHeadData = [
  "QUESTION TITLE",
  "DIFFICULTY LEVEL",
  "TAGS",
  "USED IN QUIZZES",
  "CORECTNESS ACCURACY",
  "ACTIONS"
];

interface Question {
  question: string;
  difficultyLevel: string;
  tags: string[];
  usedInQuizzes: number;
  correctnessAccuracy: number;
}
type DisplayQuestionsProps = {
  filters: Filters;
};

const DisplayQuestions = ({ filters }: DisplayQuestionsProps) => {
  const [questions, setQuestions] = useState<Question[]>(questionsData);
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [numbersOfPages, setNumbersOfPages] = useState(
    Math.ceil(questionsData.length / Number(itemsPerPage)) // calculate the numbers of page based on data array length
  );

  useEffect(() => {
    setNumbersOfPages(Math.ceil(questionsData.length / itemsPerPage));
    setQuestions(questionsData);
    const lastIndex = pageNumber * itemsPerPage;
    const startingIndex = lastIndex - itemsPerPage;

    setQuestions((prevQuestions) =>
      prevQuestions.slice(startingIndex, lastIndex)
    );
  }, [numbersOfPages, pageNumber, itemsPerPage, filters]);

  const handleArrowClick = (direction: string) => {
    if (direction === "left") {
      if (pageNumber === 1) {
        return;
      }
      setPageNumber((prevPage) => prevPage - 1);
    }
    if (direction === "right") {
      if (pageNumber === numbersOfPages) {
        return;
      }
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  const handleItemsPerPage = (e: SetStateAction<string>) => {
    setItemsPerPage(Number(e));
    setPageNumber(1);
  };

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
            const {
              question,
              tags,
              difficultyLevel,
              usedInQuizzes,
              correctnessAccuracy
            } = eachQuestion;
            return (
              <TableRow key={index} className="h-[30px] text-left">
                <TableCell className="font-medium  w-[480px]">
                  {question.length > 60 ? (
                    <TooltipProvider delayDuration={200} key={index}>
                      <Tooltip>
                        <TooltipTrigger>
                          {`${question.slice(0, 60)}...`}
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="w-5/12 ml-10">
                          {question}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    question
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      difficultyLevel === "Easy"
                        ? "bg-green-600"
                        : difficultyLevel === "Medium"
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }
                  >
                    {difficultyLevel}
                  </Badge>
                </TableCell>
                <TableCell>
                  {tags.map((tag, index) => (
                    <Badge key={index} className="mr-1 mb-1">
                      {tag}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell>{usedInQuizzes}</TableCell>
                <TableCell>
                  {correctnessAccuracy}%
                  <Progress
                    value={correctnessAccuracy}
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
      <Pagination
        pageNumber={pageNumber}
        onPageNumberChange={(page) => setPageNumber(page)}
        handleArrowClick={handleArrowClick}
        itemsPerPage={itemsPerPage}
        handleItemsPerPage={handleItemsPerPage}
        numbersOfPages={numbersOfPages}
      />
    </div>
  );
};

export default DisplayQuestions;
