import { Badge } from "@shadcn/components/ui/badge";
import { X } from "lucide-react";

interface TagProps {
  tagName: string;
  onClick: () => void;
}

const Tag: React.FC<TagProps> = ({ tagName, onClick }) => {
  const MAX_LENGTH = 15;

  const displayText =
    tagName.length > MAX_LENGTH
      ? `${tagName.slice(0, MAX_LENGTH)}...`
      : tagName;

  return (
    <div className="inline-block py-1 px-2 text-gray-700 rounded-full cursor-pointer transition duration-300">
      <Badge
        className="truncate"
        title={tagName.length > MAX_LENGTH ? tagName : ""}
        onClick={onClick}
      >
        {displayText}
        <X className="h-2 w-2 text-red-500 ml-1" />
      </Badge>
    </div>
  );
};

export default Tag;
