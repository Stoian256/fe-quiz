import { useState } from "react";
import { Card, CardContent, CardTitle } from "@shadcn/components/ui/card";
import { Input } from "@shadcn/components/ui/input";
import { Label } from "@shadcn/components/ui/label";
import Tag from "./tag";

interface FormTagsProps {
  onUpdateTags: (tags: string[]) => void;
  questionTitle: string;
}

const FormTags: React.FC<FormTagsProps> = ({ onUpdateTags, questionTitle }) => {
  const [inputTag, setInputTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagErrors, setTagErrors] = useState<{ [key: number]: string }>({});
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setInputTag(inputText);

    if (inputText.endsWith(" ")) {
      addTag();
    } else {
      setTagErrors({});
      setSelectedSuggestionIndex(-1);
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
    if (trimmedTag && validateTag(trimmedTag, tags.length)) {
      if (tags.length < 7) {
        if (!tags.includes(trimmedTag)) {
          setTags([...tags, trimmedTag]);
          onUpdateTags([...tags, trimmedTag]);
        } else {
          setTagErrors({
            ...tagErrors,
            [tags.indexOf(trimmedTag)]: "Tag already exists!"
          });
        }
      } else {
        setTagErrors({
          ...tagErrors,
          [tags.indexOf(trimmedTag)]: "Can't add more than 7 tags"
        });
      }
      setInputTag("");
    }
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

  const suggestTagsFromBody = (titleText: string): string[] => {
    const words = titleText.split(/\s+/);

    const tagSuggestions = words
      .filter((word) => word.length > 2 && word.length <= 15)
      .slice(0, 5)
      .map((word) => word.toLowerCase())
      .map((word) => word.replace(",", ""));
    return tagSuggestions;
  };

  const suggestTags = (inputText: string, questionTitle: string): string[] => {
    const suggestedTags = suggestTagsFromBody(questionTitle);

    const matchingTags = suggestedTags.filter((tag) =>
      tag.toLowerCase().includes(inputText.toLowerCase())
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
                suggestTags(inputTag.trim(), questionTitle)
                  .map((tag) => tag.replace(",", ""))
                  .map((tag, i) => (
                    <div
                      key={i}
                      className={`bg-gray-200 p-1 cursor-pointer ${
                        i === selectedSuggestionIndex ? "bg-blue-200" : ""
                      }`}
                      onClick={() => handleTagSelection(tag)}
                      tabIndex={0}
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
