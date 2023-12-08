import { IdObject } from "@shadcn/utils/interfaces/typescript";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const getQuizData = async (accessToken: string, id: IdObject) => {
  try {
    const response = await fetch(`${apiServerUrl}/quiz/start-quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(id)
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;
      if (response.status === 400) {
        errorMessage = "Bad request. Please check your data and try again.";
      } else if (response.status === 500) {
        errorMessage = "Internal server error. Please try again later.";
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    console.error("Failed request details:", {
      url: `${apiServerUrl}/quiz/start-quiz`,
      method: "POST",
      body: id,
      error
    });
    throw error;
  }
};

export const addQuestionAnswers = async (
  accessToken: string,
  attemptId: string,
  questionId: string,
  selectedAnswerIds: string[]
) => {
  try {
    const response = await fetch(`${apiServerUrl}/quiz/add-answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        attemptId,
        questionId,
        selectedAnswers: selectedAnswerIds
      })
    });

    const responseData = await response.json();
    console.log('Response from server:', responseData);

    return responseData;
  } catch (error) {
    console.error("API Error user add quiz question answers:", error);
    throw error;
  }
};

export const endQuiz = async (accessToken: string, idQuiz: IdObject) => {
  try {
    const response = await fetch(`${apiServerUrl}/quiz/end-quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(idQuiz)
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;
      if (response.status === 400) {
        errorMessage = "Bad request. Please check your data and try again.";
      } else if (response.status === 500) {
        errorMessage = "Internal server error. Please try again later.";
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    console.error("Failed request details:", {
      url: `${apiServerUrl}/quiz/end-quiz`,
      method: "POST",
      body: idQuiz,
      error
    });
    throw error;
  }
};
