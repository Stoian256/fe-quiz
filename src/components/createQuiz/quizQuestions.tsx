import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Card, CardTitle } from "../ui/card";
import Pagination from "../filters/pagination";
import QuizModal from "./quizModal";
import { useQuizModalContext } from "@shadcn/context/quizModalContext";
import { useAuth } from "@shadcn/context/authContext";
import { useToast } from "@shadcn/context/ToastContext";
import { AnswerData } from "@shadcn/utils/interfaces/AnswerData";
import { Tag } from "@shadcn/utils/interfaces/typescriptGeneral";

interface QuizProps {
  handleSetQuestions: (selectedQuestionId: string[]) => void;
  reset: boolean;
}

interface QuizQuestionData {
  id: string;
  questionTitle: string;
  questionBody: string;
  difficulty: string;
  tags: Tag[];
  answers: AnswerData[];
}

const QuizQuestions: React.FC<QuizProps> = ({ handleSetQuestions, reset }) => {
  const { selectedQuestions } = useQuizModalContext();
  const [questions, setQuestions] = useState<QuizQuestionData[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
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

    if (direction === "left" && pageNumber > 1) {
      newPageNumber = pageNumber - 1;
    }

    setPageNumber(newPageNumber);
  };

  const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "Difficult":
        return "bg-red-500";
      default:
        return "bg-gray-200";
    }
  };

  const BE_URL = import.meta.env.VITE_API_SERVER_URL;
  const { accessToken } = useAuth();

  const { showToast } = useToast();

  useEffect(() => {
    if (selectedQuestions.length > 0) {
      const fetchQuestions = async () => {
        try {
          const response = await fetch(`${BE_URL}/questions/get-by-ids`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify(selectedQuestions)
          });

          if (!response.ok) {
            throw new Error("Failed to fetch questions");
          }

          const fetchedQuestions = await response.json();
          setQuestions(fetchedQuestions);
          showToast("success", "Questions fetched with success!");
        } catch (error) {
          console.error("Error fetching questions:", error);
          showToast("error", "Failed to fetch questions");
        }
      };

      fetchQuestions();
    }
  }, [selectedQuestions]);

  useEffect(() => {
    if (reset) {
      setQuestions([]);
    }
  }, [reset]);

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
            className="p-5 flex items-start justify-between border-b-0"
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
              className={`${getDifficultyStyle(
                question.difficulty
              )} text-xs font-bold text-white rounded-xl py-1 px-1.5`}
            >
              {question.difficulty}
            </div>
          </Card>
        ))
      )}
      <Pagination
        pageNumber={pageNumber}
        onPageNumberChange={(page) => setPageNumber(page)}
        handleArrowClick={(direction: string) => handleArrowClick(direction)}
        itemsPerPage={itemsPerPage}
        handleItemsPerPage={handleItemsPerPage}
        numbersOfPages={numbersOfPages}
      />
    </div>
  );
};

export default QuizQuestions;
