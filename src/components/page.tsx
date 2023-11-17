import { Outlet, useLocation } from "react-router-dom";

const Page = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div className="bg-gray-200">
      <h1 className="text-lg font-semibold">{state?.mainTitle || ""}</h1>
      <h3 className="text-sm">{state?.title || ""}</h3>
      <div className="bg-white min-h-[calc(100vh-200px)] rounded-md mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Page;
