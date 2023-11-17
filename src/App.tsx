import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Dashboard from "./pages/adminDashboard";
import Questions from "./pages/adminQuestions";
import Quizzes from "./pages/adminQuizzes";
import QCreate from "./pages/adminQCreate";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/questions/create" element={<QCreate />} />
        <Route path="/quizzes" element={<Quizzes />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
