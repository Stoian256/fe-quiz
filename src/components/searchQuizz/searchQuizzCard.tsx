import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface SearchQuizzCardProps {
  title: string;
  tags: string[];
  difficulty: string;
  timeLimit: number;
}

const SearchQuizzCard: React.FC<SearchQuizzCardProps> = ({
  title,
  tags,
  difficulty,
  timeLimit
}) => {
  return (
    <div className="border border-dashed p-5 my-3 flex flex-col gap-2">
      <h3 className="text-3xl">{title}</h3>
      <div className="flex gap-4">
        {tags.map((tag, index) => (
          <Badge
            key={`${index}-${tag}`}
            className="rounded-none text-lg bg-gray-300 text-black font-bold"
          >
            {tag}
          </Badge>
        ))}
      </div>
      <p className="text-lg text-gray-500">
        Difficulty: <span className="font-bold">{difficulty}</span>
      </p>
      <p className="text-lg  text-gray-500">
        Time Limit: <span className="font-bold">{timeLimit} minutes</span>
      </p>
      <Button className="bg-yellow-400 text-white rounded-none hover:bg-yellow-500 p-2 px-10 shadow-lg self-end">
        Start solving
      </Button>
    </div>
  );
};

export default SearchQuizzCard;
