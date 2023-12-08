import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@shadcn/components/ui/card";
import { Input } from "@shadcn/components/ui/input";
import { Label } from "@shadcn/components/ui/label";
import Tag from "./tag";
import { useAuth } from "@shadcn/context/authContext";

interface FormTagsProps {
  onUpdateTags: (tags: string[]) => void;
  content: string;
  tags: string[];
}

const FormTags: React.FC<FormTagsProps> = ({ onUpdateTags, content, tags }) => {
  const [inputTag, setInputTag] = useState<string>("");
  const [tagErrors, setTagErrors] = useState<{ [key: number]: string }>({});
  const [apiTags, setApiTags] = useState<string[]>([]);

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    const capitalizedText =
      inputText.charAt(0).toUpperCase() + inputText.slice(1);
    setInputTag(capitalizedText);

    if (capitalizedText.endsWith(" ")) {
      addTag();
    } else {
      setTagErrors({});
    }
  };

  const handleTagSelection = (selectedTag: string) => {
    setInputTag(selectedTag);
    const newIndex = tags.length;

    if (validateTag(selectedTag, newIndex)) {
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

    if (tags.length < 1) {
      setTagErrors({
        ...tagErrors,
        [tags.indexOf(trimmedTag)]: "There must be at least 1 tag!"
      })
    }

    onUpdateTags([...tags, trimmedTag]);
    setInputTag("");
  };

  const handleRemoveAllTags = () => {
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
    onUpdateTags(updatedTags);
  };

  const suggestTagsFromTitle = (titleText: string): string[] => {
    const tagSuggestions: string[] = [];

    const words = titleText.match(/\b\w{3,15}\b/g);

    if (words) {
      for (const word of words) {
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
        if (!tagSuggestions.includes(capitalizedWord)) {
          tagSuggestions.push(capitalizedWord);
        }
      }
    }

    return tagSuggestions;
  };

  const BE_URL = import.meta.env.VITE_API_SERVER_URL;
  const { accessToken } = useAuth();

  useEffect(() => {
    const getTagsFromApi = async () => {
      try {
        const response = await fetch(`${BE_URL}tags`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: ""
        });
        const data = await response.json();

        const apiTagTitles = data.map((tag: {tagTitle: string}) => tag.tagTitle);

        setApiTags(apiTagTitles);
      } catch (error) {
        console.error("Error fetching tags from API:", error);
        setApiTags([]);
      }
    };
    getTagsFromApi();
  }, [BE_URL, accessToken]);

  const suggestTags = (inputText: string, questionTitle: string): string[] => {
    const matchingTagsFromApi = apiTags.filter(
      (tag: string) =>
        tag.toLowerCase().startsWith(inputText.toLowerCase()) ||
        inputText.toLowerCase().startsWith(tag.toLowerCase())
    );
  
    if (inputText.trim() === '') {
      return suggestTagsFromTitle(questionTitle).filter((tag) => !tags.includes(tag));
    }
  
    if (matchingTagsFromApi.length > 0) {
      return matchingTagsFromApi.filter((tag) => !tags.includes(tag));
    } else {
      const suggestedTagsFromTitle = suggestTagsFromTitle(questionTitle);
  
      const matchingTagsFromTitle = suggestedTagsFromTitle.filter(
        (tag) =>
          tag.toLowerCase().startsWith(inputText.toLowerCase()) ||
          inputText.toLowerCase().startsWith(tag.toLowerCase())
      );
  
      return matchingTagsFromTitle.filter((tag) => !tags.includes(tag));
    }
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
          {tags.length > 7 && <p className="text-red-500">There can't be more than 7 tags!</p>}
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
              disabled={tags.length === 7}
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
                      <span>{tag}</span>
                      <span className="text-xs/[5px] text-gray-500 ml-2">
                        {apiTags.includes(tag)
                          ? "(Suggested from API)"
                          : "(Suggested from title)"}
                      </span>
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
