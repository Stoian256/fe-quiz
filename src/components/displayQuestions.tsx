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
// import questionsData from "../data/questionsData.json";
import Pagination from "./displayQuestions/pagination";
import { getQuestions } from "@shadcn/services/questions.service";
import { useAuth } from "@shadcn/context/authContext";
import { Question } from "@shadcn/utils/interfaces/typescriptGeneral";

const tableHeadData = [
  "QUESTION TITLE",
  "DIFFICULTY LEVEL",
  "TAGS",
  "USED IN QUIZZES",
  "CORECTNESS ACCURACY",
  "ACTIONS"
];

// interface Question {
//   question: string;
//   difficultyLevel: string;
//   tags: string[];
//   usedInQuizzes: number;
//   correctnessAccuracy: number;
// }
type DisplayQuestionsProps = {
  filters: Filters;
};

const DisplayQuestions = ({ filters }: DisplayQuestionsProps) => {
  const { accessToken } = useAuth();
  // const [response, setResponse] = useState<any>(null);
  // const [data, setData] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]); // Initialize state with an empty array
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [pageNumber, setPageNumber] = useState<number>(1);
  
  

  useEffect(() => {
    async function fetchData() {
      try {
        if (accessToken) {
          const data = await getQuestions(accessToken);
          // setData(data)
          // setResponse(fetchData)
          setItemsPerPage(data.pageable.pageSize)
          setPageNumber(data.pageable.pageNumber)
          setQuestions(data.content);
          console.log("Fetched data:", data);
          // console.log("Fetched questions content :", fetchedData.content);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Now, questions state is available outside the useEffect
            // setQuestions(data.content);

  console.log("Questions outside useEffect:", questions);
  // console.log("Data outside useEffect:", data);
  console.log("items per page useEffect:", itemsPerPage);
  const [numbersOfPages, setNumbersOfPages] = useState(
    Math.ceil(questions.length / Number(itemsPerPage)) // calculate the numbers of page based on data array length
    );
    console.log("numberOfPages:", numbersOfPages);
    console.log("page number:", pageNumber);




  // if (data){
  //   setQuestions(data.content);
  // }
  // const {} = response
  // const [questions, setQuestions] = useState<Question[]>(questionsData);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);
  // const [numbersOfPages, setNumbersOfPages] = useState(
  //   Math.ceil(questionsData.length / Number(itemsPerPage)) // calculate the numbers of page based on data array length
  // );

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
              questionTitle,
              tags,
              difficulty
                          } = eachQuestion;
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
                <TableCell>0</TableCell>
                <TableCell>
                  0%
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
      {/* <Pagination
        pageNumber={pageNumber}
        onPageNumberChange={(page) => setPageNumber(page)}
        handleArrowClick={handleArrowClick}
        itemsPerPage={itemsPerPage}
        handleItemsPerPage={handleItemsPerPage}
        numbersOfPages={numbersOfPages}
      /> */}
    </div>
  );
};

export default DisplayQuestions;
