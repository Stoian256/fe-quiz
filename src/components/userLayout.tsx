import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="h-screen flex-1 flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
