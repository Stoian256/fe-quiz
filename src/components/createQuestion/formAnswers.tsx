import { Button } from "@shadcn/components/ui/button";
import { Card, CardContent, CardTitle } from "@shadcn/components/ui/card";
import AnswerOption from "./answerOption";
import { AnswerData } from "@shadcn/utils/interfaces/AnswerData";
interface AnswersComponentProps {
  onAnswersChange: (answers: AnswerData[]) => void;
  answerData: AnswerData[];
}

const answersInfo = [
  {
    option: "Option 1",
    button: "Remove",
    answerTitle: "Answer Title ",
    answerTxt: "Is this Answer Correct?",
    inputId: "answer-input-1",
    switchId: "answer-switch-1"
  },
  {
    option: "Option 2",
    button: "Remove",
    answerTitle: "Answer Title ",
    answerTxt: "Is this Answer Correct?",
    inputId: "answer-input-2",
    switchId: "answer-switch-2"
  }
];

const FormAnswers: React.FC<AnswersComponentProps> = ({
  onAnswersChange,
  answerData
}) => {
  const addNewAnswer = () => {
    const newAnswer = {
      answerBody: "",
      isCorrect: false
    };

    const updatedAnswers = [...answerData, newAnswer];
    onAnswersChange(updatedAnswers);
  };

  return (
    <div className="flex flex-col space-y-3">
      <CardTitle className="text-sm mt-2">Answers</CardTitle>
      <Button className="w-fit" type="button">
        Add new Answer Option
      </Button>
      <Card>
        <CardContent className="p-0 py-6">
          <div className="flex flex-col space-y-4">
            {answersInfo.map((answer, i) => (
              <AnswerOption
                key={i}
                index={i}
                option={answer.option}
                button={answer.button}
                answerTitle={answer.answerTitle}
                answerTxt={answer.answerTxt}
                inputId={answer.inputId}
                switchId={answer.switchId}
                onAnswersChange={onAnswersChange}
                answerData={answerData}
                addNewAnswer={addNewAnswer}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormAnswers;
