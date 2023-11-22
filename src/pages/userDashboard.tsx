import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "@shadcn/components/auth/logoutButton";
import { Outlet } from "react-router-dom";

const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="flex flex-col items-center justify-center mx-96">
      <h1 className="mb-4 text-2xl font-bold">
        This is the initial User page.
      </h1>
      <div className="px-6 mb-4 text-justify">
        "This project uses the Auth0 SDK to manage user login, logout, and
        registration, as well as applying permission validations for the routes
        set with react-router-dom and the requests made to a Spring Boot-based
        REST API."
      </div>
      {isAuthenticated ? (
        <div className="font-semibold text-green-500">
          Session initialized as: {user?.name}{" "}
        </div>
      ) : (
        <div className="font-semibold text-red-500">No session initialized</div>
      )}
      <div className="mt-4">
        <LogoutButton />
        <hr />
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
