import { CardTitle } from "@shadcn/components/ui/card";
import { Textarea } from "@shadcn/components/ui/textarea";

interface QuestionBodyProps {
  onQuestionBodyChange: (text: string) => void;
}

const FormHeader: React.FC<QuestionBodyProps> = ({ onQuestionBodyChange }) => {
  
  const handleQuestionBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onQuestionBodyChange(event.target.value);
  }

  return (
    <div className="flex flex-col space-y-1.5">
      <CardTitle className="text-sm mt-2">Question Title</CardTitle>
      <Textarea id="title" placeholder="Your Question Title Here..." onChange={handleQuestionBodyChange} />
    </div>
  );
};

export default FormHeader;
