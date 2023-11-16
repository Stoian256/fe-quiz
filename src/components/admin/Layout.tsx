import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main content */}
      <div className="h-screen flex-1 flex flex-col">
        <div>Navbar</div>
        <div>Breadcrumbs</div>

        {/* Container for Dynamically Loaded Pages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-200">
          {/* Dynamic content goes here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
