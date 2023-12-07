import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { CodeSnippet } from "../components/auth/code-snippet";

export const Profile: React.FC = () => {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  return (
    <div className="mx-20 my-10">
      <h1 className="text-dblue text-2xl font-bold mb-2">Profile Page</h1>
      <div>
        <p>
          <span>
            You can use the <strong>ID Token</strong> to get the profile
            information of an authenticated user.
          </span>
          <span>
            <strong>Only authenticated users can access this page.</strong>
          </span>
        </p>
        <div className="mx-4 my-2 p-8">
          <div className="flex flex-row gap-4 items-center">
            <img src={user.picture} alt="Profile" className="rounded-full" />
            <div>
              <h2 className="text-dblue font-semibold">{user.name}</h2>
              <span className="text-gray-400">{user.email}</span>
            </div>
          </div>
          <div className="mt-4 bg-gray-200 p-4">
            <CodeSnippet
              title="Decoded ID Token"
              code={JSON.stringify(user, null, 2)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
