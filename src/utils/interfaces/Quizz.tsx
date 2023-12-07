import { ListOfTags } from "./ListOfTags";

export interface Quizz {
  quizTitle: string;
  difficultyLevel: string;
  quizTags: ListOfTags[];
  numberOfQuestions: number;
  timeLimitMinutes: number;
  id: string;
}
