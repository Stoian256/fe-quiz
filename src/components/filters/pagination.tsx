import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import {
  ChevronsRight,
  ChevronsLeft,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

type PaginationProps = {
  pageNumber: number;
  onPageNumberChange: Dispatch<SetStateAction<number>>;
  handleArrowClick: (direction: string) => void;
  itemsPerPage: number;
  handleItemsPerPage: (e: SetStateAction<string>) => void;
  numbersOfPages: number;
};

const Pagination = ({
  pageNumber,
  onPageNumberChange,
  handleArrowClick,
  itemsPerPage,
  handleItemsPerPage,
  numbersOfPages
}: PaginationProps) => {
  const defaultPageIndexes = [
    0,
    1,
    numbersOfPages - 1,
    numbersOfPages - 2,
    pageNumber - 1,
    pageNumber,
    pageNumber + 1
  ];
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 mt-3">
        <ChevronsLeft
          onClick={() => onPageNumberChange(0)}
          className={
            pageNumber === 0 ? "invert cursor-not-allowed" : "cursor-pointer"
          }
        />
        <ChevronLeft
          onClick={() => handleArrowClick("left")}
          className={
            pageNumber === 0 ? "invert cursor-not-allowed" : "cursor-pointer"
          }
        />

        {[...Array(numbersOfPages)].map((_page, index) => {
          if (defaultPageIndexes.includes(index)) {

            if ((pageNumber > 3 || pageNumber === 0) && index === 1) {
              return (
                <div key={index}>
                  <Button
                    type="button"
                    variant="outline"
                    className={
                      pageNumber === index
                        ? "bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
                        : ""
                    }
                    name={index.toString()}
                    onClick={(e) =>
                      onPageNumberChange(Number(e.currentTarget.name))
                    }
                  >
                    {index + 1}
                  </Button>
                  <span className="tracking-widest w-6">...</span>
                </div>
              );
            }

            if (
              index === numbersOfPages - 2 &&
              pageNumber < numbersOfPages - 4
            ) {
              return (
                <div key={index}>
                  <span className="tracking-widest w-6">...</span>
                  <Button
                    type="button"
                    variant="outline"
                    className={
                      pageNumber === index
                        ? "bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
                        : ""
                    }
                    key={index}
                    name={index.toString()}
                    onClick={(e) =>
                      onPageNumberChange(Number(e.currentTarget.name))
                    }
                  >
                    {index + 1}
                  </Button>
                </div>
              );
            }

            if (pageNumber === 1 && index === 3) {
              return;
            }
            return (
              <Button
                type="button"
                variant="outline"
                className={
                  pageNumber === index
                    ? "bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
                    : ""
                }
                key={index}
                name={index.toString()}
                onClick={(e) =>
                  onPageNumberChange(Number(e.currentTarget.name))
                }
              >
                {index + 1}
              </Button>
            );
          }
        })}

        <ChevronRight
          onClick={() => handleArrowClick("right")}
          className={
            pageNumber === numbersOfPages - 1
              ? "invert cursor-not-allowed"
              : "cursor-pointer"
          }
        />
        <ChevronsRight
          onClick={() => onPageNumberChange(numbersOfPages - 1)}
          className={
            pageNumber === numbersOfPages - 1
              ? "invert cursor-not-allowed"
              : "cursor-pointer"
          }
        />
      </div>
      <div className="flex items-center gap-2 mt-3">
        <p>Items per Page</p>
        <Select
          defaultValue="10"
          value={String(itemsPerPage)}
          onValueChange={(e) => handleItemsPerPage(e)}
        >
          <SelectTrigger className="w-[90px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Items</SelectLabel>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Pagination;
