import { QuizModalProvider } from "@shadcn/context/quizModalContext";
import { Card, CardContent } from "../ui/card";
import QuizForm from "./quizForm";

const FormQuiz: React.FC = () => {
  return (
    <div className="py-5">
      <Card className="mx-5">
        <CardContent>
          <QuizModalProvider>
            <QuizForm />
          </QuizModalProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormQuiz;
