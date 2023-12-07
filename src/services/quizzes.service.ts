import { Filters } from "@shadcn/utils/interfaces/typescriptGeneral";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const getQuizzes = async (
  accessToken: string,
  filtersQuizz: Filters,
  itemsPerPage: number,
  pageNumber: number
): Promise<any> => {
  const difficultiesParams = filtersQuizz.difficulty.map((diff) => [
    "difficultyLevels",
    diff
  ]);

  const tagsParams = filtersQuizz.tags.map((tag) => ["tags", tag]);

  let params = new URLSearchParams();
  difficultiesParams.map((diff) => params.append(diff[0], diff[1]));
  tagsParams.map((tag) => params.append(tag[0], tag[1]));
  params.append("itemsPerPage", itemsPerPage.toString());
  params.append("pageIndex", pageNumber.toString());
  if (filtersQuizz.keyword.length > 0) {
    params.append("keyword", filtersQuizz.keyword[0].toString());
  }
  try {
    const url = `${apiServerUrl}/quiz?${params}`;
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
export const quizzSearchByTags = async (
  accessToken: string,
  itemsPerPage: number,
  pageIndex: number,
  tags: string[]
): Promise<any> => {
  const tagsParams = tags.map((tag) => ["tags", tag]);

  let params = new URLSearchParams();
  tagsParams.map((diff) => params.append(diff[0], diff[1]));
  params.append("itemsPerPage", itemsPerPage.toString());
  params.append("pageIndex", pageIndex.toString());
  try {
    const url = `${apiServerUrl}/quiz/search-by-tags?${params}`;
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
