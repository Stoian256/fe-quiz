import FilterAll from "@shadcn/components/filters/filterAll";
import Pagination from "@shadcn/components/filters/pagination";
import DisplayQuizzes from "@shadcn/components/tables/displayQuizzes";
import { useFilterAndPaginationQuizz } from "@shadcn/context/filterAndPaginationContextQuizz";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const AdminQuizes = () => {
  const {
    pageNumber,
    setPageNumber,
    itemsPerPage,
    numbersOfPages,
    handleArrowClick,
    handleItemsPerPage
  } = useFilterAndPaginationQuizz();

  return (
    <div className="text-left  pt-4">
      <div className="pl-4">
        <Link
          to="/admin/quizes/create"
          className="p-2 rounded-lg bg-dorange text-dblue hover:bg-dyellow transition-colors duration-30"
        >
          Create quiz
        </Link>
      </div>

      <div className="mt-4">
        <FilterAll tableType="quizzes" />
        <DisplayQuizzes />
        <Pagination
          pageNumber={pageNumber}
          onPageNumberChange={(page) => setPageNumber(page)}
          handleArrowClick={handleArrowClick}
          itemsPerPage={itemsPerPage}
          handleItemsPerPage={handleItemsPerPage}
          numbersOfPages={numbersOfPages}
        />
      </div>
    </div>
  );
};

export default AdminQuizes;
