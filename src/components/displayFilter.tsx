import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useState } from "react";

const listOfAllTags = [
  {
    id: 0,
    name: "React"
  },
  {
    id: 1,
    name: "Coding 101"
  },
  {
    id: 2,
    name: "Coding 102"
  },
  {
    id: 3,
    name: "React Advanced"
  },
  {
    id: 4,
    name: "React Begginers"
  },
  {
    id: 5,
    name: "React Noobs"
  }
];

const DisplayFilters = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [listOfTags, setListOfTags] = useState(listOfAllTags);
  const [filters, setFilters] = useState({
    keyword: "",
    difficulty: "",
    tags: []
  });
  const difficulties = ["Easy", "Medium", "Hard"];

  const handleOnSelect = (item) => {
    const { name } = item;

    // filter the list of tags to not include the already selected tags
    setListOfTags((prevTags) => prevTags.filter((tag) => tag.name !== name));

    setSelectedTags((prevTags) => [...prevTags, name]);
  };

  const formatResult = (item) => (
    <span style={{ cursor: "pointer", fontSize: "14px" }}>{item.name}</span>
  );

  const handleDeleteTag = (e) => {
    // accesing e.target.innerHTML to get the Badge value
    // removing the clicked tag from the selected tags list AND adding it to the list tags
    const tagToChange = e.target.innerHTML;

    setSelectedTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToChange)
    );

    // look up in the initial tag list to take the tag id, because I can't add name or value to the badge component

    const tagToAddInList = listOfAllTags.filter(
      (tag) => tag.name === tagToChange
    );
    setListOfTags((prevTags) => [...prevTags, tagToAddInList[0]]);
  };

  const removeAllTags = () => {
    setSelectedTags([]);
    setListOfTags(listOfAllTags);
  };

  const handleFilterChange = (e) => {
    if (typeof e === "string") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        difficulty: e
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [e.target.name]: e.target.value
      }));
    }
  };

  const applyFiltersBtn = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      tags: selectedTags
    }));

    // send request for new questions data based on filters
    // close filters modal
  };

  return (
    <div className="p-4 pb-0 flex items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Filters</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search..."
                value={filters.keyword}
                name="keyword"
                onChange={(e) => handleFilterChange(e)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select
                onValueChange={(e) => handleFilterChange(e)}
                value={filters.difficulty}
                name="difficulty"
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Difficulty level" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {difficulties.map((level, index) => (
                    <SelectItem key={index} value={level.toLowerCase()}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="tags">Tags</Label>
              <ReactSearchAutocomplete
                items={listOfTags}
                onSelect={handleOnSelect}
                formatResult={formatResult}
                styling={{ fontSize: "14px" }}
              />
              <div className="flex gap-1">
                {selectedTags.map((tag, index) => (
                  <Badge
                    key={index}
                    onClick={(e) => handleDeleteTag(e)}
                    className="cursor-pointer flex gap-2 relative pr-5"
                  >
                    {tag}
                    <div className="absolute right-1.5 -top-0.5 ">
                      <span style={{ fontSize: "10px" }}>x</span>
                    </div>
                  </Badge>
                ))}
              </div>
              {/* conditionally rendering the remove all tags option */}
              {selectedTags.length > 1 && (
                <span
                  onClick={removeAllTags}
                  style={{ display: "block", color: "grey", cursor: "pointer" }}
                  // might change this later from inline style
                >
                  remove all tags
                </span>
              )}
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <DialogClose
              className="bg-orange-300 text-black hover:bg-yellow-300 p-2 rounded-md"
              onClick={applyFiltersBtn}
            >
              Apply Filters
            </DialogClose>
            <DialogClose asChild>
              <Button variant="outline" className="border-none">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {Object.keys(filters).some((key) => filters[key].length > 0) && (
        <p className="text-sm">
          Selected Filters: <br></br>
          {filters.keyword && `Keyword - ${filters.keyword}; `}
          {filters.difficulty && `Difficulty - ${filters.difficulty}; `}
          {filters.tags.length > 0 &&
            `Tags - ${filters.tags.map((tag) => ` ${tag}`)}`}
        </p>
      )}
    </div>
  );
};

export default DisplayFilters;
