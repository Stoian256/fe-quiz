import { useQuizModalContext } from "@shadcn/context/quizModalContext";
import { useFilterAndPagination } from "@shadcn/context/filterAndPaginationContext";
import { Check, X} from "lucide-react";

const QuizModalQuestionPreview = () => {
  const context = useQuizModalContext();
  const { questions } = useFilterAndPagination();
  const selectedQuestionId = context ? context.selectedQuestionId : null;
  const activeQuestion = questions.find(
    (question) => question.id === selectedQuestionId
  );
  const wrongAnswerClasses =
    " inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-red-100 bg-red-100 hover:bg-red-100 hover:text-accent-foreground h-10 px-4 py-2";
  const trueAnswerClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-blue-100 bg-blue-100 hover:bg-blue-100 hover:text-accent-foreground h-10 px-4 py-2";

  return (
    <div className="overflow-y-auto">
      <h2 className="p-4"> Question Preview</h2>
      <hr />
      <div className="p-4">
        {activeQuestion ? (
          <>
            <h3 className="font-semibold text-lg text-dblue">
              {activeQuestion.questionTitle}
            </h3>
            <p>{activeQuestion.questionBody}</p>
            <div className="flex gap-2 flex-col mt-2">
              {activeQuestion.answers.map((item) => (
                <div key={item.id}>
                  {item.correctAnswer ? (
                    <div className="flex text-center items-center gap-2">

                      <span className={trueAnswerClasses}>
                        {item.answerContent}
                      </span>
                      <Check className="text-blue-500" />
                    </div>
                  ) : (
                    <div className="flex text-center items-center gap-2">

                      <span className={wrongAnswerClasses}>
                        {item.answerContent}
                      </span>
                      <X className="text-red-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Select a question to preview</p>
        )}
      </div>
    </div>
  );
};

export default QuizModalQuestionPreview;
