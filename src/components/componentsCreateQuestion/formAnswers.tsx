import { Button } from "@shadcn/components/ui/button";
import { Card, CardContent, CardTitle } from "@shadcn/components/ui/card";
import AnswerOption from "./answerOption";

const answerData = [
  {
    option: "Option 1",
    button: "Remove",
    answerTitle: "Answer Title",
    answerTxt: "Is Answer Correct?",
    inputId: "answer1",
    switchId: "switch1"
  },
  {
    option: "Option 2",
    button: "Remove",
    answerTitle: "Answer Title",
    answerTxt: "Is Answer Correct?",
    inputId: "answer2",
    switchId: "switch2"
  },
  {
    option: "Option 3",
    button: "Remove",
    answerTitle: "Answer Title",
    answerTxt: "Is Answer Correct?",
    inputId: "answer3",
    switchId: "switch3"
  }
];

interface AnswersComponentProps {
  onAnswersChange: (answers: string[]) => void;
}

const FormAnswers: React.FC<AnswersComponentProps> = ({ onAnswersChange }) => {
  return (
    <div className="flex flex-col space-y-3">
      <CardTitle className="text-sm mt-2">Answers</CardTitle>
      <Button className="w-fit">Add new Answer Option</Button>
      <Card>
        <CardContent className="p-0 py-6">
          <div className="flex flex-col space-y-4">
            {answerData.map((answer, i) => (
              <AnswerOption
                key={i}
                option={answer.option}
                button={answer.button}
                answerTitle={answer.answerTitle}
                answerTxt={answer.answerTxt}
                inputId={answer.inputId}
                switchId={answer.switchId}
                onAnswersChange={onAnswersChange}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormAnswers;
