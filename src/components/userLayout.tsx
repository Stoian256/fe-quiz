import { Outlet } from "react-router-dom";
import UserNavbar from "./userNavbar";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="h-screen flex-1 flex flex-col">
        <UserNavbar />
          <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
