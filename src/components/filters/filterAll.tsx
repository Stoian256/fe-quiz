import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState
} from "react";
import FilterSearch from "./filterSearch";
import FilterDifficulty from "./filterDifficulty";
import FilterTags from "./filterTags";
import ShowSelectedFilters from "./showSelectedFilters";
import { ListOfTags } from "../../utils/interfaces/ListOfTags";
import { Filters } from "../../utils/interfaces/Filters";
import listOfAllTags from "../../data/listOfAllTags.json";
import { useFilterAndPagination } from "@shadcn/context/filterAndPaginationContext";
import { getTags } from "@shadcn/services/questions.service";
import { useAuth } from "@shadcn/context/authContext";

const FilterAll = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [listOfTags, setListOfTags] = useState<ListOfTags[]>();
  const [difficultyFilter, setDifficultyFilter] = useState(["easy"]);

  const [requestBodyTag, setRequestBodyTag] = useState({});
  const { filters, setFilters } = useFilterAndPagination();
  const [intermediarFilters, setIntermediarFilters] = useState(filters);
  const { accessToken } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        if (accessToken) {
          const data = await getTags(accessToken, requestBodyTag);
          setListOfTags(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [selectedTags, requestBodyTag]);

  useEffect(() => {
    setSelectedTags(filters.tags);
    setDifficultyFilter(filters.difficulty);
  }, [filters]);

  const removeAllTags = () => {
    setSelectedTags([]);
    setRequestBodyTag({});
  };

  const handleDeleteTag: MouseEventHandler<HTMLDivElement> = (e) => {
    const tagToDelete = e.currentTarget.title;
    setSelectedTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToDelete)
    );
  };

  const applyFiltersBtn = () => {
    setFilters(intermediarFilters);
    setFilters((prevFilters) => ({
      ...prevFilters,
      difficulty: difficultyFilter.filter((tag) => tag !== "any"),
      tags: selectedTags
    }));
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIntermediarFilters((prevFilters) => ({
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

  const handleTagChange = (e) => {
    const prefix = e.target.value;
    const selectedEmpty = selectedTags.length === 0;
    setRequestBodyTag({
      prefix: prefix,
      excludedTags: selectedEmpty ? [""] : selectedTags
    });
  };

  const handleTagSelect = (e) => {
    const addToSelectedTags: string = e.target.innerHTML;

    setSelectedTags((prevTags) => [...prevTags, addToSelectedTags]);

    setRequestBodyTag({
      prefix: "",
      excludedTags: selectedTags
    });
  };

  return (
    <div className="p-4 pb-0 pt-0 flex flex-col items-start gap-2">
      <div className="flex gap-2 pb-3 w-full">
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
                keyword={(intermediarFilters as Filters).keyword}
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
                handleDeleteTag={handleDeleteTag}
                removeAllTags={removeAllTags}
                handleTagChange={handleTagChange}
                handleTagSelect={handleTagSelect}
                requestBodyTag={requestBodyTag}
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
    </div>
  );
};

export default FilterAll;
