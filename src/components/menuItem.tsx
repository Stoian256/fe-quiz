import { NavLink } from "react-router-dom";
import { ReactNode } from "react";

interface MenuItemProps {
  icon: ReactNode;
  label: string;
  path: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, path }) => {
  return (
    <div>
      <NavLink
        to={path}
        end
        className={({ isActive }) =>
          isActive ? "text-yellow-500 bg-gray-100" : ""
        }
      >
        <div className="flex flex-row p-2 gap-2 font-semibold hover:bg-dorange hover:text-dblue transition-colors duration-30">
          {icon}
          <span>{label}</span>
        </div>
      </NavLink>
    </div>
  );
};

export default MenuItem;
