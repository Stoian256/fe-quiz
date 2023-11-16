import { Link } from "react-router-dom";

const Questions = () => {
  return (
    <div className="text-center">
      <Link to="/questions/create" className="text-red-500">
        Create question
      </Link>
      <div>other content goes here</div>
    </div>
  );
};

export default Questions;
