import Form from "../createQuestion/form";
import { Card, CardContent } from "../ui/card";

const CreateQuizForm: React.FC = () => {
  return (
    <div className="py-5">
      <Card className="mx-5">
        <CardContent>
          <Form formType="quiz" />
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateQuizForm;