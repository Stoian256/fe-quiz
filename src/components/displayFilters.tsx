import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState
} from "react";
import DisplayQuestions from "./displayQuestions";
import FilterSearch from "./displayFilters/filterSearch";
import FilterDifficulty from "./displayFilters/filterDifficulty";
import FilterTags from "./displayFilters/filterTags";
import ShowSelectedFilters from "./displayFilters/showSelectedFilters";
import { ListOfTags } from "../utils/interfaces/ListOfTags";
import { Filters } from "../utils/interfaces/Filters";
import { PaginationProvider } from "@shadcn/context/paginationContext";

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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [listOfTags, setListOfTags] = useState<ListOfTags[]>(listOfAllTags);
  const [filters, setFilters] = useState<Filters>({
    keyword: [],
    difficulty: [],
    tags: []
  });

  const [difficultyFilter, setDifficultyFilter] = useState(["any"]);

  useEffect(() => {
    setSelectedTags(filters.tags);
    setDifficultyFilter(filters.difficulty);
  }, [filters]);

  const handleOnSelect = (item: { name: string }) => {
    const { name } = item;
    setListOfTags((prevTags) => prevTags.filter((tag) => tag.name !== name));
    setSelectedTags((prevTags) => [...prevTags, name]);
  };

  const removeAllTags = () => {
    setSelectedTags([]);
    setListOfTags(listOfAllTags);
  };

  const formatResult = (item: { name: string }) => (
    <span className="cursor-pointer text-sm">{item.name}</span>
  );

  const handleDeleteTag: MouseEventHandler<HTMLDivElement> = (e) => {
    const tagToDelete = e.currentTarget.title;
    setSelectedTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToDelete)
    );
    const tagToAddInList = listOfAllTags.filter(
      (tag) => tag.name === tagToDelete
    );
    setListOfTags((prevTags) => [...prevTags, tagToAddInList[0]]);
  };

  const applyFiltersBtn = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      difficulty: difficultyFilter.filter((tag) => tag !== "any"),
      tags: selectedTags
    }));
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: [e.target.value]
    }));
  };

  const handleFilterDelete = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    const filterName = e.currentTarget.id;
    const filterValue = e.currentTarget.title;
    setFilters((prevFilter) => ({
      ...prevFilter,
      [filterName]: prevFilter[filterName].filter((e) => e !== filterValue)
    }));

    if (filterName === "tags") {
      const tagToAddInList = listOfAllTags.filter(
        (tag) => tag.name === filterValue
      );
      setListOfTags((prevTags) => [...prevTags, tagToAddInList[0]]);
    }
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: [],
      difficulty: [],
      tags: []
    });
    setListOfTags(listOfAllTags);
  };

  const handleDifficultyChange = (difficulty: string) => {
    let difficultyArray = ["any"];

    if (
      !difficultyFilter.includes(difficulty) &&
      difficultyFilter.length !== 2 &&
      difficulty !== "any"
    ) {
      const filteredArray = difficultyFilter.filter((e) => e !== "any");
      filteredArray.push(difficulty);
      difficultyArray = filteredArray;
    }
    setDifficultyFilter(difficultyArray);
  };

  return (
    <div className="p-4 pb-0 flex flex-col items-start gap-2">
      <div className="flex gap-2 pb-2 w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Filters</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <FilterSearch
                keyword={filters.keyword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFilterChange(e)
                }
              />
              <FilterDifficulty
                difficultyFilter={difficultyFilter}
                handleDifficultyChange={handleDifficultyChange}
              />
              <FilterTags
                listOfTags={listOfTags}
                selectedTags={selectedTags}
                handleOnSelect={handleOnSelect}
                formatResult={formatResult}
                handleDeleteTag={handleDeleteTag}
                removeAllTags={removeAllTags}
              />
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
        <ShowSelectedFilters
          filters={filters}
          handleFilterDelete={handleFilterDelete}
          clearAllFilters={clearAllFilters}
        />
      </div>
      <PaginationProvider>
        <DisplayQuestions filters={filters} />
      </PaginationProvider>
    </div>
  );
};

export default DisplayFilters;
