import { CardTitle } from "@shadcn/components/ui/card";
import Select from "../select";
import { useEffect, useState } from "react";

interface SelectDifficultyProps {
  onDifficultyChange: (value: string) => void;
  initialDifficulty?: string;
}

const FormDifficultySelect: React.FC<SelectDifficultyProps> = ({
  onDifficultyChange,
  initialDifficulty = ""
}) => {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState(initialDifficulty);

  const handleDifficultyChange = (selectedValue: string) => {
    setSelectedDifficulty(selectedValue);
    onDifficultyChange(selectedValue);
  };

  useEffect(() => {
    setSelectedDifficulty(initialDifficulty);
  }, [initialDifficulty]);

  return (
    <div className="flex flex-col space-y-1.5">
      <CardTitle className="text-sm mt-2">Difficulty Level</CardTitle>
      <Select
        options={["Easy", "Medium", "Hard"]}
        value={selectedDifficulty}
        onChange={handleDifficultyChange}
      />
    </div>
  );
};

export default FormDifficultySelect;
