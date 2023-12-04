import { Card, CardContent } from "../ui/card";
import QuizForm from "./quizForm";

const CreateQuizForm: React.FC = () => {
  return (
    <div className="py-5">
      <Card className="mx-5">
        <CardContent>
          <QuizForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuizForm;
