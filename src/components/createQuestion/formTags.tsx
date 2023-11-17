import { useState } from "react";
import { Card, CardContent, CardTitle } from "@shadcn/components/ui/card";
import { Input } from "@shadcn/components/ui/input";
import { Label } from "@shadcn/components/ui/label";
import Tag from "./tag";

interface FormTagsProps {
  onUpdateTags: (tags: string[]) => void;
}

const FormTags: React.FC<FormTagsProps> = ({ onUpdateTags }) => {
  const [inputTag, setInputTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setInputTag(inputText);

    if (inputText === "" || inputText.endsWith(",")) {
      const newTag = inputText.replace(",", "").trim();
      if (newTag && validateTag(newTag)) {
        if (!tags.includes(newTag)) {
          if (tags.length < 7) {
            setTags([...tags, newTag]);
            onUpdateTags([...tags, newTag]);
          } else {
            alert("Cannot add more than 7 tags");
          }
        } else {
          alert("Tag already exists");
        }
        setInputTag("");
      }
    }
  };

  const handleRemoveAllTags = () => {
    setTags([]);
    onUpdateTags([]);
  };

  const validateTag = (tag: string): boolean => {
    const isValid = /^[a-zA-Z0-9].{1,}$/.test(tag);
    if (!isValid) {
      alert("Invalid Tag");
    }
    return isValid;
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    onUpdateTags(updatedTags);
  };

  const suggestTags = (inputText: string): string[] => {
    const suggestedTags = tags.filter((tag) => tag.startsWith(inputText));

    return suggestedTags;
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
            <div>
              {inputTag.length > 0 &&
                suggestTags(inputTag).map((tag, i) => (
                  <div key={i} className="bg-gray-200 p-1">
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
