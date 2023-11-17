import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", {
      state: { mainTitle: "Dashboard Title", title: "dashboard second title" }
    });
  }, [navigate]);
  return <div className="text-center">Dashboard content goes here</div>;
};

export default Dashboard;
