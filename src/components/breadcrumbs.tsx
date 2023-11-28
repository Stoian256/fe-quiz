import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";

const Breadcrumbs = () => {
  type Path =
    | "admin"
    | "admin/questions"
    | "admin/quizes"
    | "admin/questions/create"
    | "admin/quizes/create";
  type PathDisplayNames = Record<Path, string>;

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x !== "");
  const space = "\u00A0";

  const pathDisplayNames: PathDisplayNames = {
    admin: "",
    "admin/questions": "Questions",
    "admin/quizes": "Quizes",
    "admin/questions/create": "Create",
    "admin/quizes/create": "Create"
  };

  return (
    <div className="bg-gray-200 w-full ">
      <div className="flex items-center justify-start pl-4 h-6">
        <Link to={"/admin"}>
          <Home className="h-3 w-3 hover:text-dorange transition-colors duration-30" />
        </Link>
        {space}
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const first = index === 0;
          const pathSlice = pathnames.slice(0, index + 1);
          const pathKey = pathSlice.join("/") as Path;
          const to = `/${pathSlice.join("/")}`;

          const displayName: string = pathDisplayNames[pathKey] || value;

          return (
            <div key={index} className="flex items-center text-xs">
              {first ? (
                <></>
              ) : last ? (
                <>
                  <span>/</span>
                  <span>
                    {space}
                    {displayName}
                  </span>
                </>
              ) : (
                <Link
                  to={to}
                  className="hover:text-dorange transition-colors duration-30"
                >
                  <span>/</span>
                  <span>
                    {space}
                    {displayName}
                    {space}
                  </span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumbs;
