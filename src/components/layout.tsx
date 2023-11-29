import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Breadcrumbs from "./breadcrumbs";
import { Outlet, useLocation } from "react-router-dom";
import { FilterAndPaginationProvider } from "@shadcn/context/filterAndPaginationContext";

const Layout = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="h-screen flex-1 flex flex-col">
        <Navbar />
        <Breadcrumbs />
        <div className="flex-1 overflow-y-auto p-4 pt-2 bg-gray-200">
          <div className="bg-gray-200">
            <h1 className="text-lg font-semibold">{state?.mainTitle || ""}</h1>
            <h3 className="text-sm">{state?.title || ""}</h3>
            <div className="bg-white min-h-[calc(100vh-200px)] rounded-md mt-4">
              <FilterAndPaginationProvider>
                <Outlet />
              </FilterAndPaginationProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
