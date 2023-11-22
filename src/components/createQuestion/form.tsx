import { useState } from "react";
import { z } from "zod";

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

  const formSchema = z.object({
    questionTitle: z
      .string()
      .min(1, { message: "Please provide a question title." })
      .max(255),
    questionBody: z.string(),
    difficultyLevel: z
      .string()
      .min(1, { message: "Please choose a difficulty level" }),
    tags: z.array(
      z
        .string()
        .min(1, { message: "There must be at least 1 tag" })
        .max(7, { message: "There can't be more than 7 tags" })
    ),
    answers: z.array(
      z.object({
        answerBody: z.string().min(1),
        isCorrect: z.boolean()
      })
    )
  });

  const validateData = () => {
    const minimumAnswers = 2;
    const minimumCorrectAnswers = 1;

    let zodErrors: string[] = [];
    try {
      formSchema.parse(dataToSend);
    } catch (error) {
      if (error instanceof z.ZodError) {
        zodErrors = error.errors.map((err) => err.message);
      }
    }

    const answersCount = answers.length;
    const correctAnswersCount = answers.filter(
      (answer) => answer.isCorrect
    ).length;

    const validationErrors = [];

    if (answersCount < minimumAnswers) {
      validationErrors.push("Please add at least two answers.");
    }

    if (correctAnswersCount < minimumCorrectAnswers) {
      validationErrors.push("Please mark at least one answer as correct.");
    }

    return {
      isValid: zodErrors.length === 0 && validationErrors.length === 0,
      errors: [...zodErrors, ...validationErrors]
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
      let errorMessage = "Failed to submit the form. Please try again.";

      if (error instanceof z.ZodError) {
        errorMessage = error.errors.map((err) => err.message).join("\n");
      } else if (error.response?.data?.[0]?.message) {
        errorMessage = error.response.data[0].message;
      } else if (error.message) {
        errorMessage = error.message;
      }

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
