import { Quizz } from "@shadcn/utils/interfaces/Quizz";
import { SetStateAction, useEffect, useState } from "react";
import FilterAll from "../filters/filterAll";
import Pagination from "../filters/pagination";
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
import quizzesData from "../../data/quizzesData.json";
import { Link } from "react-router-dom";

const tableHeadData = [
  "QUIZZ TITLE",
  "DIFFICULTY LEVEL",
  "TAGS",
  "NUMBER OF QUESTIONS",
  "TIME LIMIT",
  "ACTIONS"
];

const QuizzesTable = () => {
  const [quizzes, setQuizzes] = useState<Quizz[]>(quizzesData);

  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [numbersOfPages, setNumbersOfPages] = useState(
    Math.ceil(quizzes.length / Number(itemsPerPage)) // calculate the numbers of page based on data array length
  );

  useEffect(() => {
    setNumbersOfPages(Math.ceil(quizzes.length / itemsPerPage));
    // setQuestions(data);
    const lastIndex = pageNumber * itemsPerPage;
    const startingIndex = lastIndex - itemsPerPage;

    // setQuestions((prevQuestions) =>
    //   prevQuestions.slice(startingIndex, lastIndex)
    // );
  }, [numbersOfPages, pageNumber, itemsPerPage]); // add filters here

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

  const handleDelete = () => {
    console.log("delete");
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
            {quizzes.map((eachQuizz, index) => {
              const {
                quizz,
                difficultyLevel,
                tags,
                numberOfQuestions,
                timeLimit,
                id
              } = eachQuizz;
              return (
                <TableRow key={index} className="h-[30px] text-left">
                  <TableCell className="font-medium  w-[480px]">
                    {quizz.length > 60 ? (
                      <TooltipProvider delayDuration={200} key={index}>
                        <Tooltip>
                          <TooltipTrigger>
                            {`${quizz.slice(0, 60)}...`}
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="w-5/12 ml-10"
                          >
                            {quizz}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      quizz
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
                  <TableCell>{numberOfQuestions}</TableCell>
                  <TableCell>{timeLimit} minutes</TableCell>
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
                            value={index}
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
                              onClick={handleDelete}
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
