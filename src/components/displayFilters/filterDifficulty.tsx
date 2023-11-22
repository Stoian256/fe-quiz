import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

type FilterDifficultyProps = {
  difficultyFilter: string[];
  setDifficultyFilter: Dispatch<SetStateAction<string[]>>;
};

const FilterDifficulty = ({
  difficultyFilter,
  setDifficultyFilter
}: FilterDifficultyProps) => {
  const difficulties = ["any", "easy", "medium", "hard"];
  return (
    <div className="flex flex-col gap-3">
      <DropdownMenu>
        <Label htmlFor="difficulty">Difficulty Level</Label>
        <DropdownMenuTrigger asChild name="difficulty">
          <Button variant="outline" className="justify-start">
            Select Difficulty
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Difficulty</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {difficulties.map((difficulty, index) => (
            <DropdownMenuCheckboxItem
              key={index}
              checked={difficultyFilter.includes(difficulty)}
              onCheckedChange={() => {
                if (
                  (difficulty === "any" &&
                    !difficultyFilter.includes(difficulty)) ||
                  (difficultyFilter.length === 2 &&
                    !difficultyFilter.includes(difficulty))
                ) {
                  setDifficultyFilter(() => ["any"]);
                } else {
                  setDifficultyFilter((prev) => {
                    const filteredArray = prev.filter((e) => e !== "any");
                    return [...filteredArray, difficulty];
                  });
                }
              }}
            >
              {difficulty}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterDifficulty;
