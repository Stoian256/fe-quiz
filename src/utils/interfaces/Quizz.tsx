export interface Quizz {
  id: string;
  quizz: string;
  difficultyLevel: string;
  tags: string[];
  numberOfQuestions: number;
  timeLimit: number;
}
