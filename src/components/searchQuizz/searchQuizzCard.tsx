import { Quizz } from "@shadcn/utils/interfaces/Quizz";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const SearchQuizzCard: React.FC<Quizz> = ({
  difficultyLevel,
  quizTags,
  quizTitle,
  timeLimitMinutes
}) => {
  return (
    <div className="border border-dashed p-5 my-3 flex flex-col gap-2">
      <h3 className="text-3xl">{quizTitle}</h3>
      <div className="flex gap-4">
        {quizTags.map((tag, index) => (
          <Badge
            key={`${index}-${tag}`}
            className="rounded-none text-lg bg-gray-300 text-black font-bold"
          >
            {tag.tagTitle}
          </Badge>
        ))}
      </div>
      <p className="text-lg text-gray-500">
        Difficulty: <span className="font-bold">{difficultyLevel}</span>
      </p>
      <p className="text-lg  text-gray-500">
        Time Limit:{" "}
        <span className="font-bold">{timeLimitMinutes} minutes</span>
      </p>
      <Button className="bg-yellow-400 text-white rounded-none hover:bg-yellow-500 p-2 px-10 shadow-lg self-end">
        Start solving
      </Button>
    </div>
  );
};

export default SearchQuizzCard;
