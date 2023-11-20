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
  onAnswersChange: (index: number, answerBody: {}) => void;
  answerData: AnswerData[];
  onRemove: () => void;
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
  onRemove
}) => {
  const initialAnswerData =
    answerData.length > index
      ? answerData[index]
      : { answerBody: "", isCorrect: false };

  const handleAnswerInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onAnswersChange(index, { answerBody: event.target.value });
  };

  const handleSwitchChange = () => {
    onAnswersChange(index, { isCorrect: !initialAnswerData.isCorrect });
  };

  return (
    <>
      <div className="flex items-center justify-between pt-1.5 pb-5 px-6 border-b">
        <CardTitle className="text-sm mt-2 font-normal">{option}</CardTitle>
        <Button
          className="text-red-400 border-red-400"
          variant={"outline"}
          type="button"
          onClick={onRemove}
        >
          {button}
        </Button>
      </div>
      <Label className="pl-6" htmlFor={inputId}>
        {answerTitle}
      </Label>
      <div className="px-6">
        <Input
          id={inputId}
          onChange={handleAnswerInputChange}
          autoComplete="off"
          required
        />
      </div>
      <div className="flex items-center gap-2 pl-6">
        <Switch
          id={switchId}
          checked={initialAnswerData.isCorrect}
          onClick={handleSwitchChange}
        />
        <span>{answerTxt}</span>
      </div>
    </>
  );
};

export default AnswerOption;
