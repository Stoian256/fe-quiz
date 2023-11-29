import { useEffect, useState } from "react";
import { z } from "zod";

import FormHeader from "./formHeader";
import FormDifficultySelect from "./formDifficultySelect";
import FormTags from "./formTags";
import FormAnswers from "./formAnswers";
import { CardFooter } from "@shadcn/components/ui/card";
import { Button } from "@shadcn/components/ui/button";
import { AnswerData } from "@shadcn/utils/interfaces/AnswerData";
import { useAuth } from "../../context/authContext";
import { Answer } from "@shadcn/utils/interfaces/Answer";
import { QuestionData } from "@shadcn/utils/interfaces/QuestionData";
import { useToast } from "@shadcn/context/ToastContext";
import extractZodErrors from "@shadcn/utils/functions/zodErrors";
import { useParams } from "react-router-dom";

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

const QuestionForm: React.FC = () => {
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

  const { showToast } = useToast();

  const [reset, setReset] = useState<boolean>(false);

  const handleQuestionTitleChange = (text: string) => {
    setQuestionTitle(text);
  };

  const handleQuestionBodyChange = (text: string) => {
    setQuestionBody(text);
  };

  const handleQuestionDifficultyLevelChange = (text: string) => {
    setDifficulty(text);
  };

  const updateQuestionTags = (newTags: string[]) => {
    setTags(newTags);
  };

  const handleAnswersChange = (answersArray: AnswerData[]) => {
    setAnswers(answersArray);
  };

  const handleAnswersInfoChange = (newAnswersInfo: Answer[]) => {
    setAnswersInfo(newAnswersInfo);
  };

  const removeAnswer = (indexToRemove: number) => {
    const updatedAnswers = answersInfo.filter(
      (_, index) => index !== indexToRemove
    );
    setAnswersInfo(updatedAnswers);

    const updatedAnswerData = answers.filter(
      (_, index) => index !== indexToRemove
    );
    setAnswers(updatedAnswerData);
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
      z.string().min(1, { message: "There must be at least 1 tag" })
    ),
    answers: z.array(
      z.object({
        answerContent: z.string(),
        correctAnswer: z.boolean()
      })
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
      zodErrors = extractZodErrors(error);
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

  const questionDataToSend = {
    questionTitle,
    questionBody,
    difficulty,
    answers,
    tags
  };

  const BE_URL = import.meta.env.VITE_API_SERVER_URL;
  const { accessToken } = useAuth();

  const { id } = useParams<{ id: string | undefined }>();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      const fetchQuestionByID = async (questionID: string) => {
        try {
          const response = await fetch(`${BE_URL}questions/${questionID}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          if (!response.ok) {
            throw new Error("Failed to fetch question data");
          }

          const questionData = await response.json();
          console.log(questionData);
          setQuestionTitle(questionData.questionTitle);
          setQuestionBody(questionData.questionBody);
          setDifficulty(questionData.difficulty);
          // setTags(questionData.tags);
          console.log(questionData.tags);
          showToast("success", "Question data fetched successfully!");
          setIsEditing(true);
        } catch (error) {
          console.error("Error fetching question data:", error);
          showToast("error", "Failed to fetch question data.");
        }
      };
      fetchQuestionByID(id);
    }
  }, [id]);

  const sendDataToBackend = async (questionDataToSend: QuestionData) => {
    try {
      let url = `${BE_URL}questions/create`;
      let method = "POST";

      if (isEditing) {
        url = `${BE_URL}questions/update/${id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(questionDataToSend)
      });

      if (!response.ok) {
        throw new Error("Failed to update question");
      }

      const successMessage = isEditing
        ? "Question updated successfully!"
        : "Question submitted successfully!";
      showToast("success", successMessage);
      resetForm();
    } catch (error) {
      console.error("Error updating question:", error);
      const errorMessage = isEditing
        ? "Failed to update the question. Please try again."
        : "Failed to submit the form. Please try again.";
      showToast("error", errorMessage);
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
    setReset(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    try {
      const { isValid, errors } = validateQuestionData(questionDataToSend);

      if (!isValid) {
        const errorMessage = errors.join("\n");
        throw new Error(errorMessage);
      }

      await sendDataToBackend(questionDataToSend);
      resetForm();
      showToast("success", "Question submitted successfully!");
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <FormHeader
            onQuestionBodyChange={handleQuestionBodyChange}
            onQuestionTitleChange={handleQuestionTitleChange}
            title={questionTitle}
            body={questionBody}
          />
          <FormDifficultySelect
            onDifficultyChange={handleQuestionDifficultyLevelChange}
          />
          <FormTags
            onUpdateTags={updateQuestionTags}
            content={questionTitle}
            tags={tags}
          />
          <FormAnswers
            onAnswersChange={handleAnswersChange}
            answerData={answers}
            answersInfo={answersInfo}
            setAnswersInfo={handleAnswersInfoChange}
            removeAnswer={removeAnswer}
            reset={reset}
          />
          <CardFooter>
            <Button type="submit">
              {isEditing ? "Edit Question" : "Create Question"}
            </Button>
          </CardFooter>
        </div>
      </form>
    </>
  );
};

export default QuestionForm;
