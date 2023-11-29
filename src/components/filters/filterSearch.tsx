import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ChangeEvent } from "react";

type FilterSearchProps = {
  keyword: string[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FilterSearch = ({ keyword, onChange }: FilterSearchProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="search">Search</Label>
      <Input
        id="search"
        placeholder="Search..."
        value={keyword}
        name="keyword"
        onChange={onChange}
      />
    </div>
  );
};

export default FilterSearch;
