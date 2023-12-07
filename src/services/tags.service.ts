import { Tag } from "./../utils/interfaces/typescriptGeneral";
import { ListOfTags } from "@shadcn/utils/interfaces/ListOfTags";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const getTags = async (
  accessToken: string,
  tag:
    | {
        prefix: string;
        excludedTags: string[];
      }
    | {}
): Promise<any> => {
  try {
    const response = await fetch(`${apiServerUrl}tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(tag)
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
      url: `${apiServerUrl}/tags`,
      method: "POST",
      body: tag,
      error
    });
    throw error;
  }
};

export const getTopTags = async (
  accessToken: string,
  numberOfResults: number,
  query?: string,
  excludedTags?: string[]
): Promise<any> => {
  const excludedTagsParams = excludedTags?.map((tag) => ["excludedTags", tag]);

  let params = new URLSearchParams();

  excludedTagsParams?.map((diff) => params.append(diff[0], diff[1]));
  if (query) {
    params.append("query", query);
  }
  params.append("numberOfResults", numberOfResults.toString());
  try {
    const url = `${apiServerUrl}tags/top?${params}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
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

    throw error;
  }
};
