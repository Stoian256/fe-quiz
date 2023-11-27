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
import { useAuth } from "@shadcn/authContext";
import { Answer } from "@shadcn/utils/interfaces/Answer";
import QuizQuestions from "../createQuiz/quizQuestions";
import { QuestionData } from "@shadcn/utils/interfaces/QuestionData";

interface QuizData {
  quizTitle: string;
  quizDifficultyLevel: string;
  quizTags: string[];
  quizQuestions: QuestionData[];
}

type FormData = QuestionData | QuizData;

const defaultAnswerInfo = [
  {
    option: "Option 1",
    button: "Remove",
    answerTitle: "Answer Title ",
    answerTxt: "Is this Answer Correct?",
    inputId: "answer-input-1",
    switchId: "answer-switch-1"
  },
  {
    option: "Option 2",
    button: "Remove",
    answerTitle: "Answer Title ",
    answerTxt: "Is this Answer Correct?",
    inputId: "answer-input-2",
    switchId: "answer-switch-2"
  }
];

interface FormProps {
  formType: "question" | "quiz";
}

const Form: React.FC<FormProps> = ({ formType }) => {
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [questionBody, setQuestionBody] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [answers, setAnswers] = useState<AnswerData[]>([
    {
      answerContent: "",
      correctAnswer: false
    }
  ]);

  const [answersInfo, setAnswersInfo] = useState<Answer[]>(defaultAnswerInfo);

  const [showToast, setShowToast] = useState<{
    type: string;
    message: string;
  } | null>(null);

  const [quizTitle, setQuizTitle] = useState<string>("");
  const [quizDifficultyLevel, setQuizDifficultyLevel] = useState<string>("");
  const [quizTags, setQuizTags] = useState<string[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuestionData[]>([]);

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
    setDifficulty(event.target.value);
  };

  const handleQuizDifficultyLevelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuizDifficultyLevel(event.target.value);
  };

  const updateQuestionTags = (newTags: string[]) => {
    setTags(newTags);
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
    difficulty: z
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
        answerContent: z.string(),
        correctAnswer: z.boolean()
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

  const validateQuestionData = (
    questionDataToSend: QuestionData
  ): { isValid: boolean; errors: string[] } => {
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
      (answer) => answer.correctAnswer
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

  const validateQuizData = (
    quizDataToSend: QuizData
  ): { isValid: boolean; errors: string[] } => {
    const minimumQuestions = 1;

    const questionsCount = quizQuestions.length;

    const validationErrors = [];

    let zodErrors: string[] = [];
    try {
      formQuizSchema.parse(quizDataToSend);
    } catch (error) {
      if (error instanceof z.ZodError) {
        zodErrors = error.errors.map((err) => err.message);
      }
    }

    if (questionsCount < minimumQuestions) {
      validationErrors.push("Please add at least one question to the quiz.");
    }

    return {
      isValid: zodErrors.length === 0 && validationErrors.length === 0,
      errors: [...zodErrors, ...validationErrors]
    };
  };

  const questionDataToSend = {
    questionTitle,
    questionBody,
    difficulty,
    answers,
    tags
  };

  const quizDataToSend = {
    quizTitle,
    quizDifficultyLevel,
    quizTags,
    quizQuestions
  };

  const prepareFormData = (): any => {
    if (formType === "question") {
      return questionDataToSend;
    } else if (formType === "quiz") {
      return quizDataToSend;
    }
    return null;
  };

  const BE_URL = import.meta.env.VITE_API_SERVER_URL;
  const { accessToken } = useAuth();

  const sendDataToBackend = async (formData: FormData) => {
    try {
      let url = "";

      if ("questionTitle" in formData) {
        url = `${BE_URL}questions/create`;
      } else if ("quizTitle" in formData) {
        url = `${BE_URL}quizzes/create`;
      } else {
        throw new Error("Invalid form data");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(formData)
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
        method: "POST",
        body: formData,
        error
      });
      throw error;
    }
  };

  const resetForm = () => {
    setQuestionTitle("");
    setQuestionBody("");
    setDifficulty("");
    setTags([]);
    setAnswers([
      {
        answerContent: "",
        correctAnswer: false
      },
      {
        answerContent: "",
        correctAnswer: false
      }
    ]);
    setAnswersInfo(defaultAnswerInfo);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      const formData: FormData = prepareFormData();

      const { isValid, errors } =
        "questionTitle" in formData
          ? validateQuestionData(formData as QuestionData)
          : validateQuizData(formData as QuizData);

      if (!isValid) {
        const errorMessage = errors.join("\n");
        throw new Error(errorMessage);
      }

      await sendDataToBackend(formData);
      resetForm();
      displayToast(
        "success",
        `${
          formType.charAt(0).toUpperCase() + formType.slice(1)
        } submitted successfully!`
      );
    } catch (error: any) {
      let errorMessage = "Failed to submit the form. Please try again.";

      if (error instanceof z.ZodError) {
        errorMessage = error.errors.map((err) => err.message).join("\n");
      } else if (error.response?.data?.[0]?.message) {
        errorMessage = error.response.data[0].message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      console.error(error);
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
              title={questionTitle}
              body={questionBody}
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
              tags={tags}
            />
          ) : (
            <FormTags
              onUpdateTags={updateQuizTags}
              content={quizTitle}
              tags={tags}
            />
          )}
          {formType === "question" ? (
            <FormAnswers
              onAnswersChange={handleAnswersChange}
              answerData={answers}
              answersInfo={answersInfo}
              setAnswersInfo={setAnswersInfo}
            />
          ) : (
            <QuizQuestions
              onQuestionsChange={(question) => setQuizQuestions(question)}
            />
          )}
          <CardFooter>
            <Button type="submit">
              {formType === "question" ? "Create Question" : "Create Quiz"}
            </Button>
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
