import { CardTitle } from "@shadcn/components/ui/card";
import { Textarea } from "@shadcn/components/ui/textarea";

const FormHeader = () => {
  return (
    <div className="flex flex-col space-y-1.5">
      <CardTitle className="text-sm mt-2">Question Title</CardTitle>
      <Textarea id="title" placeholder="Your Question Title Here..." />
    </div>
  );
};

export default FormHeader;
