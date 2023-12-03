export interface Tag {
  id: string;
  tagTitle: string;
}

export interface Answer {
  id: string;
  answerContent: string;
  correctAnswer: boolean;
  // TODO please change to isCorrectAnswer (all booleans should have prefix "is")
}

export interface Question {
  id: string;
  questionTitle: string;
  questionBody: string;
  difficulty: string;
  tags: Tag[];
  answers: Answer[];
}

export interface Filters {
  [key: string]: string[];
}
