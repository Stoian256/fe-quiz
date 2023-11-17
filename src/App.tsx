import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Dashboard from "./pages/adminDashboard";
import Questions from "./pages/adminQuestions";
import Quizzes from "./pages/adminQuizzes";
import QCreate from "./pages/adminQCreate";

const App = () => (
  <div
    className={`bg-gray-100 h-screen flex flex-col items-center justify-center gap-y-14 px-10 ${twMerge(
      "lg:px-18",
      "lg:px-20"
    )}`}
  >
    <p className="text-6xl lg:text-8xl text-blue-900 font-bold text-center">
      Quiz Project
    </p>
    <Button onClick={() => alert("You just clicked a button")}> 
     Click me!
    </Button>
  </div>
);

export default App;
