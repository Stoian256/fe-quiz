import Sidebar from "./sidebar";
import Navbar from "./navbar";
import Breadcrumbs from "./breadcrumbs";
import { Outlet, useLocation } from "react-router-dom";
import { FilterAndPaginationProvider } from "@shadcn/context/filterAndPaginationContext";
import { useTitleContext } from "@shadcn/context/TitleContext";
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();
  const { mainTitle, title,setMainTitle, setTitle } = useTitleContext();

  useEffect(() => {
    const path = location.pathname;
    let newMainTitle = "";
    let newTitle = "";

    switch (path) {
      case "/admin":
        newMainTitle = "Admin Dashboard";
        newTitle = "Here we have the dashboard";
        break;
      case "/admin/questions":
        newMainTitle = "Questions";
        newTitle = "Here are the questions that we create";
        break;
      case "/admin/quizes":
        newMainTitle = "Quizes";
        newTitle = "Here are the quizes we create";
        break;
      case "/admin/questions/create":
        newMainTitle = "Create Question";
        newTitle = "Add a new question here";
        break;
      case "/admin/questions/edit":
        newMainTitle = "Edit Question";
        newTitle = "Edit the question here";
        break;
      case "/admin/quizes/create":
        newMainTitle = "Create Quiz";
        newTitle = "Add a new quiz here";
        break;
      case "/admin/quizes/edit":
        newMainTitle = "Edit Quiz";
        newTitle = "Edit the quiz here";
        break;
      default:
        newMainTitle = "";
        newTitle = "";
        break;
    }
    setMainTitle(newMainTitle);
    setTitle(newTitle);
  }, [location.pathname, setMainTitle, setTitle])

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="h-screen flex-1 flex flex-col">
        <Navbar />
        <Breadcrumbs />
        <div className="flex-1 overflow-y-auto p-4 pt-2 bg-gray-200">
          <div className="bg-gray-200">
            <h1 className="text-lg font-semibold">{mainTitle || ""}</h1>
            <h3 className="text-sm">{title || ""}</h3>
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
