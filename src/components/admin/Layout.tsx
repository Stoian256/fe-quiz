import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="h-screen flex-1 flex flex-col">
        <Navbar />
        <div className="bg-gray-200 w-full">Breadcrumbs</div>
        <div className="flex-1 overflow-y-auto p-4 pt-2 bg-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
