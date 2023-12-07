export type Difficulty = "Easy" | "Medium" | "Hard";

type DifficultyMap = {
  [key in Difficulty]: string;
};

export const difficultyMap: DifficultyMap = {
  "Easy": "bg-green-600",
  "Medium": "bg-yellow-500",
  "Hard": "bg-red-600",
};