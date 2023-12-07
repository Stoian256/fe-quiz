import { AnswerData } from "./AnswerData";
import { Tag } from "./typescript";

export interface QuizQuestionData {
  id: string;
  questionTitle: string;
  questionBody: string;
  difficulty: string;
  tags: Tag[];
  answers: AnswerData[];
}