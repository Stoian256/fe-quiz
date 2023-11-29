import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FilterAll from "@shadcn/components/filters/filterAll";
import DisplayQuestions from "@shadcn/components/tables/displayQuestions";
import { useFilterAndPagination } from "@shadcn/context/filterAndPaginationContext";
import Pagination from "@shadcn/components/pagination";

const AdminQuestions = () => {
  const {
    pageNumber,
    setPageNumber,
    itemsPerPage,
    numbersOfPages,
    handleArrowClick,
    handleItemsPerPage
  } = useFilterAndPagination();

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/admin/questions", {
      state: { mainTitle: "Questions Title", title: "questions second title" }
    });
  }, [navigate]);
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
        <FilterAll />
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
