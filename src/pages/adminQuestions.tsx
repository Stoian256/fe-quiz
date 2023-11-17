import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Questions = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/questions", {
      state: { mainTitle: "Questions Title", title: "questions second title" }
    });
  }, [navigate]);
  return (
    <div className="text-center">
      <Link to="/questions/create" className="text-red-500">
        Create question
      </Link>
      <div>other content goes here</div>
    </div>
  );
};

export default Questions;
