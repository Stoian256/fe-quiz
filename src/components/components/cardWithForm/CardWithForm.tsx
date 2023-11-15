import { Textarea } from "@shadcn/components/ui/textarea";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter } from "../../ui/card";
// import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../ui/select";

export function CardWithForm() {
  return (
    <Card className="">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Question Title</Label>
              <Textarea id="title" placeholder="Your Question Title Here..." />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select>
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Easy" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
