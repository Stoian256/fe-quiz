import { DialogClose } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "../ui/dialog";
import FilterAll from "../filters/filterAll";
import DisplayQuizModalTable from "../tables/displayQuizModalTable";
import QuizModalQuestionPreview from "./quizModalQuestionPreview";
import { Button } from "../ui/button";
import Pagination from "../filters/pagination";
import { useFilterAndPagination } from "@shadcn/context/filterAndPaginationContext";
import { useQuizModalContext } from "@shadcn/context/quizModalContext";

interface QuizModalProps {
  handleSetQuestions: (selectedQuestionId: string[]) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ handleSetQuestions }) => {
  const {
    pageNumber,
    setPageNumber,
    itemsPerPage,
    numbersOfPages,
    handleArrowClick,
    handleItemsPerPage
  } = useFilterAndPagination();
  const { selectedQuestions, setSelectedQuestionsInModal } =
    useQuizModalContext();

  const selectQuestionsForQuiz = () => {
    setSelectedQuestionsInModal(selectedQuestions);
    handleSetQuestions(selectedQuestions);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <span className="p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90  ">
          Manage Questions
        </span>
      </DialogTrigger>
      <DialogContent className="h-screen w-screen max-w-none">
        <DialogHeader>
          <DialogTitle className="ml-4">Add questions</DialogTitle>
        </DialogHeader>
        <div className="flex min-h-[560px] gap-4">
          <div className="flex-1  overflow-y-auto h-[560px]">
            <FilterAll tableType="quizzes" />
            <DisplayQuizModalTable />
            <Pagination
              pageNumber={pageNumber}
              onPageNumberChange={(page) => setPageNumber(page)}
              handleArrowClick={handleArrowClick}
              itemsPerPage={itemsPerPage}
              handleItemsPerPage={handleItemsPerPage}
              numbersOfPages={numbersOfPages}
            />
          </div>
          <div className="flex flex-col ">
            <div className="w-[500px] max-h-[560px] overflow-y-auto text-left border border-gray-200 mt-14">
              <QuizModalQuestionPreview />
            </div>
          </div>
        </div>
        <hr />
        <DialogFooter className="flex justify-between sm:justify-between">
          <DialogClose
            className="bg-orange-300 text-black hover:bg-yellow-300 p-2 rounded-md"
            onClick={selectQuestionsForQuiz}
          >
            Select Questions
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline" className="border-none flex-end">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
