import { AnswerData } from "./AnswerData";

export interface QuestionData {
  questionTitle: string;
  questionBody: string;
  difficulty: string;
  tags: string[];
  answers: AnswerData[];
}
