import { Badge } from "@shadcn/components/ui/badge";
import { Card, CardContent, CardTitle } from "@shadcn/components/ui/card";
import { Input } from "@shadcn/components/ui/input";
import { Label } from "@shadcn/components/ui/label";

interface TagsComponentProps {
  onTagsChange: (tags: string[]) => void;
}


const FormTags: React.FC<TagsComponentProps> = ({ onTagsChange }) => {
  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = event.target.value.split(',').map((tag) => tag.trim());
    onTagsChange(tagsArray);
  }

  return (
    <div className="flex flex-col space-y-1.5">
      <CardTitle className="text-sm mt-2">Tags</CardTitle>
      <Card className="py-2">
        <CardContent className="space-y-2.5">
          <CardTitle className="text-sm mt-2">Selected Tags</CardTitle>
          <div className="flex gap-1">
            <Badge>Coding 101</Badge>
            <Badge>Fundamentals</Badge>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="tag">Add new Tag</Label>
            <Input id="tag" onChange={handleTagsChange} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormTags;