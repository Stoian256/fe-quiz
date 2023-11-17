import { Card, CardContent } from "../ui/card";
import Form from "./form";

const CreateQuestionForm = () => {
  return (
    <div className="p-4">
      <h1 className="pl-6 mb-1.5 text-xl font-medium text-slate-500">
        Create Question
      </h1>
      <p className="pl-6 text-xs font-light text-slate-400">
        Add a new question to the system
      </p>
      <Card className="pt-5 m-5">
        <CardContent>
          <Form />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuestionForm;
