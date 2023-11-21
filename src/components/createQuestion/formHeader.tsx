import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { CardTitle } from "@shadcn/components/ui/card";
import { Textarea } from "@shadcn/components/ui/textarea";
import { Input } from "../ui/input";

interface QuestionBodyProps {
  onQuestionTitleChange: (text: string) => void;
  onQuestionBodyChange: (text: string) => void;
}

const FormHeader: React.FC<QuestionBodyProps> = ({
  onQuestionBodyChange,
  onQuestionTitleChange
}) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [bodyError, setBodyError] = useState<string>("");

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleQuestionTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputText = event.target.value;
    const capitalizedText = capitalizeFirstLetter(inputText);
    setTitle(capitalizedText);
    onQuestionTitleChange(capitalizedText);
    setTitleError("");
  };

  const handleQuestionBodyChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputText = event.target.value;
    const capitalizedText = capitalizeFirstLetter(inputText);
    setBody(capitalizedText);
    onQuestionBodyChange(capitalizedText);
    setBodyError("");
  };

  const handleQuestionTitleBlur = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    const inputText = event.target.value;

    if (inputText.length < 20 || inputText.length > 255) {
      setTitleError("Title should be between 20 and 255 characters");
    } else {
      onQuestionTitleChange(inputText);
    }
  };

  const handleQuestionBodyBlur = (
    event: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    const inputText = event.target.value;

    if (inputText.length < 20) {
      setBodyError("Body should be at least 20 characters long");
    } else {
      onQuestionBodyChange(inputText);
    }
  };

  const hasMarkdown = body !== "" && body !== body.trim();
  

  return (
    <div className="flex flex-col space-y-2">
      <CardTitle className="text-sm mt-2">Question Title</CardTitle>
      <Input
        type="text"
        id="title"
        placeholder="Your Question Title Here..."
        value={title}
        onChange={handleQuestionTitleChange}
        onBlur={handleQuestionTitleBlur}
        autoComplete="off"
        required
      />
      {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
      <CardTitle className="text-sm">Question Body</CardTitle>
      <Textarea
        id="body"
        placeholder="Your Question Body Here..."
        value={body}
        onChange={handleQuestionBodyChange}
        onBlur={handleQuestionBodyBlur}
        autoComplete="off"
      />
      {bodyError && <p className="text-red-500 text-sm">{bodyError}</p>}
      {hasMarkdown && (
        <div className="w-full">
          <CardTitle className="text-sm">Preview</CardTitle>
          <div className="border p-2 h-40 overflow-y-auto">
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormHeader;
