import { CardTitle } from "@shadcn/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@shadcn/components/ui/select";

interface SelectDifficultyProps {
  onDifficultyChange: (text: string) => void;
}

const FormDifficultySelect: React.FC<SelectDifficultyProps> = ({
  onDifficultyChange,
}) => {
  const handleDifficultyChange = (selectedValue: string) => {
    onDifficultyChange(selectedValue);
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
          <SelectItem id="medium" value="medium">
            Medium
          </SelectItem>
          <SelectItem id="hard" value="hard">
            Hard
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormDifficultySelect;
