import { Link } from "react-router-dom";

const Questions = () => {
  return (
    <div className="bg-gray-200">
      <h1>Questions page title</h1>

      <div className="bg-white min-h-[calc(100vh-200px)] rounded-md">
        <p>Questions page content goes here</p>
        <Link to="/questions/create">Create question</Link>
      </div>
    </div>
  );
};

export default Questions;
