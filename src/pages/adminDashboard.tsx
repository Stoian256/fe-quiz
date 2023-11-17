import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DisplayFilters from "../components/displayFilters";
import DisplayQuestions from "../components/displayQuestions";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", {
      state: { mainTitle: "Dashboard Title", title: "dashboard second title" }
    });
  }, [navigate]);
  return (
    <div className="text-center">
      <DisplayFilters />
      <DisplayQuestions />
    </div>
  );
};

export default Dashboard;
