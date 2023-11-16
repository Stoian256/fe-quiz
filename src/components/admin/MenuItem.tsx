import { NavLink } from "react-router-dom";
import { ReactNode } from "react";

interface MenuItemProps {
  icon: ReactNode;
  label: string;
  path: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, path }) => {
  return (
    <div className="menu_item">
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive
            ? "text-black bg-gray-100"
            : "hover:text-black hover:bg-gray-100 transition-colors duration-300"
        }
      >
        <div className="flex flex-row p-2 gap-2">
          {icon}
          <span>{label}</span>
        </div>
      </NavLink>
    </div>
  );
};

export default MenuItem;
