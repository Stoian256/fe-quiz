import { useState } from "react";
import { CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";


interface QuizTitleProps {
  onQuizTitleChange: (text: string) => void;
}

const QuizHeader: React.FC<QuizTitleProps> = ({ onQuizTitleChange }) => {
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleQuizTitleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputText = event.target.value;
    const capitalizedText = capitalizeFirstLetter(inputText);
    setTitle(capitalizedText);
    onQuizTitleChange(capitalizedText);
    setTitleError("");
  };

  const handleQuizTitleBlur = (
    event: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    const inputText = event.target.value;

    if (inputText.length < 20 || inputText.length > 255) {
      setTitleError("Title should be between 20 and 255 characters");
    } else {
      onQuizTitleChange(inputText);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <CardTitle className="text-sm pt-2">Quiz Title</CardTitle>
      <Textarea
        id="quizTitle"
        name="quizTitle"
        value={title}
        placeholder="Enter quiz title..."
        onChange={handleQuizTitleChange}
        onBlur={handleQuizTitleBlur}
        autoCapitalize="on"
        autoComplete="off"
      />
      {titleError && title && <p className="text-sm text-red-500">{titleError}</p>}
    </div>
  )
}

export default QuizHeader;