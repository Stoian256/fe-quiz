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
        <MenuItem icon={<PieChart />} path="/admin" label="Dashboard" />
        <MenuItem
          icon={<LayoutGrid />}
          path="/admin/questions"
          label="Questions"
        />
        <MenuItem icon={<AppWindow />} path="/admin/quizes" label="Quizes" />
      </div>
    </div>
  );
};

export default Sidebar;
