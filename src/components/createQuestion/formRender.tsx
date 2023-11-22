import { useEffect, useRef } from "react";

import ReactMarkdown, { Components } from "react-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import { Textarea } from "@shadcn/components/ui/textarea";
import { CardTitle } from "../ui/card";
import { Input } from "../ui/input";

interface FormRenderProps {
  title: string;
  body: string;
  titleError: string;
  bodyError: string;
  handleQuestionTitleChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleQuestionBodyChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleQuestionTitleBlur: (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => void;
  handleQuestionBodyBlur: (
    event: React.FocusEvent<HTMLTextAreaElement>
  ) => void;
}

const components: Components = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <pre className={`rounded-md bg-gray-800 p-4`}>
        <code
          className={`${className} text-sm font-mono language-${match[1]}`}
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </code>
      </pre>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
};

const FormRender: React.FC<FormRenderProps> = ({
  title,
  body,
  titleError,
  bodyError,
  handleQuestionBodyBlur,
  handleQuestionBodyChange,
  handleQuestionTitleBlur,
  handleQuestionTitleChange
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const storedValue = useRef<string>("");

  const hasMarkdown =
    /(^# .+|\n\n|\*{1,3}[^*\n]+[*_]|_{1,3}[^_*\n]+[_*]|\`{3}[\s\S]*?\n\`{3}|!\[.*\]\(.*\)|\[.*\]\(.*\)|^>\s*|\d+\. .+|^-{3,}\s*|_[^\s*]+_)/.test(
      body
    );
  const hasCodeBlock = body.includes("```");

  useEffect(() => {
    if (textareaRef.current) {
      storedValue.current = textareaRef.current.value;
    }
  }, [hasMarkdown, hasCodeBlock]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [hasMarkdown, hasCodeBlock]);

  useEffect(() => {
    Prism.highlightAll();
  }, [body]);

  const renderBodySection = () => {
    if (hasMarkdown) {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <CardTitle className="text-sm">Question Body</CardTitle>
            <Textarea
              className="h-40"
              id="body"
              placeholder="Your Question Body Here..."
              value={body}
              onChange={handleQuestionBodyChange}
              onBlur={handleQuestionBodyBlur}
              autoComplete="off"
              ref={textareaRef}
            />
            {bodyError && <p className="text-red-500 text-sm">{bodyError}</p>}
          </div>
          <div className="w-full">
            <CardTitle className="text-sm mb-2">Markdown Preview</CardTitle>
            <div className="border p-2 h-40 overflow-y-auto">
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          </div>
        </div>
      );
    } else if (hasCodeBlock) {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <CardTitle className="text-sm">Question Body</CardTitle>
            <Textarea
              className="h-40"
              id="body"
              placeholder="Your Question Body Here..."
              value={body}
              onChange={handleQuestionBodyChange}
              onBlur={handleQuestionBodyBlur}
              autoComplete="off"
              ref={textareaRef}
            />
            {bodyError && <p className="text-red-500 text-sm">{bodyError}</p>}
          </div>
          <div className="w-full">
            <CardTitle className="text-sm mb-2">Code Preview</CardTitle>
            <div className="border p-2 h-40 overflow-y-auto rounded-lg bg-gray-400">
              <ReactMarkdown components={components}>{body}</ReactMarkdown>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col space-y-2 md:col-span-2">
          <CardTitle className="text-sm">Question Body</CardTitle>
          <Textarea
            id="body"
            placeholder="Your Question Body Here..."
            value={body}
            onChange={handleQuestionBodyChange}
            onBlur={handleQuestionBodyBlur}
            autoComplete="off"
            ref={textareaRef}
          />
          {bodyError && <p className="text-red-500 text-sm">{bodyError}</p>}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <CardTitle className="text-sm mt-2">Question Title</CardTitle>
      <Input
        type="text"
        id="title"
        placeholder="Your Question Title Here..."
        value={title}
        onChange={handleQuestionTitleChange}
        onBlur={handleQuestionTitleBlur}
        autoComplete="off"
        required
      />
      {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
      {renderBodySection()}
    </div>
  );
};

export default FormRender;
