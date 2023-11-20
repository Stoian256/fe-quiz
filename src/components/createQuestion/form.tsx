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
  questionBody: string;
  difficultyLevel: string;
  tags: string[];
  answers: AnswerData[];
}

const BE_URL = "";

const Form: React.FC = () => {
  const [questionBody, setQuestionBody] = useState<string>("");
  const [difficultyLevel, setDifficultyLevel] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [answers, setAnswers] = useState<AnswerData[]>([
    {
      answerBody: "",
      isCorrect: false
    }
  ]);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);

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

    return (
      questionBody.trim().length > 0 &&
      difficultyLevel !== "" &&
      tags.length > 0 &&
      answersCount >= minimumAnswers &&
      correctAnswersCount >= minimumCorrectAnswers
    );
  };

  const dataToSend = {
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
      const isFormValid = validateData();

      if (isFormValid) {
        await sendDataToBackend(dataToSend);
        resetForm();
        setShowSuccessToast(true);
      } else {
        throw new Error("Invalid form data");
      }
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
      setShowErrorToast(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <FormHeader onQuestionBodyChange={handleQuestionBodyChange} />
          <FormDifficultySelect
            onDifficultyChange={handleDifficultyLevelChange}
          />
          <FormTags onUpdateTags={updateTags} questionBody={questionBody} />
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
        {showSuccessToast && (
          <Toast
            type="success"
            message="Form submitted successfully!"
            onClose={() => setShowSuccessToast(false)}
          />
        )}

        {showErrorToast && (
          <Toast
            type="error"
            message="Failed to submit the form. Please try again."
            onClose={() => setShowErrorToast(false)}
          />
        )}
      </div>
    </>
  );
};

export default Form;
