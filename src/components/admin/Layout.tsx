import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="h-screen flex-1 flex flex-col">
        <Navbar />
        <div>Breadcrumbs</div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
