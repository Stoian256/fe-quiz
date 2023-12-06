import { Link } from "react-router-dom";
import FilterAll from "@shadcn/components/filters/filterAll";
import Pagination from "@shadcn/components/filters/pagination";
import DisplayQuestions from "@shadcn/components/tables/displayQuestions";
import { useFilterAndPagination } from "@shadcn/context/filterAndPaginationContext";

const AdminQuestions = () => {
  const {
    pageNumber,
    setPageNumber,
    itemsPerPage,
    numbersOfPages,
    handleArrowClick,
    handleItemsPerPage
  } = useFilterAndPagination();

  return (
    <div className="text-left  pt-4">
      <div className="pl-4">
        <Link
          to="/admin/questions/create"
          className="p-2 rounded-lg bg-dorange text-dblue hover:bg-dyellow transition-colors duration-30"
        >
          Create question
        </Link>
      </div>

      <div className="mt-4">
        <FilterAll tableType="questions" />
        <DisplayQuestions />
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

export default AdminQuestions;
