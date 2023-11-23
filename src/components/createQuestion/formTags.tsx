import { useState } from "react";
import { Card, CardContent, CardTitle } from "@shadcn/components/ui/card";
import { Input } from "@shadcn/components/ui/input";
import { Label } from "@shadcn/components/ui/label";
import Tag from "./tag";

interface FormTagsProps {
  onUpdateTags: (tags: string[]) => void;
  content: string;
}

const FormTags: React.FC<FormTagsProps> = ({ onUpdateTags, content }) => {
  const [inputTag, setInputTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagErrors, setTagErrors] = useState<{ [key: number]: string }>({});

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setInputTag(inputText);

    if (inputText.endsWith(" ")) {
      addTag();
    } else {
      setTagErrors({});
    }
  };

  const handleTagSelection = (selectedTag: string) => {
    setInputTag(selectedTag);
    const newIndex = tags.length;

    if (validateTag(selectedTag, newIndex)) {
      setTags([...tags, selectedTag]);
      onUpdateTags([...tags, selectedTag]);
      setInputTag("");
    }
  };

  const addTag = () => {
    const trimmedTag = inputTag.trim();

    if (!trimmedTag || !validateTag(trimmedTag, tags.length)) {
      return;
    }

    if (tags.length >= 7) {
      setTagErrors({
        ...tagErrors,
        [tags.indexOf(trimmedTag)]: "Can't add more than 7 tags"
      });
      return;
    }

    if (tags.includes(trimmedTag)) {
      setTagErrors({
        ...tagErrors,
        [tags.indexOf(trimmedTag)]: "Tag already exists!"
      });
      return;
    }

    setTags([...tags, trimmedTag]);
    onUpdateTags([...tags, trimmedTag]);
    setInputTag("");
  };

  const handleRemoveAllTags = () => {
    setTags([]);
    onUpdateTags([]);
  };

  const validateTag = (tag: string, index: number): boolean => {
    const isValid = /^[a-zA-Z0-9].{1,}$/.test(tag);
    if (!isValid) {
      setTagErrors({ ...tagErrors, [index]: "Invalid tag!" });
    } else {
      setTagErrors({ ...tagErrors, [index]: "" });
    }
    return isValid;
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    onUpdateTags(updatedTags);
  };

  const suggestTagsFromTitle = (titleText: string): string[] => {
    const tagSuggestions: string[] = [];

    const words = titleText.match(/\b\w{3,15}\b/g);

    if (words) {
      for (const word of words) {
        const lowercaseWord = word.toLowerCase();
        if (!tagSuggestions.includes(lowercaseWord)) {
          tagSuggestions.push(lowercaseWord);
        }
      }
    }

    return tagSuggestions;
  };

  const suggestTags = (inputText: string, questionTitle: string): string[] => {
    const suggestedTags = suggestTagsFromTitle(questionTitle);

    const matchingTags = suggestedTags.filter(
      (tag) =>
        tag.includes(inputText.toLowerCase()) ||
        inputText.toLowerCase().includes(tag)
    );

    return matchingTags.filter((tag) => !tags.includes(tag));
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <CardTitle className="text-sm mt-2">Tags</CardTitle>
      <Card className="py-2">
        <CardContent className="space-y-2.5">
          <CardTitle className="text-sm mt-2">Selected Tags</CardTitle>
          <div className="flex gap-1">
            {tags.map((tag, i) => (
              <Tag key={i} tagName={tag} onClick={() => removeTag(tag)} />
            ))}
          </div>
          {Object.keys(tagErrors).map((key) => {
            const index = parseInt(key);
            return (
              tagErrors[index] && (
                <p key={index} className="text-red-500">
                  {tagErrors[index]}
                </p>
              )
            );
          })}
          {tags.length > 1 && (
            <button
              onClick={handleRemoveAllTags}
              className="mt-2 px-3 py-1 text-gray-400 bg-transparent"
            >
              remove all tags
            </button>
          )}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="tag">Add new Tag</Label>
            <Input
              id="tag"
              value={inputTag}
              onChange={handleTagsChange}
              autoComplete="off"
            />
            <div className="overflow-y-scroll overscroll-auto">
              {inputTag.length > 0 &&
                suggestTags(inputTag.trim(), content)
                  .map((tag) => tag.replace(",", ""))
                  .map((tag, i) => (
                    <div
                      key={i}
                      className={"bg-gray-200 p-1 cursor-pointer"}
                      onClick={() => handleTagSelection(tag)}
                    >
                      {tag}
                    </div>
                  ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormTags;
