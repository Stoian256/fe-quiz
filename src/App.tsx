import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout";
import { AuthenticationGuard } from "./components/auth/authentication-guard";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "./context/authContext";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import UserQuizes from "./pages/userQuizes";
import UserLayout from "./components/userLayout";
import { Profile } from "./pages/profile";
import AdminDashboard from "./pages/adminDashboard";
import AdminCreateQuestion from "./pages/adminCreateQuestion";
import AdminQuestions from "./pages/adminQuestions";
import AdminQuizes from "./pages/adminQuizes";
import AdminCreateQuiz from "./pages/adminCreateQuiz";
import { PageLoader } from "./components/auth/page-loader";
import ErrorPage from "./pages/errorPage";
import AdminEditQuestion from "./pages/adminEditQuestion";

const App: React.FC = () => {
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
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
  }, [getAccessTokenSilently, isAuthenticated, storeData]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Routes>
      {isAuthenticated && isAdmin ? (
        <>
          <Route path="/">
            <Route index element={<Navigate to="/admin" />} />
            <Route
              path="/admin"
              element={<AuthenticationGuard component={Layout} />}
            >
              <Route path="/admin" element={<AdminDashboard />} />
              <Route
                path="/admin/questions/create"
                element={<AdminCreateQuestion />}
              />
              <Route
                path="/admin/questions/edit/:id"
                element={<AdminEditQuestion />}
              />

              <Route path="/admin/questions" element={<AdminQuestions />} />
              <Route
                path="/admin/quizes/create"
                element={<AdminCreateQuiz />}
              />
              <Route path="/admin/quizes" element={<AdminQuizes />} />
            </Route>
          </Route>
        </>
      ) : (
        <>
          <Route
            path="/"
            element={<AuthenticationGuard component={UserLayout} />}
          >
            <Route index element={<UserQuizes />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </>
      )}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
