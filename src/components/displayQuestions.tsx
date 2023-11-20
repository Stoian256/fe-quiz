import {
  ChevronsRight,
  ChevronsLeft,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "./ui/select";

import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const tableHeadData = [
  "QUESTION TITLE",
  "DIFFICULTY LEVEL",
  "TAGS",
  "USED IN QUIZZES",
  "CORECTNESS ACCURACY",
  "ACTIONS"
];

const questionsData = [
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the R in REST stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Medium",
    tags: ["Coding 101"],
    usedInQuizzes: 14,
    correctnessAccuracy: 25
  },
  {
    question: "What does the L in SOLID stand for?",
    difficultyLevel: "Hard",
    tags: ["Coding 101", "Fundamentals", "React"],
    usedInQuizzes: 29,
    correctnessAccuracy: 100
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  },
  {
    question: "What does the S in SOLID stand for?",
    difficultyLevel: "Easy",
    tags: ["Coding 101", "Fundamentals"],
    usedInQuizzes: 17,
    correctnessAccuracy: 84
  }
];

interface Question {
  question: string;
  difficultyLevel: string;
  tags: string[];
  usedInQuizzes: number;
  correctnessAccuracy: number;
}

// const handleDelete = (e) => {
//   console.log(`Must delete question #${e.target.value}`);
// };

const DisplayQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>(questionsData);
  // const [filters, setFilters] = useState({}); // this are not used here - the filters are in the displayFilters component
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState("10"); // 10, 15, 20 // should be numbers!
  const [numbersOfPages, setNumbersOfPages] = useState<number>(
    Math.ceil(questionsData.length / Number(itemsPerPage)) // calculate the numbers of page based on data array length
  );

  // TODO: If you are on last page and INCREASE the Items per Page, redirect to last page or page 1

  useEffect(() => {
    setNumbersOfPages(Math.ceil(questionsData.length / Number(itemsPerPage)));
    setQuestions(questionsData);
    const lastIndex = pageNumber * Number(itemsPerPage);
    const startingIndex = lastIndex - Number(itemsPerPage);

    setQuestions((prevQuestions) =>
      prevQuestions.slice(startingIndex, lastIndex)
    );
  }, [numbersOfPages, pageNumber, itemsPerPage]); // to also add filters in the dependency array

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
  return (
    <div className="p-4">
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
              <TableRow key={index}>
                <TableCell className="font-medium">{question}</TableCell>
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
      <div className="flex items-center gap-2 mt-3">
        <ChevronsLeft
          onClick={() => setPageNumber(1)}
          className={
            pageNumber === 1 ? "invert cursor-not-allowed" : "cursor-pointe"
          }
        />
        <ChevronLeft
          onClick={() => handleArrowClick("left")}
          className={
            pageNumber === 1 ? "invert cursor-not-allowed" : "cursor-pointer"
          }
        />

        {/* add condition here for numbersOfPages max number */}
        {[...Array(numbersOfPages)].map((_page, index) => {
          // added _page because page is not used; could been only _ but page is more descriptive
          return (
            <Button
              variant="outline"
              className={
                pageNumber === index + 1
                  ? "bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
                  : ""
              }
              key={index}
              name={(index + 1).toString()}
              onClick={(e) => setPageNumber(Number(e.currentTarget.name))} // changed target to currentTarget to fix TS issue
            >
              {index + 1}
            </Button>
          );
        })}
        <ChevronRight
          onClick={() => handleArrowClick("right")}
          className={
            pageNumber === numbersOfPages
              ? "invert cursor-not-allowed"
              : "cursor-pointer"
          }
        />
        <ChevronsRight
          onClick={() => setPageNumber(numbersOfPages)}
          className={
            pageNumber === numbersOfPages
              ? "invert cursor-not-allowed"
              : "cursor-pointer"
          }
        />
        <p>Items per Page</p>
        <Select
          defaultValue="10"
          value={itemsPerPage}
          onValueChange={(e) => setItemsPerPage(e)}
        >
          <SelectTrigger className="w-[90px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Items</SelectLabel>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DisplayQuestions;
