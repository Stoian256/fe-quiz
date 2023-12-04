import { MouseEventHandler, useState } from "react";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { ListOfTags } from "../../utils/interfaces/ListOfTags";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type FilterTagsProps = {
  listOfTags: ListOfTags[];
  selectedTags: string[];
  handleDeleteTag: MouseEventHandler<HTMLDivElement>;
  removeAllTags: () => void;
  handleTagChange: any;
  handleTagSelect: any;
};

const FilterTags = ({
  listOfTags,
  selectedTags,
  handleDeleteTag,
  removeAllTags,
  handleTagChange,
  handleTagSelect
}: FilterTagsProps) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="flex flex-col gap-3 relative">
      <Label htmlFor="tags">Tags</Label>
      <Input
        id="tags"
        placeholder="Search for tags..."
        value={inputValue}
        name="tags"
        onChange={(e) => {
          handleTagChange(e), setInputValue(e.target.value);
        }}
        autoComplete="off"
      />
      {inputValue !== "" && (
        <div className="absolute top-16 mt-1.5 flex flex-col w-full bg-white z-10">
          {listOfTags.map((tag) => (
            <Button
              variant="outline"
              onClick={(e) => {
                handleTagSelect(e), setInputValue("");
              }}
              key={tag.id}
            >
              {tag.tagTitle}
            </Button>
          ))}
        </div>
      )}

      <div className="flex gap-1 flex-wrap">
        {selectedTags.map((tag, index) => (
          <Badge
            key={index}
            onClick={handleDeleteTag}
            title={tag}
            className="cursor-pointer flex gap-2 relative pr-5"
          >
            {tag}
            <div className="absolute right-1.5 -top-0.5 text-red-400">
              <span style={{ fontSize: "10px" }}>x</span>
            </div>
          </Badge>
        ))}
      </div>
      {selectedTags.length > 1 && (
        <span
          onClick={removeAllTags}
          className="block cursor-pointer text-gray-400"
        >
          remove all tags
        </span>
      )}
    </div>
  );
};

export default FilterTags;
