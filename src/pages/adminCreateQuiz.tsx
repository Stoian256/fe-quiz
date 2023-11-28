import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminCreateQuiz = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/admin/quizes/create", {
      state: {
        mainTitle: "Create Quiz",
        title: "Add a new quiz to the system"
      }
    });
  }, [navigate]);
  return (
<div>create quiz content</div>
  )
};

export default AdminCreateQuiz;
