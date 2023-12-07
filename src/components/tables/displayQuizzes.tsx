import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from "../ui/dialog";
import { useFilterAndPaginationQuizz } from "@shadcn/context/filterAndPaginationContextQuizz";

const tableHeadData = [
  "QUIZZ TITLE",
  "DIFFICULTY LEVEL",
  "TAGS",
  "NUMBER OF QUESTIONS",
  "TIME LIMIT",
  "ACTIONS"
];

const QuizzesTable = () => {
  const { quizzes } = useFilterAndPaginationQuizz();

  const handleDelete = () => {};

  return (
    <div className="p-4 pt-0">
      <div className="pb-5 w-full">
        <Table>
          <TableHeader className="bg-gray-200 text-black border-b-2 border-black">
            <TableRow>
              {tableHeadData.map((headerText, index) => (
                <TableHead key={index} className="text-black">
                  {headerText}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {quizzes.map((eachQuizz) => {
              const {
                difficultyLevel,
                id,
                numberOfQuestions,
                quizTags,
                quizTitle,
                timeLimitMinutes
              } = eachQuizz;
              return (
                <TableRow key={id} className="h-[30px] text-left">
                  <TableCell className="font-medium  w-[480px]">
                    {quizTitle.length > 60 ? (
                      <TooltipProvider delayDuration={200} key={id}>
                        <Tooltip>
                          <TooltipTrigger>
                            {`${quizTitle.slice(0, 60)}...`}
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="w-5/12 ml-10"
                          >
                            {quizTitle}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      quizTitle
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        difficultyLevel === "Easy"
                          ? "bg-green-600"
                          : difficultyLevel === "Medium"
                          ? "bg-yellow-500"
                          : "bg-red-600"
                      }
                    >
                      {difficultyLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {quizTags.length < 3
                      ? quizTags.map((tag, index) => (
                          <Badge key={index} className="mr-1 mb-1">
                            {tag.tagTitle}
                          </Badge>
                        ))
                      : quizTags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} className="mr-1 mb-1">
                            {tag.tagTitle}
                          </Badge>
                        ))}
                    {quizTags.length > 3 && (
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="text-xs pl-2">{`see +${
                              quizTags.length - 2
                            } more ${
                              quizTags.length - 2 === 1 ? "tag" : "tags"
                            }`}</span>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            {quizTags.slice(2).map((tagss, index) => (
                              <Badge key={index} className="mr-1 mb-1">
                                {tagss.tagTitle}
                              </Badge>
                            ))}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </TableCell>
                  <TableCell>{numberOfQuestions}</TableCell>
                  <TableCell>{timeLimitMinutes} minutes</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        className="border-black hover:bg-black hover:text-white"
                      >
                        Edit
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                            // onClick={(e) => handleDelete(e)}
                            value={id}
                          >
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <p className="mt-4 text-xl">
                            Are you sure you want to delete this quizz?
                          </p>
                          <p className="text-m">
                            This item will be deleted immediatlely. You can't
                            undo this action.
                          </p>
                          <DialogFooter className="flex gap-2 items-ce">
                            <DialogClose asChild>
                              <Button
                                variant="secondary"
                                className="border-none"
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <DialogClose
                              className="bg-red-600 text-white hover:bg-red-900 p-2 rounded-md px-3"
                              onClick={handleDelete}
                            >
                              Yes, delete it
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default QuizzesTable;
