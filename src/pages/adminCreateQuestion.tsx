import CreateQuestionForm from "@shadcn/components/createQuestion/createQuestionForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminCreateQuestion = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/admin/questions/create", {
      state: {
        mainTitle: "Create Question",
        title: "Add a new question to the system"
      }
    });
  }, [navigate]);
  return (
    <CreateQuestionForm />
  )
};

export default AdminCreateQuestion;
