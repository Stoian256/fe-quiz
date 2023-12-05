import { AnswerData } from "./AnswerData";
import { Tag } from "./Tag";

export interface QuestionData {
  id: string;
  questionTitle: string;
  questionBody: string;
  difficulty: string;
  tags: Tag[];
  answers: AnswerData[];
}
