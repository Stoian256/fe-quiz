import { Textarea } from "@shadcn/components/ui/textarea";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../ui/select";
import { Badge } from "@shadcn/components/ui/badge";

export function CardWithForm() {
  return (
    <Card className="pt-5 m-5">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
            <CardTitle className="text-sm mt-2">Question Title</CardTitle>
              <Textarea id="title" placeholder="Your Question Title Here..." />
            </div>
            <div className="flex flex-col space-y-1.5">
            <CardTitle className="text-sm mt-2">Difficulty Level</CardTitle>
              <Select>
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Easy" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                    <Input id="tag" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col space-y-1.5">
            <CardTitle className="text-sm mt-2">Answers</CardTitle>
              <Button className="w-fit">Add new Answer Option</Button>
              <Card>
                <CardContent>
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center justify-between py-2.5">
                    <CardTitle className="text-sm mt-2 font-normal">Option 1</CardTitle>
                      <Button className="text-red-400 border-red-400" variant={"outline"}>Remove</Button>
                    </div>
                    <Input id="answer1" />
                    <div className="flex items-center justify-between py-2.5">
                    <CardTitle className="text-sm mt-2 font-normal">Option 2</CardTitle>
                      <Button className="text-red-400 border-red-400" variant={"outline"}>Remove</Button>
                    </div>
                    <Input id="answer2" />
                    <div className="flex items-center justify-between py-2.5">
                    <CardTitle className="text-sm mt-2 font-normal">Option 3</CardTitle>
                      <Button className="text-red-400 border-red-400" variant={"outline"}>Remove</Button>
                    </div>
                    <Input id="answer3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex">
        <Button>Create Question</Button>
      </CardFooter>
    </Card>
  );
}
