// import DisplayFilters from "@shadcn/components/displayFilters";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminQuizes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/admin/quizes", {
      state: { mainTitle: "Quiz Title", title: "quiz second title" }
    });
  }, [navigate]);
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
      {/* TODO display quiz table */}
      {/* <DisplayFilters/> */}
    </div>
  );
};

export default AdminQuizes;
