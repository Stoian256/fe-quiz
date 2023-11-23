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
import QuizHeader from "../createQuiz/quizHeader";

interface QuestionFormData {
  questionTitle: string;
  questionBody: string;
  questionDifficultyLevel: string;
  questionTags: string[];
  answers: AnswerData[];
}

interface FormProps {
  formType: "question" | "quiz";
}

const BE_URL = "";

const Form: React.FC<FormProps> = ({ formType }) => {
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [questionBody, setQuestionBody] = useState<string>("");
  const [questionDifficultyLevel, setQuestionDifficultyLevel] =
    useState<string>("");
  const [questionTags, setQuestionTags] = useState<string[]>([]);
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

  const [quizTitle, setQuizTitle] = useState<string>("");
  const [quizDifficultyLevel, setQuizDifficultyLevel] = useState<string>("");
  const [quizTags, setQuizTags] = useState<string[]>([]);

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

  const handleQuizTitleChange = (text: string) => {
    setQuizTitle(text);
  };

  const handleQuestionDifficultyLevelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuestionDifficultyLevel(event.target.value);
  };

  const handleQuizDifficultyLevelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuizDifficultyLevel(event.target.value);
  };

  const updateQuestionTags = (newTags: string[]) => {
    setQuestionTags(newTags);
  };

  const updateQuizTags = (newTags: string[]) => {
    setQuizTags(newTags);
  };

  const handleAnswersChange = (answersArray: AnswerData[]) => {
    setAnswers(answersArray);
  };

  const formQuestionSchema = z.object({
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

  const formQuizSchema = z.object({
    quizTitle: z
      .string()
      .min(1, { message: "Please provide a quiz title." })
      .max(255),
    difficultyLevel: z
      .string()
      .min(1, { message: "Please choose a difficulty level" }),
    tags: z.array(
      z
        .string()
        .min(1, { message: "There must be at least 1 tag" })
        .max(7, { message: "There can't be more than 7 tags" })
    )
  });

  const validateQuestionData = () => {
    const minimumAnswers = 2;
    const minimumCorrectAnswers = 1;

    let zodErrors: string[] = [];
    try {
      formQuestionSchema.parse(questionDataToSend);
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

  const validateQuizData = () => {
    let zodErrors: string[] = [];

    try {
      formQuizSchema.parse(quizDataToSend);
    } catch (error) {
      if (error instanceof z.ZodError) {
        zodErrors = error.errors.map((err) => err.message);
      }
    }
    return {
      isValid: zodErrors.length === 0,
      errors: zodErrors
    };
  };

  console.log(validateQuizData);

  const questionDataToSend = {
    questionTitle,
    questionBody,
    questionDifficultyLevel,
    questionTags,
    answers
  };

  const quizDataToSend = {
    quizTitle,
    quizDifficultyLevel,
    quizTags
  };

  const sendDataToBackend = async (questionDataToSend: QuestionFormData) => {
    try {
      const response = await fetch(BE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(questionDataToSend)
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        if (response.status === 400) {
          errorMessage = "Bad request. Please check your data and try again.";
        } else if (response.status === 500) {
          errorMessage = "Internal server error. Please try again later.";
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      console.error("Failed request details:", {
        url: BE_URL,
        method: "POST",
        body: questionDataToSend,
        error
      });
      throw error;
    }
  };

  const resetForm = () => {
    setQuestionTitle("");
    setQuestionBody("");
    setQuestionDifficultyLevel("");
    setQuestionTags([]);
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
      const { isValid, errors } = validateQuestionData();

      if (!isValid) {
        const errorMessage = errors.join("\n");
        throw new Error(errorMessage);
      }

      await sendDataToBackend(questionDataToSend);
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
          {formType === "question" ? (
            <FormHeader
              onQuestionBodyChange={handleQuestionBodyChange}
              onQuestionTitleChange={handleQuestionTitleChange}
            />
          ) : (
            <QuizHeader onQuizTitleChange={handleQuizTitleChange} />
          )}
          {formType === "question" ? (
            <FormDifficultySelect
              onDifficultyChange={handleQuestionDifficultyLevelChange}
            />
          ) : (
            <FormDifficultySelect
              onDifficultyChange={handleQuizDifficultyLevelChange}
            />
          )}
          {formType === "question" ? (
            <FormTags
              onUpdateTags={updateQuestionTags}
              content={questionTitle}
            />
          ) : (
            <FormTags onUpdateTags={updateQuizTags} content={quizTitle} />
          )}
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
