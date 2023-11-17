import { useState } from "react";
import { Button } from "@shadcn/components/ui/button";
import { CardTitle } from "@shadcn/components/ui/card";
import { Input } from "@shadcn/components/ui/input";
import { Label } from "@shadcn/components/ui/label";
import { Switch } from "@shadcn/components/ui/switch";
import { AnswerData } from "@shadcn/utils/interfaces/AnswerData";

interface Props {
  index: number;
  option: string;
  button: string;
  answerTitle: string;
  answerTxt: string;
  inputId: string;
  switchId: string;
  onAnswersChange: (answers: AnswerData[]) => void;
  answerData: AnswerData[];
}

const AnswerOption: React.FC<Props> = ({
  index,
  option,
  button,
  answerTitle,
  answerTxt,
  inputId,
  switchId,
  onAnswersChange,
  answerData,
  addNewAnswer
}) => {
  const initialAnswerData = answerData.length > index ? answerData[index] : { answerBody: "", isCorrect: false };
  const [answerBody, setAnswerBody] = useState<string>(initialAnswerData.answerBody);
  const [isCorrect, setIsCorrect] = useState<boolean>(initialAnswerData.isCorrect);

  const handleAnswerInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAnswerBody = event.target.value;
    setAnswerBody(newAnswerBody);
    updateAnswers({ answerBody: newAnswerBody, isCorrect });
  };

  const handleSwitchChange = () => {
    setIsCorrect((prevIsCorrect) => !prevIsCorrect);
    updateAnswers({ answerBody, isCorrect: !isCorrect });
  };

  const updateAnswers = (newAnswer: AnswerData) => {
    const updatedAnswers = answerData.map((answer, i) => (i === index ? newAnswer : answer));
    onAnswersChange(updatedAnswers);
    addNewAnswer()
  };

  return (
    <>
      <div className="flex items-center justify-between pt-1.5 pb-5 px-6 border-b">
        <CardTitle className="text-sm mt-2 font-normal">{option}</CardTitle>
        <Button className="text-red-400 border-red-400" variant={"outline"}>
          {button}
        </Button>
      </div>
      <Label className="pl-6" htmlFor={inputId}>
        {answerTitle}
      </Label>
      <div className="px-6">
        <Input
          id={inputId}
          value={answerBody}
          onChange={handleAnswerInputChange}
          autoComplete="off"
        />
      </div>
      <div className="flex items-center gap-2 pl-6">
        <Switch
          id={switchId}
          checked={isCorrect}
          onClick={handleSwitchChange}
        />
        <span>{answerTxt}</span>
      </div>
    </>
  );
};

export default AnswerOption;
