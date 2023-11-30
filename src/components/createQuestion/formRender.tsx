import { ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface FormRenderProps {
  title: string;
  body: string;
  titleError: string;
  bodyError: string;
  handleQuestionTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleQuestionBodyChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleQuestionTitleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleQuestionBodyBlur: (
    event: React.FocusEvent<HTMLTextAreaElement>
  ) => void;
}

const FormRender: React.FC<FormRenderProps> = ({
  title,
  body,
  titleError,
  bodyError,
  handleQuestionTitleChange,
  handleQuestionBodyChange,
  handleQuestionTitleBlur,
  handleQuestionBodyBlur
}) => {
  Prism.highlightAll();

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <label htmlFor="title" className="text-sm">
          Question Title
        </label>
        <Input
          type="text"
          id="title"
          placeholder="Your Question Title Here..."
          value={title}
          onChange={handleQuestionTitleChange}
          onBlur={handleQuestionTitleBlur}
          className="w-full h-10 px-2 border rounded-md"
        />
        {titleError && title && <p className="text-red-500 text-sm">{titleError}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="body" className="text-sm">
            Question Body
          </label>
          <Textarea
            id="body"
            placeholder="Your Question Body Here..."
            value={body}
            onChange={handleQuestionBodyChange}
            onBlur={handleQuestionBodyBlur}
            className="h-40"
          />
          {bodyError && body && <p className="text-red-500 text-sm">{bodyError}</p>}
        </div>
        <div className="w-full">
          <label htmlFor="preview" className="text-sm mb-2">
            Preview
          </label>
          <div className="border p-2 h-40 overflow-y-auto rounded-lg bg-gray-500 text-white">
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormRender;
