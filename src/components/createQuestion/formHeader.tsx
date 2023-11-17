import { CardTitle } from "@shadcn/components/ui/card";
import { Textarea } from "@shadcn/components/ui/textarea";
import { useState } from "react";

interface QuestionBodyProps {
  onQuestionBodyChange: (text: string) => void;
}

const FormHeader: React.FC<QuestionBodyProps> = ({ onQuestionBodyChange }) => {

  const [capitalizedText, setCapitalizedText] = useState<string>("");

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleQuestionBodyChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {

    const inputText = event.target.value;
    const capitalizedText = capitalizeFirstLetter(inputText);
    setCapitalizedText(capitalizedText)
    onQuestionBodyChange(capitalizedText);
  };

  const handleQuestionBodyBlur = (
    event: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    const inputText = event.target.value;

    const questionBodyRegex = /.{20,}$/;

    if (questionBodyRegex.test(inputText)) {
      onQuestionBodyChange(inputText);
    } else {
      alert("Invalid Question Body");
    }
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <CardTitle className="text-sm mt-2">Question Title</CardTitle>
      <Textarea
        id="title"
        placeholder="Your Question Title Here..."
        value={capitalizedText}
        onChange={handleQuestionBodyChange}
        onBlur={handleQuestionBodyBlur}
        autoComplete="off"
      />
    </div>
  );
};

export default FormHeader;
