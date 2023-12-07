import { useEffect, useState } from "react";
import { z } from "zod";

import { useAuth } from "../../context/authContext";
import QuizHeader from "./quizHeader";
import FormDifficultySelect from "../createQuestion/formDifficultySelect";
import FormTags from "../createQuestion/formTags";
import QuizQuestions from "./quizQuestions";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useToast } from "@shadcn/context/ToastContext";
import extractZodErrors from "@shadcn/utils/functions/zodErrors";
import FormTimer from "./formTimer";
import { useNavigate, useParams } from "react-router-dom";
import { useFilterAndPaginationQuizz } from "@shadcn/context/filterAndPaginationContextQuizz";
import { Tag } from "@shadcn/utils/interfaces/typescript";

interface QuizData {
  quizTitle: string;
  difficultyLevel: string;
  timeLimitMinutes: number;
  quizTags: string[];
  questions: string[];
}

const QuizForm: React.FC = () => {
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [difficultyLevel, setDifficultyLevel] = useState<string>("");
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(0);
  const [quizTags, setQuizTags] = useState<string[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [reset, setReset] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { showToast } = useToast();

  const handleQuizTitleChange = (text: string) => {
    setQuizTitle(text);
  };
  const handleQuizDifficultyLevelChange = (difficulty: string) => {
    setDifficultyLevel(difficulty);
  };
  const updateQuizTags = (newTags: string[]) => {
    setQuizTags(newTags);
  };

  const formQuizSchema = z.object({
    quizTitle: z
      .string()
      .min(1, { message: "Please provide a quiz title." })
      .max(255),
    difficultyLevel: z
      .string()
      .min(1, { message: "Please choose a difficulty level" }),
    timeLimitMinutes: z.number(),
    quizTags: z.array(
      z.string().min(1, { message: "There must be at least 1 tag" })
    ),
    questions: z.array(
      z.string().min(1, { message: "There must be at least 1 question" })
    )
  });

  const validateQuizData = (
    quizDataToSend: QuizData
  ): { isValid: boolean; errors: string[] } => {
    const minimumQuestions = 1;

    const questionsCount = questions.length;

    const validationErrors = [];

    let zodErrors: string[] = [];
    try {
      formQuizSchema.parse(quizDataToSend);
    } catch (error) {
      zodErrors = extractZodErrors(error);
    }

    if (questionsCount < minimumQuestions) {
      validationErrors.push("Please add at least one question to the quiz.");
    }

    return {
      isValid: zodErrors.length === 0 && validationErrors.length === 0,
      errors: [...zodErrors, ...validationErrors]
    };
  };

  const quizDataToSend = {
    quizTitle,
    difficultyLevel,
    timeLimitMinutes,
    quizTags,
    questions
  };

  const resetForm = () => {
    setQuizTitle("");
    setDifficultyLevel("");
    setTimeLimitMinutes(0);
    setQuizTags([]);
    setQuestions([]);
    setReset(true);
  };

  const BE_URL = import.meta.env.VITE_API_SERVER_URL;
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string | undefined }>();

  useEffect(() => {
    if (id) {
      const fetchQuizByID = async (quizID: string) => {
        try {
          const response = await fetch(`${BE_URL}quiz/${quizID}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          if (!response.ok) {
            throw new Error("Failed to fetch question data");
          }

          const quizData = await response.json();

          const {
            quizTitle,
            difficultyLevel,
            quizTags,
            questions,
            timeLimitMinutes
          } = quizData;

          const questionsIDs = questions.map((question: {id: string}) => question.id);

          const tagTitles = quizTags.map((tag: Tag) => tag.tagTitle);

          setQuizTitle(quizTitle);
          setDifficultyLevel(difficultyLevel);
          setQuizTags(tagTitles);
          setQuestions(questionsIDs);
          setTimeLimitMinutes(timeLimitMinutes);

          showToast("success", "Quiz data fetched successfully!");
          setIsEditing(true);
        } catch (error) {
          console.error("Error fetching question data:", error);
          showToast("error", "Failed to fetch question data.");
        }
      };
      fetchQuizByID(id);
    }
  }, [id]);

  const { updateQuizes } = useFilterAndPaginationQuizz();

  const sendDataToBackend = async (quizDataToSend: QuizData) => {
    try {
      let url = `${BE_URL}quiz/create`;
      let method = "POST";

      if (isEditing) {
        url = `${BE_URL}quiz/update/${id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(quizDataToSend)
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

      const successMessage = isEditing
        ? "Quiz updated successfully!"
        : "Quiz submitted successfully!";
      showToast("success", successMessage);
      resetForm();

      await updateQuizes();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      const errorMessage = isEditing
        ? "Failed to update the quiz."
        : "Failed to submit the form.";
      showToast("error", errorMessage);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      const { isValid, errors } = validateQuizData(quizDataToSend);

      if (!isValid) {
        const errorMessage = errors.join("\n");
        throw new Error(errorMessage);
      }

      await sendDataToBackend(quizDataToSend);
      showToast("success", "Quiz submitted successfully!");
      resetForm();
      navigate("/admin/quizes");
    } catch (error: any) {
      let errorMessage = "Failed to submit the form.";

      if (error instanceof z.ZodError) {
        errorMessage = error.errors.map((err) => err.message).join("\n");
      } else if (error.response?.data?.[0]?.message) {
        errorMessage = error.response.data[0].message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      console.error(error);
      showToast("error", errorMessage);
    }
  };

  const handleTimerUpdate = (minutes: number) => {
    setTimeLimitMinutes(minutes);
  };

  const handleSelectedQuestions = (selectedQuestions: string[]) => {
    setQuestions(selectedQuestions);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <QuizHeader
            onQuizTitleChange={handleQuizTitleChange}
            quizTitle={quizTitle}
          />
          <FormDifficultySelect
            onDifficultyChange={handleQuizDifficultyLevelChange}
            initialDifficulty={difficultyLevel}
          />
          <FormTimer
            updateTimeLimit={handleTimerUpdate}
            initialTime={timeLimitMinutes}
          />
          <FormTags
            onUpdateTags={updateQuizTags}
            content={quizTitle}
            tags={quizTags}
          />
          <QuizQuestions
            handleSetQuestions={handleSelectedQuestions}
            reset={reset}
            apiQuestions={questions}
          />
          <CardFooter>
            <Button type="submit">
              {isEditing ? "Save Quiz" : "Create Quiz"}
            </Button>
          </CardFooter>
        </div>
      </form>
    </>
  );
};

export default QuizForm;
