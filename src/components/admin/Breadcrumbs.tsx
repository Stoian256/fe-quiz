import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

const Breadcrumbs = () => {
  type Path = "questions" | "quizzes" | "questions/create";
  type PathDisplayNames = Record<Path, string>;

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x !== "");
  const space = "\u00A0";

  const pathDisplayNames: PathDisplayNames = {
    questions: "Questions",
    quizzes: "Quizzes",
    "questions/create": "Create"
  };

  return (
    <div className="bg-gray-200 w-full ">
      <div className="flex items-center justify-start pl-4 h-6">
        <Link to={"/"}>
          <Home className="h-3 w-3" />
        </Link>
        {space}
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const pathSlice = pathnames.slice(0, index + 1);
          const pathKey = pathSlice.join("/") as Path;
          const to = `/${pathSlice.join("/")}`;

          const displayName: string = pathDisplayNames[pathKey] || value;

          return (
            <div key={index} className="flex items-center text-xs">
              {last ? (
                <>
                  <span>/</span>
                  <span>
                    {space}
                    {displayName}
                  </span>
                </>
              ) : (
                <>
                  <Link to={to} className="">
                    <span>/</span>
                    <span>
                      {space}
                      {displayName}
                      {space}
                    </span>
                  </Link>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumbs;
