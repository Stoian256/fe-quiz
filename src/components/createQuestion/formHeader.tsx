import { useState } from "react";
import FormRender from "./formRender";

interface QuestionBodyProps {
  onQuestionTitleChange: (text: string) => void;
  onQuestionBodyChange: (text: string) => void;
  title: string;
  body: string;
}

const FormHeader: React.FC<QuestionBodyProps> = ({
  onQuestionBodyChange,
  onQuestionTitleChange,
  title,
  body
}) => {
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
    onQuestionTitleChange(capitalizedText);
    setTitleError("");
  };

  const handleQuestionBodyChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputText = event.target.value;
    const capitalizedText = capitalizeFirstLetter(inputText);
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

  return (
    <FormRender
      title={title}
      body={body}
      titleError={titleError}
      bodyError={bodyError}
      handleQuestionTitleChange={handleQuestionTitleChange}
      handleQuestionBodyChange={handleQuestionBodyChange}
      handleQuestionTitleBlur={handleQuestionTitleBlur}
      handleQuestionBodyBlur={handleQuestionBodyBlur}
    />
  );
};

export default FormHeader;
