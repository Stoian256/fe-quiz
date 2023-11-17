import { Card, CardContent } from "../ui/card";
import Form from "./form";

const CreateQuestionForm = () => {
  return (
    <Card className="pt-5 m-5">
      <CardContent>
        <Form />
      </CardContent>
    </Card>
  );
};

export default CreateQuestionForm;
