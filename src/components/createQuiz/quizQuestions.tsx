import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Card, CardTitle } from "../ui/card";
import Pagination from "../filters/pagination";
import QuizModal from "./quizModal";
import { useQuizModalContext } from "@shadcn/context/quizModalContext";
import { useAuth } from "@shadcn/context/authContext";
import { useToast } from "@shadcn/context/ToastContext";
import { Button } from "../ui/button";
import { QuizQuestionData } from "@shadcn/utils/interfaces/QuizQuestionData";
import {
  Difficulty,
  difficultyMap
} from "@shadcn/utils/functions/mapDifficultyColors";

interface QuizProps {
  handleSetQuestions: (selectedQuestionId: string[]) => void;
  reset: boolean;
  apiQuestions: string[];
}

const QuizQuestions: React.FC<QuizProps> = ({
  handleSetQuestions,
  reset,
  apiQuestions
}) => {
  const { selectedQuestions, removeQuestion } = useQuizModalContext();
  const [questions, setQuestions] = useState<QuizQuestionData[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleItemsPerPage = (e: React.SetStateAction<string>) => {
    setItemsPerPage(Number(e));
    setPageNumber(1);
  };

  const numbersOfPages = Math.ceil(questions.length / itemsPerPage);

  const startIndex = pageNumber * itemsPerPage;
  const slicedQuestions = questions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleArrowClick = (direction: string) => {
    let newPageNumber = pageNumber;

    if (direction === "left" && pageNumber > 0) {
      newPageNumber = pageNumber - 1;
    }

    setPageNumber(newPageNumber);
  };

  const BE_URL = import.meta.env.VITE_API_SERVER_URL;
  const { accessToken } = useAuth();

  const { showToast } = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (apiQuestions.length > 0) {
          const apiQuestionsResponse = await fetch(
            `${BE_URL}/questions/get-by-ids`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
              },
              body: JSON.stringify(apiQuestions)
            }
          );

          if (!apiQuestionsResponse.ok) {
            throw new Error("Failed to fetch API questions");
          }

          const apiQuestionsData = await apiQuestionsResponse.json();
          setQuestions(apiQuestionsData);
        }

        if (selectedQuestions.length > 0) {
          const selectedQuestionsResponse = await fetch(
            `${BE_URL}/questions/get-by-ids`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
              },
              body: JSON.stringify(selectedQuestions)
            }
          );

          if (!selectedQuestionsResponse.ok) {
            throw new Error("Failed to fetch selected questions");
          }

          const selectedQuestionsData = await selectedQuestionsResponse.json();

          const mergedQuestions = [...questions, ...selectedQuestionsData];
          setQuestions(mergedQuestions);
        }

        showToast("success", "Questions fetched successfully!");
      } catch (error) {
        console.error("Error fetching questions:", error);
        showToast("error", "Failed to fetch questions");
      }
    };

    fetchQuestions();
  }, [selectedQuestions, apiQuestions]);

  useEffect(() => {
    if (reset) {
      setQuestions([]);
    }
  }, [reset]);

  const onRemove = (indexToRemove: string) => {
    removeQuestion(indexToRemove);
  };

  return (
    <div className="grid w-full items-center p-1.5">
      <CardTitle className="text-base mb-4">Quiz Questions</CardTitle>

      <div className=" items-left mb-2">
        <QuizModal handleSetQuestions={handleSetQuestions} />
      </div>
      {slicedQuestions.length < 1 ? (
        <p className="h-20 font-bold text-center">
          No questions found! Please add some questions
        </p>
      ) : (
        slicedQuestions.map((question) => (
          <Card
            key={question.id}
            className="p-5 flex items-start justify-between border-b-0 relative"
          >
            <div className="flex flex-col">
              <h2 className="font-medium">{question.questionTitle}</h2>
              <p>{question.questionBody}</p>
              <div className="flex items-center gap-1.5">
                {question.tags.map((tag) => (
                  <Badge key={tag.id}>{tag.tagTitle}</Badge>
                ))}
              </div>
            </div>
            <div
              className={`${
                difficultyMap[question.difficulty as Difficulty]
              } text-xs font-bold text-white rounded-xl py-1 px-1.5`}
            >
              {question.difficulty}
            </div>
            <Button
              className="text-red-400 absolute bottom-0 right-0"
              variant={"ghost"}
              type="button"
              onClick={() => onRemove(question.id)}
            >
              X
            </Button>
          </Card>
        ))
      )}
      <Pagination
        pageNumber={pageNumber}
        onPageNumberChange={(page) => setPageNumber(page)}
        handleArrowClick={(direction: string) => handleArrowClick(direction)}
        itemsPerPage={itemsPerPage}
        handleItemsPerPage={(e) => handleItemsPerPage(e)}
        numbersOfPages={numbersOfPages}
      />
    </div>
  );
};

export default QuizQuestions;
