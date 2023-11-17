import logo from "./../assets/header-logo-white.svg";
import MenuItem from "./menuItem";
import { PieChart } from "lucide-react";
import { LayoutGrid } from "lucide-react";
import { AppWindow } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-[200px] bg-dblue text-white min-h-screen">
      <div className="mx-6">
        <div className="p-6 pl-2 mr-0">
          <img src={logo} alt={logo} />
        </div>
        <MenuItem icon={<PieChart />} path="/" label="Dashboard" />
        <MenuItem icon={<LayoutGrid />} path="/questions" label="Questions" />
        <MenuItem icon={<AppWindow />} path="/quizzes" label="Quizzes" />
      </div>
    </div>
  );
};

export default Sidebar;
