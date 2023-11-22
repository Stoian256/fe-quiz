import React from "react";

interface CodeSnippetProps {
  title: string;
  code?: string;
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({ code = "" }) => (
  <div className="code-snippet">
    <pre className="code-snippet__body">{code}</pre>
  </div>
);
