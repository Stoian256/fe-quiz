import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Dashboard from "./pages/adminDashboard";
import Questions from "./pages/adminQuestions";
import { AuthenticationGuard } from "./components/auth/authentication-guard";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "./authContext";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import UserDashboard from "./pages/userDashboard";
import UserQuizzes from "./pages/userQuizzes";
import UserLayout from "./components/userLayout";
import { Profile } from "./pages/profile";

import CreateQuestionForm from "./components/createQuestion/createQuestionForm";
import CreateQuizForm from "./components/createQuiz/createQuizForm";

const App: React.FC = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { storeData } = useAuth();
  const { isAdmin } = useAuth();
  const fetchData = async () => {
    try {
      if (isAuthenticated) {
        let token = await getAccessTokenSilently();
        if (token !== null) {
          const decodedToken: { permissions: string[] } = jwtDecode(token);
          const userIsAdmin = decodedToken.permissions.includes("Admin");
          storeData!(token, isAuthenticated, userIsAdmin);
        }
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <Routes>
      {isAuthenticated && isAdmin ? (
        <>
          <Route path="/" element={<AuthenticationGuard component={Layout} />}>
            <Route index element={<Dashboard />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/questions/create" element={<CreateQuestionForm />} />
            <Route path="/quizzes" element={<CreateQuizForm />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </>
      ) : (
        <>
          <Route
            path="/"
            element={<AuthenticationGuard component={UserLayout} />}
          >
            <Route index element={<UserDashboard />} />
            <Route path="/quiz" element={<UserQuizzes />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </>
      )}
    </Routes>
  );
};

export default App;
