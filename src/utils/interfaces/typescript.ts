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

export interface UserAnswer{
  answerOptionId: string,
  answerOptionTitle: string
}

export interface UserQuestion {
  questionId: string;
  questionTitle: string;
  questionBody: string;
  answersOptions: UserAnswer[];
}

export interface UserQuiz {
  attemptId: string,
  startedAt: Date,
  timeLimit: number,
  questions: UserQuestion[]
}

export interface IdObject {
  [key:string]: string;
}
