import { Button } from "@shadcn/components/ui/button";
import { ArrowBigRightDash, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import QuizCompleted from "@shadcn/components/userSolveQuiz/quizCompleted";
import { useQuizContext } from "@shadcn/context/quizContext";
import { twMerge } from "tailwind-merge";
import { Progress } from "@shadcn/components/ui/progress";
import Clock from "@shadcn/components/userSolveQuiz/clock";
import { useAuth } from "@shadcn/context/authContext";
import { useLocation } from "react-router-dom";
import { addQuestionAnswers } from "@shadcn/services/solveQuiz.service";
import { IdObject, UserQuiz } from "@shadcn/utils/interfaces/typescript";

const SolveQ = () => {
  const { accessToken } = useAuth();
  const { userAnswers, setUserAnswers, isFinished } = useQuizContext();
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  let questionIndex = currentQuestion + 1;
  const location = useLocation();
  const { quiz, idQuiz }: { quiz: UserQuiz; idQuiz: IdObject } = location.state;
  const quizData = quiz;
  //TODO after the demo the next two rows will be deleted
  // const quizData: UserQuiz = location.state;
  console.log(idQuiz);

  const { attemptId, questions } = quizData;

  useEffect(() => {
    const newProgress = questionIndex * (100 / questions.length);
    setProgress(newProgress);
  }, [questionIndex]);

  const currentQuestionId = questions[currentQuestion].questionId;
  const selectedAnswerIds = userAnswers[currentQuestion];

  const sendAnswer = async () => {
    try {
      if (accessToken) {
        const response = await addQuestionAnswers(
          accessToken,
          attemptId,
          currentQuestionId,
          selectedAnswerIds
        );
        if (response.status === 200) {
          console.log("Successfully added question answers");
        } else {
          console.error("Failed to add question answers");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextQuestion = () => {
    sendAnswer();
    currentQuestion !== questions.length - 1 &&
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handlePreviousQuestion = () => {
    sendAnswer();
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const handleSkipQuestion = () => {
    sendAnswer();

    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleAnswerSelect = (selectedOptionId: string) => {
    const updatedUserAnswers = [...userAnswers];
    const currentAnswers = updatedUserAnswers[currentQuestion];

    const answerIndex = currentAnswers.indexOf(selectedOptionId);

    answerIndex === -1
      ? (updatedUserAnswers[currentQuestion] = [
          ...currentAnswers,
          selectedOptionId
        ])
      : (updatedUserAnswers[currentQuestion] = currentAnswers.filter(
          (answerId) => answerId !== selectedOptionId
        ));

    setUserAnswers(updatedUserAnswers);

    return updatedUserAnswers;
  };

  const canProceed =
    userAnswers[currentQuestion]?.length !== undefined &&
    userAnswers[currentQuestion]?.length !== 0;

  const nextButtonClasses = twMerge(
    "bg-dorange hover:bg-dyellow text-white text-md font-bold py-4 px-4 rounded shadow-orange-200 shadow-lg mb-2 mr-auto h-12",
    !canProceed && "cursor-not-allowed opacity-50"
  );

  return (
    <>
      <div>
        <div className="mt-2 mx-80">
          <Progress max={questions.length} value={progress} className="h-2" />
        </div>

        <div className="flex flex-col  max-h-screen justify-between mt-2">
          {/* CONTENT */}

          <div className="ml-8 mr-8 h-[510px] overflow-y-auto">
            <div className="text-center h-auto bg-dorange text-white rounded-md  p-4 py-12 text-lg mb-8">
              <strong className="text-gray-100">Q{questionIndex}.</strong>{" "}
              {questions[currentQuestion].questionTitle}
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-wrap gap-4 justify-center w-3/4 p-2">
                {questions[currentQuestion].answersOptions.map(
                  (option, index) => {
                    const letter = alphabet[index];
                    const isSelected = userAnswers[currentQuestion]?.includes(
                      option.answerOptionId
                    );
                    const buttonClasses = twMerge(
                      "font-bold py-4 px-8 rounded mr-2 mb-2 h-20 text-left relative",
                      isSelected
                        ? "bg-dorange text-white"
                        : "bg-gray-200 text-dblue"
                    );

                    return (
                      <button
                        key={option.answerOptionId}
                        className={buttonClasses}
                        onClick={() =>
                          handleAnswerSelect(option.answerOptionId)
                        }
                      >
                        <span className="mr-4 text-gray-500 absolute top-0 left-0 mt-1 ml-1">
                          {letter.toUpperCase()}.
                        </span>
                        <span> {option.answerOptionTitle}</span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* BUTTONS */}

          <div className="flex justify-between items-center ml-72 mr-64">
            <div>
              <Button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0 || isFinished}
                className="bg-gray-300 hover:bg-gray-400  shadow-gray-200 shadow-lg text-dblue text-md font-bold py-4 px-4 rounded mb-2 mr-auto h-12"
              >
                <ChevronLeft className="mt-1" />
                Previous
              </Button>
            </div>

            <div className="flex items-center">
              <Clock attemptId={attemptId} timeLimit = {quizData.timeLimit}/>
            </div>

            <div className="flex flex-row justify-end gap-4">
              {currentQuestion < questions.length - 1 ? (
                <Button
                  disabled={!canProceed}
                  onClick={handleNextQuestion}
                  className={nextButtonClasses}
                >
                  Next
                  <ChevronRight className="mt-1" />
                </Button>
              ) : (
                <QuizCompleted
                  attemptId={attemptId}
                  currentQuestionId={currentQuestionId}
                  selectedAnswerIds={selectedAnswerIds}
                />
              )}

              <Button
                onClick={handleSkipQuestion}
                disabled={currentQuestion === questions.length - 1}
                className="bg-white text-dorange hover:border hover:border-dorange hover:bg-white text-md font-bold py-4 px-4 rounded mb-2 ml-auto h-12"
              >
                Skip
                <ArrowBigRightDash className="mt-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SolveQ;
