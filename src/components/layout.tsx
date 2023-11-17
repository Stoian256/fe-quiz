import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Page from "./page";
import Breadcrumbs from "./breadcrumbs";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="h-screen flex-1 flex flex-col">
        <Navbar />
        <Breadcrumbs />
        <div className="flex-1 overflow-y-auto p-4 pt-2 bg-gray-200">
          <Page />
        </div>
      </div>
    </div>
  );
};

export default Layout;
