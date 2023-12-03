import { MouseEvent } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip";
import RenderBadge from "./renderBadge";
import { Filters } from "../../utils/interfaces/Filters";

type ShowSelectedFiltersProps = {
  filters: Filters;
  handleFilterDelete: (e: MouseEvent<HTMLDivElement>) => void;
  clearAllFilters: () => void;
};

const ShowSelectedFilters = ({
  filters,
  handleFilterDelete,
  clearAllFilters
}: ShowSelectedFiltersProps) => {
  const anyFiltersApplyed = Object.entries(filters).map(
    (filter) => filter[1].length
  );
  const areFiltersApplied = anyFiltersApplyed.reduce((a, b) => a + b, 0);
  return (
    <div className="flex gap-1 items-center justify-between w-full">
      <div className="flex gap-1 flex-col items-start">
        {areFiltersApplied !== 0 && (
          <p className="text-xs">Selected Filters:</p>
        )}
        <div className="flex gap-1 flex-wrap">
          {Object.entries(filters).map(
            ([filterType, filterValue], outerIndex) =>
              filterValue.length > 0 && (
                <div className="flex gap-1" key={outerIndex}>
                  {filterValue.length < 3
                    ? filterValue.map((selectedFilter, innerIndex) => (
                        <RenderBadge
                          key={`${outerIndex}-${innerIndex}`}
                          selectedFilter={selectedFilter}
                          filterType={filterType}
                          onClick={handleFilterDelete}
                          index={`${outerIndex} - ${innerIndex}`}
                        />
                      ))
                    : filterValue
                        .slice(0, 3)
                        .map((selectedFilter, innerIndex) => (
                          <RenderBadge
                            key={`${outerIndex}-${innerIndex}`}
                            selectedFilter={selectedFilter}
                            filterType={filterType}
                            onClick={handleFilterDelete}
                            index={`${outerIndex} - ${innerIndex}`}
                          />
                        ))}
                </div>
              )
          )}
          {Object.entries(filters).map(
            ([_, tagName], index) =>
              tagName.length > 3 && (
                <TooltipProvider delayDuration={200} key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-xs pl-2">{`see +${
                        tagName.length - 3
                      } more ${
                        tagName.length - 3 === 1 ? "tag" : "tags"
                      }`}</span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      {tagName.slice(3).map((tag, index) => (
                        <p key={index}>tag - {tag}</p>
                      ))}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
          )}
        </div>
      </div>
      {areFiltersApplied > 1 && (
        <div>
          <span
            className="text-sm self-end justify-self-end underline cursor-pointer hover:no-underline"
            onClick={clearAllFilters}
          >
            clear all filters
          </span>
        </div>
      )}
    </div>
  );
};

export default ShowSelectedFilters;
