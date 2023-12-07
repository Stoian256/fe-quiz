import { Filters } from "@shadcn/utils/interfaces/typescriptGeneral";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const getQuestions = async (
  accessToken: string,
  filters: Filters,
  itemsPerPage: number,
  pageNumber: number
): Promise<any> => {
  const difficultiesParams = filters.difficulty.map((diff) => [
    "difficulties",
    diff
  ]);

  const tagsParams = filters.tags.map((tag) => ["tags", tag]);

  let params = new URLSearchParams();
  difficultiesParams.map((diff) => params.append(diff[0], diff[1]));
  tagsParams.map((tag) => params.append(tag[0], tag[1]));
  params.append("itemsPerPage", itemsPerPage.toString());
  params.append("pageIndex", pageNumber.toString());
  if (filters.keyword.length > 0) {
    params.append("keyword", filters.keyword[0].toString());
  }
  try {
    const url = `${apiServerUrl}/questions?${params}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export const saveQuestion = async (
  accessToken: string,
  dataToSend: FormData
) => {
  try {
    const response = await fetch(`${apiServerUrl}/questions/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(dataToSend)
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
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    console.error("Failed request details:", {
      url: `${apiServerUrl}/questions/create`,
      method: "POST",
      body: dataToSend,
      error
    });
    throw error;
  }
};

export const getQuestionById = async (accessToken: string, id: string) => {
  //TODO
};

export const updateQuestion = async (
  accessToken: string,
  dataToSend: FormData
) => {
  //TODO
};

export const deleteQuestion = async (accessToken: string, id: string) => {
  //TODO
};
