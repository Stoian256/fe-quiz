import { useState } from "react";
import { Button } from "@shadcn/components/ui/button";
import { Card, CardContent, CardTitle } from "@shadcn/components/ui/card";
import AnswerOption from "./answerOption";
import { AnswerData } from "@shadcn/utils/interfaces/AnswerData";
interface AnswersComponentProps {
  onAnswersChange: (answers: AnswerData[]) => void;
  answerData: AnswerData[];
}



const FormAnswers: React.FC<AnswersComponentProps> = ({
  onAnswersChange,
  answerData
}) => {

  const [answersInfo, setAnswersInfo] = useState<object[]>([
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
  ]);

  const addAnswer = () => {
    const newAnswer = {
      option: `Option ${answersInfo.length + 1}`,
      button: 'Remove',
      answerTitle: 'Answer Title ',
      answerTxt: 'Is this Answer Correct?',
      inputId: `answer-input-${answersInfo.length + 1}`,
      switchId: `answer-switch-${answersInfo.length + 1}`,
    };

    setAnswersInfo([...answersInfo, newAnswer]);
  };

  const removeAnswer = (indexToRemove: number) => {
    const updatedAnswers = answersInfo.filter((_, index) => index !== indexToRemove);
    setAnswersInfo(updatedAnswers);
    const updatedAnswerData = answerData.filter((_, index) => index !== indexToRemove);
    onAnswersChange(updatedAnswerData);
  };

  const handleAnswerChange = (index: number, newData: Partial<AnswerData>) => {
    const updatedAnswers = [...answerData];
    if (index >= updatedAnswers.length) {
      updatedAnswers.push({ answerBody: '', isCorrect: false });
    }
    updatedAnswers[index] = { ...updatedAnswers[index], ...newData };
    onAnswersChange(updatedAnswers);
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
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormAnswers;
