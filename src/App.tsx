import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Dashboard from "./pages/adminDashboard";
import Questions from "./pages/adminQuestions";
import Quizzes from "./pages/adminQuizzes";
import CreateQuestionForm from "./components/createQuestion/createQuestionForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="questions" element={<Questions />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="questions/create" element={<CreateQuestionForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
