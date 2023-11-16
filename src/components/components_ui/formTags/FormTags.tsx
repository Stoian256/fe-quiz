import { useState } from "react";
import { Card, CardContent, CardTitle } from "@shadcn/components/ui/card";
import { Input } from "@shadcn/components/ui/input";
import { Label } from "@shadcn/components/ui/label";
import Tag from "../tag/Tag";

interface FormTagsProps {
  onUpdateTags: (tags: string[]) => void;
}


const FormTags: React.FC<FormTagsProps> = ({onUpdateTags}) => {

  const [inputTag, setInputTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);;
  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    setInputTag(inputText);

    if (inputText === "" || inputText.endsWith(",")) {
      const newTag = inputText.replace(",", "").trim();
      if (validateTag(newTag)) {
        setTags([...tags, newTag]);
        setInputTag("");
        onUpdateTags([...tags, newTag]);
      }
    }
  }

  const validateTag = (tag: string): boolean => {
    const isValid = /^[a-zA-Z0-9]{4,15}$/.test(tag);
    if (!isValid) {
      alert("Invalid Tag");
    }
    return isValid;
  }

  return (
    <div className="flex flex-col space-y-1.5">
      <CardTitle className="text-sm mt-2">Tags</CardTitle>
      <Card className="py-2">
        <CardContent className="space-y-2.5">
          <CardTitle className="text-sm mt-2">Selected Tags</CardTitle>
          <div className="flex gap-1">
            {tags.map((tag, i) => (
              <Tag key={i} tagName={tag} />
            ))}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="tag">Add new Tag</Label>
            <Input id="tag" value={inputTag} onChange={handleTagsChange} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormTags;