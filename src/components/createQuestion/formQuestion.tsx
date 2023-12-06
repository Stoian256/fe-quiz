import { Card, CardContent } from "../ui/card";
import QuestionForm from "./questionForm";

const FormQuestion: React.FC = () => {
  return (
    <div className="py-5">
      <Card className="mx-5">
        <CardContent>
          <QuestionForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default FormQuestion;
