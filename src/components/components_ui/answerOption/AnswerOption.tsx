import { Button } from "@shadcn/components/ui/button";
import { CardTitle } from "@shadcn/components/ui/card";
import { Input } from "@shadcn/components/ui/input";
import { Label } from "@shadcn/components/ui/label";
import { Switch } from "@shadcn/components/ui/switch";

interface Props {
  option: string;
  button: string;
  answerTitle: string;
  answerTxt: string;
  inputId: string;
  switchId: string;
}

const AnswerOption = ({option, button, answerTitle, answerTxt, inputId, switchId}: Props) => {
  return (
    <>
      <div className="flex items-center justify-between pt-1.5 pb-5 px-6 border-b">
        <CardTitle className="text-sm mt-2 font-normal">{ option }</CardTitle>
        <Button className="text-red-400 border-red-400" variant={"outline"}>
          {button}
        </Button>
      </div>
      <Label className="pl-6" htmlFor="answer1">
        {answerTitle}
      </Label>
      <div className="px-6">
        <Input id={inputId} />
      </div>
      <div className="flex items-center gap-2 pl-6">
        <Switch id={switchId} />
        <span>{ answerTxt }</span>
      </div>
    </>
  );
};

export default AnswerOption;
