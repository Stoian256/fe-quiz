import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Page from "./Page";
import Breadcrumbs from "./Breadcrumbs";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="h-screen flex-1 flex flex-col">
        <Navbar />
        <Breadcrumbs />
        <div className="flex-1 overflow-y-auto p-4 pt-2 bg-gray-200">
          <Page
            mainTitle={"Create Question"}
            title="Add a new question to the system"
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
