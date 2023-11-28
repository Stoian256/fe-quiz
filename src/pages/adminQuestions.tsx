import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DisplayFilters from "@shadcn/components/displayFilters";

const AdminQuestions = () => {
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

      <DisplayFilters/>
    </div>

    // </div>
  );
};

export default AdminQuestions;
