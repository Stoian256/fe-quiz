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

type FilterDifficultyProps = {
  difficultyFilter: string[];
  handleDifficultyChange: (difficulty: string) => void;
};

const FilterDifficulty = ({
  difficultyFilter,
  handleDifficultyChange
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
              onCheckedChange={() => handleDifficultyChange(difficulty)}
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
