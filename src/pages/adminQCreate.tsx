import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QCreate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/questions/create", {
      state: {
        mainTitle: "Create Question",
        title: "Add a new question to the system"
      }
    });
  }, [navigate]);
  return <div className="text-center">Create question form</div>;
};

export default QCreate;
