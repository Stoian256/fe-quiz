import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter } from "../../ui/card";
import Form from "../form/Form";

const CardWithForm = () => {
  return (
    <div>
      <h1 className="pl-6 mb-1.5 text-xl font-medium text-slate-500">Create Question</h1>
      <p className="pl-6 text-xs font-light text-slate-400">Add a new question to the system</p>
      <Card className="pt-5 m-5">
        <CardContent>
          <Form />
        </CardContent>
        <CardFooter className="flex">
          <Button>Create Question</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CardWithForm;