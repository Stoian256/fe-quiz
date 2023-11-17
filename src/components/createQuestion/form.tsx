import { useState } from "react";

import FormHeader from "./formHeader";
import FormDifficultySelect from "./formDifficultySelect";
import FormTags from "./formTags";
import FormAnswers from "./formAnswers";
import { CardFooter } from "@shadcn/components/ui/card";
import { Button } from "@shadcn/components/ui/button";

interface FormData {
  questionBody: string;
  difficultyLevel: string;
  tags: string[];
  answers: string[];
}

const BE_URL = "";

const Form: React.FC = () => {
  const [questionBody, setQuestionBody] = useState<string>("");
  const [difficultyLevel, setDifficultyLevel] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

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

  const handleAnswersChange = (answersArray: string[]) => {
    setAnswers(answersArray);
  };

  const validateData = () => {
    return (
      questionBody.trim().length > 0 &&
      difficultyLevel !== "" &&
      tags.length > 0 &&
      answers.length > 0
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
      console.error("Error occurred:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateData()) {
      try {
        await sendDataToBackend(dataToSend);
      } catch (error) {
        console.error("Error occurred while sending data:", error);
      }
    } else {
      throw new Error("There has been an error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid w-full items-center gap-4">
        <FormHeader onQuestionBodyChange={handleQuestionBodyChange} />
        <FormDifficultySelect
          onDifficultyChange={handleDifficultyLevelChange}
        />
        <FormTags onUpdateTags={updateTags} />
        <FormAnswers onAnswersChange={handleAnswersChange} />
        <CardFooter>
          <Button>Create Question</Button>
        </CardFooter>
      </div>
    </form>
  );
};

export default Form;
