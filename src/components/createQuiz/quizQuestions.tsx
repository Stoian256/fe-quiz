import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";

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
    <div className="grid w-full items-center gap-4 p-1.5">
      <CardTitle>Quiz Questions</CardTitle>
      <Button className="w-fit" type="button">
        Manage Questions
      </Button>
      {questionData.map((question, i) => (
        <Card key={i} className="p-5 flex items-start justify-between">
          <div className="flex flex-col gap-1">
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
    </div>
  );
};

export default QuizQuestions;
