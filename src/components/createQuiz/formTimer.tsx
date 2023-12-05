import { useState } from "react";
import { CardTitle } from "../ui/card";
import { Input } from "../ui/input";

interface FormTimerProps {
  updateTimeLimit: (minutes: number) => void;
  initialTime: number;
}

const FormTimer: React.FC<FormTimerProps> = ({
  updateTimeLimit,
  initialTime
}) => {
  const [timerError, setTimerError] = useState<string>("");
  const handleTimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minutes = Number(e.target.value);
    updateTimeLimit(minutes);

    if (minutes < 1) {
      setTimerError("Timer must be at least 1 minute")
    } else {
      setTimerError("")
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <CardTitle className="text-sm pt-2">Quiz Timer</CardTitle>
      <Input
        type="number"
        min={0}
        value={initialTime}
        onChange={handleTimerChange}
        required
        autoComplete="off"
      />
      {timerError && initialTime && (
        <p className="text-red-500 text-sm">{timerError}</p>
      )}
    </div>
  );
};

export default FormTimer;
