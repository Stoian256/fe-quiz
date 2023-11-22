import { useState } from "react";

import FormHeader from "./formHeader";
import FormDifficultySelect from "./formDifficultySelect";
import FormTags from "./formTags";
import FormAnswers from "./formAnswers";
import { CardFooter } from "@shadcn/components/ui/card";
import { Button } from "@shadcn/components/ui/button";
import { AnswerData } from "@shadcn/utils/interfaces/AnswerData";
import Toast from "./toast";

interface FormData {
  questionTitle: string;
  questionBody: string;
  difficultyLevel: string;
  tags: string[];
  answers: AnswerData[];
}

const BE_URL = "";

const Form: React.FC = () => {
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [questionBody, setQuestionBody] = useState<string>("");
  const [difficultyLevel, setDifficultyLevel] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [answers, setAnswers] = useState<AnswerData[]>([
    {
      answerBody: "",
      isCorrect: false
    }
  ]);
  const [showToast, setShowToast] = useState<{
    type: string;
    message: string;
  } | null>(null);

  const handleToastClose = () => {
    setShowToast(null);
  };

  const displayToast = (type: string, message: string) => {
    setShowToast({ type, message });
    setTimeout(() => {
      setShowToast(null);
    }, 3000);
  };

  const handleQuestionTitleChange = (text: string) => {
    setQuestionTitle(text);
  };

  const handleQuestionBodyChange = (text: string) => {
    setQuestionBody(text);
  };

  const handleDifficultyLevelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDifficultyLevel(event.target.value);
  };

  const updateTags = (newTags: string[]) => {
    setTags(newTags);
  };

  const handleAnswersChange = (answersArray: AnswerData[]) => {
    setAnswers(answersArray);
  };

  const validateData = () => {
    const minimumAnswers = 2;
    const minimumCorrectAnswers = 1;

    const answersCount = answers.length;
    const correctAnswersCount = answers.filter(
      (answer) => answer.isCorrect
    ).length;

    const validationErrors = [];

    if (questionTitle.length === 0) {
      validationErrors.push("Please provide a question title.");
    }

    if (difficultyLevel === "") {
      validationErrors.push("Please select a difficulty level.");
    }

    if (tags.length === 0) {
      validationErrors.push("Please add at least one tag.");
    }

    if (answersCount < minimumAnswers) {
      validationErrors.push("Please add at least two answers.");
    }

    if (correctAnswersCount < minimumCorrectAnswers) {
      validationErrors.push("Please mark at least one answer as correct.");
    }

    return {
      isValid: validationErrors.length === 0,
      errors: validationErrors
    };
  };

  const dataToSend = {
    questionTitle,
    questionBody,
    difficultyLevel,
    tags,
    answers
  };

  const sendDataToBackend = async (dataToSend: FormData) => {
    try {
      const response = await fetch(BE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  };

  const resetForm = () => {
    setQuestionTitle("");
    setQuestionBody("");
    setDifficultyLevel("");
    setTags([]);
    setAnswers([
      {
        answerBody: "",
        isCorrect: false
      },
      {
        answerBody: "",
        isCorrect: false
      }
    ]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      const { isValid, errors } = validateData();

      if (!isValid) {
        const errorMessage = errors.join("\n");
        throw new Error(errorMessage);
      }
      await sendDataToBackend(dataToSend);
      resetForm();
      displayToast("success", "Form submitted successfully!");
    } catch (error: any) {
      console.error("Error occurred while submitting the form:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to submit the form. Please try again.";
      displayToast("error", errorMessage);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <FormHeader
            onQuestionBodyChange={handleQuestionBodyChange}
            onQuestionTitleChange={handleQuestionTitleChange}
          />
          <FormDifficultySelect
            onDifficultyChange={handleDifficultyLevelChange}
          />
          <FormTags onUpdateTags={updateTags} questionTitle={questionTitle} />
          <FormAnswers
            onAnswersChange={handleAnswersChange}
            answerData={answers}
          />
          <CardFooter>
            <Button type="submit">Create Question</Button>
          </CardFooter>
        </div>
      </form>
      <div className="fixed bottom-4 right-4 z-50">
        {showToast && (
          <Toast
            type={showToast.type}
            message={showToast.message}
            onClose={handleToastClose}
          />
        )}
      </div>
    </>
  );
};

export default Form;
