import { CardTitle } from "@shadcn/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@shadcn/components/ui/select";

interface SelectDifficultyProps {
  onDifficultyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FormDifficultySelect: React.FC<SelectDifficultyProps> = ({
  onDifficultyChange
}) => {
  const handleDifficultyChange = (selectedValue: string) => {
    const formatDifficulty = (value: string) => {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    };

    const formattedValue = formatDifficulty(selectedValue);
    const syntheticEvent = {
      target: { value: formattedValue }
    } as React.ChangeEvent<HTMLSelectElement>;

    onDifficultyChange(syntheticEvent);
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <CardTitle className="text-sm mt-2">Difficulty Level</CardTitle>
      <Select onValueChange={handleDifficultyChange}>
        <SelectTrigger id="difficulty">
          <SelectValue placeholder="Select Difficulty Level..." />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem id="easy" value="Easy">
            Easy
          </SelectItem>
          <SelectItem id="medium" value="Medium">
            Medium
          </SelectItem>
          <SelectItem id="hard" value="Hard">
            Hard
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormDifficultySelect;
