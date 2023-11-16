// import { twMerge } from "tailwind-merge";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import Questions from "./pages/admin/Questions";
import Quizzes from "./pages/admin/Quizzes";
import QCreate from "./pages/admin/QCreate";

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
