import { ListOfTags } from "./ListOfTags";

export interface Quizz {
  id: string;
  quizz: string;
  difficultyLevel: string;
  quizTags: ListOfTags[];
  quizTitle: string;
  numberOfQuestions: number;
  timeLimitMinutes: number;
}
