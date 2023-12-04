import { Button } from "@shadcn/components/ui/button";
import { Card, CardContent, CardTitle } from "@shadcn/components/ui/card";
import AnswerOption from "./answerOption";
import { AnswerData } from "@shadcn/utils/interfaces/AnswerData";
import { Answer } from "@shadcn/utils/interfaces/Answer";

interface AnswersComponentProps {
  onAnswersChange: (answers: AnswerData[]) => void;
  answerData: AnswerData[];
  answersInfo: Answer[];
  onAnswerInfoChange: (newAnswerInfo: Answer[]) => void;
  reset: boolean;
  removeAnswer: (indexToRemove: number) => void;
}

const FormAnswers: React.FC<AnswersComponentProps> = ({
  onAnswersChange,
  answerData,
  answersInfo,
  onAnswerInfoChange,
  reset,
  removeAnswer
}) => {
  const addAnswer = () => {
    const newAnswer = {
      option: `Option ${answersInfo.length + 1}`,
      button: "Remove",
      answerTitle: "Answer Title ",
      answerTxt: "Is this Answer Correct?",
      inputId: `answer-input-${answersInfo.length + 1}`,
      switchId: `answer-switch-${answersInfo.length + 1}`
    };

    onAnswerInfoChange([...answersInfo, newAnswer]);
  };

  const handleAnswerChange = (index: number, newData: Partial<AnswerData>) => {
    const updatedAnswers = [...answerData];
    if (index >= updatedAnswers.length) {
      updatedAnswers.push({ answerContent: "", correctAnswer: false });
    }
    updatedAnswers[index] = { ...updatedAnswers[index], ...newData };
    onAnswersChange(updatedAnswers);

    const updatedAnswersInfo = [...answersInfo];
    updatedAnswersInfo[index] = { ...updatedAnswersInfo[index], ...newData };
    onAnswerInfoChange(updatedAnswersInfo);
  };

  return (
    <div className="flex flex-col space-y-3">
      <CardTitle className="text-sm mt-2">Answers</CardTitle>
      <Button className="w-fit" type="button" onClick={addAnswer}>
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
                onAnswersChange={handleAnswerChange}
                answerData={answerData}
                onRemove={() => removeAnswer(i)}
                reset={reset}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormAnswers;
