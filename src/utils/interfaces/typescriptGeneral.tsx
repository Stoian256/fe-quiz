export interface Tag {
  id: string;
  tagTitle: string;
}

export interface Answer {
  id: string;
  answerContent: string;
  correctAnswer: boolean;
}

export interface Question {
  id: string;
  questionTitle: string;
  questionBody: string;
  difficulty: string;
  tags: Tag[];
  answers: Answer[];
}
