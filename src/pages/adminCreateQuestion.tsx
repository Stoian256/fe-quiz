import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CreateQuestionForm from "@shadcn/components/createQuestion/createQuestionForm";

const AdminCreateQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    if (id) {
      setTimeout(() => {
        navigateWithState(id);
      });
    } else {
      navigate("/admin/questions/create", {
        state: {
          mainTitle: "Create Question",
          title: "Add a new question to the system"
        }
      });
    }
  }, [location.search, navigate]);

  const navigateWithState = (id: string) => {
    navigate(`/admin/questions/create?id=${id}`, {
      state: {
        mainTitle: "Edit Question",
        title: "Edit existing question"
      }
    });
  };

  return <CreateQuestionForm />;
};

export default AdminCreateQuestion;
