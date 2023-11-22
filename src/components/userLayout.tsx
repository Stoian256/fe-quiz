import Navbar from "./navbar";
import Breadcrumbs from "./breadcrumbs";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="h-screen flex-1 flex flex-col">
        <Navbar />
        <Breadcrumbs />
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
