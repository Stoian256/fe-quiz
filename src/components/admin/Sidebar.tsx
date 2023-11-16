import Logo from "../Logo";
import MenuItem from "./MenuItem";
import { PieChart } from "lucide-react";
import { LayoutGrid } from "lucide-react";
import { AppWindow } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-[200px] bg-dblue text-white min-h-screen">
      <div className="mx-6">
        <Logo />
        <MenuItem icon={<PieChart />} path="/" label="Dashboard" />
        <MenuItem icon={<LayoutGrid />} path="/questions" label="Questions" />
        <MenuItem icon={<AppWindow />} path="/quizzes" label="Quizzes" />
      </div>
    </div>
  );
};

export default Sidebar;
