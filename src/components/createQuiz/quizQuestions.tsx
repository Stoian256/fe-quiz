import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";
import Pagination from "../displayQuestions/pagination";

const questionData = [
  {
    questionTitle: "What does the S in SOLID stand for?",
    questionBody: "Some placeholder content",
    difficulty: "Easy",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    questionTitle: "What does the S in SOLID stand for?",
    questionBody: "Some placeholder content",
    difficulty: "Medium",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    questionTitle: "What does the S in SOLID stand for?",
    questionBody: "Some placeholder content",
    difficulty: "Difficult",
    tags: ["HTML", "CSS", "JavaScript"]
  }
];

const QuizQuestions: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleItemsPerPage = (e: React.SetStateAction<string>) => {
    setItemsPerPage(Number(e));
    setPageNumber(1);
  };

  const numbersOfPages = Math.ceil(questionData.length / itemsPerPage);

  const startIndex = (pageNumber - 1) * itemsPerPage;
  const slicedQuestions = questionData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleArrowClick = (direction: string) => {
    let newPageNumber = pageNumber;
  
    if (direction === 'left' && pageNumber > 1) {
      newPageNumber = pageNumber - 1;
    } else if (direction === 'right' && pageNumber < numbersOfPages) {
      newPageNumber = pageNumber + 1;
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

  return (
    <div className="grid w-full items-center p-1.5">
      <CardTitle className="text-base mb-4">Quiz Questions</CardTitle>
      <Button className="w-fit mb-4" type="button">
        Manage Questions
      </Button>
      {slicedQuestions.map((question, i) => (
        <Card
          key={i}
          className="p-5 flex items-start justify-between border-b-0"
        >
          <div className="flex flex-col">
            <h2 className="font-medium">{question.questionTitle}</h2>
            <p>{question.questionBody}</p>
            <div className="flex items-center gap-1.5">
              {question.tags.map((tag, i) => (
                <Badge key={i}>{tag}</Badge>
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
      ))}
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
