import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";

interface SearchQuizzesProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  topTags: string[];
  selectedTags: string[];
  handleBagdeClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleDeleteTag: (tagTitle: string) => void;
  generatedTags: string[];
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTagSelect: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  prefix: string;
  setPrefix: React.Dispatch<React.SetStateAction<string>>;
  setGeneratedTags: React.Dispatch<React.SetStateAction<string[]>>;
  handleTopicsSearch: () => void;
}
const SearchQuizzesTag: React.FC<SearchQuizzesProps> = ({
  openDialog,
  setOpenDialog,
  topTags,
  selectedTags,
  handleBagdeClick,
  handleDeleteTag,
  generatedTags,
  handleInputChange,
  handleTagSelect,
  prefix,
  setPrefix,
  setGeneratedTags,
  handleTopicsSearch
}) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger className="underline">Add More</DialogTrigger>
      <DialogContent className="p-14 max-w-3xl">
        <DialogHeader className="flex flex-col gap-5 items-center">
          <DialogTitle className="text-4xl">
            Choose your favorite topics
          </DialogTitle>
          <DialogDescription className="text-xl">
            Select the topics you'd like to search quizzes for
          </DialogDescription>
          <DialogDescription className="flex flex-wrap gap-8 justify-center">
            {topTags.map((tag, index) => (
              <div className="flex">
                <Badge
                  key={index}
                  className={`ml-3 py-1 px-3 rounded-none ${
                    selectedTags.includes(tag)
                      ? "bg-yellow-400"
                      : "bg-gray-300 cursor-pointer"
                  } text-black font-bold text-base hover:bg-yellow-400`}
                  onClick={(e) => handleBagdeClick(e)}
                  title={tag}
                >
                  {tag}
                </Badge>
                {selectedTags.includes(tag) && (
                  <span
                    className="bg-black py-1 pt-2 font-bold px-2 text-white text-justify cursor-pointer"
                    onClick={() => handleDeleteTag(tag)}
                  >
                    X
                  </span>
                )}
              </div>
            ))}
          </DialogDescription>
          <div className="flex w-full gap-10 justify-center items-center text-lg whitespace-nowrap relative">
            <div className="flex flex-col w-9/12 gap-1 mt-5 mb-3">
              <Label>Search for more topics</Label>
              <Input
                onChange={(e) => handleInputChange(e)}
                value={prefix}
              ></Input>
              <div className="flex flex-col absolute flex-grow flex-shrink-0 w-9/12 top-24">
                {generatedTags.length > 0 &&
                  prefix !== "" &&
                  generatedTags.map((tag) => {
                    return (
                      <Button
                        className="z-20"
                        variant="outline"
                        onClick={(e) => {
                          handleTagSelect(e),
                            setPrefix(""),
                            setGeneratedTags([]);
                        }}
                      >
                        {tag}
                      </Button>
                    );
                  })}
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <DialogClose
            className="bg-yellow-400 text-white rounded-none hover:bg-yellow-500 p-2 px-10 shadow-lg"
            onClick={() => {
              setOpenDialog(false), handleTopicsSearch();
            }}
          >
            Search
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchQuizzesTag;
