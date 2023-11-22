import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className="inline-block  text-sm font-semibold  text-gray-500 transition duration-100 rounded-lg outline-none ring-indigo-300 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
