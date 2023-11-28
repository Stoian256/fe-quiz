import { MouseEventHandler } from "react";
import { Label } from "../ui/label";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Badge } from "../ui/badge";
import { ListOfTags } from "../../utils/interfaces/ListOfTags";

type FilterTagsProps = {
  listOfTags: ListOfTags[];
  selectedTags: string[];
  handleOnSelect: (item: { name: string }) => void;
  formatResult: (item: { name: string }) => JSX.Element;
  handleDeleteTag: MouseEventHandler<HTMLDivElement>;
  removeAllTags: () => void;
};

const FilterTags = ({
  listOfTags,
  selectedTags,
  handleOnSelect,
  formatResult,
  handleDeleteTag,
  removeAllTags
}: FilterTagsProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="tags">Tags</Label>
      <ReactSearchAutocomplete
        items={listOfTags}
        onSelect={handleOnSelect}
        formatResult={formatResult}
        className="z-10"
        styling={{
          fontSize: "14px",
          borderRadius: "5px"
        }} // unable to add font size as className
      />
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
