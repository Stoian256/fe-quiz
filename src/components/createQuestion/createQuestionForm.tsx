import { Card, CardContent } from "../ui/card";
import Form from "./form";

const CreateQuestionForm = () => {
  return (
    <div className="py-5">
      <Card className="mx-5">
        <CardContent>
          <Form formType="question" />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuestionForm;
