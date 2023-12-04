import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getAdminMessage } from "../services/message.service";
import { CodeSnippet } from "@shadcn/components/auth/code-snippet";
import { useAuth } from "@shadcn/context/authContext";

const AdminDashboard = () => {
  const [message, setMessage] = useState<string>("");
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { accessToken } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const getMessage = async () => {
      if (accessToken) {
        const { data, error } = await getAdminMessage(accessToken);

        if (!isMounted) {
          return;
        }

        if (data) {
          setMessage(JSON.stringify(data, null, 2));
        }

        if (error) {
          setMessage(JSON.stringify(error, null, 2));
        }
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  return (
    <div className="text-center">
      Dashboard content goes here
      {isAuthenticated ? (
        <div className="font-semibold text-green-500">
          Session initialized as: {user?.name}{" "}
        </div>
      ) : (
        <div className="font-semibold text-red-500">No session initialized</div>
      )}
      <div className="api">
        <span>
          This page retrieves an <strong>admin message</strong> from an external
          API.
        </span>
        <span>
          <strong>
            Only authenticated users with the <code>Admin</code> permission
            should access this page.
          </strong>
        </span>
        <CodeSnippet title="Admin Message" code={message} />
      </div>
    </div>
  );
};

export default AdminDashboard;
